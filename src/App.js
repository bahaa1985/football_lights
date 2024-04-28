
import { BrowserRouter as Router , Route, Routes, NavLink, Outlet } from 'react-router-dom';
import './App.css';
import League from './Components/League.js';
import Game from './Components/Game.js';


function App() {

  const year=2023;
  
  return (
     <Router>
      <NavLink to="/league/2">UFL</NavLink>
      <NavLink to="/league/39">EPL</NavLink>
      <NavLink to="/league/140">La Liga</NavLink>
      <NavLink to="/league/135">Le Calcio</NavLink>
      <NavLink to="/league/78">Bundisliga</NavLink>
      <NavLink to="/league/61">Lige Un</NavLink>

      <Routes>
        <Route path="/league" element={<League season={year}/>}>
          <Route path=":league_id"/>          
        </Route>
        <Route path="/game" element={<Game/>}>
          <Route path=":fixture_id"></Route>
        </Route>
      </Routes>
     
      <Outlet/>
     </Router>
     );
}

export default App;
