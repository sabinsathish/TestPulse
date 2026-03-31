import { useState } from "react";
import { X } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";

interface NewProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function NewProjectDialog({ open, onClose }: NewProjectDialogProps) {
  const { addProject } = useAppState();
  const [name, setName] = useState("");
  const [appName, setAppName] = useState("");
  const [platform, setPlatform] = useState<"android" | "ios" | "cross-platform">("android");
  const [packageId, setPackageId] = useState("");
  const [version, setVersion] = useState("1.0.0");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !appName.trim()) return;
    addProject({ name: name.trim(), appName: appName.trim(), platform, packageId: packageId.trim() || `com.${appName.toLowerCase().replace(/\s/g, "")}.app`, version });
    setName("");
    setAppName("");
    setPlatform("android");
    setPackageId("");
    setVersion("1.0.0");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-card p-6 w-full max-w-md mx-4 glow-primary" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground">New Project</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Project Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My App Testing"
              className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">App Name *</label>
            <input
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="MyApp"
              className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as "android" | "ios" | "cross-platform")}
              className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
            >
              <option value="android">Android</option>
              <option value="ios">iOS</option>
              <option value="cross-platform">Cross-platform</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Package ID</label>
            <input
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
              placeholder="com.example.app"
              className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Version</label>
            <input
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="1.0.0"
              className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 h-10 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
