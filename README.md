# Heaven’s Gate

A painterly tabletop game of divine organization and heavenly bureaucracy for
3–5 players. Three rounds, twelve Angels, and one promotion. Bring a standard
106-tile Rummikub set and racks; print the heavenly paperwork here.

## Run

```sh
bun install
bun run dev
```

- Home: http://127.0.0.1:5198/
- Component gallery: http://127.0.0.1:5198/gallery
- Illustrated rulebook: http://127.0.0.1:5198/rules.html
- Print & play: http://127.0.0.1:5198/gallery/print

Built with SvelteKit, TypeScript, and Bun, following the shared-component approach
of Hell’s Bells and the physical print layouts of Pantheon. `bun run check`,
`bun test`, and `bun run build` verify the project. The GitHub workflow builds
the complete static site as a downloadable PR artifact. It does not merge or
deploy the PR.

## The tabletop kit

Print one each of **12 Angel cards, 10 Heavenly Decrees, and 5 Final Judgments**.
Every card measures **63 × 88 mm**. Category-specific backs conceal identities;
pages alternate fronts and horizontally mirrored backs for long-edge duplex.
The print shop supports A4 and US Letter, full color or low ink, collection
filters, fronts/backs separately, and back-alignment offsets.

Table essentials include five Favor tracks, a Sanctuary/Purgatory region mat,
and a five-player score ledger. Choose fewer players in the print shop to reduce
track quantities. Bring an opaque bag, coins for Favor, and pencils. Tiles and
racks are deliberately not included in the printable kit.

Ready-made PDFs live in [`static/downloads`](static/downloads). Print at **100% /
actual size**, with browser headers/footers disabled. Enable background graphics
for color, use portrait paper, and test the first front/back pair before cutting.
The special-area mat is used only for the Angel that needs it; Scales commitments
remain separate on their owner’s rack.

## Rules and card text

[`HEAVENS_GATE_RULES.md`](HEAVENS_GATE_RULES.md) is authoritative and contains all
confirmed rulings. The two earlier Markdown files are historical inputs.
`bun run catalog` extracts complete Angel, Decree, and Judgment rules into
`src/lib/data/catalog.json`. Concise printable card copy is in
`src/lib/data/game.ts`; the inspector and rulebook retain the full reference.

`GameCard.svelte` is shared by gallery, teaching examples, and printable sheets.
The rulebook contains five illustrated learning pages followed by the full
authoritative reference, in both A4 and US Letter PDFs.

## Layered artwork

All 27 cards have original, individually generated painterly illustrations.
The palette is cream, ivory, antique gold, and muted blue-grey. Source art is
separate from typography and frames:

- `static/art/source/`: 29 original PNGs: 27 foreground illustrations with real
  alpha, one transparent ornamental frame, and one painted Heaven backdrop.
- `static/art/cards/`: aspect-preserving WebP assets used by the shared renderer.
- `static/art/layers/`: 27 self-contained card-front SVGs and three category-back SVGs, each with named Inkscape
  layers for paper, painted background, transparent illustration, editable native
  text, and transparent frame. They embed their assets and can be downloaded
  independently from each gallery inspector. Install the bundled app’s Cormorant
  Garamond and Atkinson Hyperlegible fonts for matching source-editor text.
- `static/art/prompts.json`: exact prompts and transparency settings, generated
  with the built-in `image_gen` tool. No API/CLI image-generation fallback used.

Run `bun run art:prepare` after adding source art. With the dev server running,
`bun run art:layers` refreshes the SVG sources. `python3 scripts/bundle-art.py`
packages the 30 SVGs, prompts, and licenses into the gallery’s downloadable ZIP.
Original paintings remain in Git;
the static build omits their large PNG copies, retaining web artwork and layers.
See [`docs/artwork.md`](docs/artwork.md) for editing and license notes.

## Export and visual review

With the dev server running, use `bun run review` to exercise gallery interaction,
check card text overflow, capture desktop/mobile screenshots, and export all nine
PDFs. It uses Playwright’s installed Chromium, or
`PLAYWRIGHT_CHROMIUM_EXECUTABLE`. On macOS it can use an existing Playwright cache.
On a fresh machine, `bunx playwright install chromium` installs the browser.
Set `REVIEW_URL` for another server URL.

`python3 scripts/optimize-pdfs.py` (requires PyMuPDF) compresses PDF color streams
while retaining vector text and alpha masks. This leaves original art untouched.
The committed PDFs are already exported and optimized, so Python and a browser
are unnecessary for normal builds. QA screenshots and machine reports are in
ignored `tmp/qa/` when review runs.

## License

Copyright (c) 2026 Heaven’s Gate contributors. Code, rules, generated artwork,
layered sources, and printable components are distributed under **GPL-3.0-only**;
see [LICENSE](LICENSE). Bundled fonts retain their upstream licenses, reproduced
in `docs/licenses/`. Rummikub is a third-party game; this project supplies an
independent variant’s supplementary components and does not distribute its tiles.
