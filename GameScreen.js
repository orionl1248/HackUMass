import { apiFetch } from "./scripts/FetchApi"
import { randomElement } from "./scripts/util"
import getPeople from "./scripts/rateMyProfessor"
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import "./GameScreen.css"
import Professor from "./Professor"
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Header from "./Header"
import IconButton from '@mui/material/IconButton';
import { Rating } from "@mui/material";

export default function GameScreen() {
  let [professorBase, setProfessorBase] = useState({});
  let [isSubmitted, setSubmitted] = useState(false);
  let [score, setScore] = useState(0);
  let [highScore, setHighScore] = useState(0);
  let [left, setLeft] = useState({});
  let [right, setRight] = useState({});

  useEffect(() => {
    if (isSubmitted) {
      console.log(left);
      console.log(right);
    }
  }, [isSubmitted]);

  useEffect(() => {
    (async () => {
      console.log("professorBase", professorBase);
      setRight(await randomElement(professorBase));
      setLeft(await randomElement(professorBase));
    })();
  }, [professorBase])

  useEffect(() => {
    (async () => {
      setProfessorBase(await getPeople());
    })();
  }, []);
  function submitAndRandomizeHigher(){
    isSubmitted = true;
    randomize();
   console.log(left.node.avgRating)
   console.log(right.node.avgRating)
   if (right.node.avgRating > left.node.avgRating){
    score = score + 1;
    setScore(score);
   }
   else {
    score = score -1;
   }

  }
  function submitAndRandomizeLower(){
    isSubmitted = true;
    randomize();
   console.log(left.node.avgRating)
   console.log(right.node.avgRating)
   if (right.node.avgRating < left.node.avgRating){
    score = score + 1;
    setScore(score);
   }
   else {
    score = score -1;
   }

  }
  
  async function randomize(){
    var professor1 = randomElement(professorBase)
    var professor2 = randomElement(professorBase) 
    setRight(await professor1);
    setLeft(await professor2);
  }
  
  return <>
    <Header />
    <div className="GameFullPanel">
      <div className="Bar">
        <div className="TextBox">
          <h2>Score: {score}</h2>
        </div>
      </div>
      <div className="HoldsTwoPanels">
        <div className="HalfPanel RightPanel">
          <Professor info={left}/>
        </div>
        <div className="HalfPanel LeftPanel">
          <Button 
            onClick={()=>{submitAndRandomizeHigher()}}
            type="submit"
            variant="contained"
            className="HigherLowerButton"
          >Higher</Button>
          <Professor info={right}/>
          <Button 
            onClick={()=>{submitAndRandomizeLower()}}
            type="submit"
            variant="contained"
            className="HigherLowerButton"
          >Lower</Button>
        </div>
      </div>
      <div className="Bar">
        <div className="RestartBox" onClick={()=>{window.parent.location = window.parent.location.href}}>
          <IconButton 
            color="primary"
            variant="contained"
          >
            <RestartAltIcon sx={{fontSize: "3rem"}}/>
          </IconButton>
        </div>
        <div className="TextBox">
          <h2>High Score: {highScore}</h2>
        </div>
      </div>
    </div>
  </>
}
