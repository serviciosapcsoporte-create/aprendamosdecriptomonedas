import { readFile } from "node:fs/promises";
import path from "node:path";

const TELEGRAM_LIMIT = 3900;
const MAX_ITEMS = 7;
const SITE_URL = "https://aprendamosdecriptomonedas.lat/noticias";
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const fileIndex = args.indexOf("--file");
const inputFile =
  fileIndex >= 0 ? args[fileIndex + 1] : "public/data/news.json";

function truncate(value, maxLength) {
  const text = String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
  const characters = Array.from(text);
  return characters.length <= maxLength
    ? text
    : `${characters.slice(0, maxLength - 1).join("")}…`;
}

function formatDate(value, options) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Fecha no válida en el archivo de noticias: ${value}`);
  }
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    ...options,
  }).format(date);
}

function validateItem(item, index) {
  if (
    !item ||
    typeof item.title !== "string" ||
    typeof item.source !== "string" ||
    typeof item.link !== "string" ||
    typeof item.publishedAt !== "string"
  ) {
    throw new Error(`La noticia ${index + 1} tiene campos incompletos.`);
  }

  const url = new URL(item.link);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error(`La noticia ${index + 1} tiene un enlace no válido.`);
  }
  formatDate(item.publishedAt, { dateStyle: "short", timeStyle: "short" });
}

function renderReport(news) {
  const generatedAt = news.generatedAt;
  const heading = `🗞️ Noticias de criptomonedas · ${formatDate(generatedAt, { dateStyle: "full" })}`;
  const items = news.items.slice(0, MAX_ITEMS);
  const blocks = [];

  for (const [index, item] of items.entries()) {
    const publishedAt = formatDate(item.publishedAt, {
      dateStyle: "short",
      timeStyle: "short",
    });
    const excerpt = truncate(item.excerpt, 160);
    const block = [
      `${index + 1}. ${truncate(item.title, 180)}`,
      `${truncate(item.source, 60)} · ${publishedAt}`,
      excerpt,
      item.link,
    ]
      .filter(Boolean)
      .join("\n");
    const candidate = [
      heading,
      ...blocks,
      block,
      `Más noticias: ${SITE_URL}`,
    ].join("\n\n");
    if (candidate.length > TELEGRAM_LIMIT) break;
    blocks.push(block);
  }

  if (blocks.length === 0) {
    throw new Error("No hay noticias que quepan en el reporte de Telegram.");
  }

  return {
    text: [heading, ...blocks, `Más noticias: ${SITE_URL}`].join("\n\n"),
    count: blocks.length,
  };
}

async function main() {
  if (!inputFile) {
    throw new Error("Indica la ruta del archivo después de --file.");
  }

  const filePath = path.resolve(inputFile);
  const news = JSON.parse(await readFile(filePath, "utf8"));
  if (!Array.isArray(news.items) || news.items.length === 0) {
    throw new Error(
      "El archivo de noticias no contiene artículos para publicar.",
    );
  }
  if (
    news.items.length === 1 &&
    news.items[0]?.source === "Aprendamos de Criptomonedas" &&
    news.items[0]?.link === SITE_URL
  ) {
    throw new Error(
      "La actualización de noticias falló; no se enviará el mensaje de respaldo.",
    );
  }

  news.items.slice(0, MAX_ITEMS).forEach(validateItem);
  const { text, count } = renderReport(news);

  if (dryRun) {
    console.log(text);
    return;
  }

  const token = process.env.NEWS_BOT_TOKEN;
  const chatId = process.env.NEWS_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("Configura NEWS_BOT_TOKEN y NEWS_CHAT_ID en el entorno.");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    },
  );
  const result = await response.json();
  if (!response.ok || result?.ok !== true) {
    throw new Error(
      `Telegram rechazó el reporte (HTTP ${response.status}): ${result?.description ?? "error desconocido"}`,
    );
  }

  console.log(`Reporte enviado a Telegram con ${count} noticias.`);
}

main().catch((error) => {
  console.error(`[send-news-report] ${error.message}`);
  process.exitCode = 1;
});
