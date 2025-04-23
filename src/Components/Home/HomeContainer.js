import React from 'react'
import Favourites from "./Favourites.js";
import DayFixtures from './DayFixtures.jsx';
import News from './News.jsx';

export default function Home(){
    

    return(
        <div className='relative top-20 w-full left-20 -translate-x-20 mx-auto'>
            <div className='flex flex-col gap-y-10'>
                <Favourites/>
                <div className='w-full'>
                    <DayFixtures />
                    <News />
                </div>
                
            </div>
        </div>
    )
}