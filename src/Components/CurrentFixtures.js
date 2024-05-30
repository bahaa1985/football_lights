import { React } from "react";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink, Link } from "react-router-dom";
import { CookiesProvider,Cookies\ } from "react-cookie";
import { getLiveFixtures, getTodayFixtures } from "../Api/getFixtures.js";

export default function CurrentFixtures() {

    const [liveFixtures,setLiveFixtures]=useState([]);
    const [todayFixtures,setToDayFixtures]=useState([])
    const selectedLeagues=document.cookie.selected;
    return(
        <div> Hi
            <CookiesProvider>
                <div>{}</div>
            </CookiesProvider>
        </div>
    )
    
}