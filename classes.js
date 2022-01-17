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

exports.Card = Card;
exports.Player = Player;
