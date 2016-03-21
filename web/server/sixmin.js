
import fs from "fs";
import path from "path";

const root = path.resolve(__dirname, "..", "..", "6min");

function readList (dir) {
    let list = fs.readdirSync(dir);
    list = list.filter(f => f.match(/\.json$/));
    list = list.map(f =>{
        const c = fs.readFileSync(path.resolve(path.resolve(dir, f)), "utf8");
        let j = null;
        try {
            j = JSON.parse(c);
        } catch (e) {
            console.error(f, "parse error");
            return c;
        }
        return j;
    });
    list.sort((a, b) => {
        if (a.date > b.date)
            return 1;
        if (a.date < b.date)
            return -1;
        return 0;
    });
    list = list.reverse();
    return list;
    // console.log(list);
}

export default function sixmin (app, express) {
    const list = readList(root);
    console.log(`读取了${list.length}个文件`);
    app.get("/list/:page", (req, res) => {
        let page = Number.parseInt(req.params.page);
        if ( !Number.isFinite(page) || page <= 0) {
            page = 1;
        }
        const size = 2;
        const maxPage = Math.floor(list.length / size);
        const begin = (page - 1) * size;
        const end = page * size;
        res.json({
            page,
            maxPage,
            list: list.slice(begin, end)
        });
    });
    app.use("/audio", express.static(path.resolve(__dirname, "..", "..", "audio")));
}
