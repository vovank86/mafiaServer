const playerService = require('../services/playerService');
const gameRoomService = require('../services/gameRoomService');

class wsGameplayController {

    constructor() {
        this.allConnections = [];
        this.rooms = {};
    }

    connect(ws, req) {
        console.log('ws work');
        this.allConnections = ws.getWss().clients;
        console.log(ws, this.allConnections);
        ws.on('message', (msg) => {
            const {name} = JSON.parse(msg);
            this.allConnections.forEach((conn) => {
                if (conn === ws) return;
                conn.send(`User ${name} was connected.`)
            });
        });
    }

    async connectToRoom(ws, req) {
        const roomId = req.params.id;
        const room = this.rooms[roomId] || {
            connections: []
        };
        room.connections.push(ws);
        this.rooms[roomId] = room;
        let roomName;
        try {
            roomName = gameRoomService.getRoomName(roomId);
        } catch (e) {
            ws.send(e.message);
        }

        ws.on('message', (msg) => {
            room.connections.forEach(function (conn) {
                if (conn === ws) {
                    ws.send(`You connect to the ${roomName} game room successfully.`);
                }
                conn.send(msg);
            });
        });
    }


}

const ctrl = new wsGameplayController();
module.exports = ctrl;