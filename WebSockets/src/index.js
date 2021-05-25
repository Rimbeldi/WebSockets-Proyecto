const express = require("express");
var app = express();
var apijs = require('./api.js');
const port = process.env.PORT || 4567;
const server = app.listen(port, () => 
    console.log("El servidor está inicializado en el puerto " + port)
    );
const SocketIo = require('socket.io');
const io = SocketIo(server);    //(server) es la constante en la que guardamos el app.listen
io.on('connection', (socket) =>{
  socket.on('player:newscore', (data)=>{
    console.log(data)
      var ok = updateScore(data);
      if(!ok){
        socket.emit('server:error', "Error al agregar la puntuacion");
      }else{
        var lostop = topJugadores();
        io.emit('server:ranking', lostop[0]);
        io.emit('server:ranking1', lostop[1]);
        io.emit('server:ranking2', lostop[2]);
        io.emit('server:ranking3', lostop[3]);
        io.emit('server:ranking4', lostop[4]);
        
        socket.emit('server:newscore', ok);
    }
  });
  socket.on('player:ranking', ()=>{
    var lostop = topJugadores();
        io.emit('server:ranking', lostop[0]);
        io.emit('server:ranking1', lostop[1]);
        io.emit('server:ranking2', lostop[2]);
        io.emit('server:ranking3', lostop[3]);
        io.emit('server:ranking4', lostop[4]);
  }); 
});
app.use('/', apijs);
app.use(express.urlencoded({ extended: false }));
module.exports = app;