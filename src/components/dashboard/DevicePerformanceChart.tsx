import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { devicePerformanceData } from "@/lib/demo-data";

export default function DevicePerformanceChart() {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Avg Execution Time by Device (seconds)</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={devicePerformanceData} layout="vertical" barSize={16}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 14%)" horizontal={false} />
            <XAxis type="number" tick={{ fill: "hsl(150, 10%, 50%)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="device" width={100} tick={{ fill: "hsl(150, 10%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(150, 15%, 7%)",
                border: "1px solid hsl(150, 10%, 14%)",
                borderRadius: "12px",
                color: "hsl(140, 20%, 90%)",
                fontSize: 12,
              }}
            />
            <Bar dataKey="avgTime" fill="hsl(150, 40%, 50%)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
