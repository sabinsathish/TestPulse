import { Activity, CheckCircle, XCircle, Timer } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import TestRunRow from "@/components/dashboard/TestRunRow";
import WeeklyChart from "@/components/dashboard/WeeklyChart";
import DevicePerformanceChart from "@/components/dashboard/DevicePerformanceChart";
import { useAppState } from "@/context/AppStateContext";

export default function Dashboard() {
  const { testRuns, projects } = useAppState();

  const getProjectName = (projectId: string) =>
    projects.find((p) => p.id === projectId)?.name ?? "";

  const totalRuns = testRuns.length;
  const passed = testRuns.filter((r) => r.status === "passed").length;
  const failed = testRuns.filter((r) => r.status === "failed").length;
  const running = testRuns.filter((r) => r.status === "running").length;
  const avgExec = totalRuns > 0
    ? Math.round(testRuns.filter((r) => r.executionTime > 0).reduce((a, r) => a + r.executionTime, 0) / Math.max(testRuns.filter((r) => r.executionTime > 0).length, 1) / 1000)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Cross-device testing overview — {running > 0 ? `${running} test${running > 1 ? "s" : ""} running` : "all quiet"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Test Runs" value={totalRuns.toString()} change={`${projects.length} projects`} changeType="neutral" icon={Activity} />
        <StatsCard title="Passed" value={passed.toString()} change={totalRuns > 0 ? `${Math.round((passed / totalRuns) * 100)}% pass rate` : "—"} changeType="positive" icon={CheckCircle} />
        <StatsCard title="Failed" value={failed.toString()} change={running > 0 ? `${running} still running` : "No tests running"} changeType={failed > 0 ? "negative" : "neutral"} icon={XCircle} />
        <StatsCard title="Avg Execution" value={`${avgExec}s`} change="Across all profiles" changeType="neutral" icon={Timer} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <WeeklyChart />
        <DevicePerformanceChart />
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Recent Test Runs</h3>
          <span className="text-xs text-muted-foreground">{totalRuns} runs</span>
        </div>
        <div className="space-y-1">
          {testRuns.slice(0, 10).map((run) => (
            <TestRunRow key={run.id} run={run} projectName={getProjectName(run.projectId)} />
          ))}
          {testRuns.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No test runs yet. Start one from the Test Runs page.</p>
          )}
        </div>
      </div>
    </div>
  );
}
