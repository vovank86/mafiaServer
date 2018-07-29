const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

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
const gameplayCtrl = require('./controllers/wsGameplayController');

/**
 * Routes of Mafia API server.
 */
router.ws('/', gameplayCtrl.connect);
router.ws('/room/:id', gameplayCtrl.connectToRoom);

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