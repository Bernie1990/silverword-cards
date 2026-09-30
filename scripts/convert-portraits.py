"""
把 import-from-game-server.js 列出的 PNG 立繪轉成 WebP：
  assets/portraits/<look>/<id>.webp        768px  劇場用
  assets/portraits/<look>/<id>.thumb.webp  384px  卡片用

需要 Pillow：pip install pillow
用法：python scripts/convert-portraits.py [--force]
"""
import json
import os
import sys

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'assets', 'portraits')
FORCE = '--force' in sys.argv

jobs_path = os.path.join(HERE, '.portrait-jobs.json')
if not os.path.exists(jobs_path):
    sys.exit('先執行 node scripts/import-from-game-server.js 產生 .portrait-jobs.json')

jobs = json.load(open(jobs_path, encoding='utf-8'))


def save(img, path, max_side, quality):
    if not FORCE and os.path.exists(path):
        return os.path.getsize(path)
    im = img.copy()
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'WEBP', quality=quality, method=6)
    return os.path.getsize(path)


total = 0
for j in jobs:
    im = Image.open(j['src']).convert('RGB')
    base = os.path.join(OUT, j['look'], j['id'])
    total += save(im, base + '.webp', 768, 84)
    total += save(im, base + '.thumb.webp', 384, 80)

print(f"done: {len(jobs)} portraits, {total / 1024 / 1024:.1f} MB")
