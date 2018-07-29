const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = Schema({
    name: String,
    email: String
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;