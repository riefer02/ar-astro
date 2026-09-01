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
import GroundedButton from "@/components/GroundedButton";
import SectionHeader from "@/components/SectionHeader";
import Hairline from "@/components/Hairline";
import IconChip from "@/components/IconChip";
import { socials, email } from "@/lib/socials";

const icons = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Twitter: Twitter,
  Email: Mail,
} as const;

const ConnectSection = () => {
  const socialLinks = socials.map((link) => ({
    ...link,
    icon: icons[link.name],
  }));

  return (
    <section
      id="connect"
      className="grounded-section section-pad relative"
    >
      <Hairline className="via-border" />
      <div className="container mx-auto max-w-5xl px-4">
        {/* Section Header */}
        <SectionHeader
          className="mb-16"
          kicker="Contact"
          title="Let's Start a Conversation"
          description="Whether you want to chat about technology, music, philosophy, or potential collaborations - I'm always up for meaningful conversations."
        />

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
                className="group block h-full rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Card className="grounded-panel card-lift h-full rounded-lg">
                  <CardContent className="flex items-center gap-6 p-8">
                    <IconChip
                      icon={IconComponent}
                      size="xl"
                      hover={false}
                      className="shrink-0 text-muted-foreground group-hover:text-foreground"
                    />
                    <div className="flex-1">
                      <h3 className="mb-1 text-xl font-bold text-foreground">
                        {link.name}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                        {link.description}
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-transparent text-muted-foreground/70 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.05)] transition-all duration-300 group-hover:border-glint/40 group-hover:text-foreground">
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
              <GroundedButton>
                <a href={`mailto:${email}`}>
                  <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                  Say Hello
                </a>
              </GroundedButton>
              <GroundedButton variant="outline">
                <a href="/posts/">Read My Writing</a>
              </GroundedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
