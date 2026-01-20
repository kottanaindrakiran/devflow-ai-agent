import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";

interface ColdStartBannerProps {
  isVisible: boolean;
  onDismiss: () => void;
}

const ColdStartBanner = ({ isVisible, onDismiss }: ColdStartBannerProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-b border-primary/30 bg-primary/5"
        >
          <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">Backend service is starting up</span>
                <span className="hidden sm:inline"> (cold start)</span>
                <span className="text-muted-foreground">. Please wait 10–15 seconds and retry.</span>
              </p>
            </div>
            <button
              onClick={onDismiss}
              className="p-1 rounded-md hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ColdStartBanner;
