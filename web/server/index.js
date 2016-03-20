"use strict";

import fs from "fs";
import path from "path";

import express from "express";
import compression from "compression";

import development from "./development.js";

let app = express();

app.use(compression());

// 调试环境，加载webpack的调试中间价
if (process.env.NODE_ENV == "development") {
    development(app);
}

app.use(express.static(path.resolve(__dirname, "..", "public")));

// custom middleware

import sixmin from "./sixmin";
sixmin(app, express);

// end custom middleware

// 404 服务
app.use((req, res, next) => {
    let err = new Error("Page Not Found");
    err.status = 404;
    next(err);
});

// 500 服务
app.use((err, req, res) => {
    const status = err.status || 500;
    res.status(status);
    res.end(`${status} ${err.message}`);
});

const bind = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "config", "bind.json")));

app.listen(bind.port, bind.ip, () => {
    console.log (`listenning on ${bind.port}`);
});
