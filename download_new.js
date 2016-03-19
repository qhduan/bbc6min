
// console.log("下载");

var fs = require("fs");
var page = require("webpage").create();

var links = JSON.parse(fs.read("new_links.json", { mode: "r", charset: "utf8" }));

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
                    if ( !document.querySelector("[data-widget-index='3'] h3") )
                        return null;
                    return document.querySelector("[data-widget-index='3'] h3").textContent.trim();
                });
                var date = page.evaluate(function () {
                    if ( !document.querySelector(".widget-bbcle-featuresubheader .details h3") )
                        return null;
                    var d = Date.parse(document.querySelector(".widget-bbcle-featuresubheader .details h3").textContent.trim().split("/")[1]);
                    var now = new Date();
                    now.setTime(d);
                    return now.toISOString();
                });
                var audio = page.evaluate(function () {
                    if ( !document.querySelector("a.bbcle-download-extension-mp3") )
                        return null;
                    return document.querySelector("a.bbcle-download-extension-mp3").href;
                });
                var pdf =  page.evaluate(function () {
                    if ( !document.querySelector(".bbcle-download-extension-pdf") )
                        return null;
                    return document.querySelector(".bbcle-download-extension-pdf").href;
                });
                var description = page.evaluate(function () {
                    if ( !document.querySelectorAll(".text p") || !document.querySelectorAll(".text p").length )
                        return null;
                    var nodes = document.querySelectorAll(".text p");
                    var ret = [];
                    for (var i = 0; i < nodes.length; i++) {
                        ret.push(nodes[i].textContent);
                    }
                    return ret.join("\n");
                });
                if (title && description && date && audio && pdf) {
                    var obj = {
                        title: title,
                        description: description,
                        date: date,
                        audio: audio,
                        pdf: pdf
                    };
                    console.log("解析了", url);
                    ret.push(obj);
                } else {
                    console.log("解析错误", url);
                    console.log("title: ", title, "description: ", description, "date: ", date, "audio: ", audio, "pdf: ", pdf);
                }
            } else {
                console.error("打开错误", url);
            }
            download_one();
        });
    } else {
        fs.write("new_url.json", JSON.stringify(ret, null, 2), "w");
        phantom.exit();
    }
}

download_one();
