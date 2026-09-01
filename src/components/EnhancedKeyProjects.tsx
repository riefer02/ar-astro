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
import { Badge } from "@/components/ui/badge";
import GroundedButton from "@/components/GroundedButton";
import SectionHeader from "@/components/SectionHeader";
import Hairline from "@/components/Hairline";
import IconChip from "@/components/IconChip";

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
      className="grounded-section section-pad relative"
    >
      <Hairline className="via-border" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          className="mb-16"
          kicker="Portfolio"
          title="Selected Work"
          description="A collection of projects I'm proud of - from helping nonprofits raise funds to building AI platforms that solve real problems."
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {keyProjects.projects.map((project, index) => {
            const IconComponent = getProjectIcon(project.name);

            return (
              <Card
                key={project.name}
                className="grounded-panel card-lift group flex h-full flex-col rounded-lg"
              >
                <CardHeader className="pb-4">
                  <div className="mb-6 flex items-start justify-between">
                    <IconChip icon={IconComponent} className="mb-0" />
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link relative flex items-center gap-1 rounded-full border border-border/70 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)] transition-all hover:border-glint/40 hover:text-foreground"
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
                          className="grounded-chip text-xs font-normal text-muted-foreground transition-colors group-hover:border-glint/40 group-hover:text-foreground"
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
          <GroundedButton>
            <a href="#connect">Let's Connect</a>
          </GroundedButton>
        </div>
      </div>
    </section>
  );
};

export default EnhancedKeyProjects;
