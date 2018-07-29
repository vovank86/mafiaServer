const playerModel = require('../models/player');
const gameRoomModel = require('../models/gameRoom');

class gameRoomService {

   async create(name, maxPlayers){
        if(!name) throw new Error('name can not be empty');
        if(name && !/\w+/.test(name)) throw new Error('name could contain only latin letters and digits');
        if(!maxPlayers || maxPlayers < 2) throw new Error('minimal count players for one room is 2');
        const room = new gameRoomModel({name, maxPlayers});

        return await room.save();
    }

    async remove(id){
       if(!id) throw new Error('no id of room');

       return await gameRoomModel.findByIdAndDelete(id);
    }
}

const service = new gameRoomService();

module.exports = service;