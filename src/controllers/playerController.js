const express = require('express');
const playerService = require('../services/playerService');
const playerController = express.Router();

playerController.post('/', async (req, res) => {
   const {name, email} = req.body;
   let result;
   try{
       result = await playerService.create(name, email);
   }catch (e) {
       res.status(500).json(e);
   }

   res.json(result);
});

playerController.delete('/:id', async (req, res) => {
    const id = req.params.id;
    let result;
    try{
        result = await playerService.remove(id);
    }catch (e) {
        res.status(500).json(e);
    }

    res.json(result);
});

module.exports = playerController;