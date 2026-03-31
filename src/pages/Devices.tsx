import { useState } from "react";
import { useAppState } from "@/context/AppStateContext";
import { Wifi, Cpu, HardDrive, Gauge, Trash2 } from "lucide-react";
import NewDeviceDialog from "@/components/dialogs/NewDeviceDialog";

const categoryColors: Record<string, string> = {
  "high-end": "border-success/30 bg-success/5",
  "mid-range": "border-info/30 bg-info/5",
  "low-end": "border-warning/30 bg-warning/5",
  tablet: "border-primary/30 bg-primary/5",
  "poor-network": "border-destructive/30 bg-destructive/5",
  "low-memory": "border-destructive/30 bg-destructive/5",
};

const categoryLabels: Record<string, { label: string; className: string }> = {
  "high-end": { label: "High-End", className: "bg-success/10 text-success" },
  "mid-range": { label: "Mid-Range", className: "bg-info/10 text-info" },
  "low-end": { label: "Low-End", className: "bg-warning/10 text-warning" },
  tablet: { label: "Tablet", className: "bg-primary/10 text-primary" },
  "poor-network": { label: "Poor Network", className: "bg-destructive/10 text-destructive" },
  "low-memory": { label: "Low Memory", className: "bg-destructive/10 text-destructive" },
};

export default function Devices() {
  const { deviceProfiles, deleteDeviceProfile } = useAppState();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Device Profiles</h1>
          <p className="text-sm text-muted-foreground mt-1">Simulated device environments for testing</p>
        </div>
        <button onClick={() => setDialogOpen(true)} className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          + Add Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deviceProfiles.map((profile) => {
          const cat = categoryLabels[profile.category] || { label: profile.category, className: "bg-secondary text-secondary-foreground" };
          return (
            <div key={profile.id} className={`glass-card p-5 stat-card-hover border ${categoryColors[profile.category] || ""} group relative`}>
              <button
                onClick={() => deleteDeviceProfile(profile.id)}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-start justify-between">
                <div className="text-3xl">{profile.icon}</div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.className}`}>{cat.label}</span>
              </div>

              <h3 className="font-semibold text-foreground mt-3">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.os}</p>

              <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><HardDrive className="w-3.5 h-3.5" /><span>{profile.ram}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Cpu className="w-3.5 h-3.5" /><span>{profile.cpu}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Wifi className="w-3.5 h-3.5" /><span>{profile.networkCondition}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Gauge className="w-3.5 h-3.5" /><span>{profile.delayFactor}x delay</span></div>
              </div>
            </div>
          );
        })}
      </div>

      <NewDeviceDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}
