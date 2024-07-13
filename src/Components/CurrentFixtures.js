import { React } from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { groupDateFixtures,groupLiveFixtures } from "../Api/getFixtures.js";
import {Container, Box, Button, Typography, Avatar} from '@mui/material';
import FixtureRow from "./FixtureRow.js";
// import { DataGrid } from "@mui/x-data-grid/DataGrid/index.js";

  

export default function CurrentFixtures(props) {

    const [liveFixtures,setLiveFixtures]=useState([]);
    const [todayFixtures,setToDayFixtures]=useState([])

    // Get current date
    var currentDate = new Date();

    // Extract date components
    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero based
    var day = ('0' + currentDate.getDate()).slice(-2);

    // Form the date string in 'yyyy-mm-dd' format
    var dateString = year.toString() + '-' + month.toString() + '-' + day.toString();

    useEffect(()=>{            

        groupDateFixtures(dateString).then(result=>{
            setToDayFixtures(result);
        })

        // setInterval(()=>{
        //     groupLiveFixtures().then(result=>{
        //         setLiveFixtures(result);
        //     })          
        // },1000*60*10)
        
    },[dateString])

    console.log("today",todayFixtures);
    console.log("live",liveFixtures);

    return(
        <Container> Welcome to home!
           <Container> Live
                {/* {
                liveFixtures?
                    <FixtureRow fixturesSource={liveFixtures} />
                :
                <p>No current games</p>
                } */}
            </Container>
            <Container> Today Fixtures
                {
                    todayFixtures?
                    <FixtureRow fixturesSource={todayFixtures}/>
                    :
                    <p>No current games</p>
                }
            </Container>           
        </Container>         
    )
    
}