import type { Agent } from "@/data/agents";
import { AgentCard } from "@/components/agents/AgentCard";

export function AgentGrid({ agents }: { agents: Agent[] }) {
  if (agents.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/60 p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No agents match your search. Try a different keyword or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} featured={agent.id === "general"} />
      ))}
    </div>
  );
}
