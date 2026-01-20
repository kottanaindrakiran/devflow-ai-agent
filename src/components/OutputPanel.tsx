import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Lightbulb, Code2, Terminal, Zap, CloudOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskType } from "./TaskSelector";

interface OutputSection {
  type: "explanation" | "issues" | "fix" | "summary";
  title: string;
  content: string;
}

interface OutputPanelProps {
  isLoading: boolean;
  error: string | null;
  sections: OutputSection[];
  task: TaskType;
}

const sectionIcons = {
  explanation: Code2,
  issues: AlertCircle,
  fix: CheckCircle,
  summary: Lightbulb,
};

const sectionColors = {
  explanation: "text-primary",
  issues: "text-amber-500",
  fix: "text-emerald-500",
  summary: "text-violet-500",
};

// Task-aware output headings (Improvement #4)
const taskHeadings: Record<TaskType, Record<string, string>> = {
  explain: {
    explanation: "Code Explanation",
    summary: "Key Insights",
  },
  debug: {
    issues: "Issues Found",
    fix: "Suggested Fix",
    explanation: "Error Analysis",
  },
  review: {
    explanation: "Code Review Summary",
    issues: "Improvement Areas",
    fix: "Recommendations",
  },
  summarize: {
    summary: "High-Level Overview",
    explanation: "Logic Breakdown",
  },
};

const LoadingSkeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-20 w-full" />
      </div>
    ))}
  </div>
);

// Improved empty state (Improvement #1)
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="glass-card p-8 min-h-[400px] flex items-center justify-center"
  >
    <div className="text-center max-w-md">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Terminal className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Analyze</h3>
      <p className="text-muted-foreground mb-4">
        Paste your code, select a task, and run the AI agent to begin.
      </p>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-xs font-mono text-muted-foreground">
        <Zap className="w-3 h-3 text-primary" />
        <span>Powered by multi-agent AI reasoning</span>
      </div>
    </div>
  </motion.div>
);

// Improved error state (Improvement #2)
const ErrorState = ({ error }: { error: string }) => {
  const isNetworkError = error.toLowerCase().includes('network') || 
                         error.toLowerCase().includes('timeout') ||
                         error.toLowerCase().includes('fetch');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 min-h-[400px]"
    >
      <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <CloudOff className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">Agent Unavailable</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isNetworkError 
              ? "Unable to reach the AI service. Please check your connection and try again."
              : "The AI agent is temporarily unavailable. Please try again in a few seconds."
            }
          </p>
          <p className="text-xs text-muted-foreground/70 mt-2 font-mono">
            Error: {error}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const OutputPanel = ({ isLoading, error, sections, task }: OutputPanelProps) => {
  if (isLoading) {
    return (
      <div className="glass-card p-6 min-h-[400px]">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">AI is analyzing your code...</span>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (sections.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 min-h-[400px] space-y-6"
    >
      {sections.map((section, index) => {
        const Icon = sectionIcons[section.type];
        const iconColor = sectionColors[section.type];
        // Use task-aware heading if available, otherwise fall back to section title
        const heading = taskHeadings[task]?.[section.type] || section.title;

        return (
          <motion.div
            key={section.type}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <Icon className={`w-5 h-5 ${iconColor}`} />
              <h3 className="font-semibold text-primary">{heading}</h3>
            </div>
            <div className="pl-7 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap font-mono bg-muted/30 rounded-lg p-4">
              {section.content}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default OutputPanel;
