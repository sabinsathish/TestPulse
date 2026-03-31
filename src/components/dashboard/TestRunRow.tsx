import { TestRun } from "@/lib/demo-data";
import { CheckCircle, XCircle, Loader2, Clock } from "lucide-react";

const statusConfig = {
  passed: { icon: CheckCircle, color: "text-success", bg: "bg-success/10", label: "Passed" },
  failed: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", label: "Failed" },
  running: { icon: Loader2, color: "text-info", bg: "bg-info/10", label: "Running" },
  queued: { icon: Clock, color: "text-warning", bg: "bg-warning/10", label: "Queued" },
};

interface TestRunRowProps {
  run: TestRun;
  projectName?: string;
}

export default function TestRunRow({ run, projectName }: TestRunRowProps) {
  const config = statusConfig[run.status];
  const StatusIcon = config.icon;

  const formatTime = (ms: number) => {
    if (ms === 0) return "In progress";
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes}m ${remaining}s`;
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-secondary/50 transition-colors group">
      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center`}>
        <StatusIcon className={`w-4 h-4 ${config.color} ${run.status === "running" ? "animate-spin" : ""}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {projectName && <span className="text-muted-foreground">{projectName} · </span>}
          {run.profileName}
        </p>
        <p className="text-xs text-muted-foreground">
          v{run.appVersion} · {run.framework} · {formatDate(run.startedAt)}
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm font-medium text-foreground">
          {run.passedTests}/{run.totalTests}
        </p>
        <p className="text-xs text-muted-foreground">{formatTime(run.executionTime)}</p>
      </div>

      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
}
