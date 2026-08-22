import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartSpec } from "@/services/api";

const PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const compact = (value: number) =>
  new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);

const axisProps = {
  stroke: "var(--muted-foreground)",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "0.75rem",
    fontSize: "12px",
    color: "var(--popover-foreground)",
  },
};

export function ChartCard({ chart }: { chart: ChartSpec }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <h3 className="text-sm font-semibold">{chart.title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{chart.subtitle}</p>

      <div className="mt-4 h-52">
        <ResponsiveContainer width="100%" height="100%">
          {chart.type === "line" ? (
            <LineChart data={chart.data} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="label" {...axisProps} />
              <YAxis {...axisProps} width={44} tickFormatter={compact} />
              <Tooltip {...tooltipStyle} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--chart-1)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--chart-1)" }}
              />
            </LineChart>
          ) : chart.type === "bar" ? (
            <BarChart data={chart.data} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="label" {...axisProps} />
              <YAxis {...axisProps} width={44} tickFormatter={compact} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {chart.data.map((entry, index) => (
                  <Cell key={entry.label} fill={PALETTE[index % PALETTE.length]} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <PieChart>
              <Tooltip {...tooltipStyle} />
              <Pie
                data={chart.data}
                dataKey="value"
                nameKey="label"
                innerRadius={44}
                outerRadius={76}
                paddingAngle={3}
                stroke="var(--card)"
              >
                {chart.data.map((entry, index) => (
                  <Cell key={entry.label} fill={PALETTE[index % PALETTE.length]} />
                ))}
              </Pie>
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {chart.type === "pie" && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {chart.data.map((entry, index) => (
            <span
              key={entry.label}
              className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground"
            >
              <span
                className="size-2 rounded-full"
                style={{ background: PALETTE[index % PALETTE.length] }}
              />
              {entry.label} · {entry.value}%
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
