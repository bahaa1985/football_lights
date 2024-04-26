import { useState } from 'react';
import { BrowserRouter as Router , Route, Routes, Link, Outlet } from 'react-router-dom';
import './App.css';
import League from './Components/League.js';


function App() {
  let [leagueId,setLeagueId]=useState(0)
  let [season,setSeason]=useState(0) 
  const year=2023;
  
  return (
     <Router>
      <Routes>
        {/* <Route path="/" element={<App/>}/> */}
        <Route path="/league" element={<League season={year}/>}>
          <Route path=":id"/>
          {/* <Route path=":id=39"/>
          <Route path=":id=140"/>
          <Route path=":id=135"/>
          <Route path=":id=78"/>
          <Route path=":id=61"/> */}
        </Route>
      </Routes>
      <Link to="/league/2">UFL</Link>
      <Link to="/league/39">EPL</Link>
      <Outlet/>
     </Router>
     );
}

export default App;
