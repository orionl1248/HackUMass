import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GameScreen from "./GameScreen.js"
import Home from "./Home.js"
import Over from "./gameOver.js"
import {Link} from 'react-router-dom'
import { useState } from 'react'

function App() {

  const [highScore, setHighScore] = useState(0);

  return (
    <div className="App">
        {/*
          <div className="NavBar">
            <Link to="/">Home</Link>
            <Link to="/GameScreen">Game</Link>
          </div>   
        */}
        <div className="ScreenPanel">
          <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/GameScreen" element={<GameScreen setHighScore={setHighScore} highScore={highScore}/>} />
              <Route exact path="/gameOver" element={<Over/>} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
