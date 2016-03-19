import json

with open('old_url.json') as f:
    j = json.load(f)
    for i in j:
        print(i['date'], i['title'])
