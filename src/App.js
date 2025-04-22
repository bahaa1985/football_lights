
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Navbar from './Components/Tools/Navbar.js';
import League from './Components/League/LeagueContainer.js';
import Fixture from './Components/Fixture/FixtureContainer.js';
import Player from './Components/Player.js';
import Team from './Components/Team/TeamContainer.js';
import Home from './Components/Home/HomeContainer.js';
import Preferences from './Components/Preference/PreferenceContainer.js';

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
