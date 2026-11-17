---
title: "My Software Engineering Setup Lately"
pubDate: 2026-11-16
description: "T3 Code from the couch, DeepSeek on a budget, Hex for speech, and browse for all the clicking. A status update on the tools removing friction from my agent workflow."
author: "Andrew Riefenstahl"
image:
  url: "@/assets/images/my-software-engineering-setup-lately-og.jpg"
  alt: "A person reclining on a couch beside a small Shih Tzu, with a phone nearby and a computer glowing in the next room, in a forest-green editorial illustration."
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

Hello, this is a status update and chat about what I've been doing with software and agent development. Yeah, so I just want a huge shoutout to these products in particular which have really unlocked a whole new level of agent development flows, and just general friction removal.

The first one is the open source project [T3 Code](https://github.com/pingdotgg/t3code), and I'll tell you a little bit of how I use it. Then also [Hex](https://github.com/anomalyco/hex), by Anomaly, the same organization that makes [OpenCode](https://github.com/anomalyco/opencode). And there's another one from them, [browse](https://github.com/anomalyco/browse), which I'll get into too. T3 Code is a separate organization.

## The budget determines a lot of how I behave

Yeah, so also I think it's important to talk about the budgeting, because that determines a lot of how I behave. I can't just throw cash at Opus. Even a simple task feeling like $2.50 is too much at the volume of tasks I want to be doing.

[OpenCode Go](https://opencode.ai/console/go) has a $10-a-month plan, and right now you basically get $100 worth of DeepSeek usage for the month. Which is a lot of DeepSeek. Some of it is subsidized probably, I don't know their math, but the dollar value is fire right now.

> Pricing check, November 16, 2026: Go's $100 monthly allowance is for DeepSeek V4.1 Flash, not a cash balance. Five-hour and weekly limits also apply. See the [Go usage limits](https://opencode.ai/docs/console/go/#usage-limits).

I guess they've got their inference dialed in for DeepSeek. In my use, as long as you bring the thinking, it's doing a really good job just doing what you're thinking, you know.

Sometimes I use DeepSeek as a subagent of a bigger model. But I actually just love letting DeepSeek run its own [subagents](https://opencode.ai/docs/agents/).

Whenever I need a big brain, I've also got a simple subscription, like $20 a month, and I'm using Sol for the brainier tasks. But most of my work, at high volumes, I'm doing with DeepSeek.

I'm digressing because I always do these without any format and just start talking. So let me talk about T3 Code.

## T3 Code, from the couch

I'm able to now write this entire blog just sitting on my couch, staring up at the ceiling with my arms behind my head and my legs crossed and my dog next to me, just enjoying the couch and free-flow speaking right now.

I'm capturing this in the iOS Notes app, and T3 is how I'm working with the agent on my computer from my phone.

T3 Code is a wrapper around your computer's agent harnesses. I can use Codex from it. I can use Claude Code, or I can use OpenCode with Go. So I have one app to use all my agents. Their [FAQ](https://github.com/pingdotgg/t3code/blob/main/docs/user/faq.md) makes the distinction that T3 uses the harnesses underneath; it isn't itself replacing those harnesses.

I'm tunneling from my phone through the T3 mobile app to my computer, and then my computer is doing the work. It has the files and the tools. The [mobile and remote setup](https://github.com/pingdotgg/t3code/blob/main/docs/user/remote-access.md) is built around that: the computer stays on, and the phone connects to it.

Yeah, disclaimer, probably some major security issues to think about here. Don't fuck around and find out type shit. You're giving agents access to do things on your computer. That's the end of the disclaimer, and then back to it.

Basically, now I can just open any of my projects from my phone and immediately get going. Usually I've got a preset to just DeepSeek, you know. I've got lots of projects.

And once again, I think Riley, my friend, said it best: one of the biggest hurdles you need to get over to get good at agents is understanding the file system and folders. Because your entry point matters. For example, my portfolio blog path is the entry point for this T3 session right now, where my agent's running.

So yeah, one app, all these projects, and I can do it from my phone. It's great.

## Hex: hold down a button and speak

Okay, so I want to talk about Hex, the application by Anomaly, the same people who make OpenCode. It's incredible.

It's basically an application wrapped around local speech models, including NVIDIA's [Parakeet](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3). Hex is open source, and the [speech model documentation](https://github.com/anomalyco/hex#speech-models) explains the options. Parakeet can do punctuation and capitalization too.

Basically, I now just hold down a button and speak, and when I pull my finger off, all of my dictation comes out. And it's also grammatically and syntactically much cleaner than what I was getting with Talon. That's my experience with the dictation, you know. [Talon was a huge deal for me](/posts/rsi-developer-cautionary-tale-and-how-talon-saved-my-life/) when I needed to control my computer with my voice.

But yeah, I can just free-flow, and then the user experience of lifting your finger and seeing the text just appear is really good. That low latency is fire. You just speak, and you're controlling your computer.

In this case I'm using the phone's iOS Notes app to capture all of this from my mobile setup. But if I were on my computer, I'd be using Hex.

For accessibility purposes, removing a bunch of that keyboard friction is huge.

## browse: all your stuff's already logged in

Then there's this other one, browse by Anomaly, which basically gives your agents control of your regular browser. All your stuff's already logged in. It's an [MCP server and a Chromium extension](https://github.com/anomalyco/browse), so the agent can read pages and click through things in that browser.

Yeah, once again, disclaimer warning. Don't do this if you don't know what the fuck you're doing. It's dangerous. You're giving it control in a browser where you're signed into stuff.

There are [guardrails](https://github.com/anomalyco/browse#security): agents use tabs they open or you lend them. But the project's own security notes also call out that pages and emails can try to steer an agent. Being logged in is part of why this is useful, and it's also why the disclaimer goes here.

I started by giving it control when working through a local CMS instance, just seeing how it did in the local environment for a while, managing and doing tasks. Then when I asked it to start making changes to a production environment that I was logged into, it was doing it really well.

And I was using DeepSeek. It didn't feel like a big concern in the tasks I was watching it do. That's how it felt to me while using it; it doesn't mean it can't fuck something up.

It feels crazy because I'm on the couch, or in the chair, and I can talk to it and be like, hey, will you go to this webpage and do this thing for me? And literally my computer in the other room is doing the thing and reporting back to me.

It's cutting down on so much friction, having to click through portals just to make content updates, and now it's doing that itself. It's incredible.

## Okay, wait, it's not all local

I keep saying it's all local. Well, my computer's doing the work, but I'm still using DeepSeek through [OpenCode Go](https://opencode.ai/docs/console/go/#privacy), so there are third-party services involved. I'm comfortable with that for my own stuff. Fully local AI is another conversation.

## That's my setup lately

Anyway, T3 Code, Hex, and browse. It's been a huge speedup, just removing a bunch of annoying friction. It's really cool.

T3 Code has kind of replaced opening all the different harness apps for me. OpenCode Go's DeepSeek plan is fire right now for the dollar value. Hex removes a bunch of keyboard friction for accessibility purposes. And browse is cutting down on all the clicking through portals to make content updates.

I really want to make a video about it, but I've never done YouTube content. Just to share with everyone.

And yeah, I think this is a good time to talk about universal basic income and lowering the cost of living.

Peace out. Love you guys. Thanks for listening. Riefer out.
