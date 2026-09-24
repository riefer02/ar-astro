---
title: "Laya Call Router: What a Small Decision Model Taught Me About AI Systems"
pubDate: 2026-09-24
description: "A narrow dealership call-routing experiment, the data and policy problems behind the score, and why knowing where the system should stop mattered more than chasing a bigger model."
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

The interesting part was not that the model got a reasonable score. It was finding out which parts of the system were actually responsible for that score.

The project is now public as [Laya Call Router](https://github.com/riefer02/laya-call-router). This is the technical story behind it.

## The one-minute version

We took a weak open decision model and gave it a narrow job: route dealership calls to the right team.

After building a synthetic data pipeline, fixing the taxonomy, separating model decisions from application policy, and measuring the result carefully, the local model reached:

| Measure                       | Local Laya v7 | `gpt-5.4-nano` | `deepseek-flash` |
| ----------------------------- | ------------: | -------------: | ---------------: |
| Joint routing cases           |     **71/81** |      **72/81** |        **73/81** |
| Median routing decision       |    **~20 ms** |        ~650 ms |        ~1,450 ms |
| Final team across 27 calls    |     **25/27** |          26/27 |            26/27 |
| API cost per routing case     |             — |      $0.000031 |        $0.000124 |
| API cost for 81 routing cases |             — |        $0.0025 |          $0.0100 |

The hosted cost figures are reported API spend for the routing cases in the v7 evaluation. The local MLX arm has no per-call API fee, but that does not make it free: hardware, electricity, and operations still cost something. These are not full-conversation or production infrastructure costs.

This is **not proof of general parity**. The test set has only 81 cases, the labels are partly synthetic, and one case changes the score by 1.23 percentage points.

It is still a meaningful result:

> A small local model can get close to paid frontier models on a bounded, high-volume decision task while being much faster, deterministic, inspectable, and free of per-call API fees.

The bigger lesson was not simply “the model improved.” It was:

> Data structure, label quality, business definitions, and policy boundaries mattered at least as much as the model architecture.

## What the model actually does

The model is not a chatbot. It never writes the customer’s reply.

It receives a state and typed questions, then chooses among supplied answers:

| Model decision | Example answers                                        |
| -------------- | ------------------------------------------------------ |
| Destination    | service, parts, sales, body shop, finance, front desk  |
| Request type   | tires, detailing, collision, order a part, lease terms |
| Vehicle        | sedan, SUV, truck, EV, not stated                      |
| Safety         | safe to drive, unsafe to drive                         |
| Handoff        | routine booking, person required                       |
| Appointment    | slot 1, slot 2, unclear                                |

Ordinary application code owns the rest:

```text
caller
  → typed decision
  → clarification / route / schedule / handoff
  → templated spoken reply
```

This separation makes the system easier to inspect. It also gives a small model a job it can actually do well: choose among known answers rather than invent an answer.

## The model started much lower

The stock Laya checkpoint was not already a dealership router.

| Model state               | Destination accuracy | Joint routing accuracy |
| ------------------------- | -------------------: | ---------------------: |
| Base Laya                 |                0.654 |                  0.519 |
| Fine-tuned v7             |                0.914 |                 0.8765 |
| Fine-tuned v7, full calls |                    — |       25/27 final team |

The jump is substantial. But it is important to describe what happened:

> We specialised a decision model for a narrow task. We did not make a general model generally intelligent.

That is a legitimate and useful kind of progress.

## “Parity” needs careful language

The scores are close, but the sample is small.

| Question                                 | What the evidence supports            |
| ---------------------------------------- | ------------------------------------- |
| Is Laya close to the paid models?        | **Yes, on this 81-case routing set.** |
| Are the models statistically equivalent? | **Not established.**                  |
| Will Laya match them on real calls?      | **Unknown.**                          |
| Is this useful product evidence?         | **Yes, for a narrow typed decision.** |

The hosted models were also non-deterministic, and their scores moved slightly between repeated runs. Their confidence intervals overlap.

The honest wording is:

> On this small, frozen, hand-labelled routing benchmark, the local model performed at roughly the same level as the two hosted models.

That is less dramatic than “we beat frontier models,” but much more useful.

## The teacher is a ceiling—but not always the final ceiling

The synthetic data was generated and checked using `deepseek-flash`.

That creates an important question:

> If a student is trained on teacher-generated labels, can it ever become better than the teacher?

### When the teacher defines the target

If a candidate is accepted only when the teacher agrees with the intended class, the teacher helps define the target distribution.

The student can become excellent at reproducing the teacher’s decisions. But if the teacher is consistently wrong about a business boundary, the student can learn that mistake very well.

### When humans define the target

Human labels can move the ceiling.

A specialist student can outperform a general teacher because:

- the teacher does not know the dealership’s policy;
- the taxonomy may be unfamiliar to it;
- language can be plausible while the operational decision is still wrong;
- humans can identify cases where several labels sound reasonable but only one is correct.

So the teacher is a ceiling on **teacher-generated supervision**, not necessarily on the real task.

There is still a model-capacity ceiling. Better labels cannot make an arbitrarily small model solve an arbitrarily complicated problem. In this project, however, the evidence says data and labels are currently the larger bottleneck.

## Two agreeing prompts are not independent labels

The original synthetic pipeline asked the same teacher model to label each utterance using two different prompt phrasings. A candidate was kept when both passes agreed with each other and with the intended target.

That is a useful **consistency filter**. It removes examples the teacher finds ambiguous.

It is not independent human annotation:

| Property                       | Same model, two prompts? |
| ------------------------------ | ------------------------ |
| Different wording              | Yes                      |
| Different model                | No                       |
| Different failure modes        | Not necessarily          |
| Independent business judgement | No                       |
| Evidence of stability          | Yes                      |
| Proof of correctness           | No                       |

This distinction mattered. A model can consistently assign the wrong label when the underlying business boundary is underspecified.

The stronger synthetic pipeline starts with a structured business contract:

```text
scope
vehicle context
safety applicability
destination
subqueue
required evidence
policy action
```

A generator renders that state as language. Other models verify that the rendered text actually expresses the state. The contract defines the label; the teacher does not get to invent the policy after the fact.

## The biggest gains came from structure

The first taxonomy treated several things as peer departments:

- tires;
- detailing;
- towing;
- and a catch-all category called `general`.

That was not how dealerships actually organise themselves.

A more accurate structure was:

| Old structure             | Better structure                                |
| ------------------------- | ----------------------------------------------- |
| Tires as a department     | Tires as a Service subqueue                     |
| Detailing as a department | Detailing as a Service subqueue                 |
| Towing as a destination   | Roadside as a dispatch/policy outcome           |
| `general`                 | Front-desk questions and non-customer enquiries |

This was not cosmetic. It changed what the model was being asked to learn.

The general lesson is simple:

> When a classifier keeps getting a boundary wrong, check whether the boundary is real before blaming the classifier.

A model cannot consistently learn a distinction that the product has not defined.

## The failures were not all overfitting

It is tempting to describe the model as “overfit and overconfident.” That was partly true, but the project had several interacting problems.

| Problem                | What it looked like                                        |
| ---------------------- | ---------------------------------------------------------- |
| Distribution mismatch  | Synthetic training text was much longer than caller speech |
| Taxonomy ambiguity     | Some requests had more than one defensible owner           |
| Correlated supervision | Two prompt variants shared one teacher’s assumptions       |
| Confidence saturation  | The model was often certain even when wrong                |
| Policy leakage         | A safety answer could overwrite the route                  |
| Historical leakage     | Some earlier snapshots contained held-out examples         |

The project became much more useful once we stopped treating every failure as a model-quality problem and started measuring the entire path:

```text
data → label → model decision → policy → user-visible action
```

## The safety lesson

A high-recall safety classifier can still be operationally poor.

In one evaluation, the model caught all 18 labelled hazards, but it also flagged 3 of 27 safe callers as unsafe.

| Safety measure             |                                                         Result |
| -------------------------- | -------------------------------------------------------------: |
| Hazard recall              |                                                          18/18 |
| False alarms on safe cases |                                                           3/27 |
| Deployment implication     | False alarms can become expensive at low real-world prevalence |

The evaluation set was deliberately enriched. Unsafe calls were much more common there than they would be in real traffic.

That means precision measured on the enriched set does not automatically transfer to deployment. The same false-alarm rate can produce many unnecessary roadside responses when the real prevalence is low.

The design conclusion:

> Treat a high-recall safety classifier as a triage screen, not automatically as the authority that authorises a high-consequence action.

A safer product uses explicit applicability, clarification, and human confirmation. A binary safety answer should not silently replace the entire route.

## The off-topic call was a product bug too

One demo scenario describes a caller discussing a neighbour’s dog. The model interpreted it as a vehicle problem, marked the vehicle unsafe, and routed to roadside assistance.

Generating more similar sentences might reduce the frequency of that mistake. But it would not establish the required invariant:

> An unrelated or unresolved call must not trigger vehicle dispatch.

That led to an explicit scope decision:

| Scope               | Policy                |
| ------------------- | --------------------- |
| Dealership business | Continue routing      |
| Unrelated           | Transfer or close     |
| Unclear             | Ask for clarification |

Safety is evaluated only when a vehicle condition is applicable.

This is the kind of structure that makes a typed-decision system more than a classifier with a confidence number.

## What we learned about RLCD

The Laya training recipe is interesting, but it should be described accurately.

The typed fine-tuning objective combines:

- a proper-scoring-rule reward;
- Gaussian perturbations of option logits;
- a policy-gradient-style estimator;
- and a supervised cross-entropy anchor.

It is not full online reinforcement learning. There is no environment transition, delayed reward, value network, PPO ratio, clipping objective, or trust-region penalty.

A useful description is:

> A supervised typed-decision trainer with an RL-style gradient estimator for the probability distribution.

Because many targets are one-hot, ordinary cross-entropy is already closely related to the negative log score. The RL term may help, but it may also add variance without adding much information.

The next controlled comparison should be:

| Arm | Objective                                              |
| --- | ------------------------------------------------------ |
| 1   | Cross-entropy only                                     |
| 2   | Cross-entropy + directly differentiated proper scoring |
| 3   | Cross-entropy + reparameterised noisy scoring          |
| 4   | Current policy-gradient estimator                      |

All arms should use the same data, seeds, optimizer settings, and evaluation splits.

Until that comparison exists, the safest conclusion is:

> The data and task structure made this work possible. RLCD is a promising component, but its incremental contribution has not yet been isolated.

## Speed is a product feature

The local routing decision had a median runtime of roughly 20 ms. The hosted routing calls were roughly 650 ms and 1,450 ms.

Those are not complete conversation benchmarks. A full call includes multiple turns and application work. But the model is fast enough to sit in front of a larger workflow:

```text
fast local decision
    ↓
clarify or route
    ↓
database, scheduler, larger model, or human
```

The small model becomes a quick front door.

That is useful for:

- customer support;
- call centres;
- document processing;
- moderation;
- triage;
- game-state decisions;
- local privacy-sensitive applications.

## Local does not mean free

The local model avoided per-call API fees, but it did not remove every cost.

| Option                     | Privacy                  | Customisation | Cost profile                      |
| -------------------------- | ------------------------ | ------------- | --------------------------------- |
| Local model                | Strongest                | Full          | Hardware, electricity, operations |
| Hosted custom checkpoint   | Better than a public API | Full          | Fixed infrastructure cost         |
| Managed fine-tuning API    | Provider-dependent       | Restricted    | Training and inference fees       |
| Third-party classifier API | Provider-dependent       | Low           | Per-call cost                     |
| Frontier text API          | Provider-dependent       | Low           | Per-call cost and latency         |

At low volume, a hosted inference service may be cheaper and simpler. At high volume, a dedicated local or hosted deployment may become more economical.

Privacy is also a property of the entire pipeline. If real calls are sent to a hosted teacher for labelling, the data leaves the local environment even if the final inference model later runs locally.

The right question is not simply:

> Is local electricity cheaper than an API?

It is:

> Is the total cost of operating a reliable model lower than the recurring cost, latency, privacy, and lock-in cost of the API at our actual volume?

## Deployment thoughts — not implemented

The repository currently demonstrates the local decision layer. It does not contain a production hosting service, an audio/phone integration, or a measured cloud benchmark.

If the model were actually deployed, the simplest path would be a native Laya service with a pinned checkpoint and a small operational surface. It should record at least:

- request and checkpoint identity;
- typed decision and policy outcome;
- latency, error, and handoff counts; and
- the distinction between model output and the final user-visible action.

A LiteLLM-style proxy could be useful for centralized usage, budget, and provider controls, but it should only be placed in front of the service after confirming that the typed Laya protocol can be represented faithfully. A generic OpenAI-compatible chat proxy is not automatically compatible with an application that needs structured decision fields and policy metadata.

These are deployment design notes, not additional evidence. There is intentionally no hosting-cost table here until a real deployment workload, concurrency profile, and cold-start behavior have been measured.

## Where Laya fits in a product

Laya is not trying to be the entire product. It is a fast decision layer that can sit before:

- a larger language model;
- a retrieval system;
- a scheduling service;
- a database;
- a rules engine;
- or a human operator.

A realistic flow is:

```text
user input
  → scope and intent decision
  → clarification or typed extraction
  → deterministic policy
  → specialist service or larger model
  → human handoff when confidence or policy requires it
```

The principle is not “automate everything.” It is:

> Automate the decisions that are bounded, frequent, measurable, and safe to make with an auditable fallback.

## The useful conclusion

The system works best when the caller stays close to the structured examples it was trained on. That includes ordinary dealership requests such as “I need an oil change” or “I want to buy a car.” It is much less reliable when the conversation contains small talk, hesitation, corrections, multiple requests, or unrelated material.

That is not a surprising result. The model was trained as a narrow typed-decision component, not as the entire conversational brain of a dealership phone system. Small talk is not merely extra text to ignore: it changes the distribution of the transcript and can make the model infer a vehicle context or choose a route too early. The model is also overconfident on some incorrect decisions, so a high probability is not evidence that the decision is correct.

The typed demo makes this limitation especially visible. Typed input is cleaner than real phone audio, so failures with small talk are a warning sign rather than something we can dismiss as an ASR problem. The existing cascade also matters: a wrong early destination, a pinned decision, or an over-eager safety answer can affect the rest of the call even when the model itself is only one component.

The result should therefore be stated narrowly:

> The current Laya model is promising for clean, bounded decision points inside a controlled workflow. It has not yet demonstrated reliable handling of messy natural dealership conversations.

The next useful test is a small frozen typed-conversation stress set, not a larger reinforcement learning run. It should include clean requests, polite small talk, hesitation, self-corrections, multiple requests, incomplete information, unrelated calls, and cases that should trigger clarification or human handoff.

For each case, we should record where the system first diverges:

| Divergence                          | Likely lesson                   |
| ----------------------------------- | ------------------------------- |
| Wrong destination                   | Data or model robustness        |
| Correct destination, wrong subqueue | Taxonomy or question wording    |
| Correct route, wrong safety action  | Policy or state handling        |
| Early decision never recovers       | Pinning or conversation state   |
| Unrelated call reaches dispatch     | Scope guard and fallback policy |

This framing is more useful than declaring the model either “ready” or “useless.” It identifies the actual boundary of the result and gives us a concrete, evidence-based way to improve the system.

## What I would do next

The next experiment should not immediately be a larger RL run.

| Step                          | Purpose                                                          |
| ----------------------------- | ---------------------------------------------------------------- |
| 1. Build realistic text calls | Short, messy, interrupted, corrected, incomplete turns           |
| 2. Separate the labels        | Scope, route, subqueue, safety, dispatch, handoff, clarification |
| 3. Freeze a new test set      | Prevent test-driven relabelling                                  |
| 4. Run shadow mode            | Compare without changing the live workflow                       |
| 5. Measure the final action   | Not just the classifier label                                    |
| 6. Review disagreements       | Humans identify ambiguous policy boundaries                      |
| 7. Decide on another run      | Only after the evidence justifies it                             |

The missing ingredient is not necessarily more synthetic data. It is data that matches the distribution of the world where the product will actually run.

## Final thought

This experiment did not prove that every application should replace a frontier model with a small local one.

It proved something more specific and more encouraging:

> For a narrow, structured, high-volume decision, a small local model can be a serious product option. Its quality is strongly determined by the structure and quality of its data, its labels, and the policy that consumes its decisions.

The model gets attention because it is fast and visible. The real contribution is the system around it: clearer decisions, explicit boundaries, honest evaluation, and a safe path for uncertainty.

That is the part worth sharing.

If you want to inspect the actual system, the code, the reports, and the known failure, everything is in the public [Laya Call Router repository](https://github.com/riefer02/laya-call-router).

## Source notes

The measurements in this article come from the repository’s versioned reports, especially:

- [`results/eval_v7.json`](https://github.com/riefer02/laya-call-router/blob/main/results/eval_v7.json)
- [`results/severity_v7.json`](https://github.com/riefer02/laya-call-router/blob/main/results/severity_v7.json)
- [`results/diagnostics_logits_v7_phase_a.json`](https://github.com/riefer02/laya-call-router/blob/main/results/diagnostics_logits_v7_phase_a.json)
- [`LEARNINGS.md`](https://github.com/riefer02/laya-call-router/blob/main/LEARNINGS.md)
- [`experiments/phase-a-v7-diagnostics/`](https://github.com/riefer02/laya-call-router/tree/main/experiments/phase-a-v7-diagnostics)

The discussion of Laya and RLCD is based on the official Laya repository and model card:

- [Laya repository](https://github.com/NandhaKishorM/laya)
- [Laya model card](https://huggingface.co/convaiinnovations/laya)
