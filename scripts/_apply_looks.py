import io, re, os, shutil
SRC = r'C:\Users\berniehsieh\.cursor\projects\s-myagents-dnd-service-20260930\assets'
ROOT = r'S:\myagents\character-cards'
ADD = {
    'thornrose': {'isolde': ['gown', 'travel'], 'brannagh': ['casual', 'winter'], 'vaelis': ['gown', 'rain'],
                  'tamsin': ['casual', 'night'], 'oriel': ['casual', 'travel'], 'ketra': ['gown', 'work'],
                  'seren': ['summer', 'ritual'], 'nyssara': ['gown', 'rain'], 'pimm': ['work', 'winter'],
                  'maelle': ['training', 'casual'], 'kaida': ['gown', 'travel'], 'wren': ['casual', 'night']},
    'oakvale': {'kaelith': ['casual'], 'zarael': ['casual'], 'seraphine_v': ['gown'], 'nissa': ['summer'],
                'fenna': ['work'], 'aveline': ['travel'], 'brunhild': ['casual'], 'yseult': ['gown']},
    'planar': {'lirael': ['travel'], 'thistle': ['work'], 'vesper': ['casual'], 'mourne': ['dance'], 'ada': ['work'],
               'zephyrine': ['casual'], 'xyra': ['casual'], 'selunia': ['gown'], 'zorrak': ['rain'],
               'shizuku': ['summer'], 'ilvara': ['travel'], 'grund': ['dance'], 'veyl': ['gown']},
}
PREFIX = {'thornrose': 'tr', 'oakvale': 'ok', 'planar': 'pl'}
FILES = {'thornrose': ['series-thornrose.js'], 'oakvale': ['series-oakvale.js'],
         'planar': ['series-planar.js', 'series-planar-2.js', 'series-planar-3.js']}

for series, chars in ADD.items():
    for cid, looks in chars.items():
        for lk in looks:
            src = os.path.join(SRC, f'{PREFIX[series]}-{cid}-{lk}.jpg')
            dst = os.path.join(ROOT, 'assets', 'originals', series, f'{cid}@{lk}.jpg')
            shutil.copyfile(src, dst)
    for f in FILES[series]:
        p = os.path.join(ROOT, 'data', f)
        t = io.open(p, encoding='utf-8').read()
        for cid, looks in chars.items():
            m = re.search(r"(id: '%s', kind:.*?looks: \[)([^\]]*)(\])" % cid, t, re.S)
            if not m:
                continue
            cur = [x.strip().strip("'") for x in m.group(2).split(',') if x.strip()]
            new = cur + [lk for lk in looks if lk not in cur]
            t = t[:m.start(2)] + ', '.join("'%s'" % x for x in new) + t[m.end(2):]
        io.open(p, 'w', encoding='utf-8', newline='\n').write(t)
print('ok')
