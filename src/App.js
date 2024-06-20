
import { BrowserRouter as Router , Route, Routes, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js'
import League from './Components/League.js';
import Game from './Components/Game.js';
import Player from './Components/Player.js';
import Team from './Components/Team.js';
import CurrentFixtures from './Components/CurrentFixtures.js';
import Preferences from './Components/Preference.js';
import DateFixtures from './Components/DateFixtures.js';
// import Test from './Components/Test.js'

function App() {

  const season=2024;
  const [viewCurrent,setViewCurrent]=useState(false);
  
  return (
    // <div>
    //   <Test />
    // </div>
     <Router>
      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Logo</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/fixtures">Fixtures</a>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" href="/leagues">Leagues</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Statistics</a>
              </li>  */}
              <li class="nav-item">
                <a class="nav-link" href="/preferences">Preferences</a>
              </li>     
            </ul>
          </div>
        </div>
</nav>
      {/* <NavLink to="/league/2">UFL</NavLink>
      <NavLink to="/league/39">EPL</NavLink>
      <NavLink to="/league/140">La Liga</NavLink>
      <NavLink to="/league/135">Le Calcio</NavLink>
      <NavLink to="/league/78">Bundisliga</NavLink>
      <NavLink to="/league/61">Lige Un</NavLink> */}
      {/* <PreferedLeagues />
      <PreferedTeams />
      <button onClick={()=>setViewCurrent(!viewCurrent)}>Currrent</button>
      {
        viewCurrent ? <CurrentFixtures /> : null
      } */}
      <Routes>
        <Route path='/' element={<CurrentFixtures season={season}/>}>
        </Route>
        <Route path='/fixtures' element={<DateFixtures />}/>
        <Route path="/leagues" element={<League season={season}/>}>
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
        <Route path="/preferences" element={<Preferences />}>

        </Route>
      </Routes>

     </Router>
     );
}

export default App;
