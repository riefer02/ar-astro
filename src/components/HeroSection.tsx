import { ChevronDown, Code2, Brain, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-stone-200/50 bg-gradient-to-br from-stone-50 to-stone-100 py-20 shadow-lg">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-stone-600 blur-xl"></div>
        <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-stone-400 blur-xl"></div>
        <div className="absolute left-1/2 top-1/2 h-24 w-24 rounded-full bg-stone-500 blur-xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Main Heading */}
        <h1 className="mb-6 text-4xl font-bold leading-tight text-stone-900 md:text-6xl">
          Hi, I'm Andrew Riefenstahl
          <span className="mt-2 block text-2xl font-normal text-stone-600 md:text-3xl">
            Developer, Creator, Human
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-stone-700 md:text-xl">
          I build things with code, create music, and think deeply about
          technology's role in our lives. Currently exploring AI agents, memory
          systems, and how we can make software more human-centered.
        </p>

        {/* Key Stats/Highlights */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl border border-stone-200/50 bg-white/60 p-4 backdrop-blur-sm">
            <Brain className="mb-2 h-8 w-8 text-stone-700" />
            <span className="text-sm font-medium text-stone-600">
              AI & Machine Learning
            </span>
            <span className="text-xs text-stone-500">
              LangGraph • Memory Systems
            </span>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-stone-200/50 bg-white/60 p-4 backdrop-blur-sm">
            <Shield className="mb-2 h-8 w-8 text-stone-700" />
            <span className="text-sm font-medium text-stone-600">
              Security & SRE
            </span>
            <span className="text-xs text-stone-500">
              HIPAA • Session Management
            </span>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-stone-200/50 bg-white/60 p-4 backdrop-blur-sm">
            <Code2 className="mb-2 h-8 w-8 text-stone-700" />
            <span className="text-sm font-medium text-stone-600">
              Full-Stack Development
            </span>
            <span className="text-xs text-stone-500">
              React • Next.js • Python
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="#projects" onClick={handleScrollToProjects}>
            <Button
              className="bg-stone-800 px-8 py-3 text-lg text-white transition-all duration-200 hover:bg-stone-900"
              size="lg"
            >
              See My Work
            </Button>
          </a>
          <a href="/posts">
            <Button
              variant="outline"
              className="border-stone-300 px-8 py-3 text-lg text-stone-700 transition-all duration-200 hover:bg-stone-50"
              size="lg"
            >
              Read My Writing
            </Button>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <ChevronDown className="h-6 w-6 animate-bounce text-stone-400" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
