# Blog Line-Edit Review

A redundancy and verbosity pass over the twelve most recent posts, written as line-editor notes rather than rewrites. Nothing in `src/content/posts/` has been modified.

**Guardrail used throughout:** the Voice Preservation Rule in `docs/blog-authoring.md`. Cut scaffolding, never cadence. Fragments, anaphora, direct address, tangents, em-dash asides, and sign-offs stay. Where a fix is proposed it is written in the author's register, not essayist English.

**Scope:** the 12 posts from `2025-12-06` through `2026-09-24`. Posts before that were not reviewed yet — see the bottom of this document.

**Bottom line:** across ~14,560 words the realistic trim is roughly 900–1,000 words (~6–7%). No post needs a rewrite. The dominant issue is not wordiness, it is meta-commentary — the post narrating its own honesty or structure. That is a different fix from cutting fat, and it is the one that will change how the work reads.

---

## The four patterns worth fixing

### 1. Meta-commentary — the corpus's most consistent weakness

The post talks about the post instead of making the point. This shows up in almost every piece and it is the single highest-value thing to clean up, because it is invisible to the author and loud to the reader.

| Post | Line | The tell |
| --- | --- | --- |
| `2026-05-07-human-archaeology…` | 60 | "I know I'm laboring the point and beating a dead horse" — announces the redundancy instead of cutting it |
| `2026-05-22-augment-humanity` | 18 | "I know this isn't enough to be a full piece… It's just one perception" |
| `2026-09-24-laya-call-router` | 96 | "The honest version of the result is less dramatic than…" |
| `2026-04-20-why-i-kept-wordpress…` | 304 | "There is a tendency in technical writing to make every decision sound inevitable…" |
| `2026-09-01-whole-earth-curriculum` | 38 | "Being honest about what is not great yet" |
| `2026-01-13-new-world-order` | 37 | "I know you might perceive me as boiling these issues down…" |
| `2026-01-24-changing-landscape` | 81 | "When I say 'the only issue,' I'm referring to…" — references a phrase that is not in the post (real artifact, see below) |
| `2026-05-08-vibe-coding-with-deepseek` | 28, 32, 38 | "That's the question I keep asking myself"; "I don't want to get into that right now"; "I hope there's some nuggets of wisdom in here" |

**The line to hold:** a disclaimer that adds a *fact about the limits* is voice and should stay — "the sample is small, the labels are partly synthetic" is doing real work. A disclaimer that only comments on the *writing* is cuttable. "I know I'm beating a dead horse" is the second kind. "The test set has only 81 cases" is the first kind.

### 2. Landing the ending twice

Several posts make the same closing move in two consecutive paragraphs. The second pass reads as the author not trusting the first one.

- `2026-05-27-the-three-way-attack` lines 92 and 94 — government-absence plus cost-shifting, twice, four lines apart.
- `2025-12-06-unchecked-capitalism…` lines 39 and 41 — two closings in a row.
- `2026-04-26-stream-of-thought-socialist-ai` lines 30 and 32 — the public-infrastructure pitch, drafted and then revised in place.
- `2026-04-20-why-i-kept-wordpress…` lines 318–322 then 332–334 — the same benefit list twice.
- `2026-09-01-whole-earth-curriculum` lines 22 and 42 — the "go look at the site, open a lesson" bookend. This one is intentional; keep one, do not reword both.

### 3. Evidence density — check each item, but do not assume it is padding

This looked like a pattern in the first pass and mostly did not survive a second read. Three authorities do beat six — but only when they are making the same claim. Where each item is a different scale, a different source, or a different actor, the density is the argument.

- `2026-05-27-the-three-way-attack` lines 38–44 — **walked back.** This is a six-step ladder, not a pile-on. Only the 25% superlative was cut.
- Same post line 66 — **walked back.** Three scales, three sources. Cutting one orphans a footnote.
- Same post line 86 — **applied as a trim.** The paragraph adds no information; the rhythm is load-bearing, so the restated clause went and the beat stayed.
- `2026-04-20-why-i-kept-wordpress…` line 143 — **still stands.** Restates the Blade/Tailwind/Vite bullets from 62–65 with no new claim.

### 4. Self-declared repetition in the stream-of-thought posts

