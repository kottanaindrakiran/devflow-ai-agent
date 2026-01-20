import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github, Code2, Bug, FileSearch, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Powered by Advanced AI Agents</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Understand, Debug, and{" "}
              <span className="gradient-text">Improve Code</span>
              <br />
              Faster with AI
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              DevFlow AI helps engineers explain complex code, debug errors, review quality,
              and summarize logic—all powered by intelligent AI agents.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/app"
                className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-primary"
              >
                Try DevFlow AI
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                <Github className="w-5 h-5" />
                View GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI-Powered Developer Tools
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Four powerful agents working together to help you write better code
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Code2}
              title="Explain Code"
              description="Get clear, detailed explanations of complex code snippets. Understand what each part does and why."
              delay={0}
            />
            <FeatureCard
              icon={Bug}
              title="Debug Errors"
              description="Paste your error messages and code to get intelligent debugging suggestions and fixes."
              delay={0.1}
            />
            <FeatureCard
              icon={FileSearch}
              title="Review Code"
              description="Receive professional code review feedback covering best practices, security, and performance."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center gradient-border"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to accelerate your development?
            </h2>
            <p className="text-muted-foreground mb-8">
              Start using DevFlow AI today and experience the power of AI-assisted coding.
            </p>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all glow-primary"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 DevFlow AI · Designed & developed by Indra Kiran</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
