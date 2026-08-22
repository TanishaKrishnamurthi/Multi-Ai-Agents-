import { UserRound } from "lucide-react";
import { ACCENT_SOFT_BG, ACCENT_TEXT, type Agent } from "@/data/agents";
import type { ChatMessage as ChatMessageData } from "@/services/api";
import { Markdown } from "@/components/chat/Markdown";
import { RoutingRecommendation } from "@/components/chat/RoutingRecommendation";
import { cn } from "@/lib/utils";

function time(ts: number) {
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function ChatMessage({ message, agent }: { message: ChatMessageData; agent: Agent }) {
  const Icon = agent.icon;
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <span
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ring-1",
          isUser
            ? "bg-primary/10 text-primary ring-primary/20"
            : cn(ACCENT_SOFT_BG[agent.accent], ACCENT_TEXT[agent.accent]),
        )}
      >
        {isUser ? <UserRound className="size-4" /> : <Icon className="size-4" />}
      </span>

      <div className={cn("max-w-[min(46rem,88%)] space-y-2", isUser && "items-end text-right")}>
        <div
          className={cn(
            "flex items-center gap-2 text-[11px] text-muted-foreground",
            isUser && "justify-end",
          )}
        >
          <span className="font-medium text-foreground">{isUser ? "You" : agent.name}</span>
          <span>{time(message.createdAt)}</span>
        </div>

        <div
          className={cn(
            "rounded-2xl border px-4 py-3 text-left",
            isUser
              ? "border-primary/25 bg-primary/8 rounded-tr-sm"
              : "rounded-tl-sm border-border bg-card shadow-card",
          )}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <Markdown content={message.content} />
          )}
        </div>

        {message.recommendation && <RoutingRecommendation data={message.recommendation} />}
      </div>
    </div>
  );
}

export function TypingIndicator({ agent }: { agent: Agent }) {
  const Icon = agent.icon;
  return (
    <div className="flex gap-3">
      <span
        className={cn(
          "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ring-1",
          ACCENT_SOFT_BG[agent.accent],
          ACCENT_TEXT[agent.accent],
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-card px-4 py-3.5 shadow-card">
        {[0, 150, 300].map((d) => (
          <span
            key={d}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground/70"
            style={{ animationDelay: `${d}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
