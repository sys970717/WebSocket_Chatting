var connection = (ip, port) => {
    ws = new WebSocket("ws://"+ip+":"+port);
    ws.onopen = (event) => {
        send("Request Session Bind!!");
    }
    ws.onmessage = (event) => {
        let resMsg = event.data;
        logger.info(resMsg.toString());
        insertHistory("list", "li", resMsg);
    }
    document.getElementById("data").addEventListener('keydown', submitKey, false);
    document.getElementById("clientImg").addEventListener('drop', dropImage, false);
}
