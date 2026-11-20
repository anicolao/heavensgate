# Artwork and production

The 27 foreground paintings are individual illustrations, not a single collage
cropped into cards. The Angel figures, symbolic Decrees, and Final Judgments all
use the same painterly cream-and-gold brief. Every foreground and the common
ornamental border have genuine alpha transparency. The architecture is a separate
opaque background. Full prompts are in `static/art/prompts.json`.

The browser card comprises five independently editable layers: paper, background,
foreground painting, live typography, and frame. No card rules are baked into a
generated image. The layered SVG exports reproduce that structure using named
Inkscape layers and editable SVG text. Illustrations remain embedded raster art;
the SVG is an editable composition, not a claim that the painting is vector art.
Original high-resolution PNGs remain in `static/art/source/`.

The three card backs are complete, distinct paintings, not compositions of HTML
or live type. Angels use wings and halos, Decrees use scrolls and a solar seal,
and Final Judgment uses gold scales with blue enamel accents. Their SVG source
wrappers embed only the artwork image. Prompts are in `static/art/back-prompts.json`.

To change art, supply a new transparent foreground PNG at the matching ID, run
`bun run art:prepare`, then refresh `bun run art:layers` against the dev server.
To change a rule, edit the authoritative Markdown and regenerate the catalog;
review the concise card copy for the same change. Export and inspect PDFs again
after changes to art, copy, fonts, or layout.

The SVG source renderer and Svelte renderer share the same card data. SVG exports
use native text wrapping measured in the browser; Svelte uses fluid live text.
Both are checked for text fit. The printable PDFs come from the Svelte component.
All source PNGs, WebP assets, SVG layers, and card typography are GPL-3.0-only,
apart from fonts carrying their own upstream licenses.
