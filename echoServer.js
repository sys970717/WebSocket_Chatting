process.title = 'node-chat';

const express = require("express");
const WebSocketServer = require("ws");
const http = require("http");

const app = express();
app.use((req,res) => {
  res.send({msg:hello});
})

var server = http.createServer(app);

server.listen(3000, function() {
  console.log("Listening on %d", server.address().port);
});

var wss = new WebSocketServer.Server({
  server
});

  wss.on("connection", (ws) => {
      //ws.send("Connection Success to Client");
      ws.on("message", (message) => {
          let jsonObj = JSON.parse(message);
          let clientID = jsonObj.id;
          let msg = jsonObj.text;
          let rcvList = jsonObj.recv.split('|');
          try {
            if (clientsArr.indexOf(clientID) < 0) {
              clientsArr.push(clientID);
            }
            console.log(clientsArr);
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                  // clientsArr.indexOf(client);
                  console.log("receive Message : %s", msg);
                  ws.send();
                }

              });
            }
            catch (err) {
              console.log(err);
              clientsArr.splice(clientsArr.indexOf(''));
            }
          });
      });

    var makeMessage = (recvMsg, clientID) => {
      let msg = {
        type: "message",
        msg: recvMsg,
        sendID: clientID
      }
      return JSON.stringify(msg);
    }

    var clientsArr = new Array();
