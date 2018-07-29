const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameRoomSchema = Schema({
    name: String,
    maxPlayers: Number,
    players: [{type: Schema.Types.ObjectId, ref: 'Player'}]
});

const GameRoom = mongoose.model('GameRoom', gameRoomSchema);

module.exports = GameRoom;