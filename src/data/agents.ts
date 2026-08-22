import {
  BarChart3,
  Bot,
  Code2,
  FileText,
  Microscope,
  ScanFace,
  Scale,
  type LucideIcon,
} from "lucide-react";

export type WorkspaceType = "chat" | "data" | "detection" | "routing-chat";

export type AgentCategory =
  | "research"
  | "legal"
  | "development"
  | "documentation"
  | "data"
  | "detection"
  | "general";

export type AgentRoute =
  | "/agents/research"
  | "/agents/legal"
  | "/agents/coding"
  | "/agents/documentation"
  | "/agents/graph"
  | "/agents/deepfake"
  | "/agents/general";

/** Alias used by routing/recommendation UI. */
export type RoutingTarget = AgentRoute;

export interface Agent {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  route: AgentRoute;
  category: AgentCategory;
  categoryLabel: string;
  /** Semantic token key: text-agent-<accent> / bg-agent-<accent> */
  accent: string;
  badge?: string;
  tags: string[];
  capabilities: string[];
  suggestedPrompts: string[];
  workspaceType: WorkspaceType;
  cta: string;
}

export const AGENTS: Agent[] = [
  {
    id: "research",
    name: "Research Agent",
    shortName: "Research",
    description:
      "Research academic and technical topics using contextual information retrieval and trusted knowledge sources.",
    icon: Microscope,
    route: "/agents/research",
    category: "research",
    categoryLabel: "Research",
    accent: "research",
    badge: "Research + RAG",
    tags: ["Research", "Academic", "RAG"],
    capabilities: [
      "Contextual retrieval over knowledge sources",
      "Literature and topic summarisation",
      "Technical concept explanation",
    ],
    suggestedPrompts: [
      "Research the latest developments in renewable energy.",
      "Explain this technical concept.",
      "Summarize this research topic.",
      "Find information about machine learning.",
    ],
    workspaceType: "chat",
    cta: "Open Agent",
  },
  {
    id: "legal",
    name: "Legal Agent",
    shortName: "Legal",
    description:
      "Analyze legal documents and provide structured legal information and explanations.",
    icon: Scale,
    route: "/agents/legal",
    category: "legal",
    categoryLabel: "Legal",
    accent: "legal",
    badge: "Legal Analysis",
    tags: ["Legal", "Documents", "Analysis"],
    capabilities: [
      "Document structure analysis",
      "Clause-by-clause explanation",
      "Plain-language summaries",
    ],
    suggestedPrompts: [
      "Explain this legal concept.",
      "Analyze this document.",
      "Summarize this agreement.",
      "Explain this clause.",
    ],
    workspaceType: "chat",
    cta: "Open Agent",
  },
  {
    id: "coding",
    name: "Coding Agent",
    shortName: "Coding",
    description: "Generate, explain, debug and improve software code.",
    icon: Code2,
    route: "/agents/coding",
    category: "development",
    categoryLabel: "Development",
    accent: "coding",
    badge: "Code Assist",
    tags: ["Programming", "Debugging", "Development"],
    capabilities: ["Code generation", "Debugging assistance", "Refactoring and optimisation"],
    suggestedPrompts: [
      "Debug this Python code.",
      "Explain this algorithm.",
      "Create a REST API.",
      "Optimize this function.",
    ],
    workspaceType: "chat",
    cta: "Open Agent",
  },
  {
    id: "documentation",
    name: "Documentation Agent",
    shortName: "Documentation",
    description:
      "Create structured technical documentation, reports, summaries and project content.",
    icon: FileText,
    route: "/agents/documentation",
    category: "documentation",
    categoryLabel: "Documentation",
    accent: "documentation",
    badge: "Doc Builder",
    tags: ["Documentation", "Reports", "Content"],
    capabilities: ["Technical writing", "README and API docs", "Report generation"],
    suggestedPrompts: [
      "Create technical documentation.",
      "Write a project README.",
      "Generate API documentation.",
      "Create a project summary.",
    ],
    workspaceType: "chat",
    cta: "Open Agent",
  },
  {
    id: "graph",
    name: "Graph Agent",
    shortName: "Graph",
    description:
      "Upload structured datasets, generate visualizations and receive analytical insights.",
    icon: BarChart3,
    route: "/agents/graph",
    category: "data",
    categoryLabel: "Data",
    accent: "graph",
    badge: "Data Workspace",
    tags: ["Data", "Visualization", "Analytics"],
    capabilities: ["CSV / XLSX ingestion", "Automatic chart generation", "Analytical insights"],
    suggestedPrompts: [
      "Show monthly sales trends.",
      "Which region performs best?",
      "Compare product performance.",
      "Summarize this dataset.",
    ],
    workspaceType: "data",
    cta: "Open Agent",
  },
  {
    id: "deepfake",
    name: "Deepfake Detection Agent",
    shortName: "Deepfake Detection",
    description: "Analyze images and videos for potential manipulation or synthetic content.",
    icon: ScanFace,
    route: "/agents/deepfake",
    category: "detection",
    categoryLabel: "Detection",
    accent: "deepfake",
    badge: "Media Forensics",
    tags: ["Computer Vision", "Image", "Video"],
    capabilities: ["Image manipulation checks", "Video frame analysis", "Confidence scoring"],
    suggestedPrompts: [],
    workspaceType: "detection",
    cta: "Open Agent",
  },
  {
    id: "general",
    name: "General AI Agent",
    shortName: "General AI",
    description:
      "Not sure which specialized agent to use? Describe your task and General AI will help identify the most suitable agent.",
    icon: Bot,
    route: "/agents/general",
    category: "general",
    categoryLabel: "General AI",
    accent: "general",
    badge: "Intelligent Routing",
    tags: ["General AI", "Intelligent Routing", "Assistant"],
    capabilities: ["Task understanding", "Agent recommendation", "Guided onboarding"],
    suggestedPrompts: [
      "I have a CSV dataset and want to create charts showing sales trends.",
      "I need help debugging a Python program.",
      "I want to understand a rental agreement clause.",
      "I need a README for my final year project.",
    ],
    workspaceType: "routing-chat",
    cta: "Ask General AI",
  },
];

