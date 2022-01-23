const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server,{
    cors: {
        origin: '*',
    }
});

const users = new Map();

io.on('connection', function (socket){
    //users.push(socket.id);
    console.log('New Ws Connection');
    socket.emit('message','Wellcome');
    socket.on('username',function (userId){
            socket.nickname = userId;
            users.set(socket.nickname,socket.id);
            console.log(users);
    //socket.broadcast.to(users.get(userId)).emit('statusChangedToast','statusChangedToast');
    });
    socket.on('StatusChange',(userId)=>{
        console.log("status change angestossen" )
        console.log("user ID:" + userId);
        socket.broadcast.to(users.get(userId)).emit("statusChangedToast","statusChangedToast");
    })
    socket.on('createProdukt',(msg)=>{
        console.log(msg);
        io.emit('ProduktToast','ProduktToast');
    });
   

})

 




const PORT = 7000;

server.listen(PORT, () => console.log('Server running port 7000'))