import { useState } from "react";
import { X } from "lucide-react";
import { useAppState } from "@/context/AppStateContext";
import type { DeviceProfile } from "@/lib/demo-data";

interface NewDeviceDialogProps {
  open: boolean;
  onClose: () => void;
}

const categories: DeviceProfile["category"][] = ["high-end", "mid-range", "low-end", "tablet", "poor-network", "low-memory"];

export default function NewDeviceDialog({ open, onClose }: NewDeviceDialogProps) {
  const { addDeviceProfile } = useAppState();
  const [name, setName] = useState("");
  const [category, setCategory] = useState<DeviceProfile["category"]>("mid-range");
  const [os, setOs] = useState("Android 14");
  const [ram, setRam] = useState("4 GB");
  const [cpu, setCpu] = useState("Snapdragon 680");
  const [network, setNetwork] = useState("4G");
  const [delay, setDelay] = useState("1.5");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addDeviceProfile({
      name: name.trim(),
      category,
      os,
      ram,
      cpu,
      networkCondition: network,
      delayFactor: parseFloat(delay) || 1,
      icon: category === "tablet" ? "📟" : category === "poor-network" ? "📶" : category === "low-memory" ? "💾" : "📱",
    });
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={onClose}>
      <div className="glass-card p-6 w-full max-w-md mx-4 glow-primary max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-foreground">Add Device Profile</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Device Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Samsung Galaxy S24" className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" required />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as DeviceProfile["category"])} className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1.5">OS</label>
              <input value={os} onChange={(e) => setOs(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1.5">RAM</label>
              <input value={ram} onChange={(e) => setRam(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1.5">CPU</label>
              <input value={cpu} onChange={(e) => setCpu(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-1.5">Network</label>
              <input value={network} onChange={(e) => setNetwork(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground block mb-1.5">Delay Factor</label>
            <input type="number" step="0.1" min="0.5" max="10" value={delay} onChange={(e) => setDelay(e.target.value)} className="w-full h-10 px-3 rounded-xl bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/50" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 h-10 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Add Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}
