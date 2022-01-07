const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io")

// MARK: Server Initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {cors: {origin: "*"}})

app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// MARK: Sockets
let sockets = []
let i = 0;

io.on("connection", (socket) => {
    console.log("New client connected (" + socket.id + ")");
    sockets.push(socket);

    let message = `Hello Client ${socket.id}`;
    socket.emit("onConnect", message);

    socket.on("template", () => {
        // Do something
    })

    socket.on("disconnect", () => {
        console.log("Client disconnected (" + socket.id + ")");
    })
})

function heartbeat () {
    let message = `Heartbeat ${i}`;
    io.emit("heartbeat", message);
    i++;

    setTimeout(heartbeat, 4000);
}

heartbeat();
