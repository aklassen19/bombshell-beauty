"""Small pure-python image helpers (no PIL/ImageMagick on this machine).

Reads 24-bit BMPs produced by `sips` and writes PNGs with zlib.
Used once to prepare brand assets; kept in the repo so the steps are repeatable.
"""
import struct, zlib, subprocess, tempfile, os, sys

def to_bmp(src, max_dim=None):
    fd, path = tempfile.mkstemp(suffix='.bmp'); os.close(fd)
    cmd = ['sips', '-s', 'format', 'bmp']
    if max_dim: cmd += ['-Z', str(max_dim)]
    cmd += [src, '--out', path]
    subprocess.run(cmd, check=True, capture_output=True)
    return path

def read_bmp(path):
    d = open(path, 'rb').read()
    off = struct.unpack_from('<I', d, 10)[0]
    w, h = struct.unpack_from('<ii', d, 18)
    bpp = struct.unpack_from('<H', d, 28)[0]
    assert bpp in (24, 32), bpp
    stride = (w * bpp // 8 + 3) // 4 * 4
    bottom_up = h > 0
    H = abs(h)
    rows = []
    step = bpp // 8
    for y in range(H):
        yy = H - 1 - y if bottom_up else y
        base = off + yy * stride
        row = []
        for x in range(w):
            i = base + x * step
            row.append((d[i+2], d[i+1], d[i]))
        rows.append(row)
    return w, H, rows

def write_png(path, w, h, rows, alpha=None):
    """rows: list of rows of (r,g,b). alpha: optional list of rows of a."""
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        for x in range(w):
            r, g, b = rows[y][x]
            raw += bytes((r, g, b))
            if alpha is not None:
                raw.append(alpha[y][x])
    def chunk(tag, data):
        c = struct.pack('>I', len(data)) + tag + data
        return c + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)
    ctype = 6 if alpha is not None else 2
    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, ctype, 0, 0, 0))
    png += chunk(b'IDAT', zlib.compress(bytes(raw), 9))
    png += chunk(b'IEND', b'')
    open(path, 'wb').write(png)
