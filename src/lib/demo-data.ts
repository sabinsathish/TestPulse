// Demo data for the mobile testing SaaS platform

export interface Project {
  id: string;
  name: string;
  appName: string;
  platform: "android" | "ios" | "cross-platform";
  packageId: string;
  version: string;
  totalRuns: number;
  passRate: number;
  lastRun: string;
  status: "active" | "archived";
}

export interface DeviceProfile {
  id: string;
  name: string;
  category: "high-end" | "mid-range" | "low-end" | "tablet" | "poor-network" | "low-memory";
  os: string;
  ram: string;
  cpu: string;
  networkCondition: string;
  delayFactor: number;
  icon: string;
}

export interface TestRun {
  id: string;
  projectId: string;
  profileId: string;
  profileName: string;
  framework: "maestro" | "appium";
  status: "passed" | "failed" | "running" | "queued";
  totalTests: number;
  passedTests: number;
  failedTests: number;
  executionTime: number; // ms
  startedAt: string;
  appVersion: string;
  logs?: string[];
  suggestions?: string[];
}

export interface TestStep {
  id: string;
  name: string;
  status: "passed" | "failed" | "skipped";
  duration: number;
  error?: string;
}

export const demoProjects: Project[] = [
  {
    id: "proj-1",
    name: "ShopEasy Mobile",
    appName: "ShopEasy",
    platform: "android",
    packageId: "com.shopeasy.app",
    version: "2.4.1",
    totalRuns: 128,
    passRate: 94.5,
    lastRun: "2026-03-31T10:30:00Z",
    status: "active",
  },
  {
    id: "proj-2",
    name: "FitTrack Health",
    appName: "FitTrack",
    platform: "ios",
    packageId: "com.fittrack.health",
    version: "1.8.0",
    totalRuns: 76,
    passRate: 88.2,
    lastRun: "2026-03-30T15:45:00Z",
    status: "active",
  },
  {
    id: "proj-3",
    name: "QuickChat Messenger",
    appName: "QuickChat",
    platform: "cross-platform",
    packageId: "com.quickchat.app",
    version: "3.1.2",
    totalRuns: 234,
    passRate: 91.0,
    lastRun: "2026-03-31T08:15:00Z",
    status: "active",
  },
];

export const deviceProfiles: DeviceProfile[] = [
  {
    id: "dp-1",
    name: "Pixel 8 Pro",
    category: "high-end",
    os: "Android 14",
    ram: "12 GB",
    cpu: "Tensor G3",
    networkCondition: "4G LTE",
    delayFactor: 1.0,
    icon: "📱",
  },
  {
    id: "dp-2",
    name: "Samsung A14",
    category: "mid-range",
    os: "Android 13",
    ram: "4 GB",
    cpu: "Exynos 850",
    networkCondition: "4G",
    delayFactor: 1.5,
    icon: "📱",
  },
  {
    id: "dp-3",
    name: "Redmi 9A",
    category: "low-end",
    os: "Android 12",
    ram: "2 GB",
    cpu: "Helio G25",
    networkCondition: "3G",
    delayFactor: 2.5,
    icon: "📱",
  },
  {
    id: "dp-4",
    name: "iPad Air",
    category: "tablet",
    os: "iPadOS 17",
    ram: "8 GB",
    cpu: "M1",
    networkCondition: "WiFi",
    delayFactor: 1.0,
    icon: "📟",
  },
  {
    id: "dp-5",
    name: "Sim: Poor Network",
    category: "poor-network",
    os: "Android 13",
    ram: "6 GB",
    cpu: "Snapdragon 680",
    networkCondition: "2G / Edge",
    delayFactor: 4.0,
    icon: "📶",
  },
  {
    id: "dp-6",
    name: "Sim: Low Memory",
    category: "low-memory",
    os: "Android 12",
    ram: "1 GB",
    cpu: "MT6739",
    networkCondition: "3G",
    delayFactor: 3.0,
    icon: "💾",
  },
];

