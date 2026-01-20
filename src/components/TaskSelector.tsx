import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code2, Bug, FileSearch, FileText } from "lucide-react";

export type TaskType = "explain" | "debug" | "review" | "summarize";

interface TaskSelectorProps {
  value: TaskType;
  onChange: (value: TaskType) => void;
}

const tasks = [
  { value: "explain" as const, label: "Explain Code", icon: Code2, description: "Understand what code does" },
  { value: "debug" as const, label: "Debug Error", icon: Bug, description: "Find and fix issues" },
  { value: "review" as const, label: "Review Code", icon: FileSearch, description: "Get quality feedback" },
  { value: "summarize" as const, label: "Summarize Logic", icon: FileText, description: "High-level overview" },
];

const TaskSelector = ({ value, onChange }: TaskSelectorProps) => {
  const selectedTask = tasks.find((t) => t.value === value);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Select Task</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-primary/20">
          <SelectValue>
            {selectedTask && (
              <div className="flex items-center gap-2">
                <selectedTask.icon className="w-4 h-4 text-primary" />
                <span>{selectedTask.label}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          {tasks.map((task) => (
            <SelectItem
              key={task.value}
              value={task.value}
              className="cursor-pointer focus:bg-muted"
            >
              <div className="flex items-center gap-3 py-1">
                <task.icon className="w-4 h-4 text-primary" />
                <div>
                  <div className="font-medium">{task.label}</div>
                  <div className="text-xs text-muted-foreground">{task.description}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TaskSelector;
