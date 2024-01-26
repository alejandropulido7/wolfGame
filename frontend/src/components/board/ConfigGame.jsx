import React, { useEffect, useState } from 'react'
import socket from '../../config/socket';
import generateUniqueId from 'generate-unique-id';
import {setCookie, getCookie } from '../../utils/cookies'
import {createSession, getSession} from '../../services/sessionGame'
import { Link, redirect } from 'react-router-dom';

const ConfigGame = () => {

    const [isPreviousGame, setIsPreviousGame] = useState(false);
    const [configGame, setConfigGame] = useState({
        quatityWolf: 0,
        quatityButcher: 0,
        votingTime: 0,
        triviaTime: 0
    });
    const [idGame, setIdGame] = useState('');

    useEffect(()=>{

        const uuid = generateUniqueId({
            length: 5,
            useLetters: false
        });        
        setIdGame(uuid);
    },[])


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setConfigGame((prevDatos) => ({
          ...prevDatos,
          [name]: value,
        }));
    };

    const handleSubmit = async () => {

        // const sessionCreated = await createSession(idGame, getCookie('hostId-wolfGame'), configGame);
        const sessionCreated = await createSession(idGame, socket.id, configGame);

        socket.emit('createNewGame', sessionCreated.id);

        setCookie('sessionId-wolfGame', sessionCreated.id, 1);
    }

    const entryPreviousSession = (code) => {
        setIsPreviousGame(true)
    }


    return (
        <div>
            {!isPreviousGame ? 
            <div>
                <h2>{idGame}</h2>
                <div>
                    <Link to={'/'}>Atras</Link>
                </div>
                <div>
                    <label>Wolf quantity: </label>
                    <input type='number' name='quatityWolf' onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Butcher quantity: </label>
                    <input type='number' name='quatityButcher' onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Voting time: </label>
                    <input type='number' name='votingTime' onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Trivia time: </label>
                    <input type='number' name='triviaTime' onChange={handleInputChange}/>
                </div>
                <p>Cantidad lobos: {configGame.quatityWolf} - cantidad carniceros: {configGame.quatityButcher} </p>
                <p>Tiempo votacion: {configGame.votingTime} - tiempo trivia: {configGame.triviaTime} </p>
                <Link to={idGame} onClick={handleSubmit}>Start new game</Link>
                <button onClick={() => setIsPreviousGame(true)} >Join to previous game</button>
            </div>
            :
            <div>
                <button onClick={() => setIsPreviousGame(false)}>Start new game</button>
                <div>
                    <label>Type session code: </label>
                    <input name='sessionCode' onChange={(e)=>entryPreviousSession(e.target.value)}/>
                </div>
            </div>
            }
        </div>
    )
}

export default ConfigGame