`human-archaeology` line 24 and line 60 both say "out of sight for the entire last year." Line 60 is the author announcing he is doing it. This is the one place where the repetition is genuinely accidental rather than stylistic — the post flags it and then does it anyway.

---

## Per-post findings

### `2026-09-24-laya-call-router.md` — 2,378 words, tight (3.5/5), trim ~70 words (3–4%)

Already-tight technical post. The redundancy is restated numbers and caveats, not voice habits. "The short version" and "The takeaway" repeat on purpose — keep both.

- **L207** DELETE — "The local routing decision had a median runtime of roughly 20 ms. The hosted routing calls were roughly 650 ms and 1,450 ms." The table at L33–38 already reports all three.
- **L209** DELETE — "Those are not complete conversation benchmarks." L40 already says these are routing-case results, not full-conversation costs.
- **L197** DELETE — "The RL term may help, but it may also add variance without adding much information." The blockquote below already says the RLCD contribution has not been isolated.
- **L96** → "Less dramatic, but more useful:" (drop "The honest version of the result is")
- **L237** DELETE — "It identifies the actual boundary of the result and gives us a concrete way to improve the system." The blockquote above already names the boundary.

### `2026-09-01-whole-earth-curriculum.md` — 996 words, tight (2/5), trim ~60–75 words (2–4%)

- **L42** "Go look at the site. Open a lesson." — same three-beat instruction as L22. Let "It is free and it is yours." be the last note.
- **L36** "It is open source, free to use, and I want to keep it that way. The content is CC BY-SA 4.0 and the tooling is MIT." — one sentence carries all of it: "It is open source: content CC BY-SA 4.0, tooling MIT, and I want to keep it that way."
- **L30** DELETE — "We could have fanned out in parallel, but I chose to get it right first and go fast later." Already shown by "runs sequentially as one linear thread through git history."
- **L24** → "I have written about education before. Public education in a lot of places is failing…" (drop "I care deeply about education.")
- **L28** DELETE — "Now for the part that still surprises me when I say it out loud." Let the two billion land on its own.
- **L38** → "What is not great yet." (drop "Being honest about")
- **L34** consider dropping "1,674 illustrated assets" — the near one-to-one ratio in the next sentence says it.

### `2026-05-27-the-three-way-attack.md` — 2,320 words, trim ~180–220 words (8–9%)

