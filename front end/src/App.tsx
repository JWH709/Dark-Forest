import { Routes, Route } from "react-router-dom";
import Login from './sections/login/Login'
import Home from './sections/home/Home'
import Game from './sections/game/Game'
import Lobby from "./sections/lobby/Lobby";
import './styles/app.css'

const App = () => {

  return (
    <>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/game" element={<Game />} />
          <Route path="/home/lobby" element={<Lobby />}/>
        </Routes>
      </div>
    </>
  )
}

export default App
