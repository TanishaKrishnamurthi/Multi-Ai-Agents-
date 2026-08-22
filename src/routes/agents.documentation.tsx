import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileDown } from "lucide-react";
import { toast } from "sonner";
import { getAgent } from "@/data/agents";
import { Navbar } from "@/components/layout/Navbar";
import { AgentWorkspace } from "@/components/workspace/AgentWorkspace";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/agents/documentation")({
  head: () => ({
    meta: [
      { title: "Documentation Agent Workspace — Multi-Agent AI Platform" },
      {
        name: "description",
        content:
          "Create structured technical documentation, READMEs, API references, reports and project summaries.",
      },
      { property: "og:title", content: "Documentation Agent Workspace" },
      {
        property: "og:description",
        content: "Generate structured documentation drafts in a dedicated workspace.",
      },
    ],
  }),
  component: DocumentationWorkspacePage,
});

function DocumentationWorkspacePage() {
  const agent = getAgent("documentation")!;
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast.success("Mock document generated (README.md)");
    }, 900);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <AgentWorkspace
        agent={agent}
        inputPlaceholder="Describe the document you need…"
        emptyStateExtra={
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Generate a document</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Produces a structured Markdown draft — simulated in this build.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-xl"
                disabled={generating}
                onClick={generate}
              >
                <FileDown className="size-4" />
                {generating ? "Generating…" : "Generate document"}
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}
