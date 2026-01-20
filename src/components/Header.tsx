import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-lg text-foreground">
            DevFlow <span className="text-primary">AI</span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <Link
            to="/app"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors glow-primary-sm"
          >
            Launch App
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
