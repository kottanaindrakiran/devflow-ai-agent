import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CodeInputProps {
  code: string;
  error: string;
  onCodeChange: (value: string) => void;
  onErrorChange: (value: string) => void;
  showError: boolean;
}

const CodeInput = ({ code, error, onCodeChange, onErrorChange, showError }: CodeInputProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code" className="text-sm font-medium text-foreground">
          Code Input
        </Label>
        <Textarea
          id="code"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="// Paste your code here..."
          className="min-h-[300px] font-mono text-sm bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none scrollbar-thin"
        />
      </div>

      {showError && (
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="error" className="text-sm font-medium text-foreground">
            Error Message (optional)
          </Label>
          <Input
            id="error"
            value={error}
            onChange={(e) => onErrorChange(e.target.value)}
            placeholder="Paste error message or stack trace..."
            className="font-mono text-sm bg-muted/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          />
        </div>
      )}
    </div>
  );
};

export default CodeInput;
