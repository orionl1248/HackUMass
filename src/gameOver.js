import "./gameOver.css"
import {Link} from 'react-router-dom'

const Over = () => {
    return (
      <div>
       
        <center><strong><em><h1 id = "h11">Game Over</h1></em></strong></center>
        <center><button class = "overButton"><Link to="/GameScreen"> <strong><em>Retry?</em></strong></Link></button></center>
      </div>
    )
  }

  export default Over;