import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Lightbulb, SendHorizontal, Sparkles } from "lucide-react";
import { getAgent } from "@/data/agents";
import {
  analyzeDataset,
  queryDataset,
  uploadFile,
  type DatasetAnalysis,
  type DatasetPreviewData,
} from "@/services/api";
import { Navbar } from "@/components/layout/Navbar";
import { ChatHeader } from "@/components/workspace/ChatHeader";
import { FileUpload } from "@/components/workspace/FileUpload";
import { DatasetPreview } from "@/components/workspace/DatasetPreview";
import { ChartCard } from "@/components/workspace/ChartCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/agents/graph")({
  head: () => ({
    meta: [
      { title: "Graph Agent Workspace — Multi-Agent AI Platform" },
      {
        name: "description",
        content:
          "Upload a CSV or Excel dataset, preview it, ask questions and view generated charts with analytical insights.",
      },
      { property: "og:title", content: "Graph Agent Workspace" },
      {
        property: "og:description",
        content: "A dedicated data-analysis workspace with dataset preview, charts and insights.",
      },
    ],
  }),
  component: GraphWorkspacePage,
});

const QUICK_QUESTIONS = [
  "Show monthly sales trends.",
  "Which region performs best?",
  "Compare product performance.",
];

function GraphWorkspacePage() {
  const agent = getAgent("graph")!;
  const [busy, setBusy] = useState(false);
  const [dataset, setDataset] = useState<DatasetPreviewData | null>(null);
  const [question, setQuestion] = useState("");
  const [analysing, setAnalysing] = useState(false);
  const [analysis, setAnalysis] = useState<DatasetAnalysis | null>(null);

  const handleFile = async (file: File) => {
    setBusy(true);
    const uploaded = await uploadFile(file);
    const preview = await analyzeDataset(uploaded.name);
    setDataset(preview);
    setAnalysis(null);
    setBusy(false);
  };

  const ask = async (value: string) => {
    const text = value.trim();
    if (!text || !dataset) return;
    setQuestion(text);
    setAnalysing(true);
    const result = await queryDataset(text);
    setAnalysis(result);
    setAnalysing(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <ChatHeader agent={agent} />

      <main className="mx-auto w-full max-w-5xl space-y-8 px-4 py-8 sm:px-6">
        <Link
          to="/agents"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to Agents
        </Link>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Step 1 — Upload dataset
          </h2>
          <div className="mt-3">
            <FileUpload
              title="Upload CSV or Excel file"
              hint="Supported formats: CSV, XLSX"
              accept=".csv,.xlsx"
              buttonLabel="Choose File"
              busy={busy}
              onFile={handleFile}
            />
          </div>
        </section>

        {dataset && (
          <>
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Step 2 — Dataset preview
              </h2>
              <div className="mt-3">
                <DatasetPreview dataset={dataset} />
              </div>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Step 3 — Ask something about your data
              </h2>
              <div className="mt-3 rounded-2xl border border-border bg-card p-4 shadow-card">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") ask(question);
                    }}
                    placeholder="e.g. Show monthly sales trends."
                    aria-label="Ask a question about the dataset"
                    className="h-11 rounded-xl"
                  />
                  <Button
                    className="h-11 rounded-xl"
                    disabled={analysing || !question.trim()}
                    onClick={() => ask(question)}
                  >
                    <SendHorizontal className="size-4" />
                    {analysing ? "Analysing…" : "Analyse"}
                  </Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => ask(q)}
                      className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {analysis && (
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Step 4 — Visualization results
            </h2>
            <div className="mt-3 grid gap-5 lg:grid-cols-2">
              {analysis.charts.map((chart) => (
                <ChartCard key={chart.id} chart={chart} />
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-xl bg-agent-graph/10 text-agent-graph ring-1 ring-agent-graph/20">
                  <Sparkles className="size-[18px]" />
                </span>
                <h3 className="text-sm font-semibold">AI Generated Insights</h3>
              </div>
              <ul className="mt-4 space-y-3">
                {analysis.insights.map((insight) => (
                  <li key={insight} className="flex items-start gap-2.5 text-sm">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-agent-graph" />
                    <span className="text-muted-foreground">{insight}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-[11px] text-muted-foreground">
                Demo insights — real analysis will come from the connected model.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
