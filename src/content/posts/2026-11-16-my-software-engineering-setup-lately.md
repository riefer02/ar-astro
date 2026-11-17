---
title: "My Software Engineering Setup Lately"
pubDate: 2026-11-16
description: "T3 Code from the couch, DeepSeek on a budget, Hex for speech, and browse for all the clicking. A status update on the tools removing friction from my agent workflow."
author: "Andrew Riefenstahl"
image:
  url: "@/assets/images/my-software-engineering-setup-lately-desk.jpg"
  alt: "A warm, lamp-lit standing desk with a large monitor showing an AI chat, a laptop running OpenCode, a colorful mechanical keyboard, a game controller, and a mug, next to a window with closed blinds."
  quality: 80
tags:
  [
    "AI",
    "software engineering",
    "workflow",
    "open source",
    "DeepSeek",
    "accessibility",
    "stream of thought",
  ]
---

Hello, this is a status update and chat about what I've been doing with software and agent development. Yeah, so huge shoutout to a few products that have really sped up my agent workflow and removed a bunch of friction.

The first one is the open source project [T3 Code](https://github.com/pingdotgg/t3code), and I'll tell you a little bit of how I use it. Then also [Hex](https://github.com/anomalyco/hex), by Anomaly, the same organization that makes [OpenCode](https://github.com/anomalyco/opencode). And there's another one from them, [browse](https://github.com/anomalyco/browse), which I'll get into too.

## The budget determines a lot of how I behave

Yeah, the budget determines a lot of how I behave. I can't just throw cash at Opus. Even $2.50 for a simple task is too much at the volume of tasks I want to be doing.

[OpenCode Go](https://opencode.ai/console/go) has a $10-a-month plan, and right now you basically get $100 worth of DeepSeek usage for the month. Which is a lot of DeepSeek. Some of it is subsidized probably, I don't know their math, but the dollar value is fire right now.

I guess they've got their inference dialed in for DeepSeek. In my use, as long as you bring the thinking, it's doing a really good job just doing what you're thinking, you know.

Sometimes I use DeepSeek as a subagent of a bigger model. But I actually just love letting DeepSeek run its own [subagents](https://opencode.ai/docs/agents/).

Whenever I need a big brain, I use Sol in Codex through [ChatGPT Plus](https://chatgpt.com/codex/pricing/). But most of my work, at high volumes, I'm doing with DeepSeek.

## T3 Code, from the couch

I'm able to now write this entire blog just sitting on my couch, staring up at the ceiling with my arms behind my head and my legs crossed and my dog next to me, just enjoying the couch and free-flow speaking right now.

I'm capturing this in the iOS Notes app, and T3 is how I'm working with the agent on my computer from my phone.

T3 Code is a wrapper around your computer's [agent harnesses](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md). I can use Codex from it. I can use Claude Code, or I can use OpenCode with Go. So I have one app to use all my agents.

I'm [tunneling from my phone](https://github.com/pingdotgg/t3code/blob/main/docs/user/remote-access.md) through the T3 mobile app to my computer. The computer stays on and does the work.

> **Disclaimer:** Yeah, disclaimer, probably some major security issues to think about here. Don't f\*\*k around and find out type sh\*t. You're giving agents access to do things on your computer. That's the end of the disclaimer, and then back to it.

Basically, now I can just open any of my projects from my phone and immediately get going. Usually I've got a preset to just DeepSeek, you know. I've got lots of projects.

Shoutout to the newbies: master your files and folders. Even the big-brain model needs to know which project it's in.

## Hex: hold down a button and speak

Okay, so I want to talk about Hex, the application by Anomaly, the same people who make OpenCode. It's incredible.

It's basically an application wrapped around local speech models, including NVIDIA's [Parakeet](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3). Hex is open source, and the [speech model documentation](https://github.com/anomalyco/hex#speech-models) explains the options. Parakeet can do punctuation and capitalization too.

Basically, I now just hold down a button and speak, and when I pull my finger off, all of my dictation comes out. And it's also grammatically and syntactically much cleaner than what I was getting with Talon. That's my experience with the dictation, you know. [Talon was a huge deal for me](/posts/rsi-developer-cautionary-tale-and-how-talon-saved-my-life/) when I needed to control my computer with my voice.

That low latency is fire. I can just free-flow and see the text appear when I lift my finger.

If I were on my computer, I'd be using Hex.

For accessibility purposes, removing a bunch of that keyboard friction is huge.

## browse: all your stuff's already logged in

Then there's this other one, browse by Anomaly, which basically gives your agents control of your regular browser. All your stuff's already logged in. It's an [MCP server and a Chromium extension](https://github.com/anomalyco/browse), so the agent can read pages and click through things in that browser.

> **Disclaimer warning:** Yeah, once again, disclaimer warning. Don't do this if you don't know what the f\*\*k you're doing. It's dangerous. You're giving it control in a browser where you're signed into stuff.

There are [guardrails](https://github.com/anomalyco/browse#security): agents use tabs they open or you lend them. But the project's own security notes also call out that pages and emails can try to steer an agent.

I started by giving it control when working through a local CMS instance, just seeing how it did in the local environment for a while, managing and doing tasks. Then when I asked it to start making changes to a production environment that I was logged into, it was doing it really well.

And I was using DeepSeek. It didn't feel like a big concern in the tasks I was watching it do. That's how it felt to me while using it; it doesn't mean it can't f\*\*k something up.

It feels crazy because I'm on the couch, or in the chair, and I can talk to it and be like, hey, will you go to this webpage and do this thing for me? And literally my computer in the other room is doing the thing and reporting back to me.

It's cutting down on so much friction, having to click through portals just to make content updates, and now it's doing that itself. It's incredible.

## Okay, wait, it's not all local

I keep saying it's all local. Well, my computer's doing the work, but I'm still using DeepSeek through [OpenCode Go](https://opencode.ai/docs/console/go/#privacy), so there are third-party services involved. I'm comfortable with that for my own stuff. Fully local AI is another conversation.

## That's my setup lately

Anyway, T3 Code, Hex, and browse. It's been a huge speedup, just removing a bunch of annoying friction. It's really cool.

I really want to make a video about it, but I've never done YouTube content. Just to share with everyone.

And yeah, I think this is a good time to talk about universal basic income and lowering the cost of living.

Peace out. Love you guys. Thanks for listening. Riefer out.
