# Production verification

Verified on 20 November 2026 for the card-art and typography polish PR.

- `bun run check`: zero errors and zero warnings.
- `bun test`: seven tests passed, 845 assertions, covering the complete catalog,
  physical cut-mark bounds, both paper sizes, duplex mirroring including partial
  sheets, genuine alpha in all foreground PNGs, and editable self-contained SVGs.
- `bun run review`: 27 gallery cards, ten Decrees after filtering, one Mirror
  search result, ten matching backs, working inspector, brief-only card text, all 27 unique card codes and set
  numbers, three image-only backs without text overlays, no browser exceptions,
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
  six pages; A4 fronts-only contains three; five-player table essentials each contain six, including two region mats.
- PDF color streams are compressed while text remains vector and transparency
  masks remain lossless. Compression does not modify source PNGs or SVG layers.

The checks validate production layout and interaction. Physical printer feed
registration depends on the printer; the print shop provides back offsets and
instructions to test the first front/back pair at actual size.

Screenshots and detailed machine reports are produced under ignored `tmp/qa/`.
Selected visual previews are versioned in `docs/previews/` for PR review.

The opening-meld and two-Angel-choice clarifications are included in both
rulebook editions. Each remains 16 pages; the print references use the same
9.5-point body type on both paper sizes, avoiding a nearly empty overflow page.

Page 4 now teaches Favor ranking and an untied draw example before explaining
ties. Forgiveness and named Angel timing exceptions are reserved for the
reference. Both regenerated rulebooks passed teaching-page overflow checks,
retain 16 pages, and page 4 was rendered and visually checked in both sizes.

Reference-page cream is painted by the named A4/Letter page styles, covering
the page margins as well as the content area. All 11 reference pages in each
PDF were checked at edges and corners; both editions remain 16 pages.
