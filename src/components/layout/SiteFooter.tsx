import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { SPECIALIZED_AGENTS } from "@/data/agents";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="font-display text-sm font-semibold">Multi-Agent AI</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            One platform hosting seven independent specialized AI agents, each with its own
            dedicated workspace.
          </p>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Agents
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {SPECIALIZED_AGENTS.map((agent) => (
              <li key={agent.id}>
                <Link
                  to={agent.route}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {agent.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Platform
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/agents" className="text-muted-foreground hover:text-foreground">
                All agents
              </Link>
            </li>
            <li>
              <Link to="/agents/general" className="text-muted-foreground hover:text-foreground">
                General AI
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground sm:px-6">
        Demo build — all agent responses on this site are mock data.
      </div>
    </footer>
  );
}
