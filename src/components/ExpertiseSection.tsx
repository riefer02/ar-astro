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
import SectionHeader from "@/components/SectionHeader";
import Hairline from "@/components/Hairline";
import IconChip from "@/components/IconChip";

const ExpertiseSection = () => {
  const expertiseAreas = [
    {
      title: "Deep Technical Range",
      icon: Code2,
      description:
        "From high-performance frontends to robust, event-driven backends, I reach for the right tool — not the flashiest one.",
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
      title: "Pragmatic by Default",
      icon: Brain,
      description:
        "Solve the real problem first. Avoid over-engineering, and keep a clear vision for the future.",
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
      title: "Human-Centered",
      icon: Users,
      description:
        "Leading with empathy and clarity, so technology serves people and communities — not the other way around.",
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
    <section
      id="expertise"
      className="grounded-section section-pad relative"
    >
      <Hairline className="via-border" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          className="mb-16"
          kicker="Core Competencies"
          title="Engineering that reduces friction"
          description="I build software to make real problems smaller — for the people doing the work and the communities they serve. Deep technical range is the means; reducing friction is the point."
        />

        {/* Main Expertise Areas */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {expertiseAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <Card
                key={index}
                className="grounded-panel card-lift group h-full rounded-lg p-2"
              >
                <CardHeader className="relative pb-4">
                  <IconChip
                    icon={IconComponent}
                    size="lg"
                    className="mb-6"
                  />
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
                        className="grounded-chip px-3 py-1 text-sm font-normal text-muted-foreground transition-colors hover:border-glint/40 hover:text-foreground"
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
        <div className="grounded-panel rounded-lg p-8 md:p-12">
          <h3 className="mb-10 text-center text-xl font-semibold tracking-tight text-foreground">
            Specialized Capabilities
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {specializations.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col items-center text-center"
                >
                  <IconChip
                    icon={IconComponent}
                    size="xl"
                    hover={false}
                    className="mb-4 flex transition-all duration-300 group-hover:-translate-y-1 group-hover:border-glint/40"
                    iconClassName="text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                  <h4 className="mb-1.5 text-sm font-bold text-foreground">
                    {spec.label}
                  </h4>
                  <p className="text-xs font-medium text-muted-foreground">
                    {spec.desc}
                  </p>
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
