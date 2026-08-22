import { createFileRoute } from "@tanstack/react-router";
import { GENERAL_AGENT } from "@/data/agents";
import { Navbar } from "@/components/layout/Navbar";
import { AgentWorkspace } from "@/components/workspace/AgentWorkspace";

export const Route = createFileRoute("/agents/general")({
  head: () => ({
    meta: [
      { title: "General AI Assistant — Multi-Agent AI Platform" },
      {
        name: "description",
        content:
          "Describe your task and General AI will answer directly or recommend the specialized agent best suited to it.",
      },
      { property: "og:title", content: "General AI Assistant" },
      {
        property: "og:description",
        content: "Get help choosing the right specialized AI agent for your task.",
      },
    ],
  }),
  component: GeneralWorkspacePage,
});

function GeneralWorkspacePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AgentWorkspace
        agent={GENERAL_AGENT}
        inputPlaceholder="Describe what you want to accomplish…"
      />
    </div>
  );
}
