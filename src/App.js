
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Navbar from '../src/Components/Navbar.js'
import Footer from '../src/Components/Footer.js';
import League from '../src/UI/League/LeagueContainer.js';
import Fixture from '../src/UI/Fixture/FixtureContainer.js';
import Player from '../src/UI/Player.js';
import Team from '../src/UI/Team/TeamContainer.js';
import Home from '../src/UI/Home/HomeContainer.js';
import Preferences from '../src/UI/Preference/PreferenceContainer.js';
import Search from '../src/UI/Home/Search.jsx';

function App() {

  const season=2024;
  
  return (
     <Router>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path="/leagues" element={<League />}>  
        <Route path=":leagueId"/> 
      </Route>
      <Route path="/fixture" element={<Fixture/>} >
        <Route path=":fixtureId"/>
      </Route>
      <Route path="/teams" element={<Team />}>
        <Route path=":teamId"/>
      </Route>
      <Route path="/players" element={<Player season={season}/>}>
        <Route path=":playerId"/>
      </Route>
      <Route path="/preferences" element={<Preferences />}>
      </Route>
      <Route path='/search' element={<Search />}>
      </Route>
    </Routes>
    <Footer />
     </Router>
     );
}

export default App;
