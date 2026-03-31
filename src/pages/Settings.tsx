import { Shield, Key, Bell, Palette, Globe, User } from "lucide-react";

const settingSections = [
  {
    title: "Account",
    icon: User,
    items: [
      { label: "Display Name", value: "Demo User", type: "text" },
      { label: "Email", value: "demo@testpulse.io", type: "text" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { label: "Two-Factor Authentication", value: "Enabled", type: "badge" },
      { label: "Session Timeout", value: "30 minutes", type: "text" },
    ],
  },
  {
    title: "API Keys",
    icon: Key,
    items: [
      { label: "API Key", value: "tp_live_••••••••••••k9xZ", type: "mono" },
      { label: "Webhook URL", value: "https://hooks.testpulse.io/v1/events", type: "mono" },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Test failure alerts", value: "Email + In-app", type: "text" },
      { label: "Weekly digest", value: "Enabled", type: "badge" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {settingSections.map((section) => (
        <div key={section.title} className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <section.icon className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
          </div>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                {item.type === "badge" ? (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-success/10 text-success">
                    {item.value}
                  </span>
                ) : item.type === "mono" ? (
                  <code className="text-xs bg-secondary px-2.5 py-1 rounded-lg text-foreground/70 font-mono">
                    {item.value}
                  </code>
                ) : (
                  <span className="text-sm text-foreground">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
