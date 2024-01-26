import React, { useState, useEffect } from 'react'
import socket from '../../config/socket';
import {hasCookie, setCookie, getCookie} from '../../utils/cookies'
import {useParams, useNavigate} from 'react-router-dom';
import {getSession} from '../../services/sessionGame'

const BoardGame = () => {

    const [codeSession, setCodeSession] = useState('');
    const [session, setSession] = useState({});
    const [players, setPlayers] = useState([]);    
    const {idRoom} = useParams();
    const navigate = useNavigate();
    
    const getSessionCreated = async (idRoom) => {
        
        const sessionCreated = await getSession(idRoom);
        if(sessionCreated){
            setSession(sessionCreated);
            socket.emit('createNewGame', sessionCreated.id);
        } else {
            navigate('../room');
        }
    }    

    useEffect(() => {        
        setCodeSession(idRoom);
        getSessionCreated(idRoom);
    },[]);

    socket.on('status', (msg) => {
        console.log(msg)
    });

    socket.on('playerJoinedRoom', (players) => {
        setPlayers(players);
    });

    console.log(players);
    console.log(session);

    return (
        <div>
            <div>
                <h3>Game configuration</h3>
                <h4>{codeSession}</h4>
                <p>Cantidad lobos: {session.quatity_wolfs} - cantidad carniceros: {session.quatity_butcher} </p>
                <p>Tiempo votacion: {session.voting_time} - tiempo trivia: {session.trivia_time} </p>
            </div>
            <button>Ready to play</button>
            <div>
                {
                    players.map((player) => {
                        return (<h3 key={player.namePlayer}>{player.namePlayer}</h3>)
                    })
                }
            </div>
        
        </div>
    )
}

export default BoardGame
