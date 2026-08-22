import { createFileRoute, Link } from "@tanstack/react-router";
import { GitBranch, Layers, Plug, ShieldCheck } from "lucide-react";
import { AGENTS } from "@/data/agents";
import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "How the Platform Works — Multi-Agent AI Platform" },
      {
        name: "description",
        content:
          "A parallel multi-agent architecture: seven independent AI agents branch from a single dashboard, with no chaining between them.",
      },
      { property: "og:title", content: "How the Multi-Agent Platform Works" },
      {
        property: "og:description",
        content: "Independent agents, dedicated workspaces, and a service layer ready for a real API.",
      },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    icon: GitBranch,
    title: "Parallel, never chained",
    body: "Every agent branches directly from the dashboard. No agent calls, wraps, or depends on another — selecting one never routes you through a pipeline of others.",
  },
  {
    icon: Layers,
    title: "Dedicated workspaces",
    body: "Each agent opens its own workspace tailored to its task: conversational agents get chat, the Graph Agent gets dataset tooling, and detection gets a forensic report view.",
  },
  {
    icon: Plug,
    title: "Service layer ready for a real backend",
    body: "All agent calls go through a single typed service module. Swapping the mock responses for real API endpoints requires no changes to the UI components.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent demo behaviour",
    body: "Every generated answer, chart and verdict in this build is clearly labelled as demo output, so nothing is mistaken for a verified result.",
  },
];

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="border-b border-border bg-surface/60">
          <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
            <h1 className="text-3xl font-semibold sm:text-4xl">How the platform works</h1>
            <p className="mt-4 text-muted-foreground">
              This platform hosts {AGENTS.length} independent AI agents behind one interface. The
              dashboard is the only hub — agents themselves are siblings, not steps in a workflow.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-card"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <item.icon className="size-5" />
                </span>
                <h2 className="mt-4 text-base font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Architecture
            </p>
            <pre className="mt-4 text-xs leading-relaxed text-muted-foreground">{`                        ┌──────────────────┐
                        │    Dashboard     │
                        └────────┬─────────┘
      ┌─────────┬─────────┬──────┴───┬─────────┬─────────┬─────────┐
   Research   Legal    Coding     Docs     Graph   Deepfake   General
      │         │         │         │         │         │         │
   (own      (own      (own      (own      (own      (own      (own
 workspace) workspace) workspace) workspace) workspace) workspace) workspace)`}</pre>
          </div>

          <div className="mt-10">
            <Button asChild size="lg" className="rounded-xl">
              <Link to="/agents">Browse the agents</Link>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
