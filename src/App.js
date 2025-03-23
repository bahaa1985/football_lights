
import { BrowserRouter as Router , Route, Routes, NavLink } from 'react-router-dom';
import Navbar from './Navbar.js';
import League from './Components/LeagueDetails/League.js';
import Fixture from './Components/FixtureDetails/Fixture.js';
import Player from './Components/Player.js';
import Team from './Components/Team/Team.js';
import Home from './Components/Home.js';
import Preferences from './Components/Preference/Preference.js';
import logo from './images/logo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function App() {

  const season=2024;
  
  return (
     <Router>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path="/leagues" element={<League />}>  
        <Route path="/leagues/:leagueId/:season"/> 
      </Route>
      <Route path="/fixtures" element={<Fixture/>} >
        <Route path=":fixtureId"/>
      </Route>
      <Route path="/teams" element={<Team />}>
        <Route path=":teamId"/>
      </Route>
      <Route path="/players" element={<Player season={season}/>}>
        <Route path=":playerId"/>
      </Route>
      <Route path="/preference" element={<Preferences />}>
      </Route>
      <Route path="/fixture" element={<Fixture />}> 
        <Route path=":fixtureId"/>
      </Route>
    </Routes>

     </Router>
     );
}

export default App;
