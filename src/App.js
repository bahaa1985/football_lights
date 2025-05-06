
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Navbar from './Components/Tools/Navbar.js';
import League from './Components/League/LeagueContainer.js';
import Fixture from './Components/Fixture/FixtureContainer.js';
import Player from './Components/Player.js';
import Team from './Components/Team/TeamContainer.js';
import Home from './Components/Home/HomeContainer.js';
import Preferences from './Components/Preference/PreferenceContainer.js';
import Search from './Components/Home/Search.jsx';

function App() {

  const season=2024;
  
  return (
     <Router>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path="/league" element={<League />}>  
        <Route path=":leagueId/:season"/> 
      </Route>
      <Route path="/fixture" element={<Fixture/>} >
        <Route path=":fixtureId"/>
      </Route>
      <Route path="/team" element={<Team />}>
        <Route path=":teamId"/>
      </Route>
      <Route path="/player" element={<Player season={season}/>}>
        <Route path=":playerId"/>
      </Route>
      <Route path="/preference" element={<Preferences />}>
      </Route>
      <Route path='/search' element={<Search />}>
      </Route>
    </Routes>
     </Router>
     );
}

export default App;
