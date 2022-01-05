const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io")

const app = express();
const server = http.createServer(app);
const io = socketIO(server)

app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;


let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if(interval) clearInterval(interval)

    interval = setInterval(() => {
        socket.emit("onConnectionMessage", "Hello Client");
    }, 1000)

    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval)
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
