import { ArrowRight, Brain, Code2, Terminal, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-stone-50 py-16 md:py-32">
      {/* Abstract Background Shapes for Depth */}
      <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-stone-200/40 blur-[120px]" />
      <div className="absolute -right-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-stone-300/30 blur-[120px]" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Status Badge */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Badge
              variant="secondary"
              className="border border-stone-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-stone-600 shadow-sm backdrop-blur-md"
            >
              <span className="mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              System Online & Ready
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-5xl font-sans text-5xl font-extrabold tracking-tight text-stone-900 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both sm:text-7xl">
            Forging the Future of <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-stone-800 to-stone-500 bg-clip-text text-transparent">
              Digital Intelligence
            </span>
          </h1>

          {/* Subheading */}
          <p className="max-w-2xl text-lg leading-relaxed text-stone-600 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both sm:text-xl">
            I'm <strong>Andrew Riefenstahl</strong>. Senior software engineer and AI
            specialist. I build resilient systems and explore the intersection
            of human cognition and artificial intelligence.
          </p>

          {/* Actions */}
          <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both sm:flex-row">
            <a href="#projects">
              <Button
                size="lg"
                className="h-12 min-w-[160px] rounded-full text-base font-semibold shadow-xl transition-all hover:scale-105 hover:shadow-2xl hover:bg-stone-800"
              >
                Explore Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <a href="/posts">
              <Button
                variant="outline"
                size="lg"
                className="h-12 min-w-[160px] rounded-full border-stone-300 bg-white/60 text-base backdrop-blur-sm transition-all hover:bg-white hover:text-stone-900"
              >
                Read Insights
                <Terminal className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* Tech Stack / "Flare" Visual - Floating Cards */}
          <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both sm:grid-cols-3">
            {/* Card 1: Senior Engineering */}
            <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-8 text-left shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-800 transition-colors group-hover:bg-stone-900 group-hover:text-white">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-stone-900">
                Senior Engineering
              </h3>
              <p className="text-stone-600">
                Scalable architectures, automation pipelines, and robust full-stack solutions.
              </p>
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-stone-100 opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
            </div>

            {/* Card 2: AI & Future Tech */}
            <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-8 text-left shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-800 transition-colors group-hover:bg-stone-900 group-hover:text-white">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-stone-900">
                AI Innovation
              </h3>
              <p className="text-stone-600">
                Building autonomous agents, memory systems, and RAG pipelines for complex problems.
              </p>
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-stone-100 opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
            </div>

            {/* Card 3: Leadership & Ethics */}
            <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-8 text-left shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-800 transition-colors group-hover:bg-stone-900 group-hover:text-white">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-stone-900">
                Leadership & Ethics
              </h3>
              <p className="text-stone-600">
                Solution-oriented mentorship with a focus on sustainable, human-centric tech.
              </p>
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-stone-100 opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
