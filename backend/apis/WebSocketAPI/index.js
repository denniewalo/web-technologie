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

io.on('connection', socket =>{
    console.log('New Ws Connection');
    socket.emit('message','Wellcome');
    socket.on('createProduct',(msg)=>{
        console.log(msg);
        io.emit('ProduktToast','ProduktToast');
    });
   
})

 




const PORT = 7000;

server.listen(PORT, () => console.log('Server running port 7000'))