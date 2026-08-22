import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ACCENT_SOFT_BG, ACCENT_TEXT, type Agent } from "@/data/agents";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AgentCard({ agent, featured = false }: { agent: Agent; featured?: boolean }) {
  const Icon = agent.icon;

  return (
    <Link
      to={agent.route}
      className={cn(
        "group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        featured && "border-primary/35 bg-gradient-to-br from-card to-accent/40",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105",
            ACCENT_SOFT_BG[agent.accent],
            ACCENT_TEXT[agent.accent],
          )}
        >
          <Icon className="size-5" />
        </span>
        {agent.badge && (
          <Badge variant="secondary" className="rounded-full text-[11px] font-medium">
            {agent.badge}
          </Badge>
        )}
      </div>

      <h3 className="mt-5 text-lg font-semibold">{agent.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{agent.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {agent.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        {agent.cta}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
