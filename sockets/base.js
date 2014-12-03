module.exports = function(io) {
  var roomData = {};
  var socketData = {};

  io.on('connection', function(socket) {
    console.log('New Connection');
    var room;
    var rooms = io.nsps["/"].adapter.rooms;
    var client;

    socket.on('user', function(user) {
      user.socket = socket.id;
      client = user;
      room = '' + user.userId;
      rooms = io.nsps["/"].adapter.rooms;

      if (!roomData[room]) roomData[room] = [socket.id];
      else roomData[room].push(socket.id);
      
      socketData[socket.id] = user;

      socket.join(room);
      socket.to(room).emit('client', {deviceName: user.deviceName, socketId: socket.id});

      var obj = {};
      for (var i = 0; i < roomData[user.userId].length; i++) {
        var socketId = roomData[user.userId][i];
        var name = socketData[socketId].deviceName;
        if (socketId === socket.id) socketId = 'self';
        obj[socketId] = name;
      }

      socket.emit('socket list', obj);

      console.log(roomData);
      console.log(socketData);

      // if (rooms.hasOwnProperty(room)) len = Object.keys(rooms[room]).length;
      // if (len === 0) {
      //   socket.emit('set viewer', {});
      // }
      // if (len < 5) {
      //   socket.join(room);
      //   if (len === 4) io.to(room).emit('full room');
      // } else {
      //   socket.emit('join failed', {});
      // }
    })

    socket.on('player switch', function(data) {
      console.log(data);
      socket.to(room).emit('player pause emit');
      if (data) {
        if (data.socketId) {
          io.to(data.socketId).emit('player switch emit', data);
        }
      }
      // console.log(data);
    })

    socket.on('player toggle', function(data) {
      console.log(data);
      io.to(data.socketId).emit('player toggle emit');
    })

    socket.on('player pause', function(data) {
      io.to(data.socketId).emit('player pause emit');
    })

    socket.on('player next', function(data) {
      io.to(data.socketId).emit('player next emit');
    })

    socket.on('player prev', function(data) {
      io.to(data.socketId).emit('player prev emit');
    })

    socket.on('player pos', function(data) {
      io.to(data.socketId).emit('player pos emit', data);
    })

    socket.on('player updateProg', function(data) {
      io.to(data.socketId).emit('player updateProg emit', data);
    })

    socket.on('disconnect', function () {
      console.log("disconnected");
      socket.to(room).emit('client disconnect', {socketId: socket.id});
      if (!client) return;
      var arr = roomData[client.userId];
      if (arr) {
        var i = arr.indexOf(socket.id);
        if (i >= 0) arr.splice(i, 1);
        if (arr.length === 0) delete roomData[client.userId];
      }

      delete socketData[socket.id];

      console.log(roomData);
      console.log(socketData);
    });

  })
}