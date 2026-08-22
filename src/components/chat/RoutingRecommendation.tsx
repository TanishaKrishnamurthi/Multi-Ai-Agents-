import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { ACCENT_SOFT_BG, ACCENT_TEXT, getAgent, type RoutingTarget } from "@/data/agents";
import type { RoutingRecommendationData } from "@/services/api";
import { cn } from "@/lib/utils";

export function RoutingRecommendation({ data }: { data: RoutingRecommendationData }) {
  const agent = getAgent(data.agentId);
  if (!agent) return null;
  const Icon = agent.icon;

  return (
    <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-card to-accent/40 p-4 text-left shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Recommended Agent
      </p>

      <div className="mt-3 flex items-center gap-3">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-xl ring-1",
            ACCENT_SOFT_BG[agent.accent],
            ACCENT_TEXT[agent.accent],
          )}
        >
          <Icon className="size-5" />
        </span>
        <div>
          <h4 className="text-sm font-semibold">{agent.name}</h4>
          <p className="text-xs text-muted-foreground">{data.reason}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-foreground">Best for</p>
        <ul className="mt-2 space-y-1.5">
          {data.bestFor.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <Link
        to={agent.route as RoutingTarget}
        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Open {agent.shortName} Agent
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}
