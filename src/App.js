
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Navbar from '../src/Components/Navbar.jsx'
import Footer from '../src/Components/Footer.jsx';
import League from '../src/UI/League/LeagueContainer.js';
import Fixture from '../src/UI/Fixture/FixtureContainer.js';
import Player from '../src/UI/Player/PlayerContainer.js';
import Team from '../src/UI/Team/TeamContainer.js';
import Home from '../src/UI/Home/HomeContainer.js';
import Preferences from '../src/UI/Preference/PreferenceContainer.js';
import Search from '../src/UI/Home/Search.jsx';


function App() {

  const season=2024;
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Navbar className="h-16" />
        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leagues" element={<League />}>
              <Route path=":leagueId" />
            </Route>
            <Route path="/fixture" element={<Fixture />}>
              <Route path=":fixtureId" />
            </Route>
            <Route path="/teams" element={<Team />}>
              <Route path=":teamId" />
            </Route>
            <Route path="/search" element={<Search/>}>
            </Route>
            <Route path="/players" element={<Player season={season} />}>
              <Route path=":playerId" />
            </Route>
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </main>
        {/* Footer */}
        <Footer className="h-16" />
      </div>
    </Router>
     );
}

export default App;
