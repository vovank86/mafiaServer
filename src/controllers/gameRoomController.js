const express = require('express');
const roomController = express.Router();
const gameRoomService = require('../services/gameRoomService');

const rooms = {};

roomController.post('/', async (req, res) => {
    const {name, maxPlayers} = req.body;
    let room;
    try{
        room =  await gameRoomService.create(name, maxPlayers);

    }catch (e) {
        res.status(500).json(e);
    }

    res.json(room);

});

roomController.delete('/:id', async (req, res) => {
    const id = req.params.id;
    let result;
    try{
        result = await gameRoomService.remove(id);
    }catch (e) {
        res.status(500).json(e);
    }

    res.json(result);

});

roomController.ws('/:id', async (ws, req) => {
    const roomId = req.params.id;
    const room = rooms[roomId] || {
        connections: []
    };
    console.log(room.connections.length);
    room.connections.push(ws);
    rooms[roomId] = room;
    let roomName;
    try {
        roomName = await gameRoomService.getRoomName(roomId);
    } catch (e) {
        ws.send(e);
    }

    ws.on('message', (msg) => {
        room.connections.forEach(function (conn) {
            if (conn === ws) {
                conn.send(`You connect to the ${roomName} game room successfully.`);
            } else {
                conn.send(msg);
            }
        });
    });
});


module.exports = roomController;