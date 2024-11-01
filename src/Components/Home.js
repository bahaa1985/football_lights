import React from 'react'
import { useState } from 'react';
import LiveFixtures from './Fixtures/LiveFixtures.js';
import DayFixtures from './Fixtures/DayFixtures.js';

export default function Home(){
    

    return(
        <div>
            <div>
                <DayFixtures />
            </div>
        </div>
    )
}