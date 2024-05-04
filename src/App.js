
import { BrowserRouter as Router , Route, Routes, NavLink, Outlet } from 'react-router-dom';
import './App.css';
import League from './Components/League.js';
// import Game from './Components/Gametest.js';
import Game from './Components/Game.js';
import Player from './Components/Player.js';



function App() {

  const season=2023;
  
  return (
     <Router>
      <NavLink to="/league/2">UFL</NavLink>
      <NavLink to="/league/39">EPL</NavLink>
      <NavLink to="/league/140">La Liga</NavLink>
      <NavLink to="/league/135">Le Calcio</NavLink>
      <NavLink to="/league/78">Bundisliga</NavLink>
      <NavLink to="/league/61">Lige Un</NavLink>

      <Routes>
        <Route path="/league" element={<League season={season}/>}>
          <Route path=":league_id"/>          
        </Route>
        <Route path="/game" element={<Game/>}>
          <Route path=":fixture_id"></Route>
        </Route>
        <Route path="/player" element={<Player season={season}/>}>
          <Route path=":player_id"></Route>
        </Route>
      </Routes>

     </Router>
     );
}

export default App;
