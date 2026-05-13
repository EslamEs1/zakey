# Contract — Design Tokens

**Scope**: Canonical token names, values, and consumption surfaces.
Every page MUST resolve colours, spacing, type, radii, and shadows
through these tokens. Hard-coded literals inside component classes
are forbidden.

## Surface

Tokens are defined twice and kept in lockstep:

1. **CSS custom properties** on `:root` in `src/input.css` — usable
   from any hand-authored CSS.
2. **Tailwind theme extensions** in `tailwind.config.js` —
   usable from class names (`bg-bg-deep`, `text-text-muted`,
   `ring-accent`, etc.).

## Color tokens

```css
:root {
  --color-bg-deep:        #05070d;
  --color-bg-elevated:    #0c0f17;
  --color-bg-light:       #f5f7fb;
  --color-surface-muted:  #e7ebf3;
  --color-glass:          rgba(255, 255, 255, 0.06);
  --color-glass-strong:   rgba(255, 255, 255, 0.10);
  --color-text-primary:   #f5f7fb;
  --color-text-muted:     #9aa3b2;
  --color-text-ink:       #0c0f17;
  --color-accent:         #22d3ee;
  --color-accent-strong:  #06b6d4;
  --color-accent-soft:    rgba(34, 211, 238, 0.16);
  --color-luxe:           #c9a45c;
  --color-border:         rgba(255, 255, 255, 0.08);
  --color-success:        #34d399;
  --color-error:          #f87171;
}
```

Tailwind mapping (in `tailwind.config.js`):

```js
theme: {
  extend: {
    colors: {
      'bg-deep':       'var(--color-bg-deep)',
      'bg-elevated':   'var(--color-bg-elevated)',
      'bg-light':      'var(--color-bg-light)',
      'surface-muted': 'var(--color-surface-muted)',
      glass:           'var(--color-glass)',
      'glass-strong':  'var(--color-glass-strong)',
      'text-primary':  'var(--color-text-primary)',
      'text-muted':    'var(--color-text-muted)',
      'text-ink':      'var(--color-text-ink)',
      accent:          'var(--color-accent)',
      'accent-strong': 'var(--color-accent-strong)',
      'accent-soft':   'var(--color-accent-soft)',
      luxe:            'var(--color-luxe)',
      border:          'var(--color-border)',
      success:         'var(--color-success)',
      error:           'var(--color-error)',
    },
  },
}
```

## Typography tokens

```css
:root {
  --font-display: 'Manrope', 'Inter', system-ui, -apple-system, sans-serif;
  --font-body:    'Inter', system-ui, -apple-system, sans-serif;

  --font-hero:        clamp(2.5rem, 6vw + 1rem, 5.25rem);
  --font-section:     clamp(2rem, 3vw + 1rem, 3.25rem);
  --font-eyebrow:     0.875rem;
  --font-card-title:  clamp(1.125rem, 0.5vw + 1rem, 1.375rem);
  --font-body-base:   1rem;
  --font-body-lg:     1.125rem;
  --font-caption:     0.8125rem;

  --tracking-eyebrow: 0.18em;
  --tracking-hero:    -0.02em;
  --tracking-section: -0.015em;

  --leading-tight: 1.05;
  --leading-snug:  1.2;
  --leading-body:  1.65;
}
```

## Spacing scale

```
2  4  8  12  16  24  32  48  64  96  128  (px)
```

Surfaced as Tailwind extras `space-3xs … space-3xl` and as CSS custom
properties `--space-1 … --space-11`.

## Radii

| Token | px |
|---|---|
| `--radius-sm` | 6 |
| `--radius-md` | 10 |
| `--radius-lg` | 16 |
| `--radius-xl` | 22 |
| `--radius-pill` | 9999 |

## Shadows

| Token | Use |
|---|---|
| `--shadow-card` | Resting card on dark |
| `--shadow-elevated` | Hover/focus state on dark |
| `--shadow-glass` | Header glass surface |
| `--shadow-glow-cyan` | Accent CTA hover glow |

## Acceptance probe

1. `grep -nE "#[0-9a-fA-F]{3,6}" src/input.css | grep -v "^.*--color-"` returns **zero** results (no hex literals outside the token block).
2. Changing `--color-accent` to a different hue updates every primary CTA, every focus ring, and every accent surface on every page — verified by visual diff.
