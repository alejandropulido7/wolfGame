const MatchPlayers = require('../models/sessionPlayers')

async function createPlayer(dataPlayer) {
    
    let player = {};
    

    try {
        player = await MatchPlayers.findOne({        
            where: {
                id_session: dataPlayer.gameId,
                name: dataPlayer.namePlayer
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
}

module.exports = {createPlayer}