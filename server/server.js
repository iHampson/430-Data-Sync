var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs'); /// Might be unneccessary on Heroku

var port = process.env.PORT || process.env.NODE_PORT || 3000;

var index = fs.readFileSync(__dirname + "/../client/client.html");

server.listen(port);
console.log("Listening on 127.0.0.1:" + port);

var onJoin = function(socket){
  socket.on('join',function(data){
    console.log('joined the room');
    socket.emit('msg', {'msg':"joined"});
    socket.join('room1');
  });
};

var onMsg = function(socket){
  socket.on('updateServer', function(data){
    io.sockets.in('room1').emit('updateClient', data);
    // io.emit('updateClient', data);
  });
  socket.on('clearServer', function(data){
    io.to('room1').emit('clearPara', {'msg':'clear the variable'});
  });
};

app.get('/', function(req, res){
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(index);
  res.end();
});

app.get('/client/client.js', function(req,res){
  res.writeHead(200, {"Content-Type": "application/javascript"});
  res.write(fs.readFileSync(__dirname+"/../client/client.js"));
  res.end();
});

/// Set up event listeners for the socket
io.sockets.on("connection", function(socket){
  onJoin(socket);
  onMsg(socket);
});

console.log("Server File Running");