> **Status: applied, 2026-05-27 post, 2,320 → 2,249 words (−71, ~3%).** Applied: opening paragraph, L26 three-step arc, L28 triad naming, L38 25% superlative, L52 meta-clause, L54 hedge → fragment, L58 restatement, L92/L94 double ending, and the three section heads now carry the triad. **Deliberately declined three proposed cuts** after a second read — the notes below are updated to say why: L86 (trimmed instead of deleted, the three-noun rhythm is the post's peak), L66 (all three water projections kept — three scales, three sources, and cutting one orphans footnote `[^10]`), and the Cancer Alley ladder L38–48 (kept intact — it is a deliberate six-step evidence ladder, not a pile-on).

This is the post that prompted the review. Verdict: it is **not** broadly bloated — the evidence sections are dense by design and read as evidence. The perceived verbosity is concentrated in three seams. Fix those and the post is tight without losing one unit of force.

**Seam 1 — the opening states the stakes five times in six sentences (L24).** Current text runs: pillaged by capitalism / land destroyed / no Americans / wasteland / profit-tier class / protect the land / nothing left / equivalent to dust. Suggested:

> Right now there is a generational battle for the United States of America. The battle to protect our environment. Because if we don't, it will be pillaged by capitalism. This is our first shared battle, and it needs to be escalated. If we don't do this, our land will be destroyed. There will be a wasteland, and a rich profit-tier class that is not living here anymore. If we don't protect the land, we will have nothing left.

**Seam 2 — the double ending (L92 and L94).** L92 already covers government absence plus "protect the land." L94 covers government absence plus cost-shifting again. Cut L94 down to: "We need to make a stand against data centers."

**Seam 3 — the Cancer Alley authority stack (L38–44).** *Revised after applying:* on a second read this is a deliberate six-step ladder — what it is → how bad → who documented it → who is responsible → who abandoned them → the broken promise. The HRW and EPA items are two different bodies making two different claims and they earn their place. Only the 25% superlative was cut (a fourth scale of the same superlative, stacked right after "over 200 plants" and "largest in the Western Hemisphere").

Other cuts:

- **L52** DELETE — "Here's something that made my jaw drop when I learned it — and I'm just learning this for the first time." Start at "For nearly 80 years…"
- **L86** *applied as a trim, not a delete* — the restated productivity clause is gone; the "Let that sink in / Trillions of dollars / Gigawatts / Billions of liters" rhythm is kept. The paragraph adds no information but it is the post's rhetorical peak.
- **L66** *declined on second read* — the three water projections sit at three different scales (one facility, global 2027, US 2030 with carbon) and cite three different sources. Cutting the middle one also orphans footnote `[^10]`. Left intact.
- **L26** → "…this is indistinguishable from magic. Then I became a user. Then I learned about the implications." (the three-step "Then I learned / Then I became / And then I learned" says the arc twice)
- **L58** → "And this is exactly what the corporate class is now doing to the rest of the United States." (L32 already framed Louisiana as the preview)
- **L54** the stacked "in exchange for... supposedly... jobs and economic growth" softens the indictment. Pick one.

**One coherence note, not a verbosity note:** the post runs two different triads. L28 names the three-way attack as "our society, our culture, and the land." The `description` names it as "corporate extraction, unchecked AI infrastructure, and a government that has abandoned its stewardship." Neither triad is tracked through the body — the sections run Louisiana, the ITEP giveaway, data centers, the bubble. Society and culture get asserted at L28 and then never developed; the argument is effectively about land and energy.

That is worth a decision from the author: pick one triad and let the section heads carry it, or drop "three-way" from the framing and let the post be what it actually argues. As written, the title promises a structure the body does not deliver — and that mismatch, more than any single paragraph, is probably why the post *feels* long.

### `2026-05-22-augment-humanity.md` — 675 words, trim ~60–80 words (8–11%)

Rant-essay. Keep the refrain, cut the count.

- **L14** "We are using AI incorrectly" fires three times in the opening paragraph with no development between repeats. Keep the first and the last; cut the middle. Note the middle one is what makes it curdle — two is incantation, three is a stall.
- **L16** drop the second "And we're using AI incorrectly" and open on "I'm tired of watching capitalists fire people…"
- **L18** DELETE the whole paragraph — "It's late. I've had a few drinks. I know this isn't enough to be a full piece. Most of what I say is always just intuition from observation. It's just one perception." This is the meta-commentary pattern at its purest. **Counter-consideration:** this is also the most human sentence in the post, and the late-night frame is real. If it stays, cut it to "It's late. I've had a few drinks." and drop the self-assessment half.
- **L22** → "Fire the many, mythologize the few." (drop "That's the playbook right there") and → "I'm just not down with it. Come on." (drop "It's just, I mean,")
- **L16** "It should be a boon. It should be a blessing." — pick one.
- **L28** "Just keep a few around and just, you know, have some balance. We don't need a ton of 'em." — three attempts at the same moderation point. "Less data centers." carries it.
- **L28** "Just give some AI tools to your employees with a reasonable budget and focus on the humans doing the work, and let the AI help them do their job better." — re-asks what L16 already asked.

Keep untouched: *Homo balance*, "we should have no destruction of planet Earth," the stewardship callback to `educated-citizens`, L26's personal turn, the sign-off.

### `2026-05-08-vibe-coding-with-deepseek.md` — 856 words, trim ~75–85 words (10–12%)

- **L12** → "The free ride was over." (the paragraph already opened with subsidized access running its course)
- **L32** the CLI thesis is delivered twice back to back — "should have a command-line interface" then "should almost entirely boil down to a CLI tool." Merge into one.
- **L32** → "Obviously there's huge risk there. But the pattern is already forming." (drop "and I don't want to get into that right now" — the post announcing what it will not cover)
- **L34** → "Cleaning it up afterwards is not fun." (L34 already granted the progress twice)
- **L28** DELETE — "That's the question I keep asking myself."
- **L38** DELETE — "I hope there's some nuggets of wisdom in here. If not, let me know and I'll expand on them." "It's Friday, I'll let you know how the rest of it goes" is the real sign-off.
- **L26** drop "It's a nice thinker" — filler adjective that delays the actually interesting clause about seeing the model work.

Keep untouched: "Tighten the harness, as they say, I'm kidding, nobody says that," "thank you Andrej Karpathy," the Godot MCP shoutout, the *Power of Now* patience bit, "Blender headless, Godot headless."

### `2026-05-07-human-archaeology-moving-as-a-compression-algorithm.md` — 941 words, trim ~60–85 words (7–10%)

Stream-of-thought, and the shagginess is the form. Only two things genuinely need to go.

- **L60** → "There's just so much stuff. And now I've gone through a slight transformation where I'm looking at things and going, I don't need this." Cut "I know I'm laboring the point and beating a dead horse" and the second "It was literally out of sight for the entire last year" (already at L24). The post diagnosing its own redundancy is worse than the redundancy.
- **L20** the box/awkward-size complaint circles the same joke four times and then jokes about counting objects. Cut at "Relatively large items where can I even put you in a box?"
- **L14** the metagaming definition restates itself three times before landing. Compress the preamble: "And metagaming, in this case, is what happens when the context window is overfull."
- **L48** → "That's the pattern." (drop "the real pattern I'm noticing" — the post grading its own insight)
- **L64** third use of the metagaming metaphor. Let the preceding "unresolved decisions / old context / memory packed into physical form" stand as the landing.
- **L56** the Texas rain aside is a genuine tangent — flagged only for awareness. It reads as weather-as-mood and it is probably intentional. Leave it.

Do not merge the Dayzee, yoga, "Peace" tail into a summary. The drift is the post.

### `2026-04-26-stream-of-thought-socialist-ai.md` — 516 words, trim ~65 words plus an optional 60-word tangent

The clearest single instance of "already stated" in the whole corpus.

- **L32** — this paragraph recaps L30 almost sentence for sentence ("The city houses the infrastructure for the models, people come to it and learn from it"), then tacks on two endings for one thought. Suggested: "That's the point. And that's the future I'm looking forward to." Saves ~36 words.
- **L24** → "They're just tools. They let you do more and build domain knowledge faster, if you use them for learning." ("really" twice plus "amazing companion" re-saying the claim)
- **L34** → "You're just a giant tool full of tokens, punk." The joke lands there; the normalized-weights tail slows the punchline.
- **L40** → "I moved today. I'll append my thoughts on moving from my audio journaling instead." (the "I could tell you about that, but instead… All right, it's not a lecture" narrates the choice not to write the post, then re-defines "lecture" three times)
- **L38** the game plug is a second consecutive tangent before the exit. Judgment call for the author per the voice rule — but the tail is three separate exits where one would do.

### `2026-04-20-why-i-kept-wordpress-and-bolted-laravel-on-top.md` — 2,178 words, trim ~110 words (4–6%)

Tight, well-paced case study. Cuts are deletions of points already made, not rewrites. The real structural item: the same two benefit lists appear at L52–66, then again in the recap at L318–322, then a third time at L332–334.

- **L334** DELETE — "It respected the engineering team enough to give them better abstractions: components, dependency injection, config, hot reload, and explicit boundaries." L318–322 just recapped these same wins; the post lands at L340–344.
- **L104** DELETE — "It means I can review a feature flag change in GitHub. I can roll it back with Git. I can test it." The L127–130 bullets already say reviewable changes, boring rollback, stable test inputs.
- **L178** DELETE the second sentence — "Here, one file changed and the rest of the stack stayed in sync." L171–176 already shows one token flowing into every layer.
- **L143** DELETE — "Blade components gave us a proper component model. Tailwind let us move quickly…" restates the L62–65 bullets. Keep the fake moustache line.
- **L304** DELETE — "There is a tendency in technical writing to make every decision sound inevitable in hindsight. I do not trust that tone, and I try not to write that way." L306 says the stack has tradeoffs; the rest narrates its own honesty.

Keep untouched: "Save. Refresh. Click through admin.", "Keep WordPress. Bolt Laravel on top.", "folklore system", "offensively simple", "nicer shovel," and the closing three-line cadence.

### `2026-03-21-time-to-reinvent-the-wheel.md` — 1,027 words, trim ~55 words (4–6%)

Mostly deliberate stream-of-thought. The bookend repeats ("I'm the OG Neuromancer" at L25/L47, the wheel/collapse motif at L21/L49) are intentional — trim the closing version, do not cut the callback.

- **L49** → "If there are any theoretical physicists reading this, go back and read the wheel segment again. I think there's something there. We're going to work on it." (drop "please," "reinventing the… over again," and tighten)
- **L37** the turtle-pace joke overruns: "Something slower. Something in between. A cell? Well actually those move quite quickly. But whatever, it's slow. Geologic perhaps." → "Something slower. Geologic perhaps. I kid, I kid."
- **L27** "when I'm approaching writing I'm approaching it from" → "when I approach it from"
- **L29** "I very much read a lot" → "I read a lot"
- **L33** "But it's also interesting to note I did like the fact that she was putting" → "But I did like that she put"

### `2026-01-24-changing-landscape.md` — 1,440 words, trim ~50 words (4–6%)

Register note: this post is more formally written than the 2026 stream-of-thought pieces, and the polished sentences are not the problem.

- **L81** **real artifact — fix this regardless of any other decision on this list.** "When I say 'the only issue,' I'm referring to…" — the phrase "the only issue" never appears in the post. The preceding sentence says "The concern I have isn't with this technology itself—it's with _who controls the most advanced models_." The meta-clause is a leftover from an earlier draft. Go straight: "…it's with _who controls the most advanced models_—companies like Anthropic and OpenAI, and how governments have signed agreements…"
- **L79** → "And that's just scratching the surface." (drop "The possibilities for personalized software are endless." — same claim)
- **L83** → "Sadly, the planet will take a punch to the stomach too:" (an AI divide was re-announced; L83 already established it)
- **L29** → "Code is just an artifact." (drop "Here's the truth that many thinkers in this space have been saying for years")
- **L33** DELETE — "This shift is revealing weaknesses at an organizational level." L21 already said it.

Also consider L91 "The landscape is changing fast." — the title and L21 already established it — and L57's "Although I'm not the first to say it."

Keep the L97 "I'll repeat:" recap. It reads as deliberate.

### `2026-01-13-new-world-order.md` — 495 words, already tight (1.8/5), trim ~25 words

- **L35** DELETE "It's about accessibility." — sandwiched between two sentences that both say accessibility.
- **L37** DELETE "I have no worry about that. They are complex—I know this." The concession before it already covers the ground.
- **L23** → "…and the people building the technology are creating it." (drop "the ones")
- **L23** → "It demands a new world order." (drop "And I think")
- **L27** → "…because of the bots." (drop "which account for so much spam and noise in today's society")

Keep the repeated accessibility / "for everyone" cadence. It is the rhetorical beat, not bloat.

### `2025-12-06-unchecked-capitalism-and-social-systems.md` — 736 words, already tight, trim ~30 words

- **L23** third pass on the same beat: "shocking not only because it is legal" + "profound ethical void" + "The legality of such investments does not make them moral." Keep one. "Legal isn't moral." is the whole idea in his register.
- **L41** DELETE "The squeeze we feel from the capitalist oligarchy is real, but so is the potential for change." L39 already lands "We have the power and the resources."
- **L27** DELETE "It becomes a revolutionary betrayal of the social contract." — "it fails that mandate" is the same claim minus the unclear "revolutionary."
- **L31** → "It comes down to the foundations we build our lives on." (drop "This perspective may seem controversial to some, but")
- **L37** → "The government is not an abstract entity; it is us." (drop "We must remember that")

Lines 39 and 41 are two closings in a row. Let one land before the sign-off.

---

## Not yet reviewed

These are outside the "latest twelve" scope. Flagged as candidates, with no findings claimed about them:

- `my-philosophies.md` (2,585 words, 2023) — the longest non-technical post in the corpus.
- `educated-citizens.md` (1,735 words) — frequently cross-referenced as the stewardship origin post.
- `moonlighters-tale-1.md` (1,109 words) — narrative voice, different register again.
- `2025-06-27-korea-japan.md` (1,578 words) — travel narrative; L124 already ends on "Anyway, I'm going to stop here and somehow figure out how to edit this content," which is the meta-commentary pattern in a travel piece.
- `rsi-developer-cautionary-tale-and-how-talon-saved-my-life.md`, `die-before-dying.md`, `react-slick-horizontal-slider.md` — 2024 posts, unreviewed.
