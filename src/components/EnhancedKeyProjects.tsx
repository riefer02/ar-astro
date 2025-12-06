import {
  ExternalLink,
  Github,
  Cpu,
  Shield,
  ShoppingCart,
  MessageSquare,
  Calculator,
  Globe,
  ArrowUpRight,
  Users,
  BrainCircuit,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  name: string;
  subheader: string;
  url: string;
  description: string;
  technologies: string[];
}

interface ProjectsData {
  projects: Project[];
}

interface Props {
  keyProjects: ProjectsData;
}

const getProjectIcon = (projectName: string) => {
  const name = projectName.toLowerCase();
  if (name.includes("pulse")) return Users;
  if (name.includes("chisos")) return BrainCircuit;
  if (name.includes("flockx") || name.includes("ai")) return Cpu;
  if (name.includes("propane")) return Globe;
  if (name.includes("junkerri")) return ShoppingCart;
  if (name.includes("chat")) return MessageSquare;
  if (name.includes("steel") || name.includes("calculator")) return Calculator;
  if (name.includes("bowl")) return Shield;
  return Globe;
};

const EnhancedKeyProjects = ({ keyProjects }: Props) => {
  return (
    <section id="projects" className="relative py-16 md:py-32 bg-stone-50">
       {/* Background Pattern */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-stone-200 bg-white/50 px-3 py-1 text-stone-600 backdrop-blur-sm">
             Portfolio
          </Badge>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-stone-900 md:text-5xl">
            Selected Work
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600">
            A collection of projects I'm proud of - from helping nonprofits
            raise funds to building AI platforms that solve real problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {keyProjects.projects.map((project, index) => {
            const IconComponent = getProjectIcon(project.name);

            return (
              <Card
                key={project.name}
                className="group relative flex h-full flex-col overflow-hidden border-stone-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-stone-200/50"
              >
                <CardHeader className="pb-4">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-700 transition-colors duration-300 group-hover:bg-stone-900 group-hover:text-white">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-all hover:border-stone-900 hover:text-stone-900"
                      aria-label={`Visit ${project.name}`}
                    >
                      Visit
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </a>
                  </div>

                  <CardTitle className="mb-2 text-xl font-bold leading-tight text-stone-900">
                    {project.name}
                  </CardTitle>

                  <p className="text-sm font-medium text-stone-500">
                    {project.subheader}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                  <p className="mb-8 flex-grow text-sm leading-relaxed text-stone-600">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-stone-100 text-xs font-normal text-stone-600 transition-colors group-hover:bg-stone-200 group-hover:text-stone-900"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional CTA */}
        <div className="mt-20 text-center">
          <p className="mb-6 text-lg font-medium text-stone-600">
            Interested in seeing more work or discussing a project?
          </p>
          <a href="#connect">
            <Button
              className="h-12 rounded-full px-8 text-base font-semibold shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              size="lg"
            >
              Let's Connect
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EnhancedKeyProjects;
