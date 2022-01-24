class Card {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Player {
    constructor(socket) {
        this.username = "";
        this.lobbycode = "";
        this.vorhand = false;
        this.playedCard = {};
        this.cards = [];
        this.socket = socket;
    }
}

class Game {
    constructor(players, lobbycode) {
        this.opening = "";
        this.lobbycode = lobbycode;
        this.playedCards = [];
        this.players = players;
        this.order = [];
    }
}

exports.Card = Card;
exports.Player = Player;
exports.Game = Game;
