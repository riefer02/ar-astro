---
title: "Why I Kept WordPress (and Bolted Laravel On Top)"
pubDate: 2026-04-20
description: "A technical case study in building a modern membership site with Sage 11, Acorn 5, Blade, and config-as-code without going headless."
author: "Andrew Riefenstahl"
image:
  url: "@/assets/images/why-i-kept-wordpress-and-bolted-laravel-on-top-og.jpg"
  alt: "A stylized Shih Tzu between WordPress and Laravel symbols in a modern publishing stack illustration"
tags:
  [
    "WordPress",
    "Laravel",
    "Sage",
    "architecture",
    "CMS",
    "Blade",
    "Acorn",
  ]
---

Every greenfield WordPress conversation in 2026 eventually drifts toward headless Next.js.

Ours did too.

We still did not do it.

Instead, we kept WordPress and bolted Laravel on top of it.

That sentence sounds a little unhinged until you look at the actual constraints. This was a membership site, not a tech demo. The client needed the native WordPress admin. They needed Memberful. They needed Wordfence. They needed ACF. They needed the plugin ecosystem and the normal publishing workflow that non-engineers already know how to use. Going headless would have traded that entire operational surface area for a cleaner architecture slide and a lot more custom code.

So we made a different bet: keep WordPress where WordPress is strong, and import Laravel patterns where WordPress is weak.

The stack looked like this:

- Sage 11
- Acorn 5
- Blade
- Tailwind 4
- Vite 6 with HMR
- Alpine.js

That combination gave us a development loop that felt modern without throwing away the CMS our client was already paying for.

## The Case Against Going Headless

I like headless architecture when the problem actually demands it. If you need multiple clients, heavily bespoke frontends, or a product experience that is mostly application and barely content, sure. Take the operational hit and buy the flexibility.

But most WordPress projects are not suffering because the frontend is too coupled. They are suffering because the codebase has no boundaries, the configuration is trapped in the database, and every template is one `functions.php` detour away from becoming a folklore system.

That was the real problem to solve.

By staying in WordPress, the client kept the things that matter in day-to-day operations:

- native editorial workflows in wp-admin
- Memberful integration without re-implementing purchase and access flows
- existing security and plugin tooling
- ACF-backed content modeling
- standard publishing ergonomics for a non-engineering team

By layering in Sage and Acorn, we got the things I actually want as an engineer:

- Blade components instead of string-building templates
- View Composers instead of sprinkling queries through views
- dependency injection and service providers
- Vite with hot reload instead of save-refresh-pray
- a coherent place for configuration, helpers, and application logic

In other words, WordPress remained the operating system. Laravel supplied discipline.

That distinction matters. Most "modern WordPress" writeups stop at tooling. They say the project uses Vite now, maybe Tailwind, maybe Blade, and then quietly move on. That is not an architecture decision. That is a nicer shovel. The real question is whether the system becomes easier to reason about once the honeymoon phase ends.

In this case, yes.

## Config-As-Code Inside a WordPress Theme

The strongest architectural decision in the project was not Blade, or Tailwind, or even Acorn. It was this: anything that behaves like configuration should live in code.

That sounds obvious until you spend enough time in WordPress.

In a default WordPress setup, navigation lives in wp-admin. Pricing often lives in a plugin settings screen. Feature flags end up in `wp_options`. Marketing stats get typed into some field somewhere by someone who probably meant well. Then staging and production drift apart, nobody can diff changes in review, and the whole system starts operating on vibes.

We replaced that pattern with a small set of explicit config files:

- `config/features.php`
- `config/navigation.php`
- `config/memberful.php`
- `config/marketing.php`

The feature flag system was almost offensively simple:

```php
// config/features.php
return [
    'enable_events_cpt' => true,
    'enable_partners_cpt' => true,
    'enable_contact_submissions_cpt' => true,
    'use_wp_menu' => false,
    'home_show_quick_links' => false,
];
```

That file is five lines of PHP array syntax. It is also more operationally useful than a surprising amount of enterprise CMS configuration.

