
// console.log("下载");

var fs = require("fs");
var page = require("webpage").create();

var url = "http://www.bbc.co.uk/worldservice/learningenglish/general/sixminute/";

page.open(url, function (status) {
    if (status == "success") {
        var links = page.evaluate(function () {
            var a = document.querySelectorAll(".ts-headline a");
            var ret = [];
            for (var i = 0; i < a.length; i++) {
                if (a[i].href.indexOf("/worldservice/learningenglish/general") != -1) {
                    ret.push(a[i].href);
                }
            }
            return ret;
        });
        fs.write("old_links.json", JSON.stringify(links, null, 2), "w");
        phantom.exit();
    } else {
        console.error("连接错误");
        phantom.exit();
    }
});
