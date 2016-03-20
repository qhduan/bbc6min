import json
import re
import sys

import parsedatetime as pdt
parser = pdt.Calendar(pdt.Constants())

if len(sys.argv) == 2:
    path = sys.argv[1]
    with open(path) as f:
        j = json.load(f)
        for i in j:
            date = i['date']
            if date.find(' ') != -1:
                d = parser.parseDateText(date)
                date = '%d-%02d-%02d' % (d[0], d[1], d[2])
            print("curl -o ../6min/%s.pdf %s" % (date, i['pdf']))
            print("curl -o ../6min/%s.mp3 %s" % (date, i['audio']))
            jf = open('../6min/%s.json' % date, "w+")
            jf.write(json.dumps(i, indent=2, ensure_ascii=False))
else:
    print('用法 python downloader.py old_url.json')