It means I can review a feature flag change in GitHub. I can roll it back with Git. I can test it. I can ship it through a normal deployment pipeline. I do not need a Slack message explaining which admin checkbox somebody clicked in staging three Tuesdays ago.

The same pattern scaled up cleanly. Marketing stats became explicit values:

```blade
{{ config('marketing.stats.network_size') }}
```

Navigation became a first-class, reviewable structure:

```blade
<x-navigation
  :items="$primaryNavigation"
  :membershipNav="$membershipNavigation"
/>
```

And membership pricing stopped being a hidden dependency tucked away in a UI screen. It lived in `config/memberful.php` with the rest of the application's assumptions.

That is not just cleaner code. It changes how a team operates.

When configuration lives in source control:

- changes become reviewable
- rollback is boring instead of ceremonial
- environment drift becomes visible
- tests have stable inputs
- onboarding improves because there is a single place to look

WordPress is unusually vulnerable to "database as config store" sprawl. Moving critical behavior into PHP arrays sidestepped one of the platform's worst defaults without losing its content editing strengths.

If I had to defend only one decision from this project, it would probably be this one.

## The Development Experience Did Not Feel Like WordPress

This matters more than people admit.

One reason headless builds keep winning internal arguments is that a lot of WordPress development feels miserable. Save. Refresh. Click through admin. Fix something in a template. Refresh again. Lose ten minutes to cache or plugin state. Repeat until your soul leaves your body.

Sage 11 plus Vite 6 changed the day-to-day experience substantially. Blade components gave us a proper component model. Tailwind let us move quickly without inventing utility classes for every new surface. Vite with HMR made the feedback loop feel like a modern frontend application instead of an old CMS wearing a fake moustache.

That is not just about developer happiness. Faster feedback loops change the quality of the work. You try more things. You refactor earlier. You notice visual regressions while the code is still in your head. You ship more intentionally.

There was another compounding benefit here: design tokens.

We used `theme.json` as the source of truth and let that propagate outward:

```text
theme.json
  ↓
Vite plugin wordpressThemeJson
  ↓
public/build/assets/theme.json
resources/css/app.css
Tailwind config
PHP helpers
```

The CSS layer looked like this:

```css
:root {
  --primary: var(--wp--custom--colors--primary, #51a4c4);
  --primary-dark: var(--wp--custom--colors--primary-dark, #2b5b71);
}
```

That single-source-of-truth setup meant one token update flowed into:

- Tailwind utility classes
- raw CSS variables
- the WordPress block editor
- PHP-side config access

Anyone who has maintained a design system across WordPress, CSS, and build tooling knows how rare that is. Normally you update the palette in three places and miss the fourth. Here, one file changed and the rest of the stack stayed in sync.

## The Auth Bug That Cost Us an Afternoon

This is the part I trust most in technical writeups: the bug story.

Elegant architecture is nice. Pain is memorable.

We lost an afternoon to a silent authentication issue that looked correct in Blade and was completely wrong in practice.

If you come from Laravel, `@auth` and `@guest` look like the obvious thing to use:

```blade
@auth
  Welcome back, {{ $user->name }}
@endauth
```

The problem is that Acorn gives you Blade, but it does **not** wire Laravel's auth system into WordPress authentication. Those directives resolve through `Illuminate\Auth`, not `wp_get_current_user()` or `is_user_logged_in()`.

So the template rendered as if everyone were a guest.

Admins? Guest.
Members? Guest.
Actual paying subscribers? Also guest.

No exception. No warning. Just the worst kind of bug: quiet wrongness.

The fix was to stop pretending there was one auth layer. There were two:

1. WordPress identity
2. Memberful subscription state

That led to a simple, explicit branching pattern in templates:

```blade
@php
  $isLoggedIn = is_user_logged_in();
  $isMember = $isLoggedIn && memberful_is_member();
@endphp

@if ($isMember)
  {{-- Paid subscriber --}}
@elseif ($isLoggedIn)
  {{-- Logged in but not paying --}}
@else
  {{-- Guest --}}
@endif
```

Under the hood, the project cleaned this up further:

- `app/memberful-template-helpers.php` exposed Blade-friendly global helpers
- `app/memberful/access.php` handled the real access logic in namespaced code
- Composers passed structured access results into the view

