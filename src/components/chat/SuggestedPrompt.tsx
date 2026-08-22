import { ArrowUpRight } from "lucide-react";

export function SuggestedPrompt({
  prompt,
  onSelect,
}: {
  prompt: string;
  onSelect: (prompt: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(prompt)}
      className="group flex w-full items-start justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-left text-sm shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
    >
      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
        {prompt}
      </span>
      <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
    </button>
  );
}
