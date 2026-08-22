/**
 * Mock service layer.
 *
 * Every function here returns mock data with a small artificial delay so the UI
 * behaves like a real async client. When the FastAPI backend exists, replace the
 * bodies with `fetch(`${API_BASE_URL}/...`)` calls — the signatures stay the same.
 */

import { AGENTS, type Agent } from "@/data/agents";

export const API_BASE_URL = "/api";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
  recommendation?: RoutingRecommendationData;
}

export interface RoutingRecommendationData {
  agentId: string;
  reason: string;
  bestFor: string[];
}

export interface DatasetPreviewData {
  fileName: string;
  rowCount: number;
  columns: string[];
  rows: (string | number)[][];
}

export interface ChartSeriesPoint {
  label: string;
  value: number;
  secondary?: number;
}

export interface ChartSpec {
  id: string;
  title: string;
  subtitle: string;
  type: "line" | "bar" | "pie";
  data: ChartSeriesPoint[];
}

export interface DatasetAnalysis {
  charts: ChartSpec[];
  insights: string[];
}

export interface MediaAnalysis {
  fileName: string;
  fileType: string;
  status: "authentic" | "suspicious";
  statusLabel: string;
  confidence: number;
  summary: string;
  checks: { label: string; result: string; severity: "low" | "medium" | "high" }[];
}

export const uid = () => Math.random().toString(36).slice(2, 10);

/* ------------------------------------------------------------------ chat --- */

const MOCK_RESPONSES: Record<string, (prompt: string) => string> = {
  research: (prompt) => `### Research summary

**Query:** ${prompt}

Retrieved 4 passages from the indexed knowledge base and synthesised the findings below.

1. **Current state** — the field has moved quickly over the last 24 months, with most progress coming from efficiency gains rather than entirely new methods.
2. **Key approaches** — three families of techniques dominate the recent literature, each with a different cost/accuracy trade-off.
3. **Open problems** — evaluation remains inconsistent across published work, which makes direct comparison difficult.

**Suggested sources**
- Survey paper (2024) — broad overview with a useful taxonomy
- Technical report (2025) — reproducible benchmarks
- Conference proceedings — most recent incremental results

_Demo response. Retrieval and citations will come from the connected RAG pipeline._`,
  legal: (prompt) => `### Structured legal information

**Request:** ${prompt}

**1. What the text does**
The provision allocates a specific obligation to one party and defines the conditions under which it applies.

**2. Key terms**
- *Obligation* — the action a party must perform
- *Condition precedent* — what must happen first
- *Remedy* — what follows a failure to perform

**3. Points worth attention**
- The notice period is short relative to typical practice.
- Termination rights appear asymmetric between the parties.
- Governing-law and dispute-resolution clauses should be read together.

> This is general legal information generated for a demo, not legal advice. Consult a qualified professional for your situation.`,
  coding: (prompt) => `Here is a working approach for: **${prompt}**

\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Example API")

class Item(BaseModel):
    name: str
    quantity: int = 1

STORE: dict[int, Item] = {}

@app.post("/items/{item_id}")
def create_item(item_id: int, item: Item) -> Item:
    if item_id in STORE:
        raise HTTPException(status_code=409, detail="item already exists")
    STORE[item_id] = item
    return item

@app.get("/items/{item_id}")
def read_item(item_id: int) -> Item:
    if item_id not in STORE:
        raise HTTPException(status_code=404, detail="item not found")
    return STORE[item_id]
\`\`\`

**What changed / why**
1. Validation is handled by the Pydantic model instead of manual checks.
2. Errors use explicit status codes so clients can branch on them.
3. Type hints let the framework generate the schema automatically.

_Demo response. Real code generation arrives with the connected model._`,
  documentation: (prompt) => `# Documentation draft

**Task:** ${prompt}

## Overview
A short paragraph describing what the project does and who it is for.

## Getting started
\`\`\`bash
npm install
npm run dev
\`\`\`

## Architecture
| Layer | Responsibility |
| --- | --- |
| UI | Presentation and interaction |
| Service layer | Data access and mocks |
| Backend | Agent orchestration (planned) |

## Roadmap
- [x] Frontend workspaces
- [ ] Backend integration
- [ ] Evaluation harness

_Demo response generated for the documentation workspace._`,
  general: (prompt) => `Based on your request — "${prompt}" — here is how I read the task and which specialized agent fits best.`,
};

export async function sendMessage(agentId: string, prompt: string): Promise<ChatMessage> {
  await delay(700);
  const build = MOCK_RESPONSES[agentId] ?? MOCK_RESPONSES["documentation"]!;
  return {
    id: uid(),
    role: "assistant",
    content: build(prompt),
    createdAt: Date.now(),
  };
}

/* --------------------------------------------------------------- routing --- */

const ROUTING_RULES: { keywords: string[]; agentId: string; reason: string }[] = [
  {
    keywords: ["csv", "excel", "dataset", "chart", "graph", "sales", "trend", "visuali", "data"],
    agentId: "graph",
    reason: "Your task involves a structured dataset and visual analysis.",
  },
  {
    keywords: ["debug", "python", "code", "function", "api", "error", "bug", "javascript", "sql"],
    agentId: "coding",
    reason: "Your task is about writing or fixing software code.",
  },
  {
    keywords: ["contract", "legal", "clause", "agreement", "nda", "lease", "rental", "law"],
    agentId: "legal",
    reason: "Your task involves reviewing legal text.",
  },
  {
    keywords: ["deepfake", "fake", "manipulat", "video", "image", "photo", "authentic"],
    agentId: "deepfake",
    reason: "Your task is about verifying whether media has been manipulated.",
  },
  {
    keywords: ["readme", "documentation", "docs", "report", "summary", "write-up"],
    agentId: "documentation",
    reason: "Your task is producing structured written project content.",
  },
  {
    keywords: ["research", "paper", "study", "literature", "academic", "explain", "concept"],
    agentId: "research",
    reason: "Your task needs sourced research and explanation.",
  },
];

