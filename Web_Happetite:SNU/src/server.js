const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
/*const port = 5000;
app.set("port", port);


app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(5000, () => console.log("Listening on", port));*/

//module.exports = app;
const messages = [];
// WebSocket connection handling
wss.on("connection", (ws, req) => {
  if (req.url === "/rooms") {
    ws.location = "index";
    // get a data when into index
    ws.send(JSON.stringify(app.get("db").rooms));
  } else if (req.url.startsWith("/chat/")) {
    // /chat/1
    ws.location = req.url.split("/")[2];
    ws.on("message", (data) => {
      const message = JSON.parse(data);
      messages.push(message);
      // Broadcast the new message to all connected clients
      wss.clients.forEach((client) => {
        console.log("Client location: ", client.location);
        console.log("WS location: ", ws.location);
        if (
          client.readyState === WebSocket.OPEN &&
          client.location === ws.location
        ) {
          client.send(JSON.stringify([message]));
        }
      });
    });
  }

  ws.on("error", (error) => {
    console.error(error);
    app.locals.message = error.message;
    app.locals.error = process.env.NODE_ENV !== " production" ? error : {};
    app.render("error");
  });

  ws.on("close", () => console.log(`${req.url} connection close`));
  // Only ONE room
  /*// Send existing messages to the new connection
  ws.send(JSON.stringify(messages));

  // Handle new messages from the client
  ws.on("message", (data) => {
    const message = JSON.parse(data);
    messages.push(message);
    // Broadcast the new message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify([message]));
      }
    });
  });*/
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