export const demoTestRuns: TestRun[] = [
  {
    id: "run-1",
    projectId: "proj-1",
    profileId: "dp-1",
    profileName: "Pixel 8 Pro",
    framework: "maestro",
    status: "passed",
    totalTests: 24,
    passedTests: 24,
    failedTests: 0,
    executionTime: 45200,
    startedAt: "2026-03-31T10:30:00Z",
    appVersion: "2.4.1",
    suggestions: ["All tests passed. App performs optimally on high-end devices."],
  },
  {
    id: "run-2",
    projectId: "proj-1",
    profileId: "dp-3",
    profileName: "Redmi 9A",
    framework: "maestro",
    status: "failed",
    totalTests: 24,
    passedTests: 19,
    failedTests: 5,
    executionTime: 112800,
    startedAt: "2026-03-31T09:15:00Z",
    appVersion: "2.4.1",
    suggestions: [
      "Execution time is 2.5x higher on low-end profile.",
      "5 tests failed due to timeout — consider optimizing image loading.",
      "Memory usage spikes detected during checkout flow.",
    ],
  },
  {
    id: "run-3",
    projectId: "proj-1",
    profileId: "dp-5",
    profileName: "Sim: Poor Network",
    framework: "maestro",
    status: "failed",
    totalTests: 24,
    passedTests: 16,
    failedTests: 8,
    executionTime: 189400,
    startedAt: "2026-03-31T08:00:00Z",
    appVersion: "2.4.1",
    suggestions: [
      "Test failure rate increases significantly under weak network.",
      "API timeouts on product search and checkout endpoints.",
      "Consider implementing offline caching for critical flows.",
    ],
  },
  {
    id: "run-4",
    projectId: "proj-2",
    profileId: "dp-1",
    profileName: "Pixel 8 Pro",
    framework: "appium",
    status: "passed",
    totalTests: 18,
    passedTests: 18,
    failedTests: 0,
    executionTime: 38500,
    startedAt: "2026-03-30T15:45:00Z",
    appVersion: "1.8.0",
    suggestions: ["All tests passed on high-end profile."],
  },
  {
    id: "run-5",
    projectId: "proj-2",
    profileId: "dp-2",
    profileName: "Samsung A14",
    framework: "appium",
    status: "passed",
    totalTests: 18,
    passedTests: 17,
    failedTests: 1,
    executionTime: 67200,
    startedAt: "2026-03-30T14:20:00Z",
    appVersion: "1.8.0",
    suggestions: ["Minor animation lag on step tracking screen."],
  },
  {
    id: "run-6",
    projectId: "proj-3",
    profileId: "dp-4",
    profileName: "iPad Air",
    framework: "maestro",
    status: "passed",
    totalTests: 30,
    passedTests: 29,
    failedTests: 1,
    executionTime: 52100,
    startedAt: "2026-03-31T08:15:00Z",
    appVersion: "3.1.2",
    suggestions: ["Layout issue on tablet — chat input overlaps toolbar."],
  },
  {
    id: "run-7",
    projectId: "proj-3",
    profileId: "dp-6",
    profileName: "Sim: Low Memory",
    framework: "maestro",
    status: "failed",
    totalTests: 30,
    passedTests: 21,
    failedTests: 9,
    executionTime: 156300,
    startedAt: "2026-03-30T22:00:00Z",
    appVersion: "3.1.2",
    suggestions: [
      "App crashes under low memory when loading media-heavy chats.",
      "Consider lazy loading images in conversation view.",
      "Background service consumes excessive memory.",
    ],
  },
  {
    id: "run-8",
    projectId: "proj-1",
    profileId: "dp-2",
    profileName: "Samsung A14",
    framework: "maestro",
    status: "running",
    totalTests: 24,
    passedTests: 14,
    failedTests: 0,
    executionTime: 0,
    startedAt: "2026-03-31T11:00:00Z",
    appVersion: "2.4.1",
  },
];

export const demoTestSteps: TestStep[] = [
  { id: "s1", name: "Launch application", status: "passed", duration: 2100 },
  { id: "s2", name: "Navigate to login screen", status: "passed", duration: 800 },
  { id: "s3", name: "Enter email credentials", status: "passed", duration: 1200 },
  { id: "s4", name: "Tap login button", status: "passed", duration: 500 },
  { id: "s5", name: "Verify home screen loaded", status: "passed", duration: 3200 },
  { id: "s6", name: "Search for product", status: "passed", duration: 4500 },
  { id: "s7", name: "Add item to cart", status: "passed", duration: 1800 },
  { id: "s8", name: "Navigate to cart", status: "passed", duration: 900 },
  { id: "s9", name: "Begin checkout flow", status: "passed", duration: 2400 },
  { id: "s10", name: "Enter shipping details", status: "passed", duration: 3100 },
  { id: "s11", name: "Select payment method", status: "passed", duration: 1500 },
  { id: "s12", name: "Confirm order", status: "failed", duration: 8200, error: "Timeout: Payment processing exceeded 8s threshold" },
];

// Chart data
export const weeklyRunsData = [
  { day: "Mon", passed: 12, failed: 3 },
  { day: "Tue", passed: 18, failed: 2 },
  { day: "Wed", passed: 15, failed: 5 },
  { day: "Thu", passed: 22, failed: 1 },
  { day: "Fri", passed: 20, failed: 4 },
  { day: "Sat", passed: 8, failed: 1 },
  { day: "Sun", passed: 6, failed: 0 },
];

export const devicePerformanceData = [
  { device: "Pixel 8 Pro", avgTime: 42, passRate: 100 },
  { device: "Samsung A14", avgTime: 67, passRate: 94 },
  { device: "Redmi 9A", avgTime: 113, passRate: 79 },
  { device: "iPad Air", avgTime: 52, passRate: 97 },
  { device: "Poor Network", avgTime: 189, passRate: 67 },
  { device: "Low Memory", avgTime: 156, passRate: 70 },
];

export const frameworkUsage = [
  { name: "Maestro", value: 65, fill: "hsl(120, 90%, 38%)" },
  { name: "Appium", value: 35, fill: "hsl(150, 40%, 50%)" },
];
