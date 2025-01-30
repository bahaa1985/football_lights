
import { BrowserRouter as Router , Route, Routes, NavLink } from 'react-router-dom';
import DayFixtures from './Components/Fixtures/DayFixtures.js';
import League from './Components/League/League.js';
import Game from './Components/Game/Game.js';
import Player from './Components/Player.js';
import Team from './Components/Team/Team.js';
import Home from './Components/Home.js';
import Preferences from './Components/Preference/Preference.js';
import logo from './images/logo.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function App() {

  const season=2024;
  
  return (
     <Router>
      <nav id="nav_bar" class="bg-slate-900 w-full h-16 p-1 fixed top-0 left-0 flex no-wrap justify-between lg:justify-start shadow-md z-40">
      {/* Hamburger button */}
      <div className="my-auto md:hidden basis-1/3">
        <button id="hamburger_button">
          <svg id="hamburger_lines" class="h-12 w-12 stroke-slate-100" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg id="hamburger_close" class="hidden h-12 w-12 stroke-gray-100" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* logo */}
      <div className="relative -top-6 px-3 xs:basis-1/3 sm:basis-1/12">
        <NavLink className="px-3" to="/">
          <img className="mx-auto sm:mx-0 rounded-full max-w-14 h-14" alt="" 
          src={logo}/>
        </NavLink>
      </div>

		  {/* navigation links */}
      <div className="px-3 my-0 hidden md:visible text-center md:flex md:basis-6/12">
        <ul className="w-[90%] flex sm:space-x-2 text-slate-100 font-semibold">
          <li className=" py-5 px-3 hover:border-b-4 border-gray-900 leading-3 cursor-pointer"><NavLink to="/fixtures">Fixtures</NavLink></li>
          <li className=" py-5 px-3 hover:border-b-4 border-gray-900 leading-3 cursor-pointer"><NavLink to="/leagues">Leagues</NavLink></li>
          <li className=" py-5 px-3 hover:border-b-4 border-gray-900 leading-3 cursor-pointer"><NavLink to="/teams">Teams</NavLink></li>         
        </ul>
      </div>

      <div className="px-3 flex justify-end no-wrap basis-1/3 sm:basis-5/12">
        <div className='my-auto text-slate-100 font-semibold'>
        <NavLink className=" py-5 px-3 hover:border-b-4 border-gray-900 leading-3 cursor-pointer" to="/preference">Preference         
          </NavLink>
        </div>
        {/* Search bar */}
        <div className="px-3 md:flex justify-between hidden my-auto">
          <svg id="search" viewBox="0 0 512 512" class="h-6 w-6 cursor-pointer p-0.5 rounded-l-md fill-gray-800 bg-[#fff]" title="search">
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
          </svg>
          <input type="text" className="w-36 rounded-r-md bg-[#fff] outline-none" />
        </div>
      </div>
    </nav>

    {/* Hambruger items */}
    <div id="hamburger_items" className="fixed w-full h-0 overflow-y-hidden my-auto top-16 left-0 text-center z-10 ">
      <ul className="myul w-full flex flex-col items-center px-2 bg-slate-900 z-10 text-slate-100">
        <li className="liclass w-full  py-2 border-b border-gray-600 border-solid"><NavLink to='/fixtures'>Fixtures</NavLink></li>
        <li className="liclass w-full  py-2 border-b border-gray-600 border-solid"><NavLink to='/leagues'>Leagues</NavLink></li>
        <li className="liclass w-full  py-2 border-b border-gray-600 border-solid"><NavLink to='/teams'>Teams</NavLink></li>
        <li className="liclass w-full  py-2 border-b border-gray-600 border-solid"><NavLink to="/preference">Preference</NavLink></li>
        {/* search bar */}
        <li className="liclass mx-5 py-2">
          <div className="flex justify-between my-auto">
            <svg viewBox="0 0 512 512" class="w-6 cursor-pointer p-0.5 rounded-l-md bg-[#fff]" title="search" fill="#1f2937">
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
            </svg>
            <input type="text" class=" rounded-r-md bg-[#fff]  outline-none " />
          </div>
        </li>
      </ul>
    </div>
    <Routes>
      <Route path='/' element={<DayFixtures/>}>
      </Route>
      {/* <Route path='/fixtures' element={<DateFixtures />}/> */}
      <Route path="/leagues" element={<League />}>  
        <Route path="/leagues/:leagueId/:season"/> 
      </Route>
      <Route path="/fixtures" element={<Game/>} >
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
      <Route path="/game" element={<Game />}> 
        <Route path=":fixtureId"/>
      </Route>
      {/* <Route path="/events" element={<Events />}>
        <Route path=":fixtureId"/>
      </Route> */}
    </Routes>

     </Router>
     );
}

export default App;
