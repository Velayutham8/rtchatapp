"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
const port = 8080;
// Standard http server
const server = http_1.default.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("no more write");
});
const wss = new ws_1.default.Server({
    server: server,
    maxPayload: 2048,
    perMessageDeflate: false,
});
let clients = [];
wss.on("connection", (ws) => {
    console.log("Client Connection");
    ws.on("message", (messages) => {
        console.log("Message received");
        const parsedData = JSON.parse(messages.toString());
        const { clientid, message, request } = parsedData;
        if (request === "DELETE") {
            clients = clients.filter((client) => client.clientid !== clientid);
            return;
        }
        const isIdExist = clients.some((client) => {
            if (client["clientid"] && client["clientid"] === clientid) {
                return true;
            }
            return false;
        });
        if (!isIdExist) {
            // console.log("ws", ws);
            ws.clientid = clientid;
            clients.push(ws);
        }
        if (message) {
            clients.forEach((client) => {
                const serverResponse = {
                    clientid: clientid,
                    message,
                };
                // console.log("serverResponse", JSON.stringify(serverResponse));
                client.send(JSON.stringify(serverResponse));
            });
        }
    });
});
server.listen(port, () => {
    console.log("server is running ", +port);
});
