import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { ACCENT_SOFT_BG, ACCENT_TEXT, type Agent } from "@/data/agents";
import { sendMessage, routeQuery, uid, type ChatMessage as ChatMessageData } from "@/services/api";
import { AgentSidebar, type ChatSession } from "@/components/workspace/AgentSidebar";
import { ChatHeader } from "@/components/workspace/ChatHeader";
import { ChatMessage, TypingIndicator } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { SuggestedPrompt } from "@/components/chat/SuggestedPrompt";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HISTORY: Record<string, ChatSession[]> = {
  research: [
    { id: "r1", title: "Solid-state battery research", group: "Today" },
    { id: "r2", title: "Transformer attention explained", group: "Previous 7 days" },
    { id: "r3", title: "Grid storage literature review", group: "Previous 7 days" },
  ],
  legal: [
    { id: "l1", title: "Rental agreement review", group: "Today" },
    { id: "l2", title: "NDA clause explanation", group: "Previous 7 days" },
    { id: "l3", title: "Service contract summary", group: "Previous 7 days" },
  ],
  coding: [
    { id: "c1", title: "FastAPI CRUD endpoint", group: "Today" },
    { id: "c2", title: "Debug pandas merge error", group: "Previous 7 days" },
    { id: "c3", title: "Optimise recursive function", group: "Previous 7 days" },
  ],
  documentation: [
    { id: "d1", title: "Project README draft", group: "Today" },
    { id: "d2", title: "API reference outline", group: "Previous 7 days" },
    { id: "d3", title: "Sprint summary report", group: "Previous 7 days" },
  ],
  general: [
    { id: "g1", title: "Which agent for CSV charts?", group: "Today" },
    { id: "g2", title: "Help picking an agent", group: "Previous 7 days" },
  ],
};

export function AgentWorkspace({
  agent,
  emptyStateExtra,
  inputPlaceholder,
}: {
  agent: Agent;
  emptyStateExtra?: ReactNode;
  inputPlaceholder?: string;
}) {
  const Icon = agent.icon;
  const isRouting = agent.workspaceType === "routing-chat";

  const sessions = useMemo<ChatSession[]>(() => {
    const base = HISTORY[agent.id] ?? [];
    return [{ id: "current", title: "New chat", group: "Today" }, ...base];
  }, [agent.id]);

  const [activeSessionId, setActiveSessionId] = useState("current");
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [pending, setPending] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  const reset = () => {
    setMessages([]);
    setPending(false);
    setActiveSessionId("current");
    setSidebarOpen(false);
  };

  const handleSend = async (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", content: text, createdAt: Date.now() },
    ]);
    setPending(true);
    const reply = isRouting ? await routeQuery(text) : await sendMessage(agent.id, text);
    setMessages((prev) => [...prev, reply]);
    setPending(false);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <aside className="hidden w-72 shrink-0 border-r border-sidebar-border lg:block">
        <AgentSidebar
          agent={agent}
          sessions={sessions}
          activeSessionId={activeSessionId}
          onNewChat={reset}
          onSelectSession={(id) => {
            setActiveSessionId(id);
            setMessages([]);
          }}
        />
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 border-r border-sidebar-border shadow-lift">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close sidebar"
              className="absolute right-2 top-2 z-10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="size-4" />
            </Button>
            <AgentSidebar
              agent={agent}
              sessions={sessions}
              activeSessionId={activeSessionId}
              onNewChat={reset}
              onSelectSession={(id) => {
                setActiveSessionId(id);
                setMessages([]);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <ChatHeader agent={agent} onToggleSidebar={() => setSidebarOpen(true)} />

        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          {messages.length === 0 ? (
            <div className="mx-auto max-w-3xl">
              <div className="text-center">
                <span
                  className={cn(
                    "mx-auto flex size-14 items-center justify-center rounded-2xl ring-1",
                    ACCENT_SOFT_BG[agent.accent],
                    ACCENT_TEXT[agent.accent],
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <h2 className="mt-4 text-xl font-semibold">How can I help you?</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                  {agent.description}
                </p>
              </div>

              {emptyStateExtra && <div className="mt-6">{emptyStateExtra}</div>}

              <div className="mt-7">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Suggested prompts
                </p>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {agent.suggestedPrompts.map((prompt) => (
                    <SuggestedPrompt key={prompt} prompt={prompt} onSelect={handleSend} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} agent={agent} />
              ))}
              {pending && <TypingIndicator agent={agent} />}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <ChatInput
          onSend={handleSend}
          disabled={pending}
          placeholder={inputPlaceholder ?? `Message ${agent.shortName} Agent…`}
        />
      </div>
    </div>
  );
}
