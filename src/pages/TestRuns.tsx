import { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { demoTestSteps } from "@/lib/demo-data";
import TestRunRow from "@/components/dashboard/TestRunRow";
import NewTestRunDialog from "@/components/dialogs/NewTestRunDialog";
import { CheckCircle, XCircle, SkipForward, AlertTriangle, X, Play } from "lucide-react";

export default function TestRuns() {
  const { testRuns, projects } = useAppState();
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const selectedRun = testRuns.find((r) => r.id === selectedRunId);
  const getProjectName = (id: string) => projects.find((p) => p.id === id)?.name ?? "";

  const stepIcons = {
    passed: <CheckCircle className="w-4 h-4 text-success" />,
    failed: <XCircle className="w-4 h-4 text-destructive" />,
    skipped: <SkipForward className="w-4 h-4 text-warning" />,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Test Runs</h1>
          <p className="text-sm text-muted-foreground mt-1">All test execution history</p>
        </div>
        <button onClick={() => setDialogOpen(true)} className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Play className="w-4 h-4" /> New Test Run
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 glass-card p-4 space-y-1">
          {testRuns.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No test runs yet. Click "New Test Run" to start.</p>
          )}
          {testRuns.map((run) => (
            <div key={run.id} onClick={() => setSelectedRunId(run.id)} className={`cursor-pointer rounded-xl transition-colors ${selectedRunId === run.id ? "bg-primary/5 ring-1 ring-primary/20" : ""}`}>
              <TestRunRow run={run} projectName={getProjectName(run.projectId)} />
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedRun ? (
            <div className="glass-card p-5 space-y-5 sticky top-20">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Run Details</h3>
                <button onClick={() => setSelectedRunId(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bar for running tests */}
              {selectedRun.status === "running" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{selectedRun.passedTests + selectedRun.failedTests}/{selectedRun.totalTests}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${((selectedRun.passedTests + selectedRun.failedTests) / selectedRun.totalTests) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Project</p>
                  <p className="text-foreground font-medium">{getProjectName(selectedRun.projectId)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Device</p>
                  <p className="text-foreground font-medium">{selectedRun.profileName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Framework</p>
                  <p className="text-foreground font-medium capitalize">{selectedRun.framework}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tests</p>
                  <p className="text-foreground font-medium">{selectedRun.passedTests}/{selectedRun.totalTests} passed</p>
                </div>
              </div>

              {selectedRun.suggestions && selectedRun.suggestions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Optimization Suggestions</h4>
                  {selectedRun.suggestions.map((s, i) => (
                    <div key={i} className="flex gap-2 text-sm p-2.5 rounded-lg bg-warning/5 border border-warning/10">
                      <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                      <p className="text-foreground/80">{s}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Test Steps (sample)</h4>
                <div className="space-y-1">
                  {demoTestSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary/50 text-sm">
                      {stepIcons[step.status]}
                      <span className="flex-1 text-foreground">{step.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{step.duration}ms</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Select a test run to view details</p>
            </div>
          )}
        </div>
      </div>

      <NewTestRunDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
