"""把 scripts/.roster-jobs.json 的原圖轉成立繪 WebP，並存一份到 assets/originals/。"""
import json
import os
import shutil

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..', 'assets')
SRC = os.path.join(ROOT, 'originals')
JOBS = os.path.join(HERE, '.roster-jobs.json')


def save(img, path, max_side, quality):
    if os.path.exists(path):
        return 0
    im = img.copy()
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'WEBP', quality=quality, method=6)
    return os.path.getsize(path)


def main():
    jobs = json.load(open(JOBS, encoding='utf-8'))
    made = 0
    size = 0
    for job in jobs:
        ext = os.path.splitext(job['src'])[1].lower() or '.png'
        folder = os.path.join(SRC, job['series'])
        os.makedirs(folder, exist_ok=True)
        dest = os.path.join(folder, job['id'] + ext)
        if not os.path.exists(dest):
            shutil.copyfile(job['src'], dest)
        im = Image.open(dest).convert('RGB')
        base = os.path.join(ROOT, 'portraits', 'base', job['id'])
        n = save(im, base + '.webp', 768, 84) + save(im, base + '.thumb.webp', 384, 80)
        if n:
            made += 1
            size += n
    # 橡木鎮的蘿莎琳·靜脈與霍格華茲的蘿莎琳·艾許分開存檔
    for name in os.listdir(os.path.join(SRC, 'oakvale')):
        stem, ext = os.path.splitext(name)
        if not stem.startswith('rosalind_vein') or ext.lower() not in ('.jpg', '.jpeg', '.png', '.webp'):
            continue
        cid, _, look = stem.partition('@')
        im = Image.open(os.path.join(SRC, 'oakvale', name)).convert('RGB')
        base = os.path.join(ROOT, 'portraits', look or 'base', cid)
        n = save(im, base + '.webp', 768, 84) + save(im, base + '.thumb.webp', 384, 80)
        if n:
            made += 1
            size += n
    print(f'done: {made} portraits, {size / 1024 / 1024:.1f} MB')


if __name__ == '__main__':
    main()
