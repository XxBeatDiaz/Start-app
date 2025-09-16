export function logger(req, res, next) {
    console.log("from logger", { url: req.url, method: req.method, body: req.body, time: new Date().toLocaleString() });
    next();
}


