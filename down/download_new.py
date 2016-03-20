from bs4 import BeautifulSoup
import urllib
import json


ret = []

def download(url):
    print('开始', url)
    with urllib.request.urlopen(url, timeout=10) as f:
        html_doc = f.read().decode('utf-8')
        soup = BeautifulSoup(html_doc, 'html.parser')
        title = soup.find_all('h3')[1].string.strip()
        date = soup.find('div', { 'class': 'details' }).find('h3').contents[2].strip()[2:]
        audio = soup.find('a', { 'class': 'bbcle-download-extension-mp3'}).get('href')
        pdf = soup.find('a', { 'class': 'bbcle-download-extension-pdf'}).get('href')
        description = []
        for i in soup.find_all('div', { 'class': 'text' })[1].find_all('p'):
            for s in i.contents:
                if len(str(s).strip()):
                    description.append(str(s).strip())
        if title and date and audio and pdf and len(description):
            ret.append({ 'title': title, 'date': date, 'audio': audio, 'pdf': pdf, 'description': '\n'.join(description) })
            print('成功', url)
        else:
            print('失败', url)
            print('title', title, 'date', date, 'audio', audio, 'pdf', pdf, 'description', description)

def download_one(url, times):
    try:
        download(url)
    except:
        if times < 5:
            download_one(url, times + 1)
        else:
            print('超时失败', url)

with open('new_links.json') as new_links_file:
    new_links = json.load(new_links_file)
    for url in new_links:
        download_one(url, 0)

with open('new_url.json', 'w') as output_file:
    output_file.write(json.dumps(ret, indent=2, ensure_ascii=False))
    output_file.close()
