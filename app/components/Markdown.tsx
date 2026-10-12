import { Fragment, ReactNode } from "react";

/**
 * Resuelve el formato en linea: **negrita**, *cursiva*, `codigo` y [enlaces](url).
 *
 * SIN ESCAPAR NADA, a proposito.
 * La version anterior escapaba primero (&, <, >, ", ') y luego imprimia los
 * trozos como texto de React. React no decodifica entidades en los nodos de
 * texto, asi que cualquier comilla del contenido salia en pantalla como
 * &quot; y no como ". Afectaba a decenas de lecciones.
 *
 * Tampoco hace falta: React escapa por su cuenta todo lo que se le pasa como
 * hijo, y aqui no hay ni un solo `dangerouslySetInnerHTML`. El texto de las
 * lecciones es contenido plano; lo unico que si necesita comprobacion es el
 * href de los enlaces, que solo acepta protocolo http(s).
 */
function renderInline(text: string, key: number): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    let node: ReactNode = token;
    if (token.startsWith("**") && token.endsWith("**")) {
      node = <strong>{token.slice(2, -2)}</strong>;
    } else if (token.startsWith("*") && token.endsWith("*")) {
      node = <em>{token.slice(1, -1)}</em>;
    } else if (token.startsWith("`")) {
      node = <code className="inline-code">{token.slice(1, -1)}</code>;
    } else if (token.startsWith("[")) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        // Solo https/http. Cualquier otra cosa (javascript:, data:) se
        // descarta y se muestra como texto plano.
        let hrefSeguro = "";
        try {
          const u = new URL(linkMatch[2]);
          if (u.protocol === "https:" || u.protocol === "http:") hrefSeguro = u.href;
        } catch {
          hrefSeguro = "";
        }
        node = hrefSeguro ? (
          <a href={hrefSeguro} target="_blank" rel="noopener noreferrer">
            {linkMatch[1]}
          </a>
        ) : (
          linkMatch[1]
        );
      }
    }
    parts.push(<Fragment key={i++}>{node}</Fragment>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <Fragment key={key}>{parts}</Fragment>;
}

function renderTable(lines: string[], key: number): ReactNode {
  const header = parseTableRow(lines[0]);
  const body = lines.slice(2).filter((l) => l.trim() !== "");
  return (
    <div key={key} className="overflow-x-auto my-6 rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th key={i} className="text-left px-3 py-2 bg-muted font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        {body.length > 0 && (
          <tbody>
            {body.map((line, i) => {
              const cells = parseTableRow(line);
              return (
                <tr key={i} className="border-t">
                  {cells.map((cell, j) => (
                    <td key={j} className="px-3 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableLine(line: string): boolean {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function renderCodeBlock(code: string, key: number): ReactNode {
  return (
    <pre
      key={key}
      className="my-6 overflow-x-auto rounded-lg bg-muted p-4 text-sm leading-relaxed"
    >
      <code>{code}</code>
    </pre>
  );
}

function renderList(lines: string[], ordered: boolean, key: number): ReactNode {
  const items = lines.map((line) => line.replace(/^(\d+\.|\s*[-*])\s+/, ""));
  const ListTag = ordered ? "ol" : "ul";
  return (
    <ListTag key={key} className={`my-4 space-y-2 ${ordered ? "list-decimal" : "list-disc"} pl-6`}>
      {items.map((item, i) => (
        <li key={i}>{renderInline(item, i)}</li>
      ))}
    </ListTag>
  );
}

export function Markdown({ content }: { content: string[] }) {
  const nodes: ReactNode[] = [];
  let codeBuffer: string[] = [];

  const flushCode = (key: number) => {
    if (codeBuffer.length > 0) {
      nodes.push(renderCodeBlock(codeBuffer.join("\n"), key));
      codeBuffer = [];
    }
  };

  content.forEach((rawBlock, idx) => {
    const block = rawBlock.trim();
    if (!block) return;

    if (block.startsWith("```")) {
      if (codeBuffer.length > 0) {
        flushCode(idx);
        return;
      }
      codeBuffer = [];
      return;
    }
    if (codeBuffer.length > 0) {
      codeBuffer.push(rawBlock);
      return;
    }
    if (block.startsWith("```")) {
      codeBuffer.push(rawBlock.slice(3));
      flushCode(idx);
      return;
    }

    const lines = block.split("\n");

    if (block.startsWith("### ")) {
      nodes.push(
        <h3 key={idx} className="mt-8 mb-3 text-xl font-bold">
          {renderInline(block.slice(4), 0)}
        </h3>,
      );
      return;
    }
    if (block.startsWith("## ")) {
      nodes.push(
        <h2 key={idx} className="mt-8 mb-3 text-2xl font-bold">
          {renderInline(block.slice(3), 0)}
        </h2>,
      );
      return;
    }
    if (block.startsWith("# ")) {
      nodes.push(
        <h1 key={idx} className="mt-8 mb-3 text-3xl font-bold">
          {renderInline(block.slice(2), 0)}
        </h1>,
      );
      return;
    }
    if (block.startsWith("> ")) {
      nodes.push(
        <blockquote key={idx} className="my-4 border-l-4 border-primary/40 pl-4 text-muted-foreground">
          {renderInline(block.slice(2), 0)}
        </blockquote>,
      );
      return;
    }
    if (isTableLine(lines[0])) {
      flushCode(idx);
      nodes.push(renderTable(lines, idx));
      return;
    }
    if (lines.every((l) => /^\s*\d+\.\s/.test(l))) {
      flushCode(idx);
      nodes.push(renderList(lines, true, idx));
      return;
    }
    if (lines.every((l) => /^\s*[-*]\s/.test(l))) {
      flushCode(idx);
      nodes.push(renderList(lines, false, idx));
      return;
    }

    flushCode(idx);
    const paragraphs = block.split(/\n\s*\n/);
    paragraphs.forEach((paragraph, pIdx) => {
      nodes.push(
        <p key={`${idx}-${pIdx}`} className="py-1">
          {renderInline(paragraph, pIdx)}
        </p>,
      );
    });
  });

  flushCode(content.length + 1);

  return <div className="space-y-2">{nodes}</div>;
}