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
      color: "group-hover:text-[#333]",
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
      color: "group-hover:text-stone-900",
    },
  ];

  return (
    <section id="connect" className="relative py-16 md:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[url('/noise.svg')] opacity-10"></div>
      
      <div className="container mx-auto max-w-5xl px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
           <Badge variant="outline" className="mb-4 border-stone-200 bg-white/50 px-3 py-1 text-stone-600 backdrop-blur-sm">
             Contact
          </Badge>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-stone-900 md:text-5xl">
            Let's Start a Conversation
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600">
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
                <Card className="h-full border-stone-200 bg-white/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-200/50">
                  <CardContent className="flex items-center gap-6 p-8">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-stone-100 text-stone-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-md ${link.color}`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-xl font-bold text-stone-900">
                        {link.name}
                      </h3>
                      <p className="text-sm font-medium text-stone-500 transition-colors group-hover:text-stone-700">
                        {link.description}
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-100 bg-transparent text-stone-300 transition-all duration-300 group-hover:border-stone-200 group-hover:text-stone-900">
                        <ArrowRight className="h-5 w-5 -translate-x-1 transition-transform duration-300 group-hover:translate-x-0" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 px-6 py-16 text-center shadow-2xl md:px-12">
           {/* Decorative background blobs */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-stone-800 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-stone-800 blur-3xl" />
          
          <div className="relative z-10">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
              <MessageCircle className="h-8 w-8" />
            </div>
            
            <h3 className="mb-4 text-3xl font-bold text-white">
              Ready to collaborate?
            </h3>
            <p className="mx-auto mb-10 max-w-xl text-lg text-stone-300">
              I'm available for interesting projects, consulting work, or just
              good conversations. Let's see what we can create together.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-white px-8 text-base font-bold text-stone-900 transition-all hover:scale-105 hover:bg-stone-100"
                size="lg"
              >
                <a href="mailto:andrew.riefenstahl@gmail.com">
                  <Send className="mr-2 h-4 w-4" />
                  Say Hello
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-stone-700 bg-transparent px-8 text-base text-stone-300 hover:bg-stone-800 hover:text-white"
                size="lg"
              >
                <a href="/posts">Read My Writing</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
