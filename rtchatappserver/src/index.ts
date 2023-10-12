import http from "http";
import WebSocket from "ws";
const port = 8080;

// Standard http server
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("no more write");
});

const wss = new WebSocket.Server({
  server: server,
  maxPayload: 2048,
  perMessageDeflate: false,
});

let clients: Array<any> = [];

wss.on("connection", (ws: any) => {
  ws.on("message", (messages: Buffer) => {
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
