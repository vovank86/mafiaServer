const playerModel = require('../models/player');

class PlayerService {
    async create(name, email){
        if(!name) throw new Error('Name can not be empty!');
        if(!email) throw  new Error('Email can not be empty!');
        const player = new playerModel({name, email});

        return await player.save();
    }

    async remove(id) {
        if(!id) throw new Error('no id of room');

        return await playerModel.findByIdAndDelete(id);
    }

    async auth(email) {

        return await playerModel.findOne({email});
    }
}

const service = new PlayerService();

module.exports = service;