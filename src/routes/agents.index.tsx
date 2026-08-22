import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AGENTS, AGENT_FILTERS, type AgentCategory } from "@/data/agents";
import { AgentGrid } from "@/components/agents/AgentGrid";
import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agents/")({
  head: () => ({
    meta: [
      { title: "Explore AI Agents — Multi-Agent AI Platform" },
      {
        name: "description",
        content:
          "Browse all seven independent AI agents: research, legal, coding, documentation, graph, deepfake detection and general AI routing.",
      },
      { property: "og:title", content: "Explore AI Agents" },
      {
        property: "og:description",
        content: "Search and filter seven independent specialized AI agents by category.",
      },
    ],
  }),
  component: AgentsCatalogue,
});

function AgentsCatalogue() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<AgentCategory | "all">("all");

  const agents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AGENTS.filter((agent) => {
      const matchesFilter = filter === "all" || agent.category === filter;
      const matchesQuery =
        !q ||
        agent.name.toLowerCase().includes(q) ||
        agent.description.toLowerCase().includes(q) ||
        agent.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-surface/60">
          <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
            <h1 className="text-3xl font-semibold sm:text-4xl">Explore AI Agents</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Seven independent agents, each with a dedicated workspace. Search by task or filter by
              category.
            </p>

            <div className="mt-8 max-w-md">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search agents, tasks or capabilities…"
                  aria-label="Search agents"
                  className="h-11 rounded-xl bg-card pl-10"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {AGENT_FILTERS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setFilter(option.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                    filter === option.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <p className="mb-6 text-xs text-muted-foreground">
            Showing {agents.length} of {AGENTS.length} agents
          </p>
          <AgentGrid agents={agents} />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
