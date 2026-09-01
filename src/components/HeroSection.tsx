import { ArrowRight, Code2, Terminal, Heart, PenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import GroundedButton from "@/components/GroundedButton";
import Hairline from "@/components/Hairline";
import IconChip from "@/components/IconChip";

const focusCards = [
  {
    icon: Code2,
    title: "Engineering",
    description:
      "Scalable architectures, automation, and robust full-stack systems.",
  },
  {
    icon: PenLine,
    title: "Writing & Ideas",
    description:
      "Long-form thinking on AI, work, and technology's place in people's lives.",
  },
  {
    icon: Heart,
    title: "Human-first AI",
    description:
      "Agents, RAG, and MCP tooling built to reduce friction — not replace people.",
  },
];

const HeroSection = () => {
  return (
    <section className="grounded-section section-pad relative w-full overflow-hidden">
      <Hairline />
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Status Badge */}
          <div>
            <Badge
              variant="secondary"
              className="grounded-kicker px-4 py-1.5 text-sm font-medium text-muted-foreground"
            >
              <span className="mr-2 flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-hero-via opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-hero-via"></span>
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
            <GroundedButton className="min-w-[160px]">
              <a href="#projects">
                Explore Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </GroundedButton>
            <GroundedButton variant="outline" className="min-w-[160px]">
              <a href="/posts/">
                Read Insights
                <Terminal className="ml-2 h-4 w-4" />
              </a>
            </GroundedButton>
          </div>

          {/* Tech Stack / "Flare" Visual - Floating Cards */}
          <h2 className="sr-only">Core focus areas</h2>
          <div className="mt-20 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            {focusCards.map((card) => (
              <div
                key={card.title}
                className="grounded-panel card-lift group rounded-lg p-8 text-left"
              >
                <IconChip icon={card.icon} className="mb-4" />
                <h3 className="relative mb-2 text-xl font-bold text-foreground">
                  {card.title}
                </h3>
                <p className="relative text-muted-foreground">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
