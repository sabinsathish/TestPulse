import { useState } from "react";
import { X, Play } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";

interface NewTestRunDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function NewTestRunDialog({ open, onClose }: NewTestRunDialogProps) {
  const { projects, deviceProfiles, simulateTestRun } = useAppState();
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [profileId, setProfileId] = useState(deviceProfiles[0]?.id ?? "");
  const [framework, setFramework] = useState<"maestro" | "appium">("maestro");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !profileId) return;
    simulateTestRun(projectId, profileId, framework);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-card p-6 w-full max-w-md mx-4 glow-primary" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground">New Test Run</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Project *</label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Device Profile *</label>
            <select
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            >
              {deviceProfiles.map((dp) => (
                <option key={dp.id} value={dp.id}>{dp.name} ({dp.category})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Framework</label>
            <div className="flex gap-3">
              {(["maestro", "appium"] as const).map((fw) => (
                <button
                  key={fw}
                  type="button"
                  onClick={() => setFramework(fw)}
                  className={`flex-1 h-10 rounded-xl text-sm font-medium transition-colors capitalize ${
                    framework === fw
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {fw}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 h-10 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Start Test
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
