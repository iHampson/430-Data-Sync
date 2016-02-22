var socket;
var myNum = 0;
/// Connects to the socketIo lib
function setupSocket(){
  socket.emit('join');

  socket.on('msg', function(data){
    console.log(data);
  });
  socket.on('updateClient', function(data){
    myNum = data.msg;
    var message = data.msg;
    document.querySelector('#myPara').innerHTML = message;
  });

  socket.on('clearPara',function(data){
    document.querySelector('#myPara').innerHTML = "";
  });
}

function init(){
  socket = io.connect();
  setupSocket();
}

function sendMessage(){
  myNum += 5;
  var messageData = {
    msg: myNum
  };
  socket.emit('updateServer', messageData);
}

init();
setInterval(sendMessage, 3000);
