import { Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ProductContextFooter = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-4 text-xs text-muted-foreground/70">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center gap-1.5 hover:text-primary/70 transition-colors">
            <Sparkles className="w-3 h-3" />
            <span className="font-mono">Multi-Agent AI</span>
          </button>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="max-w-xs text-center bg-card border-border"
        >
          <p className="text-xs">
            DevFlow AI uses multiple AI agents with structured reasoning to analyze code reliably.
          </p>
        </TooltipContent>
      </Tooltip>
      <span className="text-border">•</span>
      <span>Structured reasoning for reliable analysis</span>
    </div>
  );
};

export default ProductContextFooter;
