import { IncomingMessage, ServerResponse } from "http";
import { handleProductRoute } from "./product/route";


export function handleRoute(req: IncomingMessage, res: ServerResponse) {
    let url = req.url || "";
    let method = req.method || "GET";

    if (url.startsWith("/product") ) {
        handleProductRoute(req, res);
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }


}