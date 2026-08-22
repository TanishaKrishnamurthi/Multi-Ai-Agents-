import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getAgent } from "@/data/agents";
import { analyzeMedia, uploadFile, type MediaAnalysis } from "@/services/api";
import { Navbar } from "@/components/layout/Navbar";
import { ChatHeader } from "@/components/workspace/ChatHeader";
import { FileUpload } from "@/components/workspace/FileUpload";
import { AnalysisResult } from "@/components/workspace/AnalysisResult";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/agents/deepfake")({
  head: () => ({
    meta: [
      { title: "Deepfake Detection Workspace — Multi-Agent AI Platform" },
      {
        name: "description",
        content:
          "Upload an image or video to check for signs of AI manipulation, with confidence scoring and forensic checks.",
      },
      { property: "og:title", content: "Deepfake Detection Workspace" },
      {
        property: "og:description",
        content: "Media forensics workspace with authenticity verdicts and confidence scores.",
      },
    ],
  }),
  component: DeepfakeWorkspacePage,
});

function DeepfakeWorkspacePage() {
  const agent = getAgent("deepfake")!;
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<MediaAnalysis | null>(null);

  const handleFile = async (file: File) => {
    setBusy(true);
    setResult(null);
    const uploaded = await uploadFile(file);
    const analysis = await analyzeMedia({ name: uploaded.name, type: file.type });
    setResult(analysis);
    setBusy(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <ChatHeader agent={agent} />

      <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-8 sm:px-6">
        <Link
          to="/agents"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to Agents
        </Link>

        <FileUpload
          title="Upload an image or video for verification"
          hint="Supported formats: JPG, PNG, MP4, MOV"
          accept="image/*,video/*"
          buttonLabel="Upload Media"
          busy={busy}
          onFile={handleFile}
        />

        {busy && (
          <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
            <p className="text-sm font-medium">Analyzing media…</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Running frame consistency and artifact checks.
            </p>
            <div className="mx-auto mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-agent-deepfake" />
            </div>
          </div>
        )}

        {result && (
          <>
            <AnalysisResult analysis={result} />
            <Button variant="outline" className="rounded-xl" onClick={() => setResult(null)}>
              Analyze another file
            </Button>
          </>
        )}
      </main>
    </div>
  );
}
