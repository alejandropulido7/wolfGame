const MatchPlayers = require('../models/sessionPlayers')

function createPlayer(socket, io) {
    
    let player = {};
    
    socket.on('createNewPlayer', async ({idMatch, namePlayer}) => {
        try {
            player = await MatchPlayers.findOne({        
                where: {
                    id_match: idMatch,
                    name: namePlayer
                }
            });
    
            if(!player){
                player = await MatchPlayers.create({
                    id_match: idMatch,
                    name: namePlayer,
                    score_game: 0,
                    role_game: 'Lobo',
                    status_game: true,
                    id: socket.id
                });
            }
            
            
            
        } catch (err) {
            console.log(err)
        }

        io.emit('newPlayer', player);
    });

}

module.exports = {createPlayer}