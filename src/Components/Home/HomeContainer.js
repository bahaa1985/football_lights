import React from 'react'
import Favourites from "./Favourites.js";
import DayFixtures from './DayFixtures.jsx';
import News from './News.jsx';

export default function Home(){
    

    return(
        <div className='relative top-20 w-[90%] left-20 -translate-x-20 mx-auto'>
            <div className='flex flex-col sm:flex-row sm:justify-between w-full'>
                <Favourites/>
                <DayFixtures />
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between w-full'>
                <News />
                {/* <div className='w-full sm:w-[90%] mx-auto'> */}
                    {/*
                    featured fixture
                    profile                     
                     */}
                {/* </div> */}
                
            </div>
        </div>
    )
}