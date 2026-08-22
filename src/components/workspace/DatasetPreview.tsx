import { FileSpreadsheet } from "lucide-react";
import type { DatasetPreviewData } from "@/services/api";

export function DatasetPreview({ dataset }: { dataset: DatasetPreviewData }) {
  return (
    <section className="rounded-2xl border border-border bg-card shadow-card">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-agent-graph/10 text-agent-graph ring-1 ring-agent-graph/20">
            <FileSpreadsheet className="size-[18px]" />
          </span>
          <div>
            <h3 className="text-sm font-semibold">{dataset.fileName}</h3>
            <p className="text-xs text-muted-foreground">
              {dataset.rowCount.toLocaleString()} rows · {dataset.columns.length} columns
            </p>
          </div>
        </div>
        <span className="rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-medium text-success">
          Dataset loaded
        </span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-muted/60">
            <tr>
              {dataset.columns.map((column) => (
                <th key={column} className="whitespace-nowrap px-5 py-2.5 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataset.rows.map((row, index) => (
              <tr key={index} className="border-t border-border">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="whitespace-nowrap px-5 py-2.5 text-muted-foreground"
                  >
                    {typeof cell === "number" ? cell.toLocaleString() : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="border-t border-border px-5 py-3 text-[11px] text-muted-foreground">
        Preview shows the first {dataset.rows.length} rows of the mock dataset.
      </footer>
    </section>
  );
}
