import { useState, useEffect } from "react";
import { ChevronDown, ArrowLeft, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Types
interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  subtasks: Subtask[];
}

interface Category {
  id: string;
  title: string;
  icon: string;
  tasks: Task[];
}

// Audio feedback
const playSound = (frequency: number, duration: number) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (e) {
    console.log('Audio not available');
  }
};

const speak = (text: string) => {
  try {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.2;
      utterance.pitch = 1;
      utterance.volume = 0.5;
      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.log('Speech synthesis not available');
  }
};

// Initial data
const initialCategories: Category[] = [
  {
    id: "cat1",
    title: "Feature Development",
    icon: "⚡",
    tasks: [
      {
        id: "task1",
        title: "User Authentication System",
        subtasks: [
          { id: "st1", title: "Design login UI", completed: true },
          { id: "st2", title: "Implement OAuth flow", completed: true },
          { id: "st3", title: "Add password reset", completed: false },
          { id: "st4", title: "Write unit tests", completed: false },
        ],
      },
      {
        id: "task2",
        title: "Dashboard Analytics",
        subtasks: [
          { id: "st5", title: "Create chart components", completed: true },
          { id: "st6", title: "Integrate data API", completed: false },
          { id: "st7", title: "Add export feature", completed: false },
        ],
      },
    ],
  },
  {
    id: "cat2",
    title: "Code Quality",
    icon: "🎯",
    tasks: [
      {
        id: "task3",
        title: "Testing & Coverage",
        subtasks: [
          { id: "st8", title: "Set up Jest config", completed: true },
          { id: "st9", title: "Write integration tests", completed: false },
          { id: "st10", title: "Achieve 80% coverage", completed: false },
        ],
      },
      {
        id: "task4",
        title: "Code Reviews",
        subtasks: [
          { id: "st11", title: "Review PR #234", completed: true },
          { id: "st12", title: "Review PR #235", completed: false },
        ],
      },
    ],
  },
  {
    id: "cat3",
    title: "Documentation",
    icon: "📚",
    tasks: [
      {
        id: "task5",
        title: "API Documentation",
        subtasks: [
          { id: "st13", title: "Document endpoints", completed: true },
          { id: "st14", title: "Add usage examples", completed: false },
          { id: "st15", title: "Create Postman collection", completed: false },
        ],
      },
    ],
  },
];

export default function TaskCockpit() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    responsibilities: false,
    summary: false,
    tasks: true,
  });
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [openTasks, setOpenTasks] = useState<Record<string, boolean>>({});

  // Calculate overall progress
  const calculateProgress = () => {
    let totalSubtasks = 0;
    let completedSubtasks = 0;

    categories.forEach(cat => {
      cat.tasks.forEach(task => {
        task.subtasks.forEach(subtask => {
          totalSubtasks++;
          if (subtask.completed) completedSubtasks++;
        });
      });
    });

    return totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
  };

  const overallPercent = calculateProgress();

  // Risk level
  const getRiskLevel = () => {
    if (overallPercent >= 80) return { level: "Low", color: "text-green-400" };
    if (overallPercent >= 50) return { level: "Medium", color: "text-amber-400" };
    return { level: "High", color: "text-red-400" };
  };

  const risk = getRiskLevel();

  // KPIs
  const kpis = {
    featuresCompletion: overallPercent,
    developmentCompletion: Math.max(0, Math.min(100, overallPercent - 5)),
    testingCompletion: Math.max(0, Math.min(100, overallPercent + 10)),
    criticalDefects: Math.round((100 - overallPercent) / 20),
    highImportanceDefects: Math.round((100 - overallPercent) / 2),
  };

  // Toggle handlers
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    playSound(800, 0.1);
  };

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
    playSound(600, 0.1);
  };

  const toggleTask = (taskId: string) => {
    setOpenTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
    playSound(500, 0.1);
  };

  const toggleSubtask = (categoryId: string, taskId: string, subtaskId: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id !== categoryId) return cat;
      return {
        ...cat,
        tasks: cat.tasks.map(task => {
          if (task.id !== taskId) return task;
          return {
            ...task,
            subtasks: task.subtasks.map(st => {
              if (st.id !== subtaskId) return st;
              const newCompleted = !st.completed;
              
              // Audio & voice feedback
              if (newCompleted) {
                playSound(1000, 0.15);
                speak("Task completed");
              } else {
                playSound(400, 0.15);
              }
              
              return { ...st, completed: newCompleted };
            }),
          };
        }),
      };
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(215,40%,8%)] via-[hsl(215,35%,12%)] to-[hsl(215,40%,8%)] py-8 px-4">
      {/* Back button */}
      <div className="max-w-[430px] mx-auto mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* Main container */}
      <div className="max-w-[430px] mx-auto bg-[hsl(215,25%,12%)]/80 backdrop-blur-xl rounded-[2.25rem] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
              Role cockpit
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Responsibilities & Tasks
            </h1>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl animate-pulse shadow-[var(--shadow-glow)]">
            ⚙️
          </div>
        </div>

        {/* Overall Progress Ribbon */}
        <div className="mb-6 p-5 rounded-3xl bg-card/40 backdrop-blur-sm border border-border/30">
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Overall Progress
              </div>
              <div className="text-xs text-muted-foreground/80">
                Live roll-up of all subtasks in this workspace
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Total completion
              </div>
              <div className="text-3xl font-bold text-primary">
                {overallPercent}%
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Risk gauge card */}
            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-background/30 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                {/* Circular gauge */}
                <div className="relative w-16 h-16 shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    {/* Background ring */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-muted/30"
                    />
                    {/* Progress ring */}
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="2"
                      strokeDasharray={`${overallPercent} 100`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(0, 70%, 50%)" />
                        <stop offset="50%" stopColor="hsl(45, 90%, 55%)" />
                        <stop offset="100%" stopColor="hsl(120, 60%, 50%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                    {risk.level}
                  </div>
                </div>

                {/* Risk level text */}
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Risk level</div>
                  <div className={`text-lg font-bold ${risk.color}`}>{risk.level}</div>
                  <div className="mt-2 h-1 bg-muted/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 via-amber-400 to-red-400 transition-all duration-500"
                      style={{ width: `${overallPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* KPI tiles */}
            <div className="col-span-2 sm:col-span-1 grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-background/30 backdrop-blur-sm">
                <div className="text-xl font-bold text-primary">{kpis.featuresCompletion}%</div>
                <div className="text-[10px] text-muted-foreground">Features Completion</div>
              </div>
              <div className="p-3 rounded-xl bg-background/30 backdrop-blur-sm">
                <div className="text-xl font-bold text-secondary">{kpis.developmentCompletion}%</div>
                <div className="text-[10px] text-muted-foreground">Dev Completion</div>
              </div>
              <div className="p-3 rounded-xl bg-background/30 backdrop-blur-sm">
                <div className="text-xl font-bold text-accent">{kpis.testingCompletion}%</div>
                <div className="text-[10px] text-muted-foreground">Testing</div>
              </div>
              <div className="p-3 rounded-xl bg-background/30 backdrop-blur-sm">
                <div className="text-xl font-bold text-red-400">{kpis.criticalDefects}</div>
                <div className="text-[10px] text-muted-foreground">Critical Defects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {/* Key Responsibilities */}
          <Section
            title="Key responsibilities"
            description="Tap to expand and refine what this role owns"
            isOpen={openSections.responsibilities}
            onToggle={() => toggleSection("responsibilities")}
          >
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Drive outcomes for the team and protect focus time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Keep work visible through structured task categories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Communicate progress clearly to stakeholders</span>
              </li>
            </ul>
          </Section>

          {/* Role Summary */}
          <Section
            title="Role summary"
            description="A quick snapshot of impact and expectations"
            isOpen={openSections.summary}
            onToggle={() => toggleSection("summary")}
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              This workspace connects high-level responsibilities to granular subtasks with live progress tracking 
              and micro-interactions. Each completed subtask updates the overall metrics in real-time, providing 
              clear visibility into team productivity and helping identify potential bottlenecks before they impact delivery.
            </p>
          </Section>

          {/* Task Categories & Subtasks */}
          <Section
            title="Task categories & subtasks"
            description="Expand categories, check subtasks, and watch progress update"
            isOpen={openSections.tasks}
            onToggle={() => toggleSection("tasks")}
          >
            <div className="space-y-3">
              {categories.map(category => {
                const categoryTotal = category.tasks.reduce((sum, t) => sum + t.subtasks.length, 0);
                const categoryCompleted = category.tasks.reduce(
                  (sum, t) => sum + t.subtasks.filter(st => st.completed).length,
                  0
                );
                const categoryPercent = categoryTotal > 0 ? Math.round((categoryCompleted / categoryTotal) * 100) : 0;

                return (
                  <div key={category.id} className="rounded-2xl bg-background/20 border border-border/20 overflow-hidden">
                    {/* Category header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-background/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div className="text-left">
                          <div className="font-semibold text-foreground">{category.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {categoryCompleted}/{categoryTotal} tasks • {categoryPercent}%
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                          openCategories[category.id] ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Category tasks */}
                    {openCategories[category.id] && (
                      <div className="px-4 pb-4 space-y-2">
                        {category.tasks.map(task => {
                          const taskCompleted = task.subtasks.filter(st => st.completed).length;
                          const taskTotal = task.subtasks.length;

                          return (
                            <div key={task.id} className="rounded-xl bg-background/30 overflow-hidden">
                              {/* Task header */}
                              <button
                                onClick={() => toggleTask(task.id)}
                                className="w-full p-3 flex items-center justify-between hover:bg-background/20 transition-colors"
                              >
                                <div className="text-left">
                                  <div className="text-sm font-medium text-foreground">{task.title}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {taskCompleted}/{taskTotal} complete
                                  </div>
                                </div>
                                <ChevronDown
                                  className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                                    openTasks[task.id] ? "rotate-180" : ""
                                  }`}
                                />
                              </button>

                              {/* Subtasks */}
                              {openTasks[task.id] && (
                                <div className="px-3 pb-3 space-y-1">
                                  {task.subtasks.map(subtask => (
                                    <label
                                      key={subtask.id}
                                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-background/20 cursor-pointer group transition-colors"
                                    >
                                      <input
                                        type="checkbox"
                                        checked={subtask.completed}
                                        onChange={() => toggleSubtask(category.id, task.id, subtask.id)}
                                        className="w-5 h-5 rounded-md border-2 border-primary/50 checked:bg-primary checked:border-primary transition-all accent-primary"
                                      />
                                      <span
                                        className={`text-sm transition-all ${
                                          subtask.completed
                                            ? "line-through text-muted-foreground"
                                            : "text-foreground group-hover:text-primary"
                                        }`}
                                      >
                                        {subtask.title}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>
        </div>

        {/* Sound toggle */}
        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={() => speak("Audio feedback enabled")}
            className="p-2 rounded-lg bg-background/20 hover:bg-background/30 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable Section Component
interface SectionProps {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function Section({ title, description, isOpen, onToggle, children }: SectionProps) {
  return (
    <div className="rounded-2xl bg-card/40 backdrop-blur-sm border border-border/30 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between hover:bg-background/10 transition-colors"
      >
        <div className="text-left">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-background/20 flex items-center justify-center shrink-0">
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-5 pt-0">{children}</div>
      </div>
    </div>
  );
}
