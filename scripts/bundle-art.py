"""Package self-contained layered card sources; Python standard library only."""
from pathlib import Path
import zipfile

output = Path('static/downloads/heavens-gate-layered-art.zip')
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
    for path in sorted(Path('static/art/layers').glob('*.svg')):
        archive.write(path, 'layers/' + path.name)
    archive.write('static/art/prompts.json', 'prompts.json')
    archive.write('static/art/back-prompts.json', 'back-prompts.json')
    archive.write('LICENSE', 'COPYING')
    archive.write('docs/artwork.md', 'README.md')
    for path in Path('docs/licenses').glob('*'):
        archive.write(path, 'font-licenses/' + path.name)
print(f'Bundled 27 card fronts and three backs: {output}')
