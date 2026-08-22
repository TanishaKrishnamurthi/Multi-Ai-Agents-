import { Link } from "@tanstack/react-router";
import { ArrowLeft, MessageSquarePlus, MessagesSquare } from "lucide-react";
import { ACCENT_SOFT_BG, ACCENT_TEXT, type Agent } from "@/data/agents";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ChatSession {
  id: string;
  title: string;
  group: string;
}

export function AgentSidebar({
  agent,
  sessions,
  activeSessionId,
  onNewChat,
  onSelectSession,
}: {
  agent: Agent;
  sessions: ChatSession[];
  activeSessionId: string;
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
}) {
  const Icon = agent.icon;
  const groups = Array.from(new Set(sessions.map((s) => s.group)));

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex items-center gap-2.5 border-b border-sidebar-border px-4 py-4">
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-xl ring-1",
            ACCENT_SOFT_BG[agent.accent],
            ACCENT_TEXT[agent.accent],
          )}
        >
          <Icon className="size-[18px]" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{agent.shortName}</p>
          <p className="text-[11px] text-muted-foreground">{agent.categoryLabel}</p>
        </div>
      </div>

      <div className="p-3">
        <Button onClick={onNewChat} className="w-full justify-start gap-2 rounded-xl">
          <MessageSquarePlus className="size-4" />
          New Chat
        </Button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-3 pb-3">
        {groups.map((group) => (
          <div key={group}>
            <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {group}
            </p>
            <div className="space-y-0.5">
              {sessions
                .filter((s) => s.group === group)
                .map((session) => (
                  <button
                    key={session.id}
                    type="button"
                    onClick={() => onSelectSession(session.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[13px] transition-colors",
                      session.id === activeSessionId
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                    )}
                  >
                    <MessagesSquare className="size-3.5 shrink-0" />
                    <span className="truncate">{session.title}</span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-sidebar-border p-3">
        <Link
          to="/agents"
          className="flex items-center gap-2 rounded-lg px-2 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Agents
        </Link>
      </div>
    </div>
  );
}
