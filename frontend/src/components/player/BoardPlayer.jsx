import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import socket from '../../config/socket';
import { getCookie } from '../../utils/cookies';
import OtherPlayers from './OtherPlayers';
import { Link, useNavigate } from 'react-router-dom';

const BoardPlayer = () => {

    const [codeSesion, setCodeSesion] = useState('');
    const [namePlayer, setNamePlayer] = useState('');    
    const {idRoom} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        setCodeSesion(idRoom);       
        setNamePlayer(getCookie('namePlayer-WG'));  
             
               
    },[]);

    if(!namePlayer){
        navigate('../player')
    } 

    socket.emit('joinPlayerGame', {
        gameId: codeSesion,
        namePlayer
    });
    

    return (
        <div>
            <h3>{codeSesion}</h3>
            <h3>Your name: {namePlayer}</h3>
            <OtherPlayers/>
        </div>
    )
}

export default BoardPlayer
