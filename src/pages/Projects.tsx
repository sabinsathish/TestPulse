import { demoProjects } from "@/lib/demo-data";
import { FolderKanban, MoreVertical, ExternalLink } from "lucide-react";

const platformBadge = {
  android: { label: "Android", className: "bg-success/10 text-success" },
  ios: { label: "iOS", className: "bg-info/10 text-info" },
  "cross-platform": { label: "Cross-platform", className: "bg-warning/10 text-warning" },
};

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your testing projects</p>
        </div>
        <button className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoProjects.map((project) => {
          const badge = platformBadge[project.platform];
          return (
            <div key={project.id} className="glass-card p-5 stat-card-hover cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FolderKanban className="w-5 h-5 text-primary" />
                </div>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold text-foreground">{project.name}</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {project.packageId} · v{project.version}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-3">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badge.className}`}>
                  {badge.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Total Runs</p>
                  <p className="text-lg font-bold text-foreground">{project.totalRuns}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pass Rate</p>
                  <p className="text-lg font-bold text-success">{project.passRate}%</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
