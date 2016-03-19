import json
import re

with open('old_url.json') as f:
    j = json.load(f)
    for i in j:
        date = i['date']
        print("curl -o 6min/%s.pdf %s" % (date, i['pdf']))
        print("curl -o 6min/%s.mp3 %s" % (date, i['audio']))
        jf = open('6min/%s.json' % date, "w")
        jf.write(json.dumps(i, indent=2, ensure_ascii=False))
