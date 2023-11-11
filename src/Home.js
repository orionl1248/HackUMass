import "./home.css"
import {Link} from 'react-router-dom'

const Home = () => {
  return <div className="HomeBody"><center><h1><span id = "UMASS"> UMASS </span>Rate My Professor</h1>
  <h1>Higher or Lower Game</h1></center>

  <center><button><Link to="/GameScreen"> <strong><em>Start Game</em></strong></Link></button></center>
  <center><img id = "UMass" src = "./university-of-massachusetts.png" alt = "UMass Logo"></img></center>
  <center><img id = "UMass2" src = "./university-of-massachusetts.png" alt = "UMass Logo"></img></center>

  <center><h1>Instructions!</h1></center>
  <center><ol>
    <li class = "left"> <strong><em> Each round, the names of two professors will appear.</em> </strong></li>
    <li class = "left"><strong><em> You have to guess which professor's rating from the popular site Rate My Professor is higher or lower.</em></strong></li>
    <li class = "left"><strong><em> The game continues until you guess wrong. Good luck!</em></strong></li>
  </ol></center>
  
</div>
}

// test

export default Home;
