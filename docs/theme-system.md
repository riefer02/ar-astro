# Theme System

This project uses semantic Tailwind tokens backed by CSS variables in `src/styles/globals.css`.

## Brand Palette

- `dust-grey`: `#dad7cd`
- `dry-sage`: `#a3b18a`
- `fern`: `#588157`
- `hunter-green`: `#3a5a40`
- `pine-teal`: `#344e41`

The active theme applies a deeper forest interpretation of this palette for stronger visual weight and contrast.

## Core Principle

Always use semantic color utilities instead of fixed palette scales.

- Use: `bg-background`, `text-foreground`, `bg-card`, `border-border`
- Avoid: `stone-*`, `gray-*`, or hard-coded hex values (except explicit brand colors)

## Primary Tokens

- `background` / `foreground`: base page contrast
- `card` / `card-foreground`: surfaces
- `primary` / `primary-foreground`: brand and high-emphasis actions
- `secondary` / `secondary-foreground`: subtle highlights
- `muted` / `muted-foreground`: supporting text and low-emphasis UI
- `accent` / `accent-foreground`: interactive hover/focus accents
- `border`, `input`, `ring`: form and focus treatment
- `surface-1`, `surface-2`, `surface-3`: decorative layers and gradients

## Accessibility Guardrails

- Body text should use `text-foreground` or `text-muted-foreground`
- Buttons should use token foreground/background pairs (`primary` + `primary-foreground`, etc.)
- Do not reduce text opacity below readability thresholds for primary content
- Keep focus styles visible with `ring-ring`

## Adding New UI

1. Start with semantic tokens only.
2. If a new visual role is needed, add a new CSS variable token first.
3. Map new token(s) in `tailwind.config.mjs`.
4. Reuse across components instead of one-off classes.
