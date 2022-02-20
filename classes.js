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
        this.ready = false;
        this.wins = 0;
        this.score = 0;
        this.stiche = 0;
        this.vorhand = false;
        this.playedCard = {};
        this.cards = [];
        this.socket = socket;
        this.melden = false;
    }
}

class Game {
    constructor(players, lobbycode) {
        this.ongoing = false;
        this.lobbycode = lobbycode;
        this.trumpCard = {};
        this.opening = "";
        this.talon = [];
        this.playedCards = [];
        this.players = players;
        this.order = [];
    }
}

exports.Card = Card;
exports.Player = Player;
exports.Game = Game;
