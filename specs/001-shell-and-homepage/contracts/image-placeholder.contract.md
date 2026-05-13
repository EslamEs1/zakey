# Contract — Image Placeholder

**Scope**: Every `<img>` on the site MUST follow this contract so
that (a) markup never changes when real photography is swapped in,
and (b) a missing or slow image never collapses the layout.

## Filename & path

- Path shape: `assets/images/<category>/zakey-<slug>.<ext>`.
- `<category>` is one of: `hero`, `products`, `solutions`,
  `technology`, `projects`, `blog`, `lifestyle`.
- `<slug>` is lowercase, hyphen-separated, descriptive.
- `<ext>` is `jpg` for photography, `png` for transparent mockups,
  `svg` for diagrams/icons.

Examples:

```
assets/images/hero/zakey-smart-home-hero.jpg
assets/images/products/zakey-aura-panel.jpg
assets/images/products/zakey-secure-kit.jpg
assets/images/products/zakey-climate-hub.jpg
assets/images/solutions/zakey-smart-villa.jpg
assets/images/technology/zakey-mesh-bridge.svg
assets/images/projects/zakey-villa-case.jpg
assets/images/blog/zakey-article-01.jpg
```

## Markup pattern

```html
<figure class="zk-image" style="--ratio: 16 / 9;">
  <img class="zk-image__img"
       src="./assets/images/products/zakey-aura-panel.jpg"
       alt="Zakey Aura Panel mounted on a textured wall, glowing softly"
       width="1280" height="720"
       loading="lazy"
       decoding="async">
</figure>
```

- `--ratio` custom property on the figure drives `aspect-ratio` so
  the container reserves space before the image loads.
- `loading="lazy"` on every image below the fold; `loading="eager"`
  on the hero image.
- `decoding="async"` everywhere.
- `alt` MUST be descriptive, ≤ 120 chars, MUST NOT be empty or
  generic ("image", "photo", "Zakey product").

## Placeholder fallback

`css/styles.css` includes:

```css
.zk-image {
  position: relative;
  aspect-ratio: var(--ratio, 16 / 9);
  background: linear-gradient(135deg, var(--color-bg-elevated), var(--color-bg-deep));
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.zk-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

So even if the `<img>` 404s, the figure still occupies layout and
shows a subtle gradient surface in the brand palette.

## Phase 01 placeholder assets

Until real photography is shot, the files under `assets/images/`
are checked-in SVG placeholders:

- Each is a 1280×720 (or category-appropriate ratio) SVG with a soft
  brand-coloured gradient and the product/space name set in the
  display font at 6% opacity.
- File names match the canonical paths above so markup needs no
  change when real photos arrive — just replace the file.

## Acceptance probe

1. `grep -rE 'alt=""' index.html pages/` returns zero matches.
2. `grep -rE 'src="[^"]*"' index.html pages/ | grep -v "loading="`
   returns zero matches (every `<img>` has a `loading` attribute).
3. Manually rename one image file to break it — section preserves
   its height and shows the gradient fallback.
4. Real-photo swap: replace `assets/images/products/zakey-aura-panel.jpg`
   with a real photo — homepage renders the new photo with no markup
   change.
