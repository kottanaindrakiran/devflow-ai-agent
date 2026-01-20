import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import TaskSelector, { TaskType } from "@/components/TaskSelector";
import CodeInput from "@/components/CodeInput";
import OutputPanel from "@/components/OutputPanel";
import ColdStartBanner from "@/components/ColdStartBanner";
import ProductContextFooter from "@/components/ProductContextFooter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface OutputSection {
  type: "explanation" | "issues" | "fix" | "summary";
  title: string;
  content: string;
}

// Task-aware panel titles (Improvement #4)
const taskPanelTitles: Record<TaskType, string> = {
  explain: "Code Explanation",
  debug: "Debug Analysis",
  review: "Code Review",
  summarize: "Logic Summary",
};

const AppPage = () => {
  const [task, setTask] = useState<TaskType>("explain");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [sections, setSections] = useState<OutputSection[]>([]);
  const [showColdStartBanner, setShowColdStartBanner] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter some code to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setApiError(null);
    setSections([]);
    setShowColdStartBanner(false);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/agent/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          code,
          error: error || undefined,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // Parse and display the response
      const parsedSections: OutputSection[] = [];

      if (data.explanation) {
        parsedSections.push({
          type: "explanation",
          title: "Explanation",
          content: data.explanation,
        });
      }

      if (data.issues) {
        parsedSections.push({
          type: "issues",
          title: "Issues Found",
          content: data.issues,
        });
      }

      if (data.fix) {
        parsedSections.push({
          type: "fix",
          title: "Suggested Fix",
          content: data.fix,
        });
      }

      if (data.summary) {
        parsedSections.push({
          type: "summary",
          title: "Summary",
          content: data.summary,
        });
      }

      // If no structured response, show raw response
      if (parsedSections.length === 0 && data.response) {
        parsedSections.push({
          type: "explanation",
          title: "AI Response",
          content: data.response,
        });
      }

      setSections(parsedSections);
    } catch (err) {
      let errorMessage = "An unexpected error occurred";

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = "Request timed out. The backend may be starting up.";
          setShowColdStartBanner(true);
        } else if (err.message.includes('fetch') || err.message.includes('network')) {
          errorMessage = "Network error. Please check your connection.";
          setShowColdStartBanner(true);
        } else {
          errorMessage = err.message;
        }
      }

      setApiError(errorMessage);
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Cold Start Banner (Improvement #3) */}
      <ColdStartBanner
        isVisible={showColdStartBanner}
        onDismiss={() => setShowColdStartBanner(false)}
      />

      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground">
                DevFlow <span className="text-primary">AI</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Left Panel */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <TaskSelector value={task} onChange={setTask} />
            </div>

            <div className="glass-card p-6">
              <h3 className="font-semibold text-foreground mb-3">How it works</h3>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    1
                  </span>
                  <span>Select the task type you want to perform</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    2
                  </span>
                  <span>Paste your code (and error if debugging)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                    3
                  </span>
                  <span>Click "Run Agent" and get AI insights</span>
                </li>
              </ol>
            </div>
          </motion.aside>

          {/* Main Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="glass-card p-6"
            >
              <CodeInput
                code={code}
                error={error}
                onCodeChange={setCode}
                onErrorChange={setError}
                showError={task === "debug"}
              />

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !code.trim()}
                  className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary-sm"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Agent
                    </>
                  )}
                </Button>
              </div>
            </motion.div>

            {/* Output Panel with task-aware title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {sections.length > 0 ? taskPanelTitles[task] : "AI Analysis"}
              </h2>
              <OutputPanel
                isLoading={isLoading}
                error={apiError}
                sections={sections}
                task={task}
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Product Context Footer (Improvement #5) */}
      <ProductContextFooter />
    </div>
  );
};

export default AppPage;