The access layer returned something closer to application state than a boolean:

```php
[
    'can_access' => true,
    'reason' => 'subscriber',
    'required_plans' => [],
    'marketing_content' => null,
]
```

That mattered because the UI was not just allowing or blocking access. It also needed to explain *why*. A logged-in non-member sees an upsell. An admin gets a bypass. A subscriber sees the content. A restricted user might see plan-specific marketing copy.

That is the kind of integration bug you only get when two frameworks sit on top of each other and both look more complete than they are. It was not WordPress being broken. It was not Blade being broken. It was the seam between them.

And honestly, those seams are where most senior engineering work lives.

## Plugin Boundary Discipline Was the Real Architecture

The most important rule in the project was simple:

The theme renders. The plugin is infrastructure.

If it draws pixels for end users, it belongs in the theme.
If it registers content models, admin tools, integrations, or operational behavior, it belongs in the plugin.

That split looked like this:

| Theme | Plugin |
| --- | --- |
| Blade templates | CPT registration |
| View Composers | ACF field groups in code |
| Components | REST endpoints |
| Config files | Admin tools |
| Styling | bulk importers and seeders |
| Alpine client logic | external integration setup |

The reason I care so much about that boundary is because WordPress projects get messy fast. Logic seeps into templates. Admin behavior lands in theme files because it was convenient. Rendering concerns leak into plugins because somebody needed a quick helper and now everyone is afraid to touch it.

We tried to make the boundary defensible.

One of the best examples was the Page Template Mapper. It used a JSON file as a single source of truth for important pages, template assignments, and slug migrations:

```json
{
  "about": "page-about.php",
  "membership": "page-membership.php",
  "__front_page": "front-page",
  "__posts_page": "news",
  "__slug_migrations": {
    "old-slug": "new-slug"
  }
}
```

An admin action could then:

- create missing pages from seed data
- assign templates consistently
- rename slugs safely
- report exactly what changed

That is infrastructure-as-code, just expressed in the vocabulary of a WordPress site.

It also answers a question I ask on every CMS project: can we reproduce the content structure of this site on another environment without clicking around for half a day? If the answer is no, the system is more fragile than it looks.

This one could.

## The Tradeoffs Were Real, and I Would Still Make Them Again

There is a tendency in technical writing to make every decision sound inevitable in hindsight. I do not trust that tone, and I try not to write that way.

This stack absolutely has tradeoffs.

The onboarding cost is real. Junior developers do not open a Sage plus Acorn codebase and instantly know where to look. The classic WordPress question, "where is `functions.php`?", gets replaced with, "wait, what is a service provider and why is WordPress booting Laravel things?"

That is not fake complexity. It is actual conceptual overhead.

You also need discipline to keep the system coherent. If you adopt Laravel patterns halfway, you get the confusion without the upside. If your team cannot commit to boundaries, config-as-code, and a clear rendering model, you can absolutely build yourself a more sophisticated mess.

And no, this is not the right answer for every WordPress project. If the frontend truly needs to exist independently, or multiple consumer apps need the same content domain, or the product is fundamentally app-shaped rather than publication-shaped, I would revisit headless immediately.

But for this problem, the trade was worth it.

We kept the CMS capabilities the client actually needed.
We improved the development experience materially.
We made critical behavior reviewable in code.
We introduced real architectural boundaries.
And we did it without pretending WordPress had to become something else in order to be maintainable.

That last point is probably the main argument.

You do not always need to escape the platform. Sometimes you need to constrain it.

## Final Thought

What I liked most about this stack is that it respected both sides of the system.

It respected WordPress for what it is good at: editorial workflow, ecosystem leverage, and operational familiarity.

It respected the engineering team enough to give them better abstractions: components, dependency injection, config, hot reload, and explicit boundaries.

That balance is harder to find than people think.

Most teams either accept old WordPress pain as inevitable, or they overcorrect into a headless rebuild that burns time re-implementing what the CMS already handled well.

This project took a third route.

Keep WordPress.
Bolt Laravel on top.
Be honest about the seams.
And make the architecture earn its keep.
