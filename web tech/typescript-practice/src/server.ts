import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { handleRoute } from "./route";
import config from "./config";

const server: Server = createServer((req: IncomingMessage , res: ServerResponse) => {
    handleRoute(req, res);
    console.log("Received request:", req.url);
});


server.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
});