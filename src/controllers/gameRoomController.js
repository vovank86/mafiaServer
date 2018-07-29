const express = require('express');
const roomController = express.Router();
const gameRoomService = require('../services/gameRoomService');

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


module.exports = roomController;