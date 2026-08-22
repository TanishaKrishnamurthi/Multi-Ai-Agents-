import { createFileRoute } from "@tanstack/react-router";
import { getAgent } from "@/data/agents";
import { Navbar } from "@/components/layout/Navbar";
import { AgentWorkspace } from "@/components/workspace/AgentWorkspace";

export const Route = createFileRoute("/agents/research")({
  head: () => ({
    meta: [
      { title: "Research Agent Workspace — Multi-Agent AI Platform" },
      {
        name: "description",
        content:
          "Research academic and technical topics with contextual retrieval over trusted knowledge sources.",
      },
      { property: "og:title", content: "Research Agent Workspace" },
      {
        property: "og:description",
        content: "A dedicated research workspace with retrieval-backed answers and summaries.",
      },
    ],
  }),
  component: ResearchWorkspacePage,
});

function ResearchWorkspacePage() {
  const agent = getAgent("research")!;
  return (
    <div className="min-h-screen">
      <Navbar />
      <AgentWorkspace
        agent={agent}
        inputPlaceholder="Ask a research question…"
        emptyStateExtra={
          <div className="rounded-2xl border border-border bg-card p-4 text-sm shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pipeline
            </p>
            <p className="mt-2 text-muted-foreground">
              Answers are composed from retrieved context passages, then summarised with source
              suggestions. Retrieval is mocked in this build.
            </p>
          </div>
        }
      />
    </div>
  );
}
