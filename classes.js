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

class Game {
    constructor(players, lobbycode) {
        this.players = players;
        this.lobbycode = lobbycode;
        this.playedCards = [];
    }
}

exports.Card = Card;
exports.Player = Player;
exports.Game = Game;
