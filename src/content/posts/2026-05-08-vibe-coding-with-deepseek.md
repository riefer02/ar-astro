---
title: "Vibe Coding with DeepSeek"
pubDate: 2026-05-08
description: "Running out of tokens, discovering DeepSeek credits, and vibe coding a 3D rendering pipeline for an old-school RPG, with some technical debt along the way."
author: "Andrew Riefenstahl"
image:
  url: "@/assets/images/vibe-coding-with-deepseek-og.jpg"
  alt: "A psychedelic cosmic mindscape with fractal patterns, a glowing blue whale swimming through a sea of code and color, forest greens melting into electric blue."
tags: ["AI", "deepseek", "vibe coding", "game development", "open source", "workflow", "stream of thought"]
---

My two subsidized accounts, Claude Code and Codex Pro, have run their course. The tokens are tapped, and I was getting tired of the five-hour window on one of them. Up until now I've been riding on subsidized access, not paying for tokens directly. But the free ride was over. It was time to start paying my fair share and buy tokens for large language models.

Little did I know, older Andrew did himself a favor. He already had like ten dollars of tokens sitting around from [DeepSeek](https://api-docs.deepseek.com/), and my API key was already set. It was a match made in heaven. All I did was boot up [OpenCode](https://github.com/anomalyco/opencode). OpenCode is a harness, so I slid on over to a new model, DeepSeek v4.

I wanted to test this model on my current project. I've been working on a game, and there's one system in particular: the visual rendering engine, my digital artistic process. It's an old Might and Magic-style game, and I went with taking 3D models and capturing pre-rendered snapshots, then layering those into the game so it has that old-school vibe.

I enjoy building my own tooling. My flow: research APIs, build an internal wiki (thank you [Andrej Karpathy](https://x.com/karpathy)), pull in everything relevant.

I'm deep into applications with headless modes now. Blender headless, Godot headless. This lets my agents control these things directly. Shoutout to the open source [Godot MCP](https://github.com/ee0p/godot-mcp). I'm homebrewing my own Godot MCP and it's been rewarding finding the friction points and weeding them out.

I had an open source model ready to go. I pulled up [Artificial Analysis](https://artificialanalysis.ai/), checked the chart, the prices, the intelligence. DeepSeek is eight points behind on the software engineering benchmark. That's a real gap, but I've used older models than this and gotten by fine.

So I plugged it in and we went to town.

What I enjoy about DeepSeek is its thinking. It's a nice thinker, and I love that OpenCode lets me see it doing its work straight from the provider. It's a little slow, but I'm learning to be patient, get my *Power of Now* mindset in place. I hate that feeling when I don't trust the model will do its best. That's what I'm trying to explore: can I trust a model to do its work without leaving scattered technical debt around the codebase?

I'm always sitting there scanning all the code changes as they come through, looking for issues. Is this class responsible for this action? Is this its duty? That's the question I keep asking myself. It's the easiest way to catch when something needs to be moved where it belongs.

DeepSeek knocked it out of the park. We got the right concept image loaded, and DeepSeek ran the pipeline all the way down, 3D models through Blender taking orthographic snapshots, and it all came together. I looked at it and it looks fine for prototyping. There's an aesthetic forming from the pipeline in the game now.

It's kind of crazy because the entire project scope, from design to implementation, is all being done through natural language queries. And on top of that, the applications that have headless modes are just the best for models to work with. This is why your product should have a command-line interface in this day and age. Your product should almost entirely boil down to a CLI tool, just give agents something they can consume, something that creates frictionless surfaces for sharing information. Is it really that far-fetched that in the future, robots will be doing everything through a bunch of interface calls that plug into real-world systems? Obviously there's huge risk there, and I don't want to get into that right now. But the pattern is already forming.

Now, DeepSeek did get me further, but it left some weird technical debt. My personal computer's working directory paths ended up in the code, and I had to go in and clean it up with Codex later. We technically still made progress, but having to clean it up afterwards is not fun. Maybe I'm learning I need to watch a little bit closer. Tighten the harness, as they say, I'm kidding, nobody says that.

It was an enjoyable day of working with open source models. I used DeepSeek and spent maybe two dollars, tops, to debug and crank out around two new models into the game. At some point I might switch to [OpenCode Go](https://github.com/anomalyco/opencode-go) which already includes that model and more.

It's Friday, I'll let you know how the rest of it goes. I hope there's some nuggets of wisdom in here. If not, let me know and I'll expand on them.
