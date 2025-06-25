import {
  ExternalLink,
  Github,
  Cpu,
  Shield,
  ShoppingCart,
  MessageSquare,
  Calculator,
  Globe,
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
  if (name.includes("flockx") || name.includes("ai")) return Cpu;
  if (name.includes("propane")) return Globe;
  if (name.includes("junkerri")) return ShoppingCart;
  if (name.includes("chat")) return MessageSquare;
  if (name.includes("steel") || name.includes("calculator")) return Calculator;
  if (name.includes("bowl")) return Shield;
  return Globe;
};

const getProjectGradient = (index: number) => {
  const gradients = [
    "from-blue-50 to-indigo-100 border-blue-200",
    "from-green-50 to-emerald-100 border-green-200",
    "from-purple-50 to-violet-100 border-purple-200",
    "from-orange-50 to-amber-100 border-orange-200",
    "from-pink-50 to-rose-100 border-pink-200",
    "from-cyan-50 to-teal-100 border-cyan-200",
    "from-gray-50 to-slate-100 border-gray-200",
  ];
  return gradients[index % gradients.length];
};

const EnhancedKeyProjects = ({ keyProjects }: Props) => {
  return (
    <section id="projects" className="py-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-stone-900 md:text-4xl">
            Things I've Built
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-stone-600">
            A collection of projects I'm proud of - from helping nonprofits
            raise funds to building AI platforms that solve real problems
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {keyProjects.projects.map((project, index) => {
            const IconComponent = getProjectIcon(project.name);
            const gradientClass = getProjectGradient(index);

            return (
              <Card
                key={project.name}
                className={`flex h-full flex-col bg-gradient-to-br ${gradientClass} group border-2 transition-all duration-300 hover:shadow-xl`}
              >
                <CardHeader className="pb-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="rounded-xl bg-white p-3 shadow-sm transition-shadow group-hover:shadow-md">
                      <IconComponent className="h-6 w-6 text-stone-700" />
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-stone-600 transition-colors hover:text-stone-900"
                      aria-label={`Visit ${project.name}`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>

                  <CardTitle className="mb-2 text-xl font-bold leading-tight text-stone-900">
                    {project.name}
                  </CardTitle>

                  <p className="mb-3 text-sm font-medium text-stone-600">
                    {project.subheader}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                  <p className="mb-6 flex-grow text-sm leading-relaxed text-stone-700">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-white/70 text-xs text-stone-700 transition-colors hover:bg-white/90"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button - pushed to bottom */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto block"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-stone-300 text-stone-700 transition-all hover:bg-white/60 group-hover:border-stone-400"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Project
                    </Button>
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-stone-600">
            Interested in seeing more work or discussing a project?
          </p>
          <a href="#connect">
            <Button
              className="bg-stone-800 px-8 py-3 text-white hover:bg-stone-900"
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
