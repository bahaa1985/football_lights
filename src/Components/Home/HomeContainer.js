import React from 'react'
import Favourites from "./Favourites.js";
import DayFixtures from './DayFixtures.jsx';
import News from './News.jsx';
import { getCookie } from '../../Api/cookie.js';

export default function Home(){

    console.log("cookie", getCookie('prefered_leagues'));
    
    return(
        <div className={`mt-20 w-[90%] mx-auto`}>
            <div className={`flex flex-col sm:flex-row sm:justify-between w-full my-2`}>
                <Favourites/>
                <DayFixtures />
            </div>
            {/* <br/> */}
            <div className='flex flex-col sm:flex-row sm:justify-between w-full my-2'>
                <News />
                
            </div>
        </div>
    )
}