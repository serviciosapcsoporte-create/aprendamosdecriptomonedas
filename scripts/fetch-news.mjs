import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public", "data");
const outFile = resolve(outDir, "news.json");

const FEEDS = [
  { name: "CriptoNoticias", url: "https://www.criptonoticias.com/feed/" },
  { name: "BeInCrypto ES", url: "https://es.beincrypto.com/feed/" },
  { name: "DiarioBitcoin", url: "https://www.diariobitcoin.com/feed/" },
  { name: "Cointelegraph", url: "https://cointelegraph.com/rss" },
  { name: "Bitcoin Magazine", url: "https://bitcoinmagazine.com/feed" },
  { name: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/" },
];

const JSON_SOURCES = [
  {
    name: "CryptoCompare",
    url: "https://min-api.cryptocompare.com/data/v2/news/?lang=EN",
  },
];

const FALLBACK_ITEMS = [
  {
    title: "El resumen cripto de hoy no estÃ¡ disponible en este momento",
    source: "Aprendamos de Criptomonedas",
    link: "https://aprendamosdecriptomonedas.lat/noticias",
    publishedAt: new Date().toISOString(),
    excerpt:
      "No se pudo actualizar el resumen automÃ¡tico. La prÃ³xima actualizaciÃ³n programada lo restaurarÃ¡ automÃ¡ticamente.",
  },
];

function decodeXmlEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));
}

const MOJIBAKE = [
  ["Ã¡", "á"], ["Ã©", "é"], ["Ã­", "í"], ["Ã³", "ó"], ["Ãº", "ú"],
  ["Ã±", "ñ"], ["Ã¼", "ü"], ["Ã¿", "ÿ"], ["Ã¢", "â"], ["Ãª", "ê"],
  ["Ã´", "ô"], ["Ã¤", "ä"], ["Ã¶", "ö"], ["Ã§", "ç"],
  ["â€™", "'"], ['â€œ', '"'], ['â€', '"'], ["â€“", "–"], ["â€”", "—"],
  ["Â ", " "], ["Â", ""],
];

function fixMojibake(text) {
  let out = text;
  for (const [bad, good] of MOJIBAKE) {
    out = out.split(bad).join(good);
  }
  return out;
}

function cleanText(text) {
  return fixMojibake(decodeXmlEntities(stripHtml(text)));
}

function stripHtml(text) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchFeed(feed, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();

    const items = [];
    const itemPattern = /<item>([\s\S]*?)<\/item>/gi;
    let match;
    while ((match = itemPattern.exec(xml)) !== null) {
      const block = match[1];
      const grab = (tag) => {
        const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
        return m ? cleanText(m[1]) : "";
      };
      const title = grab("title");
      const link = grab("link");
      const description = grab("description");
      const pubDateRaw = (block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) || [])[1] || "";
      const publishedAt = pubDateRaw ? new Date(pubDateRaw) : null;
      if (!title || !link) continue;
      items.push({
        title,
        source: feed.name,
        link,
        publishedAt: (publishedAt && !isNaN(publishedAt.getTime()) ? publishedAt : new Date()).toISOString(),
        excerpt: description.slice(0, 220),
      });
    }
    return items;
  } catch (err) {
    console.warn(`[fetch-news] ${feed.name}: ${err.message}`);
    return [];
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJsonSource(source, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(source.url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const rows = Array.isArray(json) ? json : json?.Data ?? [];
    return rows
      .filter((row) => row?.title && row?.url)
      .map((row) => ({
        title: cleanText(row.title),
        source: source.name,
        link: row.url,
        publishedAt: row.published_on
          ? new Date(row.published_on * 1000).toISOString()
          : new Date().toISOString(),
        excerpt: cleanText(row.body ?? row.title).slice(0, 220),
      }));
  } catch (err) {
    console.warn(`[fetch-news] ${source.name}: ${err.message}`);
    return [];
  } finally {
    clearTimeout(timer);
  }
}

const seen = new Set();
const allItems = [];

for (const feed of FEEDS) {
  const items = await fetchFeed(feed);
  for (const item of items) {
    const key = item.link.split("#")[0];
    if (seen.has(key)) continue;
    seen.add(key);
    allItems.push(item);
  }
}

for (const source of JSON_SOURCES) {
  const items = await fetchJsonSource(source);
  for (const item of items) {
    const key = item.link.split("#")[0];
    if (seen.has(key)) continue;
    seen.add(key);
    allItems.push(item);
  }
}

allItems.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

const selected = allItems.length > 0 ? allItems.slice(0, 42) : FALLBACK_ITEMS;

mkdirSync(outDir, { recursive: true });
writeFileSync(
  outFile,
  JSON.stringify({ generatedAt: new Date().toISOString(), items: selected }, null, 2),
  "utf8",
);

console.log(`[fetch-news] ${selected.length} noticias actualizadas -> public/data/news.json`);