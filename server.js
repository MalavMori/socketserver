const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const app = express()

const cors = require("cors")
app.use(cors())

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("user: "+socket.id)
    socket.on("message",(data)=>{
        socket.broadcast.emit("recevi_message",data)
    })
})

server.listen(3001,()=>{
    console.log("Server on 3001")
})
