---
title: "The Sprite-Jitter Journey"
pubDate: 2026-05-13
description: "On context waves, being the bottleneck, and chasing a sprite flicker through three layers of lies in a game codebase."
author: "Andrew Riefenstahl"
image:
  url: "@/assets/images/the-sprite-jitter-journey-og.jpg"
  alt: "A dimly lit combat arena with two opposing factions of sprites facing each other across a central stone column, subtle glitch artifacts flickering at the edges."
tags: ["game development", "godot", "debugging", "AI agents", "tooling", "stream of thought"]
---

You reach a point when you're out there riding the context wave and you realize these waves are just too big right now. They can't keep clarity on the objective shoreline. This is a metaphor for when your agent is dealing with a project that is just so deep and so wide that it can continue to look forward in an arrow of view, but it's starting to get tunnel vision because it has to. There's so much semantic information around it from the massive repository of information that it's really relying on you to show it around. That's where I've been lately with game development.

I have lots of systems in the game. A lot of state to manage. Assets to manage. Content to author. It is a lot for a one-man, one-agent team.

And it's fun. I get frustrated sometimes, but then I take a step back and attack a different side of the problem. While I'm working one section of the codebase, I have my open code up to the side with Kimi. I'll ask Kimi to set it to plan mode and she just answers questions I have about the codebase back to me. So I'm basically directing one agent — usually Claude Opus — doing work in the codebase, and on the side I'm working with Kimi to increase my domain knowledge and go over systems that have been built so I can guide it better.

The reason I was inspired to share this is because I reached this bug issue where we have sprite animation frame changes based on an orthographic — or whatever the word is, ortho-something — perspective camera. Two-dimensional frames, velocity, movement. It all seems really simple. Then you throw in a navigation mesh and the complexity just goes up. The issue was, once again, the human. I was the bottleneck. I had to load the game, pull up the scene, watch everyone moving and interacting and colliding, and see if they were jittering. I'm laughing as I say this because I realize I'm the bottleneck.

So I came back to it a few hours later and thought: I need to simplify. I need to create an isolated lab for this. Rather than the full town scene, I put together an isolated scene with actors from two different factions on both sides so we can simulate them running towards each other, a column in the middle, and I told the agent to set up every debugger she could. Trip wires for figuring out where we're losing them and causing this issue.

And I was reminded: you just need to build the tooling for your agent. It's all about more tooling. Everyone's personal software is increasing, but it's the individual and their individual problems they're trying to solve. Creating the tooling for more natural language query development.

Anyway, here's what happened in that lab.

---

## Where It Started

Six actors in a 14×14 meter arena. Three goblins, three town guards, one player. I built the simplest possible test scene where the bug *had* to surface, then sat and watched the logs. Classic isolation play.

## What "Jitter" Actually Meant

Not one bug. Jitter was the umbrella label for a whole family of symptoms that all looked like the same thing to the eye. Sprite wedges flickering 180° between front and back every physics tick. Actors vibrating in place mid-attack instead of holding a pose. Goblin2 and Guard2 each throwing off dozens of oscillation pairs per encounter while their neighbors looked clean.

Visually it was subtle. The body rotation was smooth — slerp absorbed the noise. But the sprite picker reads the facing direction directly, without slerp, so it snapped to whatever the underlying intent vector said this tick. The user said "it looks okay in this sim." The log showed the underlying state was thrashing.

## Layer 1 — Wrong Target Every Tick

First thought: bad target selection. The enemy update code was doing a distance comparison between the threat target and the player to pick where to pursue. If those two anchors were near-equal distance, sub-millimeter position jitter inverted the comparison every physics tick. The target position snapped back and forth between two points ~3.5 meters apart, facing flipped, and the wedge flipped with it.

So I dropped the distance comparison. Honor the threat target unconditionally when alive — the detection picker upstream is already distance-aware and sticky. Goblin2's ~50 flip pairs collapsed to zero. Big win.

Guard2 still flickered. The user said "it looks okay in this sim." I almost stopped here. The log told me otherwise.

## Layer 2 — Wrong Direction Even with the Right Target

Same bug, different shape. In combat, the movement code was facing the actor toward a spread waypoint — a random offset for fan-out — rather than the actual threat. When separation push wobbled the actor across a distance threshold, the code flipped between facing the spread waypoint and facing the threat. Every tick, another flip.

In alert and suspicious states it was simpler. Bodies don't collide, so actors pass through their target. The nav agent's next path position ended up behind the actor. Direction flipped 180°. Facing flipped.

Fix was straightforward: face the actual threat after movement, always. Let nav handle the waypoint for movement, but the threat owns facing.

Reran the lab. Goblin2: still zero. Guard2: still 12 flip pairs. Identical pattern.

This is where I almost lost my mind.

## Layer 3 — The Deferred Signal Handler

I had to read the order of operations carefully. When RVO avoidance is on, the movement function queues velocity and returns. It does not write facing. My per-state override then runs and sets facing toward the threat. Then Godot fires a velocity callback later in the same physics tick, and that callback rewrites facing from a cached intended direction — which had been set to the flipped nav direction. My override was silently undone every frame.

The fix: when I override facing, I also update the cached intended direction. The cache and the live state move together. When the callback fires, it rewrites facing to the same target-bearing. No flip.

Final lab pass: three encounters, six actors, zero oscillation pairs. Done.

## Why This Took So Long

Each layer masked the next. Fixing layer 1 looked like a complete win. Without the lab and per-actor logging, I would have shipped it and called the remaining Guard2 jitter "edge case noise." Visual playtests didn't catch it. The log was the only place the truth lived.

The bug was about order, not values. Layers 1 and 2 were classic data-flow bugs — wrong value flows into a function. Layer 3 was a temporal bug: right value, written at the right place, then a signal handler overwrites it later in the same frame. You can stare at the per-state code forever and not see it because the corruption happens outside that code path.

And cached state is invisible at the override site. The facing function looked like a pure setter. The cached intended direction was a private cache nobody had to think about. The callback's dependency on that cache was buried in a Godot signal handler wired up at initialization and never seen again. The contract was real but undocumented and unenforced.

## What I Learned

Isolation scenes earn their keep. Building the combat lab took ten minutes and saved hours. A focused six-actor arena with deterministic spawn and a headless launcher meant I could re-run the bug at will, see the full trace, and compare runs apples-to-apples.

Per-instance logging matters more than you think. When all three guards print as "Town Guard," the log can't tell you which guard is flickering. Adding the node name to the state print took thirty seconds and immediately disambiguated layer 3 from layer 2.

Don't trust "it looks okay." The eye is forgiving. The body slerp is forgiving. The sprite picker is not. If the log shows oscillation, the bug is there even if the screen doesn't scream it. Track underlying state, not visual symptoms.

Stop at the symptom, not the cause. I kept finding "the bug" and patching the proximate symptom. Each patch worked partially. The pattern of partial wins was itself a signal that I hadn't found the real bug yet. A complete fix should kill all the flicker on the first try; if it only kills some, you found a bug, not the bug.

And adversarial review of your own fix. After layer 2 I should have asked: given the RVO signal model, is there any way my override could be undone? That question, asked earlier, would have skipped a lap.

## The General Lesson

When a signal handler reads cached state to do its work, the cache is the contract. Per-call overrides that don't update the cache get silently undone by the next signal fire.

Look for this pattern when chasing "my fix didn't apply" mysteries: a function that writes a cache then queues async work, plus a deferred signal callback that reads that cache to compute its output. The setter looks complete. The override looks complete. The cache reveals neither.

---

Small victory. Long war. Good fight.
