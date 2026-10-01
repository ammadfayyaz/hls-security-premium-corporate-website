#!/usr/bin/env python3
"""Check deployed HLS SEO without submitting a real inquiry or accessing secrets."""
from html.parser import HTMLParser
from urllib.error import HTTPError
from urllib.request import Request, urlopen
from urllib.parse import urlparse
import re
import sys
import xml.etree.ElementTree as ET

BASE = "https://www.hlssecurity.co"
PATHS = ("/", "/products", "/services", "/solutions", "/contact")

class Head(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.links = []
        self.meta = []

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "link":
            self.links.append(data)
        elif tag == "meta":
            self.meta.append(data)

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data

    def value(self, attr, name):
        values = [m.get("content") for m in self.meta if m.get(attr) == name]
        assert len(values) == 1, f"Expected exactly one {name}: {values}"
        return values[0]

def fetch(url, method="GET", body=None):
    req = Request(url, data=body, method=method, headers={"Content-Type": "application/json"} if body else {})
    try:
        with urlopen(req, timeout=20) as response:
            return response.status, response.url, response.read().decode("utf-8", "replace")
    except HTTPError as exc:
        return exc.code, exc.url, exc.read().decode("utf-8", "replace")

def main():
    titles, descriptions = [], []
    for path in PATHS:
        status, final, body = fetch(BASE + path)
        head = Head()
        head.feed(body)
        canonical = [link.get("href") for link in head.links if link.get("rel") == "canonical"]
        description = head.value("name", "description")
        og_url = head.value("property", "og:url")
        robots = head.value("name", "robots")
        expected = BASE + path
        assert (status, urlparse(final).hostname, canonical, og_url) == (200, "www.hlssecurity.co", [expected], expected), (path, status, final, canonical, og_url)
        assert head.title and description and robots == "index, follow", (path, head.title, robots)
        titles.append(head.title)
        descriptions.append(description)
        print(f"PASS {path}: 200, canonical={canonical[0]}, title={head.title}")
    assert len(set(titles)) == len(set(descriptions)) == len(PATHS), "Titles/descriptions must be unique"

    status, final, xml = fetch(BASE + "/sitemap.xml")
    assert status == 200 and final == BASE + "/sitemap.xml", (status, final)
    root = ET.fromstring(xml)
    ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    urls = [node.text for node in root.findall(f"{ns}url/{ns}loc")]
    assert urls == [BASE + p for p in PATHS], urls
    print(f"PASS /sitemap.xml: 200, {len(urls)} unique canonical routes")

    status, final, robots = fetch(BASE + "/robots.txt")
    assert status == 200 and "Sitemap: " + BASE + "/sitemap.xml" in robots and "Allow: /" in robots
    print("PASS /robots.txt: 200, crawl allowed and sitemap advertised")

    status, final, missing = fetch(BASE + "/this-page-should-not-exist-for-seo-audit")
    head = Head()
    head.feed(missing)
    assert status == 404 and head.value("name", "robots") == "noindex, follow"
    assert not any(link.get("rel") == "canonical" for link in head.links)
    print("PASS missing page: 404, noindex, no canonical")

    status, _, response = fetch(BASE + "/api/inquiry", "POST", b"{}")
    assert status == 400 and '"success":false' in response, (status, response[:100])
    print("PASS inquiry API: invalid request returns 400 (no email sent)")

    status, final, _ = fetch("https://hlssecurity.co/products")
    assert status == 200 and final == BASE + "/products", (status, final)
    print("PASS apex host: redirects to the www canonical hostname")
    print("ALL LIVE SEO CHECKS PASSED")

if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"FAIL: {error}", file=sys.stderr)
        raise SystemExit(1)
