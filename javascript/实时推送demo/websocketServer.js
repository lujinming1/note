const WebSocketServer = require('ws').Server;

let wss = new WebSocketServer({port:8080});

let socket;

wss.on('connection', function(ws){
    socket = ws;
    ws.on('message', function(message){
        socket.send(new Date().toLocaleString());
        setInterval(() => {
            socket.send(new Date().toLocaleString());
        }, 1000)
    })
    ws.on('close', (message) =>{})
})


