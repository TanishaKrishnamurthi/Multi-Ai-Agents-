import { createFileRoute } from "@tanstack/react-router";
import { getAgent } from "@/data/agents";
import { Navbar } from "@/components/layout/Navbar";
import { AgentWorkspace } from "@/components/workspace/AgentWorkspace";

export const Route = createFileRoute("/agents/coding")({
  head: () => ({
    meta: [
      { title: "Coding Agent Workspace — Multi-Agent AI Platform" },
      {
        name: "description",
        content: "Generate, explain, debug and optimise software code with formatted code blocks.",
      },
      { property: "og:title", content: "Coding Agent Workspace" },
      {
        property: "og:description",
        content: "A dedicated coding workspace with copyable code blocks and debugging help.",
      },
    ],
  }),
  component: CodingWorkspacePage,
});

function CodingWorkspacePage() {
  const agent = getAgent("coding")!;
  return (
    <div className="min-h-screen">
      <Navbar />
      <AgentWorkspace
        agent={agent}
        inputPlaceholder="Paste code or describe what you want to build…"
        emptyStateExtra={
          <div className="rounded-2xl border border-border bg-card p-4 text-sm shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Output format
            </p>
            <p className="mt-2 text-muted-foreground">
              Answers include syntax-formatted code blocks with a copy button, followed by an
              explanation of what changed and why.
            </p>
          </div>
        }
      />
    </div>
  );
}
