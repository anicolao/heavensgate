"""Compress PDF color-image streams; preserve vector text and lossless alpha masks.

Requires PyMuPDF. Original source paintings and layered SVGs are untouched.
"""
from pathlib import Path
import fitz

for path in sorted(Path('static/downloads').glob('*.pdf')):
    before = path.stat().st_size
    document = fitz.open(path)
    seen = set()
    for page in document:
        for image in page.get_images(full=True):
            xref = image[0]
            if xref in seen:
                continue
            seen.add(xref)
            if image[2] < 200 or image[3] < 200:
                continue
            pixmap = fitz.Pixmap(document, xref)
            if pixmap.n != 3 or pixmap.alpha:
                continue
            original = document.xref_stream_raw(xref)
            compressed = pixmap.tobytes('jpeg', jpg_quality=92)
            if len(compressed) >= len(original):
                continue
            document.update_stream(xref, compressed, compress=False)
            document.xref_set_key(xref, 'Filter', '/DCTDecode')
            document.xref_set_key(xref, 'DecodeParms', 'null')
    temporary = path.with_suffix('.optimized.pdf')
    document.save(temporary, garbage=4, deflate=True)
    document.close()
    temporary.replace(path)
    print(f'{path.name}: {before / 1e6:.1f} -> {path.stat().st_size / 1e6:.1f} MB')
