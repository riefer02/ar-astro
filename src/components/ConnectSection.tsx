import {
  Linkedin,
  Github,
  Twitter,
  Mail,
  MessageCircle,
  ArrowRight,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ConnectSection = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/andrewriefenstahl/",
      icon: Linkedin,
      description: "Professional network & insights",
      color: "group-hover:text-[#0077b5]",
    },
    {
      name: "GitHub",
      url: "https://github.com/riefer02",
      icon: Github,
      description: "Open source projects & code",
      color: "group-hover:text-foreground",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/riefer02",
      icon: Twitter,
      description: "Tech thoughts & discussions",
      color: "group-hover:text-[#1DA1F2]",
    },
    {
      name: "Email",
      url: "mailto:andrew.riefenstahl@gmail.com",
      icon: Mail,
      description: "Direct contact",
      color: "group-hover:text-foreground",
    },
  ];

  return (
    <section
      id="connect"
      className="grounded-section relative bg-background py-16 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        aria-hidden="true"
      />
      <div className="container mx-auto max-w-5xl px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="grounded-kicker mb-4 px-3 py-1 text-muted-foreground"
          >
            Contact
          </Badge>
          <h2 className="grounded-section-heading mb-6 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Let's Start a Conversation
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Whether you want to chat about technology, music, philosophy, or
            potential collaborations - I'm always up for meaningful
            conversations.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target={link.name === "Email" ? "_self" : "_blank"}
                rel={link.name === "Email" ? "" : "noopener noreferrer"}
                className="group block h-full"
              >
                <Card className="grounded-panel h-full rounded-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="flex items-center gap-6 p-8">
                    <div
                      className={`grounded-icon flex h-16 w-16 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 ${link.color}`}
                    >
                      <IconComponent className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-xl font-bold text-foreground">
                        {link.name}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                        {link.description}
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-transparent text-muted-foreground/70 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.05)] transition-all duration-300 group-hover:border-[hsl(var(--glint)/0.42)] group-hover:text-foreground">
                        <ArrowRight
                          className="h-5 w-5 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="grounded-panel relative rounded-lg px-6 py-16 text-center md:px-12">
          <div className="relative z-10">
            <div className="grounded-icon mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-lg text-foreground">
              <MessageCircle className="h-8 w-8" aria-hidden="true" />
            </div>

            <h3 className="mb-4 text-3xl font-bold text-foreground">
              Ready to collaborate?
            </h3>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
              I'm available for interesting projects, consulting work, or just
              good conversations. Let's see what we can create together.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="grounded-button-primary h-12 rounded-full px-8 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5"
                size="lg"
              >
                <a href="mailto:andrew.riefenstahl@gmail.com">
                  <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                  Say Hello
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="grounded-button-outline h-12 rounded-full px-8 text-base text-foreground hover:-translate-y-0.5 hover:text-foreground"
                size="lg"
              >
                <a href="/posts/">Read My Writing</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
