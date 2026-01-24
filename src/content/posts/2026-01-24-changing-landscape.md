---
title: "The Changing Landscape: How AI Agents Are Redefining Software Development"
pubDate: 2026-01-24
description: "A reflection on how AI coding agents are transforming software development, exposing organizational weaknesses, and why communication and leadership matter more than ever."
author: "Andrew Riefenstahl"
image:
  url: "@/assets/images/the-changing-landscape-how-ai-agents-are-redefining-software-development-og.jpg"
  alt: "Abstract representation of AI agents collaborating with developers in modern software development"
tags:
  [
    "AI",
    "software development",
    "agents",
    "leadership",
    "code review",
    "technology",
    "future of work",
  ]
---

Coding with AI agents and large language models is fundamentally changing how software development works. This shift is revealing uncomfortable truths about our industry—and about the developers within it.

## The Resistance: Fear, Ego, and Skill Gaps

There's a growing group of developers who refuse to use AI tools. This resistance typically comes from one of three places: fear, skill issues, or ego.

Some don't know how to write effective prompts. Others lack the high-level architectural thinking required to guide an AI effectively—you need to understand where your software is going, not just what it's doing right now. And then there are those whose identity is so tightly coupled to the code they write that accepting AI assistance feels like an existential threat.

Here's the truth that many thinkers in this space have been saying for years: code is just an artifact. Perfect code means nothing if it doesn't drive outcomes for users. That said, a senior engineer wouldn't blindly accept AI-generated slop. A senior engineer maintains the high-level view, ensures DRY principles, and identifies redundancies and duplication in the codebase.

## Communication Is Now Non-Negotiable

This shift is revealing weaknesses at an organizational level. It's becoming clear which developers have poor communication skills—now that communication is front and center as a requirement. You need to communicate effectively with teammates _and_ with your AI agent to ensure tasks are completed well.

I'll agree that AI-generated code isn't always great when given massive, undefined tasks. But being a senior engineer now means creating documentation and ensuring everyone—including your teammates—understands the state of affairs in the codebase.

## The Code Review Bottleneck

Code reviews have become the primary bottleneck at work. There's a lot of generated code, and increasingly it's being reviewed by AI agents—which I think is great. AI reviewers tend to focus on technical issues rather than the ego-driven nitpicking that often plagues human code reviews.

If a coding convention is something the team is aligning on, let's hope they've actually discussed and agreed on it first. Those conventions need to be written into the prompts for AI code reviews dynamically—similar to the [custom context-aware code review system](/posts/2025-09-23-custom-context-aware-code-review-action) I built a few months back, which is still plugging along for my team.

I can't help but chuckle whenever I'm able to output tons of progress toward an objective, only to be forced to create piecemeal pull requests and slowly drip them to my team for code review. I spend most of my time waiting, unable to actually deliver outcomes.

## Testing Takes a Step Forward

Regression tests become even more important in this new landscape. We need to ensure we're not destroying anyone else's features as we code. Even a small unit test goes a long way toward ensuring that in a rapidly changing codebase, things work as expected.

## The Real Bottleneck: Leadership

The real bottleneck these days is bad vision and bad leadership. If everyone doesn't know where they're going, and if you don't trust your engineers with the tools they have, you're just sitting in a bureaucratic hierarchy—which is what most industry software development teams have become.

I think it's amazing that the Claude Code team uses their own product to continue developing new features rapidly and shipping them to market. I'd love to be on one of those engineering teams and hear how they discuss product development and its deep relationship with software development.

## Personal Benefits: Accessibility and Productivity

Although I'm not the first to say it, some people are definitely holding onto the past. The other day someone asked me if I use AI agents to code, and I proudly said yes. Not only has my output increased, but my ability to understand greater parts of the codebase has improved because I ask critical questions through the AI. It's also more accessibility-friendly—as you may remember, I've had [health issues with my wrists](/posts/2025-08-09-curious-path-through-pain).

I'm able to quickly jump between tasks and get up to speed extremely fast. It's also about meeting your customers where they're at and not over-engineering. One of the biggest flaws I see in software organizations is chasing shiny objects rather than driving user value.

## The Agency Work Disruption

Speaking of people holding on, I have to think about agency work. When everything revolves around billable hours, there's a lot of obfuscation—most agencies would be struggling to justify their hours now. What used to take weeks now takes minutes with a thoughtfully crafted prompt and a skilled software engineer.

I never liked agency work anyway. It was always fake. With the billable hour system, you have the client on one end and your middle manager boss on the other, telling you to hit a certain number of billable hours. But it's _their_ job to get you the work. You're essentially penalized for being skillful—if you complete tasks too fast, they can't charge enough, and their overhead goes down. It's just dumb.

## The Future: Personalized Software

We're moving toward the age of personalized software, where it's easy to spin up full-blown local applications to solve your real-world problems. This is an exciting time to be a developer.

Here's what I've built for myself recently:

- **This blog's publishing workflow**: I record voice notes using a macOS-native app that hits a transcription API and creates a markdown file. A file watcher immediately picks it up and passes the transcript to an [OpenCode](https://opencode.ai/docs) agent running locally, which helps me edit, revise, and draft the literature I'm working on.

- **Accessibility tool for my father**: He's been having speech difficulties, so I built him an AI tool that listens to Zoom and Microsoft Teams calls in real-time, generates premade responses for him to select from, and speaks them using his cloned voice from ElevenLabs.

- **Nonprofit operations scripts**: For the nonprofit I work with, I can spin up scripts that merge our client database with our Stripe account data, identify inconsistencies, and generate full spreadsheet reports—tasks that would have taken days of manual work.

And that's just scratching the surface. The possibilities for personalized software are endless.

The concern I have isn't with this technology itself—it's with _who controls the most advanced models_. When I say "the only issue," I'm referring to companies like Anthropic and OpenAI, and how governments have signed agreements essentially promising not to interfere with their development for the next decade.

The cost of the best models—the ones that let you output the most and move the fastest—is growing. A divide is already forming between those who can afford cutting-edge AI and those who can't, and it's only going to widen. This won't just affect developers. Ultimately, it'll affect all citizens. An AI divide is emerging, and sadly, the planet will take a punch to the stomach too: the electricity and water consumption required to run these models at scale is staggering.

> Is AI fundamentally changing our day-to-day lives for the better? Is it enriching our human experience? Or is it mostly being commodified to line the pockets of capitalists?

As I've mentioned in [previous blogs](/posts/2026-01-13-new-world-order), this technology should be publicly owned and overseen by a government that actually cares for its citizens—one that provides universal basic income, free universal healthcare, and free higher education, all subsidized because a society that is more intelligent and healthy spends less and operates more efficiently. But that's not what capitalists want.

## Staying Current

The landscape is changing fast. If you want to know more, start reading the news. I personally enjoy the YouTuber [Theo](https://www.youtube.com/@t3dotgg), as well as X (the platform), because I've curated my feed to follow senior software engineers across the industry.

Staying up to date with the latest tooling and breakthroughs can be exciting—and on some days, downright exhausting. But like surfing a wave, you just have to tune in, let go of control, and enjoy the ride.

## Final Thoughts

I'll repeat: the real problems are bad leadership, poor decision-making, and lack of trust in those who have the skills and ability to execute with empathy to build real software that helps businesses.

Embrace new technology. Work on improving your communication skills. Be better. Be more empathic. It's a wild world out there.

Signing off,
Andrew
