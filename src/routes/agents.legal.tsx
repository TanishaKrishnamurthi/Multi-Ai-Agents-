import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileUp } from "lucide-react";
import { toast } from "sonner";
import { getAgent } from "@/data/agents";
import { Navbar } from "@/components/layout/Navbar";
import { AgentWorkspace } from "@/components/workspace/AgentWorkspace";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/agents/legal")({
  head: () => ({
    meta: [
      { title: "Legal Agent Workspace — Multi-Agent AI Platform" },
      {
        name: "description",
        content:
          "Analyze legal documents and get structured, plain-language explanations of clauses and agreements.",
      },
      { property: "og:title", content: "Legal Agent Workspace" },
      {
        property: "og:description",
        content: "Upload a document and receive structured legal information — demo build.",
      },
    ],
  }),
  component: LegalWorkspacePage,
});

function LegalWorkspacePage() {
  const agent = getAgent("legal")!;
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <AgentWorkspace
        agent={agent}
        inputPlaceholder="Ask about a clause, document or legal concept…"
        emptyStateExtra={
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Upload a document for analysis</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PDF, DOCX or TXT — the upload is simulated in this build.
                </p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) toast.success(`${file.name} queued for mock analysis`);
                  e.target.value = "";
                }}
              />
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => fileRef.current?.click()}
              >
                <FileUp className="size-4" />
                Upload document
              </Button>
            </div>
            <p className="mt-4 rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-[11px] text-muted-foreground">
              Responses provide general legal information for demonstration only — not legal advice.
            </p>
          </div>
        }
      />
    </div>
  );
}
