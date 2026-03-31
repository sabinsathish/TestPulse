import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import {
  type Project,
  type TestRun,
  type DeviceProfile,
  demoProjects,
  demoTestRuns,
  deviceProfiles as defaultDeviceProfiles,
  demoTestSteps,
  type TestStep,
} from "@/lib/demo-data";

interface AppState {
  projects: Project[];
  testRuns: TestRun[];
  deviceProfiles: DeviceProfile[];
  addProject: (p: Omit<Project, "id" | "totalRuns" | "passRate" | "lastRun" | "status">) => void;
  deleteProject: (id: string) => void;
  addTestRun: (run: Omit<TestRun, "id">) => string;
  updateTestRun: (id: string, updates: Partial<TestRun>) => void;
  addDeviceProfile: (dp: Omit<DeviceProfile, "id">) => void;
  deleteDeviceProfile: (id: string) => void;
  simulateTestRun: (projectId: string, profileId: string, framework: "maestro" | "appium") => void;
}

const AppContext = createContext<AppState | null>(null);

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

let idCounter = 100;
const genId = (prefix: string) => `${prefix}-${++idCounter}`;

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [testRuns, setTestRuns] = useState<TestRun[]>(demoTestRuns);
  const [deviceProfilesList, setDeviceProfiles] = useState<DeviceProfile[]>(defaultDeviceProfiles);

  const addProject = useCallback((p: Omit<Project, "id" | "totalRuns" | "passRate" | "lastRun" | "status">) => {
    const newProject: Project = {
      ...p,
      id: genId("proj"),
      totalRuns: 0,
      passRate: 0,
      lastRun: new Date().toISOString(),
      status: "active",
    };
    setProjects((prev) => [newProject, ...prev]);
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setTestRuns((prev) => prev.filter((r) => r.projectId !== id));
  }, []);

  const addTestRun = useCallback((run: Omit<TestRun, "id">) => {
    const id = genId("run");
    const newRun: TestRun = { ...run, id };
    setTestRuns((prev) => [newRun, ...prev]);
    return id;
  }, []);

  const updateTestRun = useCallback((id: string, updates: Partial<TestRun>) => {
    setTestRuns((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  }, []);

  const addDeviceProfile = useCallback((dp: Omit<DeviceProfile, "id">) => {
    setDeviceProfiles((prev) => [...prev, { ...dp, id: genId("dp") }]);
  }, []);

  const deleteDeviceProfile = useCallback((id: string) => {
    setDeviceProfiles((prev) => prev.filter((dp) => dp.id !== id));
  }, []);

  // Simulates a test run with step-by-step progress
  const simulateTestRun = useCallback(
    (projectId: string, profileId: string, framework: "maestro" | "appium") => {
      const profile = deviceProfilesList.find((dp) => dp.id === profileId);
      const project = projects.find((p) => p.id === projectId);
      if (!profile || !project) return;

      const totalTests = 12 + Math.floor(Math.random() * 12);
      const runId = genId("run");

      const newRun: TestRun = {
        id: runId,
        projectId,
        profileId,
        profileName: profile.name,
        framework,
        status: "running",
        totalTests,
        passedTests: 0,
        failedTests: 0,
        executionTime: 0,
        startedAt: new Date().toISOString(),
        appVersion: project.version,
      };

      setTestRuns((prev) => [newRun, ...prev]);

      // Simulate progress over time
      const delayBase = 800;
      let step = 0;
      let passed = 0;
      let failed = 0;
      const startTime = Date.now();

      const interval = setInterval(() => {
        step++;
        // ~85% pass rate, worse on higher delay factors
        const failChance = 0.1 + (profile.delayFactor - 1) * 0.08;
        if (Math.random() < failChance) {
          failed++;
        } else {
          passed++;
        }

        if (step >= totalTests) {
          clearInterval(interval);
          const executionTime = Date.now() - startTime;
          const suggestions: string[] = [];
          if (failed > 0 && profile.delayFactor > 2) {
            suggestions.push(`High failure rate on ${profile.name} — consider optimizing for low-spec devices.`);
          }
          if (executionTime > 15000) {
            suggestions.push("Execution time exceeds 15s — review slow test steps.");
          }
          if (profile.category === "poor-network") {
            suggestions.push("Network-related timeouts detected. Implement retry logic or offline caching.");
          }

          setTestRuns((prev) =>
            prev.map((r) =>
              r.id === runId
                ? {
                    ...r,
                    status: failed > 0 ? "failed" : "passed",
                    passedTests: passed,
                    failedTests: failed,
                    executionTime,
                    suggestions: suggestions.length > 0 ? suggestions : ["All tests passed successfully."],
                  }
                : r
            )
          );

          // Update project stats
          setProjects((prev) =>
            prev.map((p) => {
              if (p.id !== projectId) return p;
              const projectRuns = [...(prev === projects ? testRuns : [])].filter(
                (r) => r.projectId === projectId
              );
              return {
                ...p,
                totalRuns: p.totalRuns + 1,
                lastRun: new Date().toISOString(),
                passRate: Math.round(((passed / totalTests) * 100 + p.passRate * p.totalRuns) / (p.totalRuns + 1)),
              };
            })
          );
        } else {
          setTestRuns((prev) =>
            prev.map((r) =>
              r.id === runId ? { ...r, passedTests: passed, failedTests: failed } : r
            )
          );
        }
      }, delayBase * profile.delayFactor * (0.5 + Math.random()));
    },
    [deviceProfilesList, projects, testRuns]
  );

  return (
    <AppContext.Provider
      value={{
        projects,
        testRuns,
        deviceProfiles: deviceProfilesList,
        addProject,
        deleteProject,
        addTestRun,
        updateTestRun,
        addDeviceProfile,
        deleteDeviceProfile,
        simulateTestRun,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
