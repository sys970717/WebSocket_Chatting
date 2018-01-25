const WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({port: 3000});

wss.on("connection", (ws) => {
    //ws.send("Connection Success to Client");
    ws.on("message", (message) => {
        console.log("receive Message : %s", message);
        ws.send(message);
    });
});
