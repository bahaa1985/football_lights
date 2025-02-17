import React from 'react'
import Favourites from "./Favourites.js";
import DayFixtures from './Fixtures/DayFixtures.js';

export default function Home(){
    

    return(
        <div className='relative top-20 w-full left-20 -translate-x-20 sm:w-[90%] mx-auto'>
            <div className='flex flex-col gap-y-10 bg-slate-400'>
                <Favourites/>
                <DayFixtures />
            </div>
            <a href="https://www.flaticon.com/free-icons/stadium" title="stadium icons">Stadium icons created by apien - Flaticon</a>
        </div>
    )
}