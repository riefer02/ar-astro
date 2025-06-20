import {
  Linkedin,
  Github,
  Twitter,
  Mail,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ConnectSection = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/andrewriefenstahl/",
      icon: Linkedin,
      description: "Professional network & insights",
      color: "hover:text-blue-600",
    },
    {
      name: "GitHub",
      url: "https://github.com/riefer02",
      icon: Github,
      description: "Open source projects & code",
      color: "hover:text-gray-900",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/riefer02",
      icon: Twitter,
      description: "Tech thoughts & discussions",
      color: "hover:text-blue-400",
    },
    {
      name: "Email",
      url: "mailto:andrew.riefenstahl@gmail.com",
      icon: Mail,
      description: "Direct contact",
      color: "hover:text-green-600",
    },
  ];

  return (
    <section id="connect" className="py-16">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-stone-900 md:text-4xl">
            Let's Connect
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-stone-600">
            Whether you want to chat about technology, music, philosophy, or
            potential collaborations - I'm always up for meaningful
            conversations.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {socialLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Card
                key={link.name}
                className="group border border-stone-200 bg-white transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <a
                    href={link.url}
                    target={link.name === "Email" ? "_self" : "_blank"}
                    rel={link.name === "Email" ? "" : "noopener noreferrer"}
                    className="flex items-center space-x-4 text-stone-700 transition-colors group-hover:text-stone-900"
                  >
                    <div
                      className={`rounded-xl bg-stone-50 p-3 transition-colors group-hover:bg-stone-100 ${link.color}`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{link.name}</h3>
                      <p className="text-sm text-stone-600 transition-colors group-hover:text-stone-700">
                        {link.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-gradient-to-r from-stone-800 to-stone-700 p-8 text-center text-white">
          <MessageCircle className="mx-auto mb-4 h-12 w-12 text-stone-300" />
          <h3 className="mb-3 text-2xl font-bold">Want to Work Together?</h3>
          <p className="mx-auto mb-6 max-w-xl text-stone-200">
            I'm available for interesting projects, consulting work, or just
            good conversations about technology and life. Let's see what we can
            create together.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="mailto:andrew.riefenstahl@gmail.com">
              <Button
                className="bg-white px-8 py-3 text-stone-800 hover:bg-stone-100"
                size="lg"
              >
                <Mail className="mr-2 h-5 w-5" />
                Say Hello
              </Button>
            </a>
            <a href="/posts">
              <Button
                variant="outline"
                className="border-white px-8 py-3 text-white hover:bg-white hover:text-stone-800"
                size="lg"
              >
                Read My Writing
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
