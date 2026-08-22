import { AlertTriangle, FileVideo, ShieldCheck } from "lucide-react";
import type { MediaAnalysis } from "@/services/api";
import { cn } from "@/lib/utils";

export function AnalysisResult({ analysis }: { analysis: MediaAnalysis }) {
  const suspicious = analysis.status === "suspicious";

  return (
    <section className="space-y-5">
      <div
        className={cn(
          "rounded-2xl border p-6 shadow-card",
          suspicious
            ? "border-destructive/35 bg-destructive/5"
            : "border-success/35 bg-success/5",
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-xl ring-1",
                suspicious
                  ? "bg-destructive/10 text-destructive ring-destructive/25"
                  : "bg-success/10 text-success ring-success/25",
              )}
            >
              {suspicious ? (
                <AlertTriangle className="size-5" />
              ) : (
                <ShieldCheck className="size-5" />
              )}
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Analysis Result
              </p>
              <h3
                className={cn(
                  "mt-1 text-lg font-semibold",
                  suspicious ? "text-destructive" : "text-success",
                )}
              >
                {analysis.statusLabel}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Confidence
            </p>
            <p className="font-display text-3xl font-semibold">{analysis.confidence}%</p>
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full", suspicious ? "bg-destructive" : "bg-success")}
            style={{ width: `${analysis.confidence}%` }}
          />
        </div>

        <dl className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">File name</dt>
            <dd className="mt-1 flex items-center gap-1.5 truncate text-sm font-medium">
              <FileVideo className="size-4 shrink-0 text-muted-foreground" />
              {analysis.fileName}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">File type</dt>
            <dd className="mt-1 text-sm font-medium">{analysis.fileType}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Analysis status
            </dt>
            <dd className="mt-1 text-sm font-medium">Completed</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h4 className="text-sm font-semibold">Analysis Summary</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{analysis.summary}</p>

        <ul className="mt-5 divide-y divide-border">
          {analysis.checks.map((check) => (
            <li key={check.label} className="flex items-center justify-between gap-3 py-2.5">
              <span className="text-sm">{check.label}</span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-medium",
                  check.severity === "high" && "bg-destructive/10 text-destructive",
                  check.severity === "medium" && "bg-warning/15 text-warning",
                  check.severity === "low" && "bg-success/10 text-success",
                )}
              >
                {check.result}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-5 rounded-xl border border-border bg-muted/50 px-3.5 py-3 text-[11px] text-muted-foreground">
          Demo result — actual detection will be provided by the connected AI model.
        </p>
      </div>
    </section>
  );
}
