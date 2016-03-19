
// console.log("下载");

var fs = require("fs");
var page = require("webpage").create();

var links = JSON.parse(fs.read("old_links.json", { mode: "r", charset: "utf8" }));

// console.log(links);

var ret = [];

function download_one () {
    if (links.length) {
        var url = links[0];
        links.shift();
        console.log("开始", url);
        page.open(url, function (status) {
            if (status == "success") {
                var title = page.evaluate(function () {
                    return document.querySelector(".page-title").textContent;
                });
                var date = page.evaluate(function () {
                    var d = Date.parse(document.querySelector(".last-updated").textContent.substr(16))
                    var now = new Date();
                    now.setTime(d);
                    return now.toISOString();
                });
                var audio = page.evaluate(function () {
                    return document.querySelector(".audio-link").href;
                });
                var pdf =  page.evaluate(function () {
                    return document.querySelector(".pdf-link").href;
                });
                var words = page.evaluate(function () {
                    var ret = [];
                    var dt = document.querySelectorAll("dt");
                    var dd = document.querySelectorAll("dd");
                    for (var i = 0; i < dt.length; i++) {
                        ret.push({
                            dt: dt[i].textContent.trim(),
                            dd: dd[i].textContent.trim()
                        });
                    }
                    return ret;
                });
                var description = page.evaluate(function () {
                    var nodes = document.querySelectorAll("#story p");
                    var ret = [];
                    for (var i = 0; i < nodes.length; i++) {
                        ret.push(nodes[i].textContent);
                    }
                    return ret.join("\n");
                });
                var obj = {
                    title: title,
                    description: description,
                    date: date,
                    audio: audio,
                    pdf: pdf,
                    words: words
                };
                console.log("解析了", url, obj);
                ret.push(obj);
            } else {
                console.error("打开错误", url);
            }
            download_one();
        });
    } else {
        fs.write("old_url.json", JSON.stringify(ret, null, 2), "w");
        phantom.exit();
    }
}

download_one();
