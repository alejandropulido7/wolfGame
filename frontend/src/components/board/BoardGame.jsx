import React, { useState, useEffect } from 'react'
import socket from '../../config/socket';
import {hasCookie, setCookie, getCookie} from '../../utils/cookies'
import {useParams} from 'react-router-dom';

const BoardGame = () => {

    const [codeSesion, setCodeSesion] = useState('');

    const [players, setPlayers] = useState([]);
    
    const {idRoom} = useParams();
    

    useEffect(() => {

        setCodeSesion(idRoom);

        
        socket.on('status', (msg) => {
            console.log(msg)
        });

    },[]);

    socket.on('playerJoinedRoom', (players) => {
        setPlayers(players);
    });

    console.log(players);

    return (
        <div>
            <h3>{codeSesion}</h3>
            <h2>Eu</h2>
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
