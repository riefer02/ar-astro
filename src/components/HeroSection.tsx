import { ArrowRight, Brain, Code2, Terminal, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background py-16 md:py-32">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Status Badge */}
          <div>
            <Badge
              variant="secondary"
              className="border border-border bg-card/80 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm"
            >
              <span className="mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              System Online & Ready
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-5xl font-sans text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl">
            <span className="sr-only">
              Andrew Riefenstahl — Full-Stack Engineer & AI Architect —{" "}
            </span>
            Forging the Future of <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[hsl(var(--hero-gradient-from))] via-[hsl(var(--hero-gradient-via))] to-[hsl(var(--hero-gradient-to))] bg-clip-text text-transparent drop-shadow-[0_6px_20px_hsl(var(--hero-gradient-to)/0.35)]">
              Digital Intelligence
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            I&apos;m <strong>Andrew Riefenstahl</strong>. Senior software engineer and AI
            specialist. I build resilient systems and explore the intersection
            of human cognition and artificial intelligence.
          </p>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 min-w-[160px] rounded-full text-base font-semibold shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:bg-primary"
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
              className="h-12 min-w-[160px] rounded-full border-border bg-card/60 text-base transition-all hover:bg-card hover:text-foreground"
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
            {/* Card 1: Senior Engineering */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-left shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Senior Engineering
              </h3>
              <p className="text-muted-foreground">
                Scalable architectures, automation pipelines, and robust full-stack solutions.
              </p>
            </div>

            {/* Card 2: AI & Future Tech */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-left shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                AI Innovation
              </h3>
              <p className="text-muted-foreground">
                Building autonomous agents, memory systems, and RAG pipelines for complex problems.
              </p>
            </div>

            {/* Card 3: Leadership & Ethics */}
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-left shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Leadership & Ethics
              </h3>
              <p className="text-muted-foreground">
                Solution-oriented mentorship with a focus on sustainable, human-centric tech.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
