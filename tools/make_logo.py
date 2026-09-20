"""Turn the supplied logo JPEG (black line-art on a white box) into a
transparent PNG.

The source is a JPEG, so the art has grey compression halos. Keying out pure
white would leave them behind as a dirty fringe. Instead we treat luminance as
coverage: alpha = 255 - luminance, colour = flat black. Antialiased edges and
JPEG halos then composite correctly over any background colour.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from img import to_bmp, read_bmp, write_png

SRC = os.path.expanduser('~/.claude/uploads/7ada22c7-0c66-4b22-81cd-74879664f17f/73ddc6ca-image.jpg')
OUT = 'src/assets/brand/logo.png'

bmp = to_bmp(SRC)
w, h, rows = read_bmp(bmp)
os.unlink(bmp)

alpha = []
for y in range(h):
    arow = []
    for x in range(w):
        r, g, b = rows[y][x]
        lum = (299 * r + 587 * g + 114 * b) // 1000
        # Nudge near-white fully clear so the old white box disappears cleanly.
        a = 0 if lum > 244 else 255 - lum
        arow.append(a)
    alpha.append(arow)

# Trim fully transparent margins.
def occupied(vals):
    return [i for i, v in enumerate(vals) if v]
col_ink = [max(alpha[y][x] for y in range(h)) for x in range(w)]
row_ink = [max(alpha[y]) for y in range(h)]
xs, ys = occupied(col_ink), occupied(row_ink)
x0, x1 = xs[0], xs[-1] + 1
y0, y1 = ys[0], ys[-1] + 1

tw, th = x1 - x0, y1 - y0
black = [[(0, 0, 0)] * tw for _ in range(th)]
ta = [alpha[y][x0:x1] for y in range(y0, y1)]
write_png(OUT, tw, th, black, ta)
print(f'{OUT}  {w}x{h} -> {tw}x{th} (trimmed, transparent)')
