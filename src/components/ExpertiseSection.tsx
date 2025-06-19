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
      gradient: "from-blue-50 to-indigo-50 border-blue-200",
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
      gradient: "from-green-50 to-emerald-50 border-green-200",
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
      gradient: "from-purple-50 to-violet-50 border-purple-200",
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
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-stone-900 md:text-4xl">
            What I Do
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-stone-600">
            I'm passionate about building meaningful software that helps people.
            Here are the areas where I spend my time learning, creating, and
            solving problems.
          </p>
        </div>

        {/* Main Expertise Areas */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {expertiseAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <Card
                key={index}
                className={`h-full bg-gradient-to-br ${area.gradient} border-2 transition-all duration-300 hover:shadow-lg`}
              >
                <CardHeader className="pb-4 text-center">
                  <div className="mx-auto mb-4 w-fit rounded-xl bg-white p-3 shadow-sm">
                    <IconComponent className="h-8 w-8 text-stone-700" />
                  </div>
                  <CardTitle className="text-xl font-bold text-stone-900">
                    {area.title}
                  </CardTitle>
                  <p className="text-sm leading-relaxed text-stone-600">
                    {area.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {area.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="mb-2 mr-2 bg-white/70 text-stone-700 transition-colors hover:bg-white/90"
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

        {/* Specializations Grid */}
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8">
          <h3 className="mb-8 text-center text-2xl font-bold text-stone-900">
            Other Things I Do
          </h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {specializations.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <div key={index} className="group text-center">
                  <div className="mx-auto mb-3 w-fit rounded-xl bg-white p-3 shadow-sm transition-shadow group-hover:shadow-md">
                    <IconComponent className="h-6 w-6 text-stone-700" />
                  </div>
                  <h4 className="mb-1 text-sm font-semibold text-stone-900">
                    {spec.label}
                  </h4>
                  <p className="text-xs text-stone-600">{spec.desc}</p>
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
