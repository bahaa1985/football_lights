import React from 'react'
import { useState } from 'react';
import LiveFixtures from './Fixtures/LiveFixtures.js';
import DayFixtures from './Fixtures/DayFixtures.js';

export default function Home(){
    

    return(
        <div className='bg-zinc-300'>
            <div>
                <DayFixtures />
            </div>
            <a href="https://www.flaticon.com/free-icons/stadium" title="stadium icons">Stadium icons created by apien - Flaticon</a>
        </div>
    )
}