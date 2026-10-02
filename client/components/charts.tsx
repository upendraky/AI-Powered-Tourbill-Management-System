"use client";

import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";
import { claimStatusData } from "@/data/mock-data";

export function MiniChart({ data, color }: { data: number[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={42}>
      <AreaChart data={data.map((value, index) => ({ index, value }))}>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          fill={color}
          fillOpacity={0.14}
          strokeWidth={2.4}
          dot={false}
          isAnimationActive
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function ClaimDonut() {
  return (
    <div className="grid items-center gap-6 md:grid-cols-[260px_1fr]">
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={claimStatusData}
              dataKey="value"
              innerRadius={68}
              outerRadius={104}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
              isAnimationActive
            >
              {claimStatusData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Total</span>
          <span className="text-4xl font-black text-navy dark:text-white">6</span>
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Claims</span>
        </div>
      </div>
      <div className="space-y-4">
        {claimStatusData.map((item) => {
          const total = claimStatusData.reduce((sum, row) => sum + row.value, 0);
          const percent = Math.round((item.value / total) * 100);
          return (
            <div key={item.name} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-md" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-slate-700 dark:text-slate-200">{item.name}</span>
              </div>
              <span className="font-bold text-navy dark:text-white">
                {item.value} ({percent}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
