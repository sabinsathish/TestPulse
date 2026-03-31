import { Activity, CheckCircle, XCircle, Timer, Smartphone } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import TestRunRow from "@/components/dashboard/TestRunRow";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import DevicePerformanceChart from "@/components/dashboard/DevicePerformanceChart";
import { demoTestRuns, demoProjects } from "@/lib/demo-data";

export default function Dashboard() {
  const getProjectName = (projectId: string) =>
    demoProjects.find((p) => p.id === projectId)?.name ?? "";

  const totalRuns = demoTestRuns.length;
  const passed = demoTestRuns.filter((r) => r.status === "passed").length;
  const failed = demoTestRuns.filter((r) => r.status === "failed").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Cross-device testing overview for all projects
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Test Runs"
          value={totalRuns.toString()}
          change="+12% this week"
          changeType="positive"
          icon={Activity}
        />
        <StatsCard
          title="Passed"
          value={passed.toString()}
          change={`${Math.round((passed / totalRuns) * 100)}% pass rate`}
          changeType="positive"
          icon={CheckCircle}
        />
        <StatsCard
          title="Failed"
          value={failed.toString()}
          change="−2 from last week"
          changeType="negative"
          icon={XCircle}
        />
        <StatsCard
          title="Avg Execution"
          value="94s"
          change="Across all profiles"
          changeType="neutral"
          icon={Timer}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeeklyChart />
        <DevicePerformanceChart />
      </div>

      {/* Recent runs */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Recent Test Runs</h3>
          <span className="text-xs text-muted-foreground">{totalRuns} runs</span>
        </div>
        <div className="space-y-1">
          {demoTestRuns.map((run) => (
            <TestRunRow key={run.id} run={run} projectName={getProjectName(run.projectId)} />
          ))}
        </div>
      </div>
    </div>
  );
}
