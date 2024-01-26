import React, { useState } from 'react';
import { Link } from 'react-router-dom'


const AppBoard = () => {

    return (
        <div>
            <h1>Wolf game</h1>
            <Link to={'room'}>Start new game</Link>
            <br />
            <Link to={'player'}>Entry as Player</Link>
        </div>
    )
}

export default AppBoard
