import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { AGENTS, GENERAL_AGENT } from "@/data/agents";
import { AgentGrid } from "@/components/agents/AgentGrid";
import { Navbar } from "@/components/layout/Navbar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Multi-Agent AI Platform — One Platform. Multiple AI Experts." },
      {
        name: "description",
        content:
          "Seven independent specialized AI agents — research, legal, coding, documentation, data and deepfake detection — each with its own dedicated workspace.",
      },
      { property: "og:title", content: "Multi-Agent AI Platform" },
      {
        property: "og:description",
        content:
          "Choose a specialized AI agent for your task, or let General AI help you find the right one.",
      },
    ],
  }),
  component: HomePage,
});

const STATS = [
  { icon: Layers, label: "Independent agents", value: "7" },
  { icon: Sparkles, label: "Dedicated workspaces", value: "7" },
  { icon: ShieldCheck, label: "Agent-to-agent coupling", value: "None" },
];

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-hero-mesh">
          <div className="pointer-events-none absolute inset-0 grid-lines" aria-hidden="true" />
          <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="size-3.5 text-primary" />
                Seven specialists. One unified platform.
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-6xl">
                One Platform. <span className="text-gradient-brand">Multiple AI Experts.</span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Choose a specialized AI agent for your task, or let General AI help you find the
                right one.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild size="lg" className="w-full rounded-xl sm:w-auto">
                  <Link to="/agents">
                    Explore Agents
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full rounded-xl bg-card/80 sm:w-auto"
                >
                  <Link to="/agents/general">I'm Not Sure Which Agent to Use</Link>
                </Button>
              </div>

              <dl className="mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-3">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border bg-card/85 p-4 text-left shadow-card backdrop-blur"
                  >
                    <stat.icon className="size-4 text-primary" />
                    <dd className="mt-3 font-display text-2xl font-semibold">{stat.value}</dd>
                    <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Agent dashboard */}
        <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold sm:text-4xl">Choose Your AI Agent</h2>
            <p className="mt-3 text-muted-foreground">
              Select a specialized agent based on what you need to accomplish. Every agent is
              independent and opens in its own dedicated workspace.
            </p>
          </div>

          <div className="mt-10">
            <AgentGrid agents={AGENTS} />
          </div>
        </section>

        {/* General AI section */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-hero-mesh p-8 shadow-card sm:p-12">
            <div className="relative max-w-2xl">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-agent-general/10 text-agent-general ring-1 ring-agent-general/20">
                <Bot className="size-6" />
              </span>
              <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">
                Not sure which agent you need?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Describe what you want to accomplish and General AI will help determine which
                specialized agent is best suited for your task.
              </p>
              <Button asChild size="lg" className="mt-7 rounded-xl">
                <Link to={GENERAL_AGENT.route}>
                  Ask General AI
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
