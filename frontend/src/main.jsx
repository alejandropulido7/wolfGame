import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConfigGame from './components/board/ConfigGame.jsx';
import BoardGame from './components/board/BoardGame.jsx';
import AppBoard from './components/board/AppBoard.jsx';
import AppPlayer from './components/player/AppPlayer.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BoardPlayer from './components/player/BoardPlayer.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AppBoard/>
      },
      {
        path: "room",
        element: <ConfigGame/>,
        // children: [
        //   {
        //     path: ":idRoom",
        //     element: <BoardGame/>
        //   }
        // ]
      },
      {
        path: "room/:idRoom",
        element: <BoardGame/>
      }, 
      {
        path: "player",
        element: <AppPlayer/>
      },         
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={AppBoard}/>
        <Route path='/room' Component={ConfigGame}/>
        <Route path='/room/:idRoom' Component={BoardGame}/>
        <Route path='/player' Component={AppPlayer}/>
        <Route path='/player/:idRoom' Component={BoardPlayer}/>
      </Routes>
    
    </BrowserRouter>

  </React.StrictMode>,
)
