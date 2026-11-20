# Production verification

Verified on 20 November 2026 before opening the initial illustrated-components PR.

- `bun run check`: zero errors and zero warnings.
- `bun test`: seven tests passed, 851 assertions, covering the complete catalog,
  physical cut-mark bounds, both paper sizes, duplex mirroring including partial
  sheets, genuine alpha in all foreground PNGs, and editable self-contained SVGs.
- `bun run review`: 27 gallery cards, ten Decrees after filtering, one Mirror
  search result, ten matching backs, working inspector, no browser exceptions,
  no card text overflow in any of four print variants, and no horizontal overflow
  on 390-pixel mobile screens in gallery, rules, or print shop.
- `PUBLIC_BASE_PATH=/heavensgate bun run build`: static build passed. The home,
  gallery, print shop, and rules loaded from a plain static server under that
  repository prefix with HTTP 200, complete images, and no browser exceptions.
- Original artwork and complete print sheets were visually inspected. Both
  rulebooks were rendered page by page for visual review, including repeated
  reference-page margins, page numbers, formation examples, and scoring tables.
- All nine PDFs were reopened and their page sizes and nonempty content checked.
  A4 and Letter rulebooks each contain 16 pages; complete card decks each contain
  six pages; A4 fronts-only contains three; table essentials each contain five.
- PDF color streams are compressed while text remains vector and transparency
  masks remain lossless. Original source PNGs and SVG layers are unchanged.

The checks validate production layout and interaction. Physical printer feed
registration depends on the printer; the print shop provides back offsets and
instructions to test the first front/back pair at actual size.

Screenshots and detailed machine reports are produced under ignored `tmp/qa/`.
Selected visual previews are versioned in `docs/previews/` for PR review.
