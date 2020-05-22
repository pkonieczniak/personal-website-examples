const { createServer } = require("http");
const { join } = require("path");
const { parse } = require("url");
const { createReadStream } = require("fs");
const { EventEmitter } = require("events");

const chatEmitter = new EventEmitter();
const server = createServer((req, res) => {
  const { pathname } = parse(req.url, true);
  const method = req.method.toLowerCase();

  if (pathname === "/sse" && method === "get") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
    });

    onMessage = (message) => res.write(`data: ${message}\n\n`);
    chatEmitter.on("message", onMessage);

    res.on("close", () => {
      console.log("Closed connection with the client.");
      chatEmitter.off("message", onMessage);
    });
  } else if (pathname === "/api/message" && method === "post") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      res.writeHead(200);
      const { message } = JSON.parse(body);
      chatEmitter.emit("message", message);
      res.end();
    });
  } else {
    const path = join(__dirname, "public", "index.html");
    return createReadStream(path).pipe(res);
  }
});

server.listen(3000, () => {
  console.log("listen on 3000");
});
