import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { devicePerformanceData, frameworkUsage, weeklyRunsData } from "@/lib/demo-data";

const passRateData = devicePerformanceData.map((d) => ({
  device: d.device,
  passRate: d.passRate,
}));

const radarData = [
  { metric: "Speed", highEnd: 95, midRange: 70, lowEnd: 40 },
  { metric: "Stability", highEnd: 98, midRange: 85, lowEnd: 55 },
  { metric: "Memory", highEnd: 90, midRange: 65, lowEnd: 30 },
  { metric: "Network", highEnd: 92, midRange: 80, lowEnd: 60 },
  { metric: "Battery", highEnd: 88, midRange: 75, lowEnd: 50 },
];

const tooltipStyle = {
  backgroundColor: "hsl(150, 15%, 7%)",
  border: "1px solid hsl(150, 10%, 14%)",
  borderRadius: "12px",
  color: "hsl(140, 20%, 90%)",
  fontSize: 12,
};
const tickFill = "hsl(150, 10%, 50%)";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Performance insights across devices and tests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pass rate by device */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Pass Rate by Device (%)</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={passRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 14%)" vertical={false} />
                <XAxis dataKey="device" tick={{ fill: tickFill, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="passRate" radius={[6, 6, 0, 0]}>
                  {passRateData.map((entry, i) => (
                    <Cell key={i} fill={entry.passRate >= 90 ? "hsl(120, 90%, 38%)" : entry.passRate >= 70 ? "hsl(45, 93%, 47%)" : "hsl(0, 72%, 51%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Framework distribution */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Framework Usage</h3>
          <div className="h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={frameworkUsage} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" stroke="none" label={({ name, value }) => `${name} ${value}%`}>
                  {frameworkUsage.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar: Device capability comparison */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Device Profile Comparison</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(150, 10%, 14%)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: tickFill, fontSize: 11 }} />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
                <Radar name="High-End" dataKey="highEnd" stroke="hsl(120, 90%, 38%)" fill="hsl(120, 90%, 38%)" fillOpacity={0.15} />
                <Radar name="Mid-Range" dataKey="midRange" stroke="hsl(220, 70%, 55%)" fill="hsl(220, 70%, 55%)" fillOpacity={0.1} />
                <Radar name="Low-End" dataKey="lowEnd" stroke="hsl(0, 72%, 51%)" fill="hsl(0, 72%, 51%)" fillOpacity={0.1} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 justify-center mt-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-2.5 h-2.5 rounded-full bg-success inline-block" /> High-End</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-2.5 h-2.5 rounded-full bg-info inline-block" /> Mid-Range</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-2.5 h-2.5 rounded-full bg-destructive inline-block" /> Low-End</span>
          </div>
        </div>

        {/* Trend */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Pass/Fail Trend</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRunsData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 14%)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: tickFill, fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="passed" stackId="a" fill="hsl(120, 90%, 38%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="failed" stackId="a" fill="hsl(0, 72%, 51%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
