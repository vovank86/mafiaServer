const gameRoomModel = require('../models/gameRoom');

class GameRoomService {

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

    async getRoomName(id){
       return await gameRoomModel.findById(id, 'name');
    }
}

const service = new GameRoomService();

module.exports = service;