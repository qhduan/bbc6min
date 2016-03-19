
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
                    return document.querySelectorAll(".widget-heading h3")[1].textContent.trim();
                });
                var date = page.evaluate(function () {
                    var d = Date.parse(document.querySelector(".widget-bbcle-featuresubheader .details h3").textContent.trim().split("/")[1]);
                    var now = new Date();
                    now.setTime(d);
                    return now.toISOString();
                });
                var audio = page.evaluate(function () {
                    return document.querySelector("a.bbcle-download-extension-mp3").href;
                });
                var pdf =  page.evaluate(function () {
                    return document.querySelector(".bbcle-download-extension-pdf").href;
                });
                var description = page.evaluate(function () {
                    var nodes = document.querySelectorAll(".text p");
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
                    pdf: pdf
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
