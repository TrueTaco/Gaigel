const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const classes = require("./classes.js");

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
let players = [];
let talon = [];
let currentGameState = "Waiting";
let currentGame;
let trumpCard;
let i = 0;

io.on("connection", (socket) => {
    players.push(new classes.Player(socket));
    console.log(`${players.length} | New client connected (${socket.id})`);
    io.emit("setPlayerCount", players.length);

    let message = `Hello Client ${socket.id}`;
    socket.emit("onConnect", message);

    // GAME BEGIN
    socket.on("gameBegin", () => {
        console.log("Game has been started");

        currentGame = new classes.Game(players, "123456");
        currentGame.players[0].vorhand = true;

        createTalon();
        chooseTrumpCard();
        io.emit("setTalon", talon);
        io.emit("setTrumpCard", trumpCard);

        players.forEach((player) => {
            drawCard(5, player);
            io.to(player.socket.id).emit("setYourCards", player.cards);
        });

        io.to(players[0].socket.id).emit("openOpening", "");

        io.emit("setTalon", talon);
    });

    socket.on("playCard", (data) => {
        // console.log(`Somebody played this card: ${data.type} ${data.value}`);
        let player = players.find((element) => element.socket == socket);
        if (currentGame.order[0] === player && player != undefined) {
            switch (currentGame.opening) {
                case "AndereAlteHat":
                    processAndereAlteHat(socket, data, player);
                    break;
                case "GeElfen":
                    processGoElfen(socket, data, player);
                    break;
                case "HöherHat":
                    break;
                case "AufDissle":
                    break;
                default:
                    for (let i = 0; i < player.cards.length; i++) {
                        if (
                            data.type === player.cards[i].type &&
                            data.value === player.cards[i].value
                        ) {
                            player.cards.splice(i, 1);
                            break;
                        }
                    }
                    player.playedCard = data;
                    currentGame.playedCards.push(data);
                    io.emit("setPlayedCards", currentGame.playedCards);
                    currentGame.order.shift();
                    break;
            }
        } else {
            io.emit("setPlayedCards", currentGame.playedCards);
            socket.emit("setYourCards", player.cards);
        }
    });

    socket.on("AndereAlteHat", () => {
        currentGame.opening = "AndereAlteHat";
        console.log("AndereAlteHat");
        io.to(socket.id).emit("closeOpening", "");
        // Set GameOpening
    });

    socket.on("GeElfen", () => {
        currentGame.opening = "GeElfen";
        console.log("GeElfen");
        io.to(socket.id).emit("closeOpening", "");
        // Set GameOpening
    });

    socket.on("HöherHat", () => {
        currentGame.opening = "HöherHat";
        console.log("HöherHat");
        io.to(socket.id).emit("closeOpening", "");
        // Set GameOpening
    });

    socket.on("AufDissle", () => {
        currentGame.opening = "AufDissle";
        console.log("AufDissle");
        io.to(socket.id).emit("closeOpening", "");
        // Set GameOpening
    });

    socket.on("template", () => {
        // Do something
    });

    socket.on("disconnect", () => {
        players = players.filter((player) => player.socket.id != socket.id);
        console.log(`${players.length} | Client disconnected (${socket.id})`);
    });
});

function processAndereAlteHat(socket, data, player) {
    if (player === currentGame.players[0]) {
        if (data.value === "A") {
            player.playedCard = data;
            currentGame.playedCards.push(data);
            io.emit("setPlayedCards", currentGame.playedCards);
            currentGame.order.shift();
        } else {
            io.emit("setPlayedCards", currentGame.playedCards);
        }
    } else {
        player.playedCard = data;
        currentGame.playedCards.push(data);
        io.emit("setPlayedCards", currentGame.playedCards);
        currentGame.order.shift();
    }
    if (currentGame.order.length === 0) {
        if (currentGame.playedCards.filter((card) => card.value === "A").length == 1) {
            console.log(players[0] + " Won");
        } else {
            let winner = currentGame.players
                .slice(1)
                .filter((player) => player.playedCard == currentGame.playedCards[0]);

            console.log(winner + "won (other dude)");
        }
    }
}

function processGoElfen(socket, data, player) {
    if (player === currentGame.players[0]) {
        if (data.value === "A") {
            player.playedCard = data;
            currentGame.playedCards.push(data);
            io.emit("setPlayedCards", currentGame.playedCards);
            currentGame.order.shift();
        } else {
            io.emit("setPlayedCards", currentGame.playedCards);
        }
    } else {
        player.playedCard = data;
        currentGame.playedCards.push(data);
        io.emit("setPlayedCards", currentGame.playedCards);
        currentGame.order.shift();
    }
    if (currentGame.order.length === 0) {
        console.log(players[0] + " Won");
    }
}

function createTalon() {
    let types = ["Eichel", "Blatt", "Herz", "Schellen"];
    // let types: string[] = ["Eichel"];
    let values = ["7", "U", "O", "K", "10", "A"];
    let newTalon = [];

    types.forEach((type) =>
        values.forEach((value) => {
            newTalon.push(new classes.Card(type, value));
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

createTalon();
