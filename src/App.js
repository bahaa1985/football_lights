
import { BrowserRouter as Router , Route, Routes, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import League from './Components/League.js';
import Game from './Components/Game.js';
import Player from './Components/Player.js';
import Team from './Components/Team.js';
import PreferedLeagues from './Components/PreferedLeagues.js';
import PreferedTeams from './Components/PreferedTeams.js';
import CurrentFixtures from './Components/CurrentFixtures.js';

function App() {

  const season=2023;
  const [viewCurrent,setViewCurrent]=useState(false);
  
  return (
     <Router>
      <nav>
        <div><img />Preference</div>
        <div></div>
        <div></div>
      </nav>
      <NavLink to="/league/2">UFL</NavLink>
      <NavLink to="/league/39">EPL</NavLink>
      <NavLink to="/league/140">La Liga</NavLink>
      <NavLink to="/league/135">Le Calcio</NavLink>
      <NavLink to="/league/78">Bundisliga</NavLink>
      <NavLink to="/league/61">Lige Un</NavLink>
      <PreferedLeagues />
      <PreferedTeams />
      <button onClick={()=>setViewCurrent(!viewCurrent)}>Currrent</button>
      {
        viewCurrent ? <CurrentFixtures /> : null
      }
      <Routes>
        <Route path="/league" element={<League season={season}/>}>
          <Route path=":leagueId"/>          
        </Route>
        <Route path="/game" element={<Game/>} >
          <Route path=":fixtureId"/>
        </Route>
        <Route path="/team" element={<Team season={season}/>}>
          <Route path=":teamId"/>
        </Route>
        <Route path="/player" element={<Player season={season}/>}>
          <Route path=":playerId"/>
        </Route>
        
      </Routes>

     </Router>
     );
}

export default App;