export const SPECIALIZED_AGENTS = AGENTS.filter((a) => a.id !== "general");

export const GENERAL_AGENT = AGENTS.find((a) => a.id === "general")!;

export function getAgent(id: string): Agent | undefined {
  return AGENTS.find((a) => a.id === id);
}

export const AGENT_FILTERS: { id: AgentCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "research", label: "Research" },
  { id: "legal", label: "Legal" },
  { id: "development", label: "Development" },
  { id: "documentation", label: "Documentation" },
  { id: "data", label: "Data" },
  { id: "detection", label: "Detection" },
  { id: "general", label: "General AI" },
];

/** Tailwind-safe class maps for per-agent accents (semantic tokens only). */
export const ACCENT_TEXT: Record<string, string> = {
  research: "text-agent-research",
  legal: "text-agent-legal",
  coding: "text-agent-coding",
  documentation: "text-agent-documentation",
  graph: "text-agent-graph",
  deepfake: "text-agent-deepfake",
  general: "text-agent-general",
};

export const ACCENT_SOFT_BG: Record<string, string> = {
  research: "bg-agent-research/10 ring-agent-research/20",
  legal: "bg-agent-legal/10 ring-agent-legal/20",
  coding: "bg-agent-coding/10 ring-agent-coding/20",
  documentation: "bg-agent-documentation/10 ring-agent-documentation/20",
  graph: "bg-agent-graph/10 ring-agent-graph/20",
  deepfake: "bg-agent-deepfake/10 ring-agent-deepfake/20",
  general: "bg-agent-general/10 ring-agent-general/20",
};
