const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

// MARK: Server Initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// MARK: Sockets
let sockets = [];
let players = [];
let talon = [];
let trumpCard;
let i = 0;

io.on("connection", (socket) => {
    console.log("New client connected (" + socket.id + ")");
    sockets.push(socket);
    players.push(new Player(socket));
    console.log(players.length);

    let message = `Hello Client ${socket.id}`;
    socket.emit("onConnect", message);
    console.log(players.length);
    socket.on("gameBegin", () => {
        console.log("Game begins");
        createTalon();
        chooseTrumpCard();
        io.emit("setTalon", talon);
        io.emit("setTrumpCard", trumpCard);
        console.log(players.length);
        players.forEach((player) => {
            drawCard(5, player);
            io.to(player.socket.id).emit("setCards", player.cards);
            //player.socket.emit("setCards", player.cards);
            console.log("Player: " + player);
        });
        io.emit("setTalon", talon);
    });

    socket.on("template", () => {
        // Do something
    });

    socket.on("disconnect", () => {
        players = players.filter((player) => player.socketID == socket.id);
        sockets = sockets.filter((sock) => sock == socket);
        console.log(players);
        console.log("Client disconnected (" + socket.id + ")");
    });
});

function heartbeat() {
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
            newTalon.push(new Card(type, value));
        })
    );
    newTalon.push(...newTalon);
    newTalon = fisherYatesShuffle(newTalon);
    talon = newTalon;
    return newTalon;
}

// Reliable shuffling algorithm
// Source: https://www.delftstack.com/de/howto/javascript/shuffle-array-javascript/
function fisherYatesShuffle(arr) {
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
}

function drawCard(amount, player) {
    if (player.cards.length < 5 && talon.length > 0) {
        // Gets last cards of the talon array and removes them
        let drawnCards = talon.slice(talon.length - amount);
        talon = talon.slice(0, talon.length - amount);

        let newUserCards = player.cards;
        drawnCards.forEach((card) => {
            newUserCards.push(card);
        });

        newUserCards.sort((a, b) => {
            const points = new Map();
            points.set("7", 0);
            points.set("U", 2);
            points.set("O", 3);
            points.set("K", 4);
            points.set("10", 10);
            points.set("A", 11);
            if (points.get(a.value) < points.get(b.value)) {
                return -1;
            }
            if (points.get(a.value) > points.get(b.value)) {
                return 1;
            } else {
                return 0;
            }
        });

        newUserCards.sort((a, b) => {
            //"Eichel", "Blatt", "Herz", "Schellen"
            const trump = new Map();
            trump.set("Eichel", 0);
            trump.set("Blatt", 1);
            trump.set("Herz", 2);
            trump.set("Schellen", 3);

            if (trumpCard.type === a.type || trumpCard.type === b.type) {
                trump.set(trumpCard.type, 5);
            }

            if (trump.get(a.value) < trump.get(b.value)) {
                return -1;
            }
            if (trump.get(a.value) > trump.get(b.value)) {
                return 1;
            } else {
                return 0;
            }
        });
    }
}

class Card {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Player {
    constructor(socket) {
        this.socket = socket;
        this.cards = [];
    }
}

createTalon();
//heartbeat();
