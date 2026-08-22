import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Minimal markdown-like renderer: headings, bold, lists, tables, quotes, code blocks. */
export function Markdown({ content }: { content: string }) {
  const blocks = content.split(/```/);

  return (
    <div className="space-y-3 text-sm leading-relaxed">
      {blocks.map((block, index) =>
        index % 2 === 1 ? (
          <CodeBlock key={index} raw={block} />
        ) : (
          <TextBlock key={index} raw={block} />
        ),
      )}
    </div>
  );
}

function CodeBlock({ raw }: { raw: string }) {
  const [copied, setCopied] = useState(false);
  const newline = raw.indexOf("\n");
  const firstLine = newline === -1 ? "" : raw.slice(0, newline).trim();
  const language = /^[a-zA-Z0-9+#-]*$/.test(firstLine) && firstLine ? firstLine : "";
  const code = (language ? raw.slice(newline + 1) : raw).replace(/\n+$/, "");

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {language || "code"}
        </span>
        <Button variant="ghost" size="sm" className="h-7 gap-1.5 px-2 text-xs" onClick={copy}>
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy code"}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-[12.5px] leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|_[^_]+_)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code
          key={i}
          className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[12px]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("_") && part.endsWith("_") && part.length > 2) {
      return (
        <em key={i} className="text-muted-foreground">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function TextBlock({ raw }: { raw: string }) {
  const lines = raw.split("\n");
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  let table: string[][] = [];

  const flushList = (key: string) => {
    if (list.length === 0) return;
    out.push(
      <ul key={key} className="ml-4 list-disc space-y-1.5">
        {list.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </ul>,
    );
    list = [];
  };

  const flushTable = (key: string) => {
    if (table.length === 0) return;
    const head = table[0] ?? [];
    const body = table.slice(1);
    out.push(
      <div key={key} className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-muted/60">
            <tr>
              {head.map((cell, i) => (
                <th key={i} className="px-3 py-2 font-semibold">
                  {inline(cell)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, r) => (
              <tr key={r} className="border-t border-border">
                {row.map((cell, c) => (
                  <td key={c} className="px-3 py-2 text-muted-foreground">
                    {inline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    );
    table = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    const key = `l${index}`;

    if (/^\|(.+)\|$/.test(trimmed)) {
      const cells = trimmed.slice(1, -1).split("|").map((c) => c.trim());
      if (!cells.every((c) => /^:?-{2,}:?$/.test(c))) table.push(cells);
      return;
    }
    flushTable(`t${index}`);

    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      list.push(trimmed.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, ""));
      return;
    }
    flushList(`u${index}`);

    if (!trimmed) return;

    if (trimmed.startsWith("### ")) {
      out.push(
        <h4 key={key} className="pt-1 text-[15px] font-semibold">
          {inline(trimmed.slice(4))}
        </h4>,
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      out.push(
        <h3 key={key} className="pt-1 text-base font-semibold">
          {inline(trimmed.slice(3))}
        </h3>,
      );
      return;
    }
    if (trimmed.startsWith("# ")) {
      out.push(
        <h3 key={key} className="pt-1 text-lg font-semibold">
          {inline(trimmed.slice(2))}
        </h3>,
      );
      return;
    }
    if (trimmed.startsWith("> ")) {
      out.push(
        <blockquote
          key={key}
          className="rounded-r-lg border-l-2 border-primary/60 bg-muted/50 px-3 py-2 text-[13px] text-muted-foreground"
        >
          {inline(trimmed.slice(2))}
        </blockquote>,
      );
      return;
    }
    out.push(<p key={key}>{inline(trimmed)}</p>);
  });

  flushList("u-final");
  flushTable("t-final");

  return <>{out}</>;
}
