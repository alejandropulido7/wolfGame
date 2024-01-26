import React, { useEffect, useState } from 'react'
import socket from '../../config/socket';
import generateUniqueId from 'generate-unique-id';
import {setCookie, getCookie } from '../../utils/cookies'
import {createSession, getSession} from '../../services/sessionGame'
import { Link, useNavigate } from 'react-router-dom';

const ConfigGame = () => {

    const [isPreviousGame, setIsPreviousGame] = useState(false);
    const [configGame, setConfigGame] = useState({
        quatityWolf: 1,
        quatityButcher: 1,
        votingTime: 1,
        triviaTime: 1
    });
    const [idGame, setIdGame] = useState('');
    const navigate = useNavigate();

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

        
        const sessionCreated = await createSession(idGame, socket.id, configGame);
        if(sessionCreated){
            navigate(idGame);
        }
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
                    <input type='number' name='quatityWolf' value={configGame.quatityWolf} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Butcher quantity: </label>
                    <input type='number' name='quatityButcher' value={configGame.quatityButcher} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Voting time: </label>
                    <input type='number' name='votingTime' value={configGame.votingTime} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Trivia time: </label>
                    <input type='number' name='triviaTime' value={configGame.triviaTime} onChange={handleInputChange}/>
                </div>
                
                <button onClick={handleSubmit}>Start new game</button>
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
