const express = require('express');
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require("socket.io")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log("User Connected", socket.id)

    // JOIN ROOM 
    socket.on("join_room", (id) => {
        socket.join(id)
        console.log(`User with ID: ${socket.id} to room ID: ${id}`)
    })

    // SEND MESSAGE 
    socket.on("send_message", (message) => {
        socket.to(message.room).emit("receive_message", message)
    })

    // DISCONNECT
    socket.on("disconect", () => {
        console.log("User Disconnected", socket.id)
    })
})



server.listen(3001, () => {
    console.log('SERVER RUNNING ON PORT 3001')
})