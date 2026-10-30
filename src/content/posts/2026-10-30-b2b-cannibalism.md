---
title: "B2B Cannibalism"
pubDate: 2026-10-30
description: "Cheap tokens, expensive thoughts, and the business model eating its own customers."
author: "Andrew Riefenstahl"
image:
  url: "@/assets/images/b2b-cannibalism-og.jpg"
  alt: "A dark forest-green illustration of a snake curled in a ring around a glowing server rack, with a whale silhouette in the background and a tiny dog sitting beside the rack."
tags: ["AI", "capitalism", "DeepSeek", "open source", "inference", "labor"]
---

I'm sitting here thinking about inference costs, and some news came out that I can't stop turning over.

OpenCode bought a GB300 server and ran the math. By their numbers, one rack — one NVL72 — could serve all of the DeepSeek traffic on OpenRouter. That's about 30% of everything moving through the biggest AI routing platform in the world. One rack.

Meanwhile Nvidia is supposedly selling tens of thousands of GB300s, and the big providers are on track to spend [$700 to $800 billion](https://www.tmtpost.com/8120746.html) this year on data centers, memory, packaging, and power.

So which is it? Is compute scarce, or is it stupidly abundant?

Both. That's the trick.

This is Jevons paradox wearing a hoodie. When the unit cost of a thing falls, we don't use less of it. We find more uses. The cost of a fixed level of capability has fallen something like 280-fold since 2022 — in some tracked series, anyway — and total spend went up. Because an agent doesn't send one message. It plans, it calls tools, it checks itself, it retries, it does it again. A single agentic task can burn five to thirty times the tokens of a chat reply. Cheaper tokens made the loop possible. The loop ate the savings.

And I'll give the skeptics this: the rack math is inference. Training is a different furnace. So the "compute surplus" argument is probably right for serving models and probably wrong for making new ones. But it's still a hell of a thing to watch one rack absorb a third of a major platform's traffic while the industry builds like the world is ending.

Now. Why do I care? Because I use DeepSeek.

Not because I'm a fanboy. Because it's the only thing that lets me do a full day of real work at a price I can actually pay.

Real work, for me, is medical records. Finances. A job search. Research for a friend. Whatever side project has its hooks in me that week — shout out to Diego Steinbeck, beta version five, ready for publication. None of that is "solve the Da Vinci code." It's reading, sorting, drafting, comparing, asking the same question four different ways until the answer is clean.

The frontier labs price for the Da Vinci code. Opus 5.5 is $4 in and $20 out per million tokens. [DeepSeek V4.1 Flash](https://www.actuia.com/en/news/ai-api-pricing-in-october-2026-050-to-50-for-output/) is $0.30 in and $1.20 out at peak, half that off-peak, and three-tenths of a cent per million on cached input. That's not a discount. That's a different economy.

And for the record, Opus 5.5 is better. The few times I've had free credits, I was impressed. That was never the question.

I still keep a $20 Codex subscription for the big-brain tasks — GPT-6.1 Sol is genuinely great — but that's not what a Tuesday costs.

On a normal day I spend about a dollar fifty. A heavy day — a real loop, billions of tokens, the kind of session where I'm praying to the anti-slop gods — maybe ten or fifteen. And yeah, if I did that every day I'd be over the $200 Claude Code plan, which is $2,400 a year. I'm not going to pretend otherwise. But the $200 plan is cheaper only if you don't actually use it. The moment the work gets good, you hit the ceiling. I'd rather pay for the work.

And that's the thing I keep coming back to. This isn't an argument about which model is smarter. It's an argument about who can afford to think.

$2,400 a year is not a hobby budget for most people. It's rent. It's a car payment. It's the difference between having a tool and not having one. The gap between the frontier price and the commodity price is 30x on output, 27x on input, and 66x on the cache line. That's not a market. That's a caste system with an API.

And the people who can pay it will tell you the cheap models are "good enough for most tasks," which is a funny way of saying "good enough for you." But most tasks are most of the economy. Most tasks are the work.

There's a xenophobia layer here too, and I want to name it without being weird about it. I'm not nationalistic. I don't think a model is worse because of where it was trained. China probably has bad things going on. So do we. I just don't take other people's words for anything. I have to see it, believe it, and feel it. So I run the model. I read the outputs. I judge the work.

The other reason is simpler. The weights are open. I can download them, run them, leave. That matters more than any benchmark, because it means the price has a floor, and the floor isn't set by a boardroom.

Also, their icon is a whale. And we're fucking over whales. And I care about that. Stewardship. The planet. This whole starship. If you've read anything else I've written, you know that's not a bit.

Here's the part that sounds like cope but isn't. DeepSeek being a mid-tier model is a feature for me. It puts the work back on me. I have to read what it says. I have to push back. I have to know my domain well enough to catch it when it's wrong. With the super-brainy frontier models, I get passive. I nod along. The loss of quality is real, and it's the point — it keeps me in the loop.

That's not an argument against frontier models. If you're doing frontier work, pay for the frontier. But if you're doing the rest of the work, a model that's twenty-six points behind on a benchmark and thirty times cheaper is not a compromise. It's the rational choice.

Which brings me to the narrative.

[Artificial Analysis](https://www.actuia.com/en/news/mistral-large-4-drops-from-38-to-25-on-new-artificial-analysis-index/) dropped version five of its intelligence index on October 27. Sixty percent of it now runs on private test sets. Every open-weight model dropped 12 to 16 points. Opus 5.5 stayed at 58. The best model with published weights — DeepSeek V4.1 Flash, GLM-5.3 — sits at 32. That's a 26-point gap, more than double what it was.

So the headlines wrote themselves. Open source is falling behind.

Except. The index changed its methodology the same week. And the "3-point gap" number that got passed around counts Kimi K3.1 Pro as open, and its weights aren't published. On the models you can actually download, the gap is 26. On the models that exist only as a press release, it's 3.

I'm not saying the benchmark is rigged. I'm saying the story around it is doing work. The same week the methodology tightened, a bunch of people who make their living selling the expensive tier suddenly had a chart that said open source was dead. Maybe they're right. Maybe open source is slowing down. But when the chart and the business model point the same direction, check who paid for the chart.

And none of this matters in the boardroom. It matters at the kitchen table. The person trying to get through a Tuesday doesn't need Opus 5.5. They need something that can read a lease, compare three insurance plans, or help them study for a certification without charging them $200 a month for the privilege. They need a dollar-fifty day.

So who is actually paying the frontier prices?

Not me. Not you. Not the layman. The big enterprises. The ones with the capital. The ones who spent decades lobbying for the rules and never paying the taxes that would fund the social infrastructure making any of this cheaper for everyone else. They can afford $20 per million tokens. They can buy the whole seat.

And here's where the cannibalism comes in.

The labs aren't selling to people. They're selling to businesses. And the businesses are paying those prices out of the same budget that pays the people whose jobs the models are supposed to be doing. So the enterprise buys the tokens, cuts the staff, and books the efficiency. Then its customers have less money to buy whatever it sells. Then the demand base shrinks. Then the enterprise has to cut more to afford next year's tokens.

That's not a flywheel. That's a snake eating its tail and calling it growth.

The math isn't subtle. A [100-megawatt inference campus](https://investinglive.com/stocks/the-4-trillion-question-can-the-hyperscalers-enormous-bet-on-data-centers-pay-off/) costs about $4 billion. To clear a 15% return, you need $2.91 per GPU-hour, which works out to roughly $0.81 per million output tokens. Opus 5.5 lists at $20. That's a 25x spread between the marginal cost of generation and the price on the card.

Some of that spread is profit. Some of it is R&D. Some of it is the cost of building the next model. But some of it is a subsidy — investor money buying market share at a price that no ordinary person, and eventually no ordinary business, can sustain. [Uber burned through its entire AI budget in four months](https://www.actuia.com/actualite/uber-plafonne-claude-code-et-cursor-apres-avoir-epuise-son-budget-ia-en-quatre-mois/) and capped Claude Code and Cursor. That's not hypothetical. That's a company that could afford it deciding it couldn't.

And the balance sheet is where it gets ugly. The hyperscalers have about $2.6 trillion in off-balance-sheet commitments, plus another $779 billion on the books. The circular financing is real: the same handful of companies are the customers, the investors, and the landlords. If one of those tenants goes bust, the capacity doesn't disappear. It floods the spot market, and the price of compute falls through the floor. Great for me and you. Catastrophic for whoever is holding the debt.

That's the late-stage part. Not "capitalism is bad." Everyone knows capitalism is bad. The interesting part is that this particular capitalism has a physics problem. It needs to keep charging a price that its own efficiency gains are destroying. The better the models get at being cheap, the more the business model eats itself.

B2B cannibalism.

That's the narrative-based read on humanity's current status and possible trajectory. It's what I do. Anthropologist, futurist, writer, artist, whatever. It's what I vibe check.

I don't know how this ends. The universe is the universe. It's gonna do what it's gonna do.

But I know what I want. I want cheap models to stay cheap. I want the weights to stay open. I want the kid at the kitchen table to have a dollar-fifty day. I want a future where AI helps humans instead of replacing them, where the tool is a tool and not a toll booth.

And I want it to be boring. That's the dream. Not a singularity. A utility. The day nobody writes a blog post about inference costs is the day we win.

Patrick Stewart passed away, and Picard said it better than I can: you can do everything right, make no mistakes, and still lose. That's not weakness. That's life.

I'm still betting on the whale.

Shout out to all my machine learning mathematicians. Good night — actually it's technically morning. Have a great day. Happy Friday.
