import React, { useEffect } from 'react'
import Favourites from "./Favourites.js";
import DayFixtures from './DayFixtures.jsx';
import Leagues from '../Tools/Leagues.jsx';
import Teams from '../Tools/Teams.jsx';
import News from './News.jsx';
import { getCookie } from '../../Api/cookie.js';
import { NavLink } from 'react-router-dom';

export default function Home(){   
    
    return(
        <div className={`mt-20 w-[90%] mx-auto`}>
            <div className={`flex flex-col sm:flex-row sm:justify-between w-full my-2`}>
                <Favourites/> 
                <DayFixtures />                
            </div>
            {/* leagues */}
            {/* <Leagues /> */}
            {/* Teams */}
            {/* <Teams /> */}
            {/* <br/> */}
             <div className='bg-slate-800 py-3 text-white text-center text-xl font-bold'>News</div>
            <div className='flex flex-col sm:flex-row sm:justify-between w-full mb-2'>
                <News />                
            </div>
        </div>
    )
}