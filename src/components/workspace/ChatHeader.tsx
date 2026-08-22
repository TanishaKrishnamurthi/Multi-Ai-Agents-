import { PanelLeft } from "lucide-react";
import { ACCENT_SOFT_BG, ACCENT_TEXT, type Agent } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ChatHeader({
  agent,
  onToggleSidebar,
}: {
  agent: Agent;
  onToggleSidebar?: () => void;
}) {
  const Icon = agent.icon;

  return (
    <header className="flex items-start gap-3 border-b border-border bg-background/85 px-4 py-3.5 backdrop-blur-xl sm:px-6">
      {onToggleSidebar && (
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Toggle agent sidebar"
          onClick={onToggleSidebar}
        >
          <PanelLeft className="size-[18px]" />
        </Button>
      )}

      <span
        className={cn(
          "hidden size-10 shrink-0 items-center justify-center rounded-xl ring-1 sm:flex",
          ACCENT_SOFT_BG[agent.accent],
          ACCENT_TEXT[agent.accent],
        )}
      >
        <Icon className="size-5" />
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-[15px] font-semibold">{agent.name}</h1>
          {agent.badge && (
            <Badge variant="secondary" className="rounded-full text-[10px]">
              {agent.badge}
            </Badge>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
            <span className="size-1.5 rounded-full bg-success" />
            Ready
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{agent.description}</p>
      </div>
    </header>
  );
}
