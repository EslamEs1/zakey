# Contract — How-It-Connects Topology Diagram

**Scope**: The inline SVG diagram in Section 8 of every solution detail page. Each page authors its own diagram tailored to that solution (the subsystems included and emphasised differ per page).

## Markup shape

```html
<section class="topology-diagram u-section" aria-labelledby="topology-h">
  <div class="u-container">
    <p class="eyebrow">How it connects</p>
    <h2 id="topology-h">The Zakey ecosystem at a glance</h2>
    <p class="topology-diagram__lead">
      Every Zakey [solution name] deployment is built around a central Mesh Bridge that
      orchestrates every subsystem and talks to the Zakey Cloud, App, and voice assistants.
    </p>
    <figure class="topology-diagram__figure">
      <svg viewBox="0 0 600 360"
           role="img"
           aria-labelledby="topology-title"
           class="topology-diagram__svg">
        <title id="topology-title">
          Zakey [Solution Title] topology: a central Mesh Bridge linking
          [subsystem-1], [subsystem-2], …, and the Zakey Cloud.
        </title>

        <!-- Cloud node (top, single) -->
        <g class="topology-node topology-node--cloud" aria-hidden="false">
          <circle cx="300" cy="40" r="36" fill="var(--color-bg-elevated)" stroke="var(--color-accent)" stroke-width="2"/>
          <text x="300" y="46" text-anchor="middle" fill="var(--color-text-primary)" font-size="11" font-weight="600">Zakey Cloud</text>
        </g>

        <!-- Hub node (centre) -->
        <g class="topology-node topology-node--hub" aria-hidden="false">
          <circle cx="300" cy="180" r="56" fill="var(--color-accent)" stroke="var(--color-accent-strong)" stroke-width="2"/>
          <text x="300" y="178" text-anchor="middle" fill="var(--color-text-ink)" font-size="12" font-weight="700">Zakey Mesh</text>
          <text x="300" y="194" text-anchor="middle" fill="var(--color-text-ink)" font-size="12" font-weight="700">Bridge</text>
        </g>

        <!-- Decorative lines connecting hub to all nodes -->
        <line x1="300" y1="124" x2="300" y2="76" stroke="var(--color-border)" stroke-width="2" aria-hidden="true"/>
        <line x1="244" y1="180" x2="80"  y2="180" stroke="var(--color-border)" stroke-width="2" aria-hidden="true"/>
        … 6–7 more decorative lines …

        <!-- Subsystem nodes -->
        <g class="topology-node">
          <circle cx="80" cy="180" r="28" fill="var(--color-bg-elevated)" stroke="var(--color-border)" stroke-width="1.5"/>
          <text x="80" y="184" text-anchor="middle" fill="var(--color-text-primary)" font-size="10">Aura Panel</text>
        </g>
        … 4–6 more subsystem nodes …
      </svg>
      <figcaption class="sr-only">
        A topology diagram of the Zakey [Solution Name] deployment showing the central
        Mesh Bridge, every included subsystem, and the cloud connection.
      </figcaption>
    </figure>
  </div>
</section>
```

## SVG content rules

1. **One `<title>` element** as the first child of `<svg>`, with a sentence (40–120 chars) summarising the topology. The `<svg>` MUST carry `role="img"` and `aria-labelledby="topology-title"`.
2. **Hub node**: one central filled circle (accent fill), positioned roughly at the centre (`cx=300 cy=180` recommended). Text label split across two `<text>` elements ("Zakey Mesh", "Bridge") or one line if it fits.
3. **Cloud node**: one node positioned above the hub, labelled "Zakey Cloud" (or "Zakey Cloud + App + Voice" if space allows).
4. **Subsystem nodes**: 5–8 nodes around the hub, each:
   - Filled with `var(--color-bg-elevated)`, stroked with `var(--color-border)` (or `var(--color-accent)` for emphasised subsystems on this solution).
   - Sized ~28 px radius (smaller than the hub).
   - Labelled with the subsystem display name (e.g., "Lighting", "Climate", "Security").
5. **Decorative lines**: each line from hub to a node, and from hub to cloud, carries `aria-hidden="true"`. Use `var(--color-border)` for stroke.
6. **Subsystem inclusion**: each detail page picks 5–8 of the eight canonical subsystems (Central Control, Lighting, Curtains & Shading, Climate, Security, Sensors, Energy, App & Voice). Omit subsystems irrelevant to that solution (e.g., Gaming Room can omit Curtains and de-emphasise perimeter Security).
7. **Colour tokens only**: no hardcoded hex; every `fill` / `stroke` references a `--color-*` token.
8. **Viewbox**: 600 × 360 (no min-width or min-height attributes — let CSS size the SVG responsively).

## CSS contract

```css
.topology-diagram { background: var(--color-bg-elevated); }
.topology-diagram__figure { margin: 0; max-width: 720px; margin-inline: auto; }
.topology-diagram__svg    { width: 100%; height: auto; display: block; }
.topology-diagram__lead   { color: var(--color-text-muted); max-width: 56ch; margin-bottom: var(--space-8); }
.topology-node text       { user-select: none; pointer-events: none; }
```

## Per-solution topology guidance

| Solution | Recommended nodes | Notes |
|---|---|---|
| Smart Villa | All 8 (full ecosystem) | the "showcase" diagram |
| Smart Apartment | 6 (omit Curtains, emphasise Energy) | smaller-scale deployment |
| Smart Hotel | 7 (omit Energy) | emphasise Lighting, Climate, Security |
| Smart Office | 7 (omit Curtains) | emphasise Climate, Lighting, Sensors |
| Smart Compound | 8 + a "Multi-unit" node label variant | scale story |
| Gaming Room | 5 (Lighting, Climate, Sensors, App & Voice, Central) | omit Curtains, Security, Energy; emphasise Lighting |
| Elderly Care (optional) | 6 (emphasise Sensors, Security, App & Voice) | safety story |
| Smart Retail (optional) | 6 (Lighting, Climate, Security, Sensors, Energy, App & Voice) | retail focus |

## Acceptance probe

- [ ] SVG renders inline (no external file reference).
- [ ] The `<title>` element describes the topology in one sentence.
- [ ] The diagram has exactly one hub node, exactly one cloud node, and 5–8 subsystem nodes.
- [ ] Decorative connecting lines carry `aria-hidden="true"`.
- [ ] All colours reference `:root` tokens — no hardcoded hex.
- [ ] The diagram scales with viewport width (`width:100%`, `height:auto` via CSS) and stays readable at 360 px.
- [ ] Screen-reader pass: announces the title, then the labelled nodes, but skips the decorative lines.
- [ ] Inlined SVG markup weighs ≤ 1.5 KB per page (decorative path data kept terse).
