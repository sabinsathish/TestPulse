import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { weeklyRunsData } from "@/lib/demo-data";

export default function WeeklyChart() {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Test Runs</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyRunsData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 14%)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "hsl(150, 10%, 50%)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(150, 10%, 50%)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(150, 15%, 7%)",
                border: "1px solid hsl(150, 10%, 14%)",
                borderRadius: "12px",
                color: "hsl(140, 20%, 90%)",
                fontSize: 12,
              }}
            />
            <Bar dataKey="passed" fill="hsl(120, 90%, 38%)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="failed" fill="hsl(0, 72%, 51%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