export async function routeQuery(prompt: string): Promise<ChatMessage> {
  await delay(800);
  const lower = prompt.toLowerCase();
  const match = ROUTING_RULES.find((rule) => rule.keywords.some((k) => lower.includes(k)));
  const target: Agent =
    AGENTS.find((a) => a.id === (match?.agentId ?? "research")) ?? AGENTS[0]!;

  return {
    id: uid(),
    role: "assistant",
    content: `Based on your request, the **${target.name}** is the most suitable agent.\n\n${
      match?.reason ?? "Your task looks like an open-ended knowledge question."
    }`,
    createdAt: Date.now(),
    recommendation: {
      agentId: target.id,
      reason: match?.reason ?? "Closest match for an open-ended knowledge question.",
      bestFor: target.capabilities,
    },
  };
}

/* ----------------------------------------------------------------- files --- */

export async function uploadFile(file: File): Promise<{ id: string; name: string; size: number }> {
  await delay(600);
  return { id: uid(), name: file.name, size: file.size };
}

/* --------------------------------------------------------------- dataset --- */

export async function analyzeDataset(fileName: string): Promise<DatasetPreviewData> {
  await delay(700);
  const rows: (string | number)[][] = [
    ["2025-01-08", "Aurora Keyboard", 18420, 142, "North"],
    ["2025-01-19", "Nimbus Monitor", 26150, 87, "West"],
    ["2025-02-03", "Aurora Keyboard", 21980, 168, "South"],
    ["2025-02-21", "Vertex Docking Hub", 14370, 96, "East"],
    ["2025-03-11", "Nimbus Monitor", 31240, 104, "North"],
    ["2025-03-28", "Lumen Webcam", 9860, 212, "West"],
    ["2025-04-14", "Vertex Docking Hub", 17510, 118, "South"],
    ["2025-04-30", "Lumen Webcam", 12240, 246, "North"],
  ];
  return {
    fileName,
    rowCount: 1284,
    columns: ["Date", "Product", "Sales", "Quantity", "Region"],
    rows,
  };
}

export async function queryDataset(question: string): Promise<DatasetAnalysis> {
  await delay(900);
  return {
    charts: [
      {
        id: "trend",
        title: "Sales Trend",
        subtitle: "Monthly revenue, Jan – Aug",
        type: "line",
        data: [
          { label: "Jan", value: 44570 },
          { label: "Feb", value: 36350 },
          { label: "Mar", value: 41100 },
          { label: "Apr", value: 29750 },
          { label: "May", value: 52310 },
          { label: "Jun", value: 48920 },
          { label: "Jul", value: 61480 },
          { label: "Aug", value: 57230 },
        ],
      },
      {
        id: "regional",
        title: "Regional Sales",
        subtitle: "Revenue by region",
        type: "bar",
        data: [
          { label: "North", value: 128400 },
          { label: "West", value: 96210 },
          { label: "South", value: 87640 },
          { label: "East", value: 61300 },
        ],
      },
      {
        id: "product",
        title: "Product Performance",
        subtitle: "Share of total revenue",
        type: "pie",
        data: [
          { label: "Nimbus Monitor", value: 34 },
          { label: "Aurora Keyboard", value: 27 },
          { label: "Vertex Hub", value: 22 },
          { label: "Lumen Webcam", value: 17 },
        ],
      },
    ],
    insights: [
      `Interpreting "${question}" as a revenue-over-time request across all regions.`,
      "July was the strongest month at 61,480 — roughly 38% above the eight-month average.",
      "The North region contributes 37% of total revenue while holding only 26% of order volume, suggesting a higher average order value.",
      "Lumen Webcam sells the highest unit count but the lowest revenue share, consistent with a low-price, high-volume product.",
      "April shows a dip that coincides with fewer Nimbus Monitor orders and is worth investigating further.",
    ],
  };
}

/* ------------------------------------------------------------ detection --- */

export async function analyzeMedia(file: { name: string; type: string }): Promise<MediaAnalysis> {
  await delay(1600);
  const suspicious = !/authentic|real|original/i.test(file.name);
  return {
    fileName: file.name,
    fileType: file.type || "unknown",
    status: suspicious ? "suspicious" : "authentic",
    statusLabel: suspicious ? "Potential Manipulation Detected" : "No Manipulation Detected",
    confidence: suspicious ? 87 : 94,
    summary: suspicious
      ? "Frequency-domain artefacts around the facial region are inconsistent with the rest of the frame. Compression fingerprints differ between the face and background, which commonly indicates a synthesised or blended region."
      : "Compression fingerprints, noise distribution and facial landmark geometry are consistent across the media. No indicators of synthetic generation were found.",
    checks: [
      {
        label: "Facial landmark consistency",
        result: suspicious ? "Irregular geometry detected" : "Consistent",
        severity: suspicious ? "high" : "low",
      },
      {
        label: "Compression fingerprint",
        result: suspicious ? "Mismatch between regions" : "Uniform",
        severity: suspicious ? "medium" : "low",
      },
      {
        label: "Noise distribution",
        result: suspicious ? "Localised smoothing" : "Natural sensor noise",
        severity: suspicious ? "medium" : "low",
      },
      { label: "Metadata integrity", result: "No edit history found", severity: "low" },
    ],
  };
}
