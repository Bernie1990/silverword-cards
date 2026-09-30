"""
把 assets/originals/ 裡的原圖轉成網頁用 WebP。原圖是唯一來源，WebP 隨時可重建。

  assets/originals/<series>/<id>.jpg           → portraits/base/<id>.webp (+ .thumb.webp)
  assets/originals/<series>/<id>@<look>.jpg    → portraits/<look>/<id>.webp (+ .thumb.webp)
  assets/originals/<series>/_banner.jpg        → banners/<series>.webp

  立繪 768px q84、縮圖 384px q80、橫幅 1600px q82；已存在的檔案略過（--force 重建）。

需要 Pillow：pip install pillow
用法：python scripts/build-art.py [series ...] [--force]
"""
import os
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..', 'assets')
SRC = os.path.join(ROOT, 'originals')
FORCE = '--force' in sys.argv
ONLY = [a for a in sys.argv[1:] if not a.startswith('--')]
EXT = ('.jpg', '.jpeg', '.png', '.webp')


def save(img, path, max_side, quality):
    if not FORCE and os.path.exists(path):
        return 0
    im = img.copy()
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'WEBP', quality=quality, method=6)
    return os.path.getsize(path)


made = 0
size = 0
for series in sorted(os.listdir(SRC)):
    folder = os.path.join(SRC, series)
    if not os.path.isdir(folder) or (ONLY and series not in ONLY):
        continue
    for name in sorted(os.listdir(folder)):
        stem, ext = os.path.splitext(name)
        if ext.lower() not in EXT:
            continue
        im = Image.open(os.path.join(folder, name)).convert('RGB')
        if stem == '_banner':
            n = save(im, os.path.join(ROOT, 'banners', series + '.webp'), 1600, 82)
        else:
            cid, _, look = stem.partition('@')
            base = os.path.join(ROOT, 'portraits', look or 'base', cid)
            n = save(im, base + '.webp', 768, 84) + save(im, base + '.thumb.webp', 384, 80)
        if n:
            made += 1
            size += n

print(f'done: {made} images written, {size / 1024 / 1024:.1f} MB')
