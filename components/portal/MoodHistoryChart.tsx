"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { MoodCheckin } from "@/lib/types";
import { MOOD_LEVELS } from "@/components/thermometer/EmotionalThermometer";

export function MoodHistoryChart({ checkins }: { checkins: MoodCheckin[] }) {
  const data = [...checkins]
    .reverse()
    .map((c) => ({
      date: new Date(c.created_at).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      mood: c.mood,
    }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDEBE4" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#2E3A38aa" }} />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tick={{ fontSize: 11, fill: "#2E3A38aa" }}
            tickFormatter={(v) => MOOD_LEVELS[v - 1]?.label.split(" ")[0] ?? String(v)}
          />
          <Tooltip
            formatter={(value: number) => [MOOD_LEVELS[value - 1]?.label ?? value, "Estado"]}
          />
          <Line
            type="monotone"
            dataKey="mood"
            stroke="#217F73"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#217F73" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
