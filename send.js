var connBool = false;
var send = (reqMsg) => {
    let sndMsg = makeMessage(reqMsg.toString(), "");
    let tmp = JSON.parse(sndMsg);
    logger.info("client_Message : "+sndMsg);
    insertHistory("list", "li", sndMsg);
    ws.send(sndMsg);
}
var sendImg = (reqMsg, imgSrc) => {
    let sndMsg = makeMessage(reqMsg.toString(), imgSrc);
    let tmp = JSON.parse(sndMsg);
    logger.info("client_Message : "+sndMsg);
    insertHistory("list", "li", sndMsg);
    ws.send(sndMsg);
}
var submitKey = (e) => {
    var bool = e.keyCode === 13;
    if(bool) send(document.getElementById("data").value);
    else return;
}
var insertHistory = (id, tag, msg) => {
    let resMsg = JSON.parse(msg);
    console.log(resMsg);
    let node = document.createElement(tag);
    let textNode = document.createTextNode(resMsg.sendID+" : "+resMsg.text);
    node.appendChild(textNode);
    document.getElementById(id).appendChild(node);
}
var makeMessage = (msg, img) => {
  let message = {
    type:"message",
    text: msg,
    sendID : document.getElementById("clientID").value,
    date : Date.now(),
    recv : document.getElementById('rcvId').value,
    imageSrc : img
  }
  return JSON.stringify(message);
}
var enterId = (domId) => {
  let bool = event.keyCode === 13;
  if(bool && !connBool) {
    let id = document.getElementById(domId).value;
    if(domId === "usingID") {
      document.getElementById('clientID').value = id;
      connection("[IP]", "[PORT]");
      connBool = true;
    }
  }
  else return;
}

var dropImage = (e) => {
  try{
    e.preventDefault();
    handleFileDrop(e.dataTransfer.files[0]);
    return false;
  } catch (err) {
    console.log(err);
    logger.error(err);
  }
}

var handleFileDrop = (file) => {
  let reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = function() {
    consol.log("Recving "+ file.name);
  }
  send("message", reader.result);
}
