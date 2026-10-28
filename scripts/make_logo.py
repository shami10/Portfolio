#!/usr/bin/env python3
"""Builds the logo (mark + wordmark outlines) from the site's display font.
Usage: python3 scripts/make_logo.py   (needs: pip install fonttools brotli cairosvg)
Writes public/logo*.svg, public/icon.svg and src/data/logo.json (used by the <Logo /> component)."""
import json, os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, "node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2")
font = instancer.instantiateVariableFont(TTFont(FONT), {"wght": 720, "opsz": 40, "wdth": 100})
gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
upm = font["head"].unitsPerEm

TEXT, TRACK, SIZE = "Ahtasham Anjum", -0.018, 30.0     # SIZE = em height in SVG units
s = SIZE / upm
x = 0.0
paths = []
for ch in TEXT:
    g = cmap[ord(ch)]
    pen = SVGPathPen(gs)
    gs[g].draw(TransformPen(pen, (s, 0, 0, -s, x, 0)))
    paths.append(pen.getCommands())
    x += hmtx[g][0] * s + TRACK * SIZE
word_w = round(x - TRACK * SIZE, 2)
word_d = " ".join(p for p in paths if p)
asc = font["OS/2"].sCapHeight * s
word_h = round(asc, 2)

MARK = (
    '<rect width="64" height="64" rx="17" fill="url(#g)"/>'
    '<path d="M17 48 32 15 47 48M23.5 36.5h17" fill="none" stroke="#fff" stroke-width="5.6" stroke-linecap="round" stroke-linejoin="round"/>'
    '<circle cx="50" cy="14" r="5.2" fill="#FF6B57" stroke="#fff" stroke-width="1.8"/>'
)
DEFS = '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8E73FF"/><stop offset="1" stop-color="#5A3EE0"/></linearGradient></defs>'

def lockup(fill):
    # mark 44 wide, wordmark baseline aligned to the mark's centre
    mark_scale = 44 / 64
    base = 22 + word_h / 2
    w = 44 + 14 + word_w
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.1f} 44" width="{w*2:.0f}" height="88" role="img" aria-label="Ahtasham Anjum">'
            f'{DEFS}<g transform="scale({mark_scale:.4f})">{MARK}</g>'
            f'<path transform="translate(58 {base:.2f})" d="{word_d}" fill="{fill}"/></svg>')

pub = os.path.join(ROOT, "public")
open(os.path.join(pub, "logo.svg"), "w").write(lockup("#F3F0FF"))
open(os.path.join(pub, "logo-dark.svg"), "w").write(lockup("#0D0922"))
mark = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Ahtasham Anjum">{DEFS}{MARK}</svg>'
open(os.path.join(pub, "logo-mark.svg"), "w").write(mark)
open(os.path.join(pub, "icon.svg"), "w").write(mark)
json.dump({"wordPath": word_d, "wordW": word_w, "wordH": word_h, "mark": MARK}, open(os.path.join(ROOT, "src/data/logo.json"), "w"))
try:
    import cairosvg
    cairosvg.svg2png(url=os.path.join(pub, "logo.svg"), write_to=os.path.join(pub, "logo.png"), output_width=1200)
    cairosvg.svg2png(url=os.path.join(pub, "logo-dark.svg"), write_to=os.path.join(pub, "logo-dark.png"), output_width=1200)
    cairosvg.svg2png(url=os.path.join(pub, "logo-mark.svg"), write_to=os.path.join(pub, "logo-mark.png"), output_width=512)
except Exception as e:
    print("PNG export skipped:", e)
print("logo ok", word_w, word_h)
