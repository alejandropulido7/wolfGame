const Sesion = require('../models/sesion');

function createSesion(req, res) {

    Sesion.create({
        id: req.body.codeSession,
        idHost: req.body.idHost,
        quatity_wolfs: req.body.configGame.quatityWolf,
        quatity_butcher: req.body.configGame.quatityButcher,
        voting_time: req.body.configGame.votingTime,
        trivia_time: req.body.configGame.triviaTime
    }).then(session => {
        res.status(200).json(session)
    }).catch(err => {
        return res.status(400).json(['An error occurred: '+err]);
    }); 
}

function getSesion(req, res) {

    console.log('idRoom: '+req.query.idRoom);
    Sesion.findOne({        
        where: {
            id: req.query.idRoom
        }
    }).then(session => {
        res.status(200).json(session)
    }).catch(err => {
        return res.status(400).json(['An error occurred: '+err]);
    });

}

module.exports = {createSesion, getSesion};