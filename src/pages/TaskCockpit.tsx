import { useState } from "react";
import { ChevronDown, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Types
interface Subtask {
  id: string;
  label: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
}

interface Category {
  id: string;
  name: string;
  tasks: Task[];
}

// Initial Data
const INITIAL_DATA: Category[] = [
  {
    id: "cat-1",
    name: "Planning & Focus",
    tasks: [
      {
        id: "task-1",
        title: "Define key responsibilities",
        description: "Capture what really matters for this role.",
        subtasks: [
          { id: "st-1", label: "List top 3–5 responsibilities", completed: false },
          { id: "st-2", label: "Clarify ownership and scope", completed: false },
          { id: "st-3", label: "Confirm with stakeholders", completed: false }
        ]
      },
      {
        id: "task-2",
        title: "Write role summary",
        description: "Summarize impact in 2–3 sentences.",
        subtasks: [
          { id: "st-1", label: "Outline mission of the role", completed: false },
          { id: "st-2", label: "Describe main outcomes", completed: false }
        ]
      }
    ]
  },
  {
    id: "cat-2",
    name: "Execution & Review",
    tasks: [
      {
        id: "task-3",
        title: "Break work into task categories",
        description: "Group recurring workflows into categories.",
        subtasks: [
          { id: "st-1", label: "Collect all recurring tasks", completed: false },
          { id: "st-2", label: "Cluster by theme", completed: false },
          { id: "st-3", label: "Name the categories", completed: false }
        ]
      }
    ]
  }
];

// Robotic chime with square wave
const playRoboticChime = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [440, 660, 990];
    let startTime = audioContext.currentTime;

    notes.forEach((frequency) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = 'square';
      oscillator.frequency.value = frequency;

      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.25);

      startTime += 0.25;
    });
  } catch (e) {
    console.log('Audio not available');
  }
};

// Robotic voice
const speakRobotic = (text: string) => {
  try {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.6;
      utterance.rate = 1.15;
      utterance.volume = 0.6;

      // Try to find a robotic voice
      const voices = window.speechSynthesis.getVoices();
      const robotVoice = voices.find(v => 
        v.name.toLowerCase().includes('robot') || 
        v.name.toLowerCase().includes('zarvox') ||
        v.name.toLowerCase().includes('siri')
      );
      if (robotVoice) utterance.voice = robotVoice;

      window.speechSynthesis.speak(utterance);
    }
  } catch (e) {
    console.log('Speech synthesis not available');
  }
};

// Simple click sound
const playClick = (frequency: number) => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.log('Audio not available');
  }
};

export default function iOSTaskFlow() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(INITIAL_DATA);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    responsibilities: false,
    summary: false,
    tasks: true,
  });
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [completionToast, setCompletionToast] = useState<{ show: boolean; taskTitle: string }>({
    show: false,
    taskTitle: "",
  });

  // Calculate overall progress (TASK-BASED)
  const calculateProgress = () => {
    let totalTasks = 0;
    let completedTasks = 0;

    categories.forEach(cat => {
      cat.tasks.forEach(task => {
        totalTasks++;
        const allSubtasksComplete = task.subtasks.every(st => st.completed);
        if (allSubtasksComplete) completedTasks++;
      });
    });

    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  const overallPercent = calculateProgress();

  // REVERSED Progress Level Logic
  const getProgressLevel = () => {
    if (overallPercent === 0) return { level: "Low", color: "text-red-400" };
    if (overallPercent === 100) return { level: "High", color: "text-green-400" };
    return { level: "Medium", color: "text-amber-400" };
  };

  const progressLevel = getProgressLevel();

  // Toggle handlers
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    playClick(800);
  };

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
    playClick(600);
  };

  const toggleSubtask = (categoryId: string, taskId: string, subtaskId: string) => {
    setCategories(prev => {
      const newCategories = prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          tasks: cat.tasks.map(task => {
            if (task.id !== taskId) return task;
            
            const wasComplete = task.subtasks.every(st => st.completed);
            
            const newTask = {
              ...task,
              subtasks: task.subtasks.map(st => {
                if (st.id !== subtaskId) return st;
                return { ...st, completed: !st.completed };
              }),
            };

            const nowComplete = newTask.subtasks.every(st => st.completed);

            // If task just became complete
            if (!wasComplete && nowComplete) {
              playRoboticChime();
              setTimeout(() => {
                speakRobotic(`Nice work. ${task.title} is now complete.`);
              }, 100);
              setCompletionToast({ show: true, taskTitle: task.title });
              setTimeout(() => {
                setCompletionToast({ show: false, taskTitle: "" });
              }, 3200);
            } else {
              playClick(500);
            }

            return newTask;
          }),
        };
      });
      return newCategories;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(215,40%,8%)] via-[hsl(215,35%,12%)] to-[hsl(215,40%,8%)] py-8 px-4">
      {/* Back button */}
      <div className="max-w-md mx-auto mb-4">
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
      <div className="max-w-md mx-auto bg-[hsl(215,25%,12%)]/80 backdrop-blur-xl rounded-[2.25rem] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-6">
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
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl shadow-lg">
            ⚙️
          </div>
        </div>

        {/* Overall Progress Panel */}
        <div className="mb-6 p-5 rounded-3xl bg-card/40 backdrop-blur-sm border border-border/30">
          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Overall Progress
              </div>
              <div className="text-xs text-muted-foreground/80">
                Live roll-up of all tasks in this workspace
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

          {/* Progress Level Card */}
          <div className="p-4 rounded-2xl bg-background/30 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              {/* Circular gradient badge */}
              <div className="relative w-16 h-16 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted/30"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="2"
                    strokeDasharray={`${overallPercent} 100`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(0, 70%, 50%)" />
                      <stop offset="50%" stopColor="hsl(45, 90%, 55%)" />
                      <stop offset="100%" stopColor="hsl(120, 60%, 50%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                  {progressLevel.level}
                </div>
              </div>

              {/* Progress level text */}
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-1">Progress level</div>
                <div className={`text-lg font-bold ${progressLevel.color}`}>{progressLevel.level}</div>
                <div className="mt-2 h-1 bg-muted/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 via-amber-400 to-green-400 transition-all duration-500"
                    style={{ width: `${overallPercent}%` }}
                  />
                </div>
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
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category.id} className="rounded-2xl bg-background/20 border border-border/20 overflow-hidden">
                  {/* Category header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-background/10 transition-colors"
                  >
                    <div className="text-left">
                      <div className="font-semibold text-foreground">{category.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {category.tasks.length} {category.tasks.length === 1 ? 'task' : 'tasks'}
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
                    <div className="px-4 pb-4 space-y-3">
                      {category.tasks.map(task => {
                        const completedSubtasks = task.subtasks.filter(st => st.completed).length;
                        const totalSubtasks = task.subtasks.length;
                        const taskPercent = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
                        const isTaskComplete = taskPercent === 100;

                        return (
                          <div 
                            key={task.id} 
                            className={`rounded-2xl bg-background/30 p-4 transition-all duration-300 ${
                              isTaskComplete ? 'border-2 border-green-400/50' : ''
                            }`}
                          >
                            <div className="flex gap-4">
                              {/* Circular progress indicator */}
                              <div className="relative w-16 h-16 shrink-0">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="16"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-muted/30"
                                  />
                                  <circle
                                    cx="18"
                                    cy="18"
                                    r="16"
                                    fill="none"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth="2"
                                    strokeDasharray={`${taskPercent} 100`}
                                    strokeLinecap="round"
                                    className="transition-all duration-500"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                                  {taskPercent}%
                                </div>
                              </div>

                              {/* Task content */}
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className="font-semibold text-foreground">{task.title}</h4>
                                  {isTaskComplete && (
                                    <span className="px-2 py-0.5 rounded-full bg-green-400/20 text-green-400 text-xs font-medium">
                                      Done
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mb-3">{task.description}</p>

                                {/* Subtasks with escalier effect */}
                                <div className="space-y-1">
                                  {task.subtasks.map((subtask, index) => (
                                    <label
                                      key={subtask.id}
                                      className={`flex items-center gap-3 p-2 rounded-lg hover:bg-background/20 cursor-pointer group transition-all duration-300 ${
                                        subtask.completed 
                                          ? 'translate-x-[-12px] bg-green-400/5 border-l-2 border-green-400' 
                                          : ''
                                      } ${index > 0 ? 'ml-3' : ''}`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={subtask.completed}
                                        onChange={() => toggleSubtask(category.id, task.id, subtask.id)}
                                        className="w-4 h-4 rounded border-2 border-primary/50 checked:bg-primary checked:border-primary transition-all accent-primary"
                                      />
                                      <span
                                        className={`text-sm transition-all ${
                                          subtask.completed
                                            ? "line-through text-muted-foreground"
                                            : "text-foreground group-hover:text-primary"
                                        }`}
                                      >
                                        {subtask.label}
                                      </span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      {/* Completion Toast */}
      {completionToast.show && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-card/90 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl p-4 flex items-center gap-4 max-w-md">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Task complete</div>
              <div className="text-sm text-muted-foreground">
                "{completionToast.taskTitle}" is 100% done. Nice escalation!
              </div>
            </div>
          </div>
        </div>
      )}
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
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-5 pt-0">{children}</div>
      </div>
    </div>
  );
}
