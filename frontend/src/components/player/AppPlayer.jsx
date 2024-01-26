import React, { useState } from 'react'
import {setCookie, getCookie, hasCookie} from '../../utils/cookies'
import { Link } from 'react-router-dom';

const AppPlayer = () => {

  const [codeSessionGame, setCodeSessionGame] = useState('');
  const [namePlayer, setNamePlayer] = useState('');

  const entrySessionGame = () => {
    setCookie('namePlayer-WG', namePlayer, 1);
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
      <Link to={codeSessionGame} onClick={entrySessionGame}>Start game</Link>
    </div>
  )
}

export default AppPlayer
