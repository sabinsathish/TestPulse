import { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { FolderKanban, MoreVertical, Trash2 } from "lucide-react";
import NewProjectDialog from "@/components/dialogs/NewProjectDialog";

const platformBadge = {
  android: { label: "Android", className: "bg-success/10 text-success" },
  ios: { label: "iOS", className: "bg-info/10 text-info" },
  "cross-platform": { label: "Cross-platform", className: "bg-warning/10 text-warning" },
};

export default function Projects() {
  const { projects, deleteProject, testRuns } = useAppState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const getRunCount = (id: string) => testRuns.filter((r) => r.projectId === id).length;
  const getPassRate = (id: string) => {
    const runs = testRuns.filter((r) => r.projectId === id && (r.status === "passed" || r.status === "failed"));
    if (runs.length === 0) return 0;
    return Math.round((runs.filter((r) => r.status === "passed").length / runs.length) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your testing projects</p>
        </div>
        <button onClick={() => setDialogOpen(true)} className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          + New Project
        </button>
      </div>

      {projects.length === 0 && (
        <div className="glass-card p-12 text-center">
          <FolderKanban className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No projects yet. Create your first project to start testing.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          const badge = platformBadge[project.platform];
          const runCount = getRunCount(project.id);
          const passRate = getPassRate(project.id);
          return (
            <div key={project.id} className="glass-card p-5 stat-card-hover relative">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-primary" />
                </div>
                <div className="relative">
                  <button onClick={() => setMenuOpen(menuOpen === project.id ? null : project.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {menuOpen === project.id && (
                    <div className="absolute right-0 top-9 w-36 glass-card p-1 z-10 border border-border">
                      <button
                        onClick={() => { deleteProject(project.id); setMenuOpen(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-foreground">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">{project.packageId} · v{project.version}</p>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badge.className}`}>{badge.label}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Total Runs</p>
                  <p className="text-lg font-bold text-foreground">{runCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pass Rate</p>
                  <p className={`text-lg font-bold ${passRate >= 80 ? "text-success" : passRate >= 50 ? "text-warning" : "text-destructive"}`}>
                    {runCount > 0 ? `${passRate}%` : "—"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <NewProjectDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
