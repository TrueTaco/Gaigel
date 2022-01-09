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
let players =[];
let talon = [];
let trumpCard;
let i = 0;

io.on("connection", (socket) => {
    //console.log("New client connected (" + socket.id + ")");

    sockets.push(socket);
    players.push(new Player(socket.id))
    console.log(players)

    let message = `Hello Client ${socket.id}`;
    socket.emit("onConnect", message);

    socket.on("gameBegin", () => {
        console.log("Game begins");
        createTalon();
        chooseTrumpCard()
        //console.log(talon,trumpCard);
        socket.broadcast.emit("setTalon", talon);
        //console.log("setting Talon cards")
        socket.broadcast.emit("setTrumpCard", trumpCard);
        //console.log("setting Trumpcard");

    })

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

function createTalon() {
    let types = ["Eichel", "Blatt", "Herz", "Schellen"];
    // let types: string[] = ["Eichel"];
    let values = ["7", "U", "O", "K", "10", "A"];
    let newTalon = [];

    types.forEach((type) =>
        values.forEach((value) => {
            newTalon.push(new Card(type,value));
        })
    );
    newTalon.push(...newTalon);
    newTalon = fisherYatesShuffle(newTalon)
    talon = newTalon;
    return newTalon;
}

// Reliable shuffling algorithm
// Source: https://www.delftstack.com/de/howto/javascript/shuffle-array-javascript/
function fisherYatesShuffle(arr){
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function chooseTrumpCard() {
    let newTrumpCard = talon[talon.length - 1];
    talon.slice(0, talon.length - 1);

    trumpCard = newTrumpCard;
    return trumpCard;
};

class Card{
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Player{
    constructor(socketID) {
        this.socketID = socketID
    }
}

createTalon()
//heartbeat();
