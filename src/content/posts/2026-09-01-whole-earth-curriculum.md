---
title: "Whole Earth Curriculum: Two Billion Tokens, a Loop, and a Free Curriculum for Everyone"
pubDate: 2026-09-01
description: "Announcing Whole Earth Curriculum, a free open source K-12 curriculum built by an agent loop across nearly two billion tokens, and why DeepSeek made it affordable enough to actually finish."
author: "Andrew Riefenstahl"
image:
  url: "@/assets/images/whole-earth-curriculum-og.png"
  alt: "Whole Earth Curriculum artwork, a forest-toned globe with interconnected pathways representing a holistic education."
tags:
  [
    "education",
    "open source",
    "deepseek",
    "agent loop",
    "AI",
    "curriculum",
    "egalitarianism",
    "whole earth",
  ]
---

I have been building something big and I want to tell you about it. It is called [Whole Earth Curriculum](https://wholeearthcurriculum.org), and it is a complete K-12 curriculum offered free to the world. Go poke around the site, open a lesson, print one out. It is real and it is live.

Let me back up. I care deeply about education. I have written about this before. Public education in a lot of places is failing, and it is not some small fix, it is the whole model. It fragments a kid into disconnected subjects, prepares them to fit into a hierarchy instead of building a better one, treats emotion and the body as afterthoughts, and mostly ignores what technology is doing to us and to the planet. So instead of just complaining about it, I built a replacement. A drop-in one. Something a school, a family, or a self-directed learner can pick up and use, for free, forever.

The thing is holistic. It is organized under four pillars, emotional and social awareness, physical and somatic awareness, intellectual and cognitive awareness, and contextual and ecological awareness. Every lesson traces back up through those pillars to one North Star, raising the baseline standard of living for all life on Earth. I know that sounds lofty. It is supposed to. The bar should be high.

Now for the part that still surprises me when I say it out loud. I built this with an agent loop, and the whole first pass ran through nearly two billion tokens. Two billion. It was not one model doing one giant prompt. It was a crew of agents working a backlog, one item at a time, in a strict order, all of it coordinated through opencode.

The loop is the part I am most proud of technically. It is a state machine, ready, claimed, review, done. An agent claims the next item, does the work, runs validation, submits it, and then it has to survive a review chain before it is done. Reviewer, then fact-checker, then global-culture-editor, then accessibility-editor, then alignment-auditor, then child-psychologist. In that order. The tooling enforces it, not just the prompts. A reviewer literally cannot review out of order. The loop refuses to mark something done until every required reviewer has passed. The whole thing runs sequentially as one linear thread through git history, one commit per item, so you can read the history like a single chain of thought. We could have fanned out in parallel, but I chose to get it right first and go fast later.

And the validation layers, this is the part I want people to actually appreciate. The content is Markdown with YAML frontmatter, and every file is validated against JSON Schema. Every lesson has to declare the standards it serves, and those have to resolve to real IDs, so the whole traceability chain stays intact. There is citation linting against a vetted source registry. There is an asset checker that makes sure every referenced image actually exists. There is CI that enforces all of it before anything merges. The idea is simple. You can not break the chain and claim you are done, because the machine will not let you.

The scale ended up around 975 standards, 13 complete grades, 1,676 lessons, 1,674 illustrated assets, 159 units. A near one-to-one lesson-to-asset ratio. All of it accessible, alt text, grayscale printable, diverse representation. That is a lot of content, and it would have cost a fortune on the private frontier labs in the United States.

Which brings me to the affordability thing, because it matters. I ran this on DeepSeek. DeepSeek Pro. It is open source adjacent, it is absurdly cheap, and it thinks well. The whole project, from design to implementation, all through natural language, cost me pocket change compared to what the private US labs would have charged for the same token count. I have written about vibe coding with DeepSeek before, and this was that philosophy applied at a scale I had never attempted. Two billion tokens of curriculum, and the bill was not the scary part. That is the only reason this thing exists as a free project instead of a bill I could not afford to pay. It is open source, free to use, and I want to keep it that way. The content is CC BY-SA 4.0 and the tooling is MIT.

Being honest about what is not great yet. The first round of graphics came out weaker than I wanted, and the reason is boring but important. I did not use a multimodal model for them. So the second pass, the one where I fix the art, will use something like GLM 5.3 flash. That is next on the list. The other honest gap is that automated validation proves structure and traceability, not classroom effectiveness. Human review and real pilots are the current constraint, and I am not going to pretend otherwise.

Where this is going. I am working on forming a nonprofit around it in the near future, and it is dedicated to my best friend who passed away. I will write more about that in another post, it deserves its own space. For now just know the project has a reason behind it.

Go look at the site. Open a lesson. If you are a teacher, a parent, a reviewer, or you just want to help, the door is open. It is free and it is yours.

Thanks for reading. Ciao.
