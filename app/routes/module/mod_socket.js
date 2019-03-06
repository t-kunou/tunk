var dns = require("dns")

var http = require('http');
//サーバインスタンス作成
var server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end('server connected');
});
var io = require('socket.io').listen(server);

server.listen(8888);//8888番ポートで起動
console.log('Wait for connect');

var tunkIp = null;

var tunkSocket = null;
var mobileSocket = null;

//接続確立時の処理
io.sockets.on('connection', function (socket) {
  // この中でデータのやり取りを行う
  console.log('connected');

  socket.on('registration', function(name) {
    console.log('Registration from ' + name);
    if (name === 'tunk') {
      dns.lookup('raspberrypi.local',  (err, address, family) => { tunkIp = address });
      tunkSocket = socket;
    } else if (name === 'mobile') {
      mobileSocket = socket;
      if (tunkIp) {
        mobileSocket.emit('tunkIp', tunkIp);
      }
    }
  });

  socket.on('move', function(d){
    console.log(d);
    if (tunkSocket) {
      tunkSocket.emit('move', d)
    }
  });
});
