---
title: "Laya Call Router: the little model that could"
pubDate: 2026-09-24
description: "A small local model, a narrow dealership call-routing task, and the data, policy, and engineering decisions that made it useful."
author: "Andrew Riefenstahl"
image:
  url: "@/assets/images/laya-call-router-overview.png"
  alt: "The Laya Call Router debugger showing caller turns, typed model decisions, policy steps, and a Body Shop route."
tags:
  - "AI"
  - "machine learning"
  - "Laya"
  - "research"
  - "open source"
  - "evaluation"
  - "data quality"
---

I kept asking whether a small local model could do something genuinely useful without turning the whole application into a chatbot.

The answer turned out to be yes, but only after making the task much narrower than I originally imagined. I gave Laya a small, typed job: read a dealership call and choose among known answers such as Service, Parts, Sales, Body Shop, or Front Desk. Ordinary application code then handled clarification, scheduling, booking, and the spoken reply.

The interesting part was not that the model got a reasonable score. It was finding out which parts of the system were responsible for that score.

The project is public as [Laya Call Router](https://github.com/riefer02/laya-call-router). This is the technical story behind it.

## The short version

I took a weak open decision model and gave it one narrow job: route dealership calls to the right team.

After building a synthetic data pipeline, fixing the taxonomy, separating model decisions from application policy, and measuring the result carefully, the local model reached:

| Measure                       | Local Laya v7 | `gpt-5.4-nano` | `deepseek-flash` |
| ----------------------------- | ------------: | -------------: | ---------------: |
| Joint routing cases           |     **71/81** |      **72/81** |        **73/81** |
| Median routing decision       |    **~20 ms** |        ~650 ms |        ~1,450 ms |
| Final team across 27 calls    |     **25/27** |          26/27 |            26/27 |
| API cost for 81 routing cases |             — |        $0.0025 |          $0.0100 |

The local model was close to the hosted models on this test, much faster, and free of per-call API fees. It was not free, though: hardware, electricity, and operations still cost something. These numbers are routing-case results, not full-conversation or production infrastructure costs.

This is not proof that every small model is as good as every frontier model. The test set has only 81 cases, the labels are partly synthetic, and one case changes the score by 1.23 percentage points. The hosted models were also non-deterministic and moved slightly between runs.

The useful claim is narrower:

> A small local model can be a serious option for a bounded, high-volume decision task.

The biggest lesson was not simply “the model improved.” It was that data structure, label quality, business definitions, and policy boundaries mattered at least as much as the model architecture.

## What the model actually does

The model is not a chatbot. It never writes the customer's reply.

It receives a state and typed questions, then chooses among supplied answers:

| Decision     | Examples                                               |
| ------------ | ------------------------------------------------------ |
| Destination  | service, parts, sales, body shop, finance, front desk  |
| Request type | tires, detailing, collision, order a part, lease terms |
| Vehicle      | sedan, SUV, truck, EV, not stated                      |
| Safety       | safe to drive, unsafe to drive                         |
| Handoff      | routine booking, person required                       |
| Appointment  | slot 1, slot 2, unclear                                |

Ordinary application code owns everything around the decision:

```text
caller
  → typed decision
  → clarification / route / schedule / handoff
  → templated spoken reply
```

That separation gives a small model a job it can actually do well: choose among known answers instead of inventing an answer. It also makes the final behavior easier to inspect.

## The model started much lower

The stock Laya checkpoint was not already a dealership router.

| Model state               | Destination accuracy | Joint routing accuracy |
| ------------------------- | -------------------: | ---------------------: |
| Base Laya                 |                0.654 |                  0.519 |
| Fine-tuned v7             |                0.914 |                 0.8765 |
| Fine-tuned v7, full calls |                    — |       25/27 final team |

The jump is substantial, but it is important not to describe it as a general intelligence result:

> We specialised a decision model for a narrow task. We did not make a general model generally intelligent.

That is still a legitimate and useful kind of progress.

## “Parity” needs careful language

The scores are close, but the sample is small. The evidence supports saying that Laya performed at roughly the same level as the two hosted models on this frozen 81-case routing benchmark. It does not establish statistical equivalence or tell us how the models will behave on real calls.

The hosted models' confidence intervals overlap, and their scores moved slightly between repeated runs. The honest version of the result is less dramatic than “we beat frontier models,” but more useful:

> On this small, frozen, hand-labelled routing benchmark, the local model was roughly comparable to the two hosted models.

The [full evaluation report](https://github.com/riefer02/laya-call-router/blob/main/results/eval_v7.json) has the detailed results and caveats.

## Data was the real bottleneck

The synthetic data was generated and checked using `deepseek-flash`. That creates a useful but tricky teacher-student relationship.

If a candidate is accepted only when the teacher agrees with the intended class, the teacher helps define the target distribution. The student can become excellent at reproducing the teacher, including a mistake the teacher makes consistently.

The first pipeline used two prompt phrasings with the same teacher model and kept examples when both agreed. That is a consistency filter, not independent human annotation. Different wording can reveal ambiguity, but it does not create a different model, a different business judgement, or a different set of failure modes.

The stronger pipeline started with a structured business contract:

```text
scope
vehicle context
safety applicability
destination
subqueue
required evidence
policy action
```

A generator rendered that state as language. Other models checked whether the rendered text actually expressed the state. The contract defined the label instead of asking the teacher to invent the policy after the fact.

A teacher is a ceiling on teacher-generated supervision, not necessarily on the real task. Human reviewers can move that ceiling by identifying cases where the language sounds plausible but the operational decision is wrong. There is still a model-capacity ceiling, but in this project the data and labels looked like the larger bottleneck.

## The taxonomy was part of the model

The first taxonomy treated several things as peer departments:

- tires;
- detailing;
- towing;
- and a catch-all category called `general`.

That was not how dealerships actually organise themselves.

| Old structure             | Better structure                                |
| ------------------------- | ----------------------------------------------- |
| Tires as a department     | Tires as a Service subqueue                     |
| Detailing as a department | Detailing as a Service subqueue                 |
| Towing as a destination   | Roadside as a dispatch/policy outcome           |
| `general`                 | Front-desk questions and non-customer enquiries |

This was not cosmetic. It changed what the model was being asked to learn.

> When a classifier keeps getting a boundary wrong, check whether the boundary is real before blaming the classifier.

A model cannot consistently learn a distinction that the product has not defined.

## The failures were system failures too

It is tempting to describe the model as “overfit and overconfident.” That was partly true, but several other problems were interacting with it:

| Problem                | What it looked like                                        |
| ---------------------- | ---------------------------------------------------------- |
| Distribution mismatch  | Synthetic training text was much longer than caller speech |
| Taxonomy ambiguity     | Some requests had more than one defensible owner           |
| Correlated supervision | Two prompt variants shared one teacher's assumptions       |
| Confidence saturation  | The model was often certain even when wrong                |
| Policy leakage         | A safety answer could overwrite the route                  |
| Historical leakage     | Some earlier snapshots contained held-out examples         |

The useful change was to stop treating every failure as a model-quality problem and measure the whole path:

```text
data → label → model decision → policy → user-visible action
```

### Safety is a policy problem, not only a classifier problem

In one evaluation, the model caught all 18 labelled hazards, but it also flagged 3 of 27 safe callers as unsafe.

That sounds like a good recall/precision trade until the prevalence changes. The evaluation set was deliberately enriched, so the same false-alarm rate could produce many unnecessary roadside responses in real traffic.

The design conclusion is straightforward:

> Treat a high-recall safety classifier as a triage screen, not automatically as the authority that authorises a high-consequence action.

A safer product uses explicit applicability, clarification, and human confirmation. A binary safety answer should not silently replace the entire route.

The same distinction showed up in an off-topic demo. A caller discussing a neighbour's dog was interpreted as a vehicle problem, marked unsafe, and routed to roadside assistance. More similar training sentences might reduce the frequency of that mistake, but the important invariant is simpler:

> An unrelated or unresolved call must not trigger vehicle dispatch.

So the product now has an explicit scope decision: continue routing for dealership business, transfer or close unrelated calls, and ask for clarification when the scope is unclear. Safety is evaluated only when a vehicle condition is applicable.

## RLCD is interesting, but not magic

The Laya training recipe combines a proper-scoring-rule reward, Gaussian perturbations of option logits, a policy-gradient-style estimator, and a supervised cross-entropy anchor.

It is not full online reinforcement learning. There is no environment transition, delayed reward, value network, PPO ratio, clipping objective, or trust-region penalty.

A better description is:

> A supervised typed-decision trainer with an RL-style gradient estimator for the probability distribution.

Because many targets are one-hot, ordinary cross-entropy is already closely related to the negative log score. The RL term may help, but it may also add variance without adding much information. The right next experiment is a controlled comparison of cross-entropy, directly differentiated proper scoring, reparameterised noisy scoring, and the current estimator using the same data, seeds, optimizer settings, and evaluation splits.

Until that exists, the safe conclusion is:

> The data and task structure made this work possible. RLCD is promising, but its incremental contribution has not been isolated.

The technical details are in the [Laya repository](https://github.com/NandhaKishorM/laya) and the [Laya model card](https://huggingface.co/convaiinnovations/laya).

## Speed is part of the result

The local routing decision had a median runtime of roughly 20 ms. The hosted routing calls were roughly 650 ms and 1,450 ms.

Those are not complete conversation benchmarks. A full call includes multiple turns and application work. But the model is fast enough to sit in front of a larger workflow:

```text
fast local decision
    ↓
clarify or route
    ↓
database, scheduler, larger model, or human
```

The small model becomes a quick front door. That is useful for customer support, call centres, document processing, moderation, triage, game-state decisions, and local privacy-sensitive applications.

Local inference also avoids per-call API fees, but it is not free. At low volume, a hosted service may be cheaper and simpler. At high volume, a dedicated deployment may become more economical. Privacy depends on the entire pipeline too: if real calls are sent to a hosted teacher for labelling, the data leaves the local environment even if final inference later runs locally.

The question is not just whether local electricity is cheaper than an API. It is whether the total cost of operating a reliable model is lower than the API's recurring cost, latency, privacy, and lock-in costs at our actual volume.

## The important limitation

The system works best when the caller stays close to the structured examples it was trained on. Ordinary requests such as “I need an oil change” or “I want to buy a car” are in the right distribution. Small talk, hesitation, corrections, multiple requests, and unrelated material make it much less reliable.

The typed demo makes that limitation especially visible. Typed input is cleaner than real phone audio, so failures with small talk are a warning sign rather than something to dismiss as an ASR problem. A wrong early destination, a pinned decision, or an over-eager safety answer can also affect the rest of the call even when the model itself is only one component.

The result should therefore be stated narrowly:

> The current Laya model is promising for clean, bounded decision points inside a controlled workflow. It has not yet demonstrated reliable handling of messy natural dealership conversations.

The next useful test is a small frozen typed-conversation stress set, not a larger reinforcement learning run. It should include polite small talk, hesitation, self-corrections, multiple requests, incomplete information, unrelated calls, and cases that should trigger clarification or human handoff. For each case, we should record where the system first diverges: wrong destination, wrong subqueue, wrong safety action, an early decision that never recovers, or an unrelated call reaching dispatch.

That framing is more useful than declaring the model either “ready” or “useless.” It identifies the actual boundary of the result and gives us a concrete way to improve the system.

Laya is not trying to be the entire product. It is a fast decision layer that can sit before a larger model, retrieval system, scheduling service, database, rules engine, or human operator. The principle is not to automate everything. It is to automate the decisions that are bounded, frequent, measurable, and safe to make with an auditable fallback.

## The takeaway

This experiment did not prove that every application should replace a frontier model with a small local one.

It showed something more specific:

> For a narrow, structured, high-volume decision, a small local model can be a serious product option. Its quality is strongly determined by the structure and quality of its data, its labels, and the policy that consumes its decisions.

The model gets attention because it is fast and visible. The real contribution is the system around it: clearer decisions, explicit boundaries, honest evaluation, and a safe path for uncertainty.

The code, reports, known failure, and next experiments are in the [Laya Call Router repository](https://github.com/riefer02/laya-call-router).

## Source notes

The measurements in this article come from the repository's versioned reports:

- [`results/eval_v7.json`](https://github.com/riefer02/laya-call-router/blob/main/results/eval_v7.json)
- [`results/severity_v7.json`](https://github.com/riefer02/laya-call-router/blob/main/results/severity_v7.json)
- [`results/diagnostics_logits_v7_phase_a.json`](https://github.com/riefer02/laya-call-router/blob/main/results/diagnostics_logits_v7_phase_a.json)
- [`LEARNINGS.md`](https://github.com/riefer02/laya-call-router/blob/main/LEARNINGS.md)
- [`experiments/phase-a-v7-diagnostics/`](https://github.com/riefer02/laya-call-router/tree/main/experiments/phase-a-v7-diagnostics)
