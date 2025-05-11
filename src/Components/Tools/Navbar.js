import {NavLink} from 'react-router-dom';
import { useRef , useEffect, useState } from 'react';
import logo from '../../images/logo.jpg';
import Search from '../Home/Search.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
    const hamburger_button = useRef(null);
    const hamburger_items = useRef(null);
    const [searchWindow,setSearchWindow]=useState(false);

    useEffect(() => {
        const button = hamburger_button.current;
        button.addEventListener('click', handleHamburgerClick);
        return () => {
            button.removeEventListener('click', handleHamburgerClick);
        };
    }, []);

    function handleHamburgerClick(){
        console.log(hamburger_items.current);
        
        hamburger_items.current.classList.toggle('h-0');
        hamburger_items.current.classList.toggle('h-96');
        hamburger_button.current.children[0].classList.toggle('hidden');
        hamburger_button.current.children[1].classList.toggle('hidden');
    }
    function handleSearchWindow(){
      setSearchWindow(!searchWindow);
      console.log('search',searchWindow);
      
    }

    return ( 
        <div>
            <nav id="nav_bar" className="bg-slate-900 w-full h-16 p-1 fixed top-0 left-0 flex no-wrap justify-between lg:justify-start shadow-md z-40">
      {/* Hamburger button */}
      <div className="my-auto md:hidden basis-1/3">
        <button id="hamburger_button" ref={hamburger_button}>
          <svg id="hamburger_lines" className="h-12 w-12 stroke-slate-100" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <svg id="hamburger_close" className="hidden h-12 w-12 stroke-gray-100" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
          <li className=" py-5 px-3 border-gray-900 leading-3 cursor-pointer"><NavLink to="/fixtures">Fixtures</NavLink></li>
          <li className=" py-5 px-3 border-gray-900 leading-3 cursor-pointer"><NavLink to="/league">Leagues</NavLink></li>
          <li className=" py-5 px-3 border-gray-900 leading-3 cursor-pointer"><NavLink to="/team">Teams</NavLink></li>  
          <li className=" py-5 px-3 border-gray-900 leading-3 cursor-pointer"><NavLink to="/preference">Preferences</NavLink></li>  
                 
        </ul>
      </div>

      <div className="flex justify-end no-wrap basis-1/3 sm:basis-5/12 px-3">
        {/* <div className='my-auto text-slate-100 font-semibold'>
        <NavLink className=" py-5 px-3 border-gray-900 leading-3 cursor-pointer" to="/preference">Preference         
          </NavLink>
        </div> */}
        {/* Search bar */}
        <div className="flex justify-center items-center text-center my-auto">
          {/* <NavLink className='px-2' >Search */}
            {/* <svg id="search" viewBox="0 0 512 512" className="h-6 w-6 cursor-pointer p-0.5 rounded-l-md fill-gray-800 bg-[#fff]" title="search">
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
            </svg> */}
            <FontAwesomeIcon icon={faSearch} size='1x' className='text-slate-50 mx-auto cursor-pointer' onClick={()=>handleSearchWindow()} />
            {/* <input type="text" className="w-36 rounded-r-md bg-[#fff] outline-none" /> */}
          {/* </NavLink>           */}
        </div>
        {/* search window */}
        {/* <div className={`${searchWindow === true ? 'absolute' : 'hidden'} z-10 top-16 left-1/2 -translate-x-1/2 mx-auto overflow-auto`}>
          <Search />
        </div> */}
        {searchWindow && (
  <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg relative w-11/12 max-w-lg">
      <button 
        onClick={() => setSearchWindow(false)} 
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <Search />
    </div>
  </div>
)}

      </div>
    </nav>

    {/* Hambruger items */}
    <div id="hamburger_items" ref={hamburger_items} className="fixed w-full h-0 overflow-y-hidden my-auto top-16 left-0 text-center z-10 ">
      <ul className="myul w-full flex flex-col items-center px-2 bg-slate-900 z-10 text-slate-100">
        <li className="liclass w-full  py-2 border-b border-gray-600 border-solid"><NavLink to='/fixtures'>Fixtures</NavLink></li>
        <li className="liclass w-full  py-2 border-b border-gray-600 border-solid"><NavLink to='/league'>Leagues</NavLink></li>
        <li className="liclass w-full  py-2 border-b border-gray-600 border-solid"><NavLink to='/team'>Teams</NavLink></li>
        {/* <li className="liclass w-full  py-2 border-b border-gray-600 border-solid"><NavLink to="/preference">Preference</NavLink></li> */}
        {/* search bar */}
        <li className="liclass mx-5 py-2">
          <div className="flex justify-between my-auto">
            <svg viewBox="0 0 512 512" className="w-6 cursor-pointer p-0.5 rounded-l-md bg-[#fff]" title="search" fill="#1f2937">
              <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
            </svg>
            {/* <input type="text" className=" rounded-r-md bg-[#fff]  outline-none " /> */}
          </div>
        </li>
      </ul>
    </div>
        </div>
     );
}

export default Navbar;