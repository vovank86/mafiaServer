const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = Schema({
    gameRoom: {type:Schema.Types.ObjectId, ref: 'GameRoom'},
    name: String
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;