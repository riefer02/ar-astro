import {
  Bot,
  Code2,
  Users,
  Zap,
  Lock,
  Cpu,
  Brain,
  Heart,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExpertiseSection = () => {
  const expertiseAreas = [
    {
      title: "Modern Tech Ecosystem",
      icon: Code2,
      description:
        "Full-cycle development from high-performance frontends to robust, event-driven backends.",
      skills: [
        "React & Astro",
        "TanStack Router",
        "TypeScript Ecosystem",
        "Workers & Cron Jobs",
        "Event Buses",
        "Automation Pipelines",
        "Scalable Packages",
        "Deployment Strategy",
      ],
    },
    {
      title: "Architectural Philosophy",
      icon: Brain,
      description:
        "Pragmatic, solution-oriented engineering. avoiding over-engineering while keeping a vision for the future.",
      skills: [
        "Solution-First Mindset",
        "Right-Sized Scalability",
        "Future-Proof Vision",
        "Complexity Management",
        "Sustainable Codebases",
        "System Design",
        "Performance Tuning",
        "Tech Debt Management",
      ],
    },
    {
      title: "Leadership & Culture",
      icon: Users,
      description:
        "Leading with empathy, clarity, and an ethical lens. Fostering a collaborative, 'no-drama' environment.",
      skills: [
        "Strategic Goal Setting",
        "Team Inspiration",
        "Ethical Leadership",
        "Mentorship",
        "Cross-Functional Comms",
        "Conflict Resolution",
        "Senior Staff Execution",
        "Freelance Adaptability",
      ],
    },
  ];

  const specializations = [
    {
      icon: Cpu,
      label: "System Architecture",
      desc: "Scalable & Maintainable",
    },
    {
      icon: Zap,
      label: "Automation",
      desc: "CI/CD & Workflows",
    },
    {
      icon: Globe,
      label: "Web Performance",
      desc: "Core Vitals & SEO",
    },
    { icon: Lock, label: "Security", desc: "Best Practices & Auth" },
    {
      icon: Heart,
      label: "Human Centric",
      desc: "Mindful & Ethical",
    },
    { icon: Bot, label: "AI Integration", desc: "RAG & Agents" },
  ];

  return (
    <section id="expertise" className="relative py-16 md:py-32">
       {/* Background Elements - Subtle continuation of Hero theme */}
       <div className="absolute inset-0 -z-10 bg-[url('/noise.svg')] opacity-10"></div>
       <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] bg-gradient-to-b from-secondary/60 to-transparent blur-[120px]" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-border bg-card/50 px-3 py-1 text-muted-foreground backdrop-blur-sm">
            Core Competencies
          </Badge>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Technical & Leadership DNA
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I bring a holistic approach to software engineering—combining deep technical expertise with a focus on sustainable architecture and human-centric leadership.
          </p>
        </div>

        {/* Main Expertise Areas */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {expertiseAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <Card
                key={index}
                className="group relative h-full overflow-hidden border-border bg-card/80 p-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/15"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <CardHeader className="relative pb-4">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {area.title}
                  </CardTitle>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="border border-border/70 bg-background px-3 py-1 text-sm font-normal text-muted-foreground transition-colors hover:border-border hover:bg-card hover:text-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Specializations Grid - Updated to match style */}
        <div className="rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm md:p-12">
          <h3 className="mb-10 text-center text-xl font-semibold tracking-tight text-foreground">
            Specialized Capabilities
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {specializations.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <div key={index} className="group flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-border group-hover:shadow-md">
                    <IconComponent className="h-7 w-7 text-muted-foreground transition-colors group-hover:text-foreground" />
                  </div>
                  <h4 className="mb-1.5 text-sm font-bold text-foreground">
                    {spec.label}
                  </h4>
                  <p className="text-xs font-medium text-muted-foreground">{spec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
