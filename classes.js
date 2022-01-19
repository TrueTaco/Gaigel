class Card {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Player {
    constructor(socket) {
        this.vorhand = false;
        this.socket = socket;
        this.cards = [];
        this.playedCard = {};
    }
}

class Game {
    constructor(players, lobbycode) {
        this.opening = "";
        this.players = players;
        this.lobbycode = lobbycode;
        this.playedCards = [];
        this.order = players.slice();
    }
}

exports.Card = Card;
exports.Player = Player;
exports.Game = Game;
