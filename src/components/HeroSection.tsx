import { ArrowRight, Code2, Terminal, Heart, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="grounded-section relative w-full overflow-hidden py-16 md:py-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--glint)/0.5)] to-transparent"
        aria-hidden="true"
      />
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Status Badge */}
          <div>
            <Badge
              variant="secondary"
              className="grounded-kicker px-4 py-1.5 text-sm font-medium text-muted-foreground"
            >
              <span className="mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[hsl(var(--hero-gradient-via))] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--hero-gradient-via))]"></span>
              </span>
              Available for freelance &amp; consulting
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-5xl font-sans text-4xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="sr-only">
              Andrew Riefenstahl — Full-Stack Engineer & AI Architect —{" "}
            </span>
            Forging the Future of <br className="hidden sm:block" />
            <span className="grounded-gradient-text">Digital Intelligence</span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I&apos;m <strong>Andrew Riefenstahl</strong> — senior software engineer
            and AI specialist. I build resilient systems and write about where
            AI and humanity meet.
          </p>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="grounded-button-primary h-12 min-w-[160px] rounded-full text-base font-semibold transition-all hover:-translate-y-0.5"
            >
              <a href="#projects">
                Explore Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="grounded-button-outline h-12 min-w-[160px] rounded-full text-base transition-all hover:-translate-y-0.5 hover:text-foreground"
            >
              <a href="/posts/">
                Read Insights
                <Terminal className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Tech Stack / "Flare" Visual - Floating Cards */}
          <h2 className="sr-only">Core focus areas</h2>
          <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Card 1: Engineering */}
            <div className="grounded-panel group rounded-lg p-8 text-left transition-all duration-300 hover:-translate-y-1">
              <div className="grounded-icon mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="relative mb-2 text-xl font-bold text-foreground">
                Engineering
              </h3>
              <p className="relative text-muted-foreground">
                Scalable architectures, automation, and robust full-stack
                systems.
              </p>
            </div>

            {/* Card 2: Writing & Ideas */}
            <div className="grounded-panel group rounded-lg p-8 text-left transition-all duration-300 hover:-translate-y-1">
              <div className="grounded-icon mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <PenLine className="h-6 w-6" />
              </div>
              <h3 className="relative mb-2 text-xl font-bold text-foreground">
                Writing &amp; Ideas
              </h3>
              <p className="relative text-muted-foreground">
                Long-form thinking on AI, work, and technology&apos;s place in
                people&apos;s lives.
              </p>
            </div>

            {/* Card 3: Human-first AI */}
            <div className="grounded-panel group rounded-lg p-8 text-left transition-all duration-300 hover:-translate-y-1">
              <div className="grounded-icon mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="relative mb-2 text-xl font-bold text-foreground">
                Human-first AI
              </h3>
              <p className="relative text-muted-foreground">
                Agents, RAG, and MCP tooling built to reduce friction — not
                replace people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
