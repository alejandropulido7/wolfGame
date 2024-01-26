const detectMobileDevice = require('../utils/detectDevice');
const {createPlayer} = require('./players')

var io
var gameSocket
// gamesInSession stores an array of all active socket connections
var players = [];
var boards = []


const initializeGame = (sio, socket) => {

    // initialize global variables.
    io = sio 
    gameSocket = socket 

    // pushes this socket to an array which stores all the active players or board sockets.
    if(!detectMobileDevice(socket)){
        boards.push(gameSocket)
    } else {
        players.push(gameSocket)
    }

    // Run code when the client disconnects from their socket session. 
    gameSocket.on("disconnect", onDisconnect)

    // User creates new game room after clicking 'submit' on the frontend
    gameSocket.on("createNewGame", createNewGame)

    // User creates new game room after clicking 'submit' on the frontend
    gameSocket.on("joinPlayerGame", joinPlayerGame)



    // createPlayer(socket, io);


    socket.on('disconnect', () => {
        console.log('Dispositivo desconectado');
    });
}


function createNewGame(gameId) {
    console.log(gameId);
    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    this.emit('createNewGame', {gameId: gameId, mySocketId: this.id});

    console.log(this.id)
    boards.push(gameId)

    // Join the Room and wait for the other player
    this.join(gameId)
}

function joinPlayerGame(dataPlayer) {
    console.log(dataPlayer);

    let currentSocket = this;

    const gameId = parseInt(dataPlayer.gameId);
    
    let room = io.sockets.adapter.rooms.get(gameId);

    console.log(io.sockets.adapter.rooms.has(gameId));

    if (room === undefined) {
        this.emit('status' , "This game session does not exist." );
        return
    }

    
    if(players.find(player => player.namePlayer == dataPlayer.namePlayer)){        
        console.log('repetido')
        this.emit('status' , "This name player already exist on the room." );
    } else {
        players.push(dataPlayer);
    }
    
    console.log(players)
    currentSocket.join(gameId)

    console.log(room.size)

    io.sockets.in(gameId).emit('playerJoinedRoom', players);
    
}

function onDisconnect () {
    console.log('Device disconnect')
}

module.exports = initializeGame