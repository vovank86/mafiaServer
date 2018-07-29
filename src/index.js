const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const expressWs = require('express-ws')(app);
const port = process.env.PORT || 8080;
const router = express.Router();
const ENV = process.env;
const gameRoomService = require('./services/gameRoomService');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mafia', {useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log('DATABASE was connected.');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

/**
 * Routes of Mafia server.
 */
router.get('/', (req, res) => {
    res.send(`Welcome to ${ENV.npm_package_name} v${ENV.npm_package_version}!`);
});

router.post('/room', async (req, res) => {
    const {name, maxPlayers} = req.body;
    let room;
    try{
         room =  await gameRoomService.create(name, maxPlayers);

    }catch (e) {
        res.status(500).json(e);
    }

    res.json(room);

});

router.delete('/room/:id', async (req, res) => {
   const id = req.params.id;
   let result;
   try{
        result = await gameRoomService.remove(id);
   }catch (e) {
       res.status(500).json(e);
   }

   res.json(result);

});

app.listen(port);
console.log('Magic happens on port ' + port);