import {
  Cpu,
  Shield,
  Calculator,
  Globe,
  ArrowUpRight,
  Users,
  BrainCircuit,
  Music,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  name: string;
  subheader: string;
  url: string;
  year?: string;
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
  if (name.includes("iscpo")) return Users;
  if (name.includes("chisos")) return BrainCircuit;
  if (name.includes("flockx")) return Cpu;
  if (name.includes("mcp")) return Cpu;
  if (name.includes("curriculum") || name.includes("earth")) return Globe;
  if (name.includes("concert")) return Music;
  if (name.includes("propane")) return Globe;
  if (name.includes("steel") || name.includes("calculator")) return Calculator;
  if (name.includes("bowl")) return Shield;
  return Globe;
};

const EnhancedKeyProjects = ({ keyProjects }: Props) => {
  return (
    <section
      id="projects"
      className="grounded-section relative py-16 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="grounded-kicker mb-4 px-3 py-1 text-muted-foreground"
          >
            Portfolio
          </Badge>
          <h2 className="grounded-section-heading mb-6 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Selected Work
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
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
                className="grounded-panel group flex h-full flex-col rounded-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-4">
                  <div className="mb-6 flex items-start justify-between">
                    <div
                      className="grounded-icon flex h-12 w-12 items-center justify-center rounded-lg text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background"
                      aria-hidden="true"
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link relative flex items-center gap-1 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)] transition-all hover:border-[hsl(var(--glint)/0.44)] hover:text-foreground"
                      aria-label={`Visit ${project.name}`}
                    >
                      Visit
                      <ArrowUpRight
                        className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  <CardTitle className="mb-2 text-xl font-bold leading-tight text-foreground">
                    {project.name}
                  </CardTitle>

                  <p className="text-sm font-medium text-muted-foreground">
                    {project.subheader}
                    {project.year && (
                      <span className="text-muted-foreground/60">
                        {" · "}
                        {project.year}
                      </span>
                    )}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                  <p className="mb-8 flex-grow text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="grounded-chip text-xs font-normal text-muted-foreground transition-colors group-hover:border-[hsl(var(--glint)/0.36)] group-hover:text-foreground"
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
          <p className="mb-6 text-lg font-medium text-muted-foreground">
            Interested in seeing more work or discussing a project?
          </p>
          <Button
            asChild
            className="grounded-button-primary h-12 rounded-full px-8 text-base font-semibold transition-all hover:-translate-y-0.5"
            size="lg"
          >
            <a href="#connect">Let's Connect</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EnhancedKeyProjects;
