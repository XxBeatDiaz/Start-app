export function logger(req, res, next) {
    console.log("from logger",{ url: req.url, method: req.method, time: new Date().toLocaleString() });
    next();
}


 