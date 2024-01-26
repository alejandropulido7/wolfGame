import React, { useState } from 'react'
import {setCookie, getCookie} from '../../utils/cookies'
import socket from '../../config/socket';

const AppPlayer = () => {

  const [codeSessionGame, setCodeSessionGame] = useState('');
  const [namePlayer, setNamePlayer] = useState('');

  const entrySessionGame = () => {
    socket.emit('joinPlayerGame', {
      gameId: codeSessionGame,
      namePlayer
    })
  }

  return (
    <div>
      <h1>Join in a Room</h1>
      <div>
          <label>Name player: </label>
          <input name='namePlayerMobile' onChange={(e)=>setNamePlayer(e.target.value)}/>
      </div>
      <div>
          <label>Type room code: </label>
          <input type='number' name='sessionCodeMobile' onChange={(e)=>setCodeSessionGame(e.target.value)}/>
      </div>
      <button onClick={entrySessionGame}>Start game</button>
      <p>codeSessionGame: {codeSessionGame}</p>
      <p>Name: {namePlayer}</p>
    </div>
  )
}

export default AppPlayer
