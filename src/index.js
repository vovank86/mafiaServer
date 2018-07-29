const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const gameRoomService = require('./services/gameRoomService');

const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

const router = express.Router();
const ENV = process.env;

/**
 * DB Settings
 */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mafia', {useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('DATABASE was connected.');
});

/**
 * App Core settings
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

/**
 * Controllers
 */
const gameRoomCtrl = require('./controllers/gameRoomController');
const playerCtrl = require('./controllers/playerController');

const rooms = {};

connectPlayer = (ws, req) => {
    ws.on('message', (msg) => {
        const {name} = JSON.parse(msg);
        const clients = expressWs.getWss().clients;
        console.log(clients);
        clients.forEach((conn) => {
            if (conn === ws) return;
            conn.send(`User ${name} was connected.`)
        });
    });
};

 connectToRoom = async (ws, req) => {
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
            }else {
                conn.send(msg);
            }
        });
    });
};

/**
 * Routes of Mafia API server.
 */

router.ws('/', connectPlayer);
router.ws('/room/:id', connectToRoom);

router.get('/', (req, res) => {
    res.send(`Welcome to ${ENV.npm_package_name} v${ENV.npm_package_version}!`);
});

router.use('/room', gameRoomCtrl);
router.use('/player', playerCtrl);



/**
 *  Listen port
 */
app.listen(port);
console.log('Magic happens on port ' + port);
