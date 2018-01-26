process.title = 'node-chat';

const express = require("express");
const WebSocket = require("ws");
const http = require("http");

const app = express();
app.use((req,res) => {
  res.send({msg:hello});
})

var server = http.createServer(app);

server.listen(3000, function() {
  console.log("Listening on %d", server.address().port);
});

var wss = new WebSocket.Server({
  server
});

  wss.on("connection", (ws) => {
      //ws.send("Connection Success to Client");
      ws.on("message", (message) => {
          let jsonObj = JSON.parse(message);
          let clientID = jsonObj.sendID;
          let msg = jsonObj.text;
          let rcvList = jsonObj.recv.split('|');
          try {
            if (clientsArr.indexOf(clientID) < 0) {
              clientsArr.push(clientID);
              ws.id = clientID;
            }
            console.log(clientsArr);
            console.log("receive Message : %s", msg);
            let cnt = 0;
            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                  // client.send(client);
                  if(clientsArr.includes(rcvList[cnt])) {
                    client.send(makeMessage(msg, clientID, client));
                  }
                  cnt++;
                }
              });
            }
            catch (err) {
              console.log(err);
              clientsArr.splice(clientsArr.indexOf(''));
            }
          });
      });

    var makeMessage = (recvMsg, clientID, client) => {
      let msg = {
        type: "message",
        text: recvMsg,
        sendID: clientID,
        info : ""+client
      }
      return JSON.stringify(msg);
    }

    var clientsArr = new Array();
