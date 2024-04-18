import { useState } from 'react';
import './App.css';
import Fixtures from './presentation/Fixtures.js'

function App() {

  let [leagueId,setLeagueId]=useState(0)
  let [season,setSeason]=useState(0) 
  const year=2023;

  return (
    <div >
     <div>
      <button onClick={()=>{setLeagueId(2);setSeason(year)}}>UFL</button>
      <button onClick={()=>{setLeagueId(39);setSeason(year)}}>EPL</button>
      <button onClick={()=>{setLeagueId(140);setSeason(year)}}>La Liga</button>
      <button onClick={()=>{setLeagueId(135);setSeason(year)}}>Le Calcio</button>
      <button onClick={()=>{setLeagueId(78);setSeason(year)}}>Bundesliga</button>
      <button onClick={()=>{setLeagueId(61);setSeason(year)}}>Liga Un</button>
     </div>
    {/* <Standings league={leagueId} season={season}/> */}
    <Fixtures league={leagueId} season={season}/>
    {/* <Statistics fixture={867946} teams={[52, 42]}/> */}
    </div>
  );
}

export default App;
