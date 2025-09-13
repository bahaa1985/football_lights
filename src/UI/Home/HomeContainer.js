import React, { useEffect } from 'react'
import Favourites from "./Favourites.js";
import DateFixtures from './DateFixtures.jsx';
import News from './News.jsx';
import { getCountryNameTranslation } from '../../Translation/countries.js';
import setPreferences from '../../api/UserPreferences.js';

export default function Home() {

    useEffect(() => {

        if (localStorage.getItem("user_preferences") === null) {
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    const lang = data.languages.substring(0, 2);
                    const country_code = getCountryNameTranslation(data.country_code, lang);
                    setPreferences(lang, country_code); // //set user's native language based on their IP address
                    window.location.href=('/'); // auto reload
                });
        }
    }, []);

    return (
        <div className={`flex-1 mt-20 w-[90%] mx-auto bg-slate-100`}>
            <div className={`flex flex-col sm:flex-row sm:justify-between w-full my-2`}>
                 <DateFixtures />
                <Favourites />
            </div>
            <div className='flex flex-col sm:flex-row sm:justify-between w-full mb-2'>
                <News />
            </div>
        </div>
    )
}