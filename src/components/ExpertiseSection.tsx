import {
  Bot,
  Shield,
  Code2,
  Database,
  Cloud,
  Settings,
  Users,
  Zap,
  Lock,
  TrendingUp,
  Cpu,
  Network,
  Music,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExpertiseSection = () => {
  const expertiseAreas = [
    {
      title: "AI & Machine Learning",
      icon: Bot,
      description:
        "Building intelligent systems with long-term memory and contextual understanding",
      skills: [
        "AI Agent Workflows",
        "Long-term Memory AI Models",
        "User Preference Learning",
        "Business Logic Integration",
        "LangGraph & LangChain",
        "Vector Similarity Search",
        "Model Context Protocol (MCP) Servers",
        "RAG Applications",
      ],
    },
    {
      title: "Security & Site Reliability",
      icon: Shield,
      description:
        "Enterprise-grade security with HIPAA compliance and robust infrastructure",
      skills: [
        "HIPAA-Compliant Firewalls",
        "Session Management",
        "OAuth & 2FA Implementation",
        "Infrastructure Automation",
        "CI/CD Pipeline Construction",
        "Monitoring & Alerting",
        "Performance Optimization",
        "Security Auditing",
      ],
    },
    {
      title: "Full-Stack Development",
      icon: Code2,
      description:
        "Modern web applications with cutting-edge frameworks and seamless integrations",
      skills: [
        "React & Next.js",
        "Python (Django/Flask)",
        "TypeScript & JavaScript",
        "Astro & Gatsby",
        "PostgreSQL & MongoDB",
        "API Development",
        "Real-time Applications",
        "E-commerce Solutions",
      ],
    },
  ];

  const specializations = [
    {
      icon: Cpu,
      label: "MCP Server Development",
      desc: "Model Context Protocol",
    },
    {
      icon: Database,
      label: "Memory Systems",
      desc: "Persistent AI Knowledge",
    },
    {
      icon: Network,
      label: "Agent Orchestration",
      desc: "Multi-Agent Workflows",
    },
    { icon: Lock, label: "Enterprise Security", desc: "HIPAA & Compliance" },
    {
      icon: Cloud,
      label: "Cloud Architecture",
      desc: "Scalable Infrastructure",
    },
    { icon: Zap, label: "Automation", desc: "CI/CD & DevOps" },
  ];

  return (
    <section id="expertise" className="relative py-24 md:py-32">
       {/* Background Elements - Subtle continuation of Hero theme */}
       <div className="absolute inset-0 -z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
       <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] bg-gradient-to-b from-stone-100/50 to-transparent blur-[120px]" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-stone-200 bg-white/50 px-3 py-1 text-stone-600 backdrop-blur-sm">
            Core Competencies
          </Badge>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-stone-900 md:text-5xl">
            Technical Expertise
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600">
            I'm passionate about building meaningful software that helps people.
            Here are the areas where I spend my time learning, creating, and
            solving problems.
          </p>
        </div>

        {/* Main Expertise Areas */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {expertiseAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <Card
                key={index}
                className="group relative h-full overflow-hidden border-stone-200 bg-white/80 p-2 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-200/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-stone-50/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <CardHeader className="relative pb-4">
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-700 transition-colors duration-300 group-hover:bg-stone-900 group-hover:text-white">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-stone-900">
                    {area.title}
                  </CardTitle>
                  <p className="text-base leading-relaxed text-stone-600">
                    {area.description}
                  </p>
                </CardHeader>
                <CardContent className="relative">
                  <div className="flex flex-wrap gap-2">
                    {area.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="border border-stone-100 bg-stone-50 px-3 py-1 text-sm font-normal text-stone-600 transition-colors hover:border-stone-200 hover:bg-white hover:text-stone-900"
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
        <div className="rounded-3xl border border-stone-200 bg-white/50 p-8 backdrop-blur-sm md:p-12">
          <h3 className="mb-10 text-center text-xl font-semibold tracking-tight text-stone-900">
            Specialized Capabilities
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {specializations.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <div key={index} className="group flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-stone-100 bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-stone-200 group-hover:shadow-md">
                    <IconComponent className="h-7 w-7 text-stone-600 transition-colors group-hover:text-stone-900" />
                  </div>
                  <h4 className="mb-1.5 text-sm font-bold text-stone-900">
                    {spec.label}
                  </h4>
                  <p className="text-xs font-medium text-stone-500">{spec.desc}</p>
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
