// https://www.youtube.com/watch?v=HrkECIzaQvE
import express, {Application} from 'express';
import http from 'http';
import path from 'path';
import { Server } from "socket.io";

const app = express();
const httpSever = http.createServer(app);
const io = new Server(httpSever)

app.use(express.static(path.resolve(__dirname, '..', 'public')))

io.on('connection', (socket)=>{
    console.log('new connection: ', socket.id)
    // sempre que receber um 'message', pega a mensagem e imprime
    socket.on('message', (msg)=>{
        console.log('New Message: ',msg)
        // envia a mensagem pro socket
        socket.emit('received', `Received message ${msg}`);
    })
})

httpSever.listen(3333);