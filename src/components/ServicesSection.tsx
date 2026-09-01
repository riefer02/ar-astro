import {
  ArrowRight,
  Map,
  Search,
  RefreshCw,
  Bot,
  Users,
  BookOpenCheck,
  Lock,
  CheckCircle2,
  Mail,
  Sparkles,
  HandCoins,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { email } from "@/lib/socials";

const methodSteps = [
  {
    step: "01",
    title: "Map the work",
    icon: Map,
    description:
      "We follow the work from start to finish — every step, every handoff, every wait.",
  },
  {
    step: "02",
    title: "Find the drag",
    icon: Search,
    description:
      "We pinpoint exactly where time, money, and patience are leaking out of it.",
  },
  {
    step: "03",
    title: "Redesign first",
    icon: RefreshCw,
    description:
      "We fix the process before adding a single tool. A bad process with AI bolted on is just a faster bad process.",
  },
  {
    step: "04",
    title: "Add AI where it earns it",
    icon: Bot,
    description:
      "AI goes in only where it pays for itself. The rest stays simple on purpose.",
  },
  {
    step: "05",
    title: "Keep humans in the loop",
    icon: Users,
    description:
      "You stay in control of the decisions that matter. We build around you, not over you.",
  },
  {
    step: "06",
    title: "Hand it off",
    icon: BookOpenCheck,
    description:
      "You get a documented, working process and the know-how to run and extend it yourself.",
  },
];

const trustPoints = [
  {
    icon: Users,
    title: "You stay in control",
    description:
      "Every decision that carries risk stays with a human. AI does the lifting, not the judging.",
  },
  {
    icon: Lock,
    title: "Your data stays yours",
    description:
      "We design around your privacy and security requirements — not the other way around.",
  },
  {
    icon: CheckCircle2,
    title: "Auditable by design",
    description:
      "You can see what happened and why. No black boxes you can't explain to a client or a regulator.",
  },
];

const outcomes = [
  {
    stat: "30–40%",
    label: "Less manual handling on the process we rebuild",
  },
  {
    stat: "2–3×",
    label: "Faster turnaround once the drag is gone",
  },
  {
    stat: "1",
    label: "Process proven before you scale to more",
  },
];

const faqs = [
  {
    q: "What do I walk away with?",
    a: "A working, documented process — one real process rebuilt end to end, running for you, with the know-how to run and extend it yourself. Not a slide deck of recommendations.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on how complex the problem is, how many systems it touches, and how much AI it genuinely needs. I work with individuals and small businesses, and pricing is flexible and negotiable — the best way to get a real number is to tell me what you're dealing with.",
  },
  {
    q: "Will AI make the decisions?",
    a: "No. We keep humans in the loop on every decision that matters. AI handles the dull, repetitive lifting; you stay in control and accountable.",
  },
  {
    q: "Where should we start?",
    a: "The one that's costing you the most time or money — which is usually obvious once we talk it through. A quick conversation settles it, so the first conversion is the one most worth doing.",
  },
  {
    q: "Is this only for businesses?",
    a: "No. I help individuals and SMBs, and the same approach scales to enterprise teams. If you run a small business, freelance, or just have a process eating your week, this can apply. If it doesn't fit you, I'll tell you straight.",
  },
];

const ServicesSection = () => {
  const emailHref = `mailto:${email}`;

  return (
    <section className="grounded-section relative py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        {/* Hero */}
        <div className="mb-20 text-center">
          <Badge
            variant="outline"
            className="grounded-kicker mb-4 px-3 py-1 text-muted-foreground"
          >
            Services
          </Badge>
          <h1 className="grounded-section-heading mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Is part of your business{" "}
            <span className="grounded-gradient-text">eating your time?</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            I build and fix the processes that eat people's time — whether
            you're an individual or a small business. We look at how work
            actually gets done, redesign it to be simpler, and add AI only where
            it genuinely earns its place. You end up with something working,
            documented, and yours to run.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="grounded-button-primary h-12 rounded-full px-8 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5"
              size="lg"
            >
              <a href={emailHref}>
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Tell me what you're dealing with
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="grounded-button-outline h-12 rounded-full px-8 text-base text-foreground hover:-translate-y-0.5 hover:text-foreground"
              size="lg"
            >
              <a href="#how">How it works</a>
            </Button>
          </div>
        </div>

        {/* What I help with */}
        <div id="how" className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="grounded-section-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What I can help you with
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A focused piece of work with one job: take one broken process and
              make it work the way it should. No boiling the ocean, no year-long
              project. One thing, done properly.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="grounded-panel rounded-lg p-6">
              <Sparkles className="mb-4 h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <h3 className="mb-2 text-xl font-bold text-foreground">
                You get a working process
              </h3>
              <p className="text-muted-foreground">
                Not a strategy memo. The actual, redesigned process — live and
                running, not a pile of recommendations.
              </p>
            </div>
            <div className="grounded-panel rounded-lg p-6">
              <RefreshCw className="mb-4 h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Redesigned before any tools go in
              </h3>
              <p className="text-muted-foreground">
                AI is added only where it pays for itself — not everywhere all
                at once.
              </p>
            </div>
            <div className="grounded-panel rounded-lg p-6">
              <BookOpenCheck className="mb-4 h-8 w-8 text-muted-foreground" aria-hidden="true" />
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Documented and handed off
              </h3>
              <p className="text-muted-foreground">
                You know how to operate it and extend it after I'm done.
              </p>
            </div>
          </div>
        </div>

        {/* Method */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="grounded-section-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              How it works
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The same practical approach, focused on the one thing you pick.
              No mystery, no black box.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {methodSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <Card
                  key={step.step}
                  className="grounded-panel group h-full rounded-lg p-2 transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader className="relative pb-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="grounded-icon inline-flex h-12 w-12 items-center justify-center rounded-lg text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                        <IconComponent className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground/60">
                        {step.step}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {step.title}
                    </CardTitle>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trust */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="grounded-section-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Simplify <em>first</em>. AI <em>second</em>.
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Fast doesn't mean reckless. AI is only worth it if you can trust
              the output and stand behind it — so we build that in from the
              start.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trustPoints.map((point) => {
              const IconComponent = point.icon;
              return (
                <div key={point.title} className="grounded-panel rounded-lg p-6">
                  <div className="grounded-icon mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg text-foreground">
                    <IconComponent className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-20">
          <div className="grounded-panel relative overflow-hidden rounded-lg p-8 text-center md:p-12">
            <div className="relative z-10 mx-auto max-w-xl">
              <Badge
                variant="outline"
                className="grounded-kicker mb-4 px-3 py-1 text-muted-foreground"
              >
                Pricing
              </Badge>
              <h2 className="grounded-section-heading mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Flexible and negotiable
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                I work with individuals and small businesses, and pricing is
                flexible. It scales with how complex the problem is, how many
                systems it touches, and how much AI it genuinely needs. The
                honest number comes from talking about what you're dealing with.
              </p>
              <div className="mb-10 flex items-center justify-center">
                <HandCoins
                  className="mr-3 h-8 w-8 text-muted-foreground"
                  aria-hidden="true"
                />
                <p className="text-lg font-medium text-foreground">
                  Scope settled before any work — no open-ended billing.
                </p>
              </div>
              <Button
                asChild
                className="grounded-button-primary h-12 rounded-full px-8 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5"
                size="lg"
              >
                <a href={emailHref}>
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Ask about pricing
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Outcomes */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="grounded-section-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What good looks like
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item.label} className="grounded-panel rounded-lg p-8 text-center">
                <div className="grounded-gradient-text mb-3 text-5xl font-bold">
                  {item.stat}
                </div>
                <p className="text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-foreground">
            These are the kinds of results a well-simplified process typically
            delivers. Your numbers depend on the specific process, your team,
            and your data.
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="grounded-section-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Common questions
            </h2>
          </div>
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="grounded-panel group rounded-lg p-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-foreground [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-90" aria-hidden="true" />
                </summary>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="grounded-panel relative rounded-lg px-6 py-16 text-center md:px-12">
          <div className="relative z-10">
            <h2 className="grounded-section-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Got something that's eating your time?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
              Send me a note and tell me what you're dealing with. I'll be
              straight with you about whether I can help and what it would take.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="grounded-button-primary h-12 rounded-full px-8 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5"
                size="lg"
              >
                <a href={emailHref}>
                  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                  Email me
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
