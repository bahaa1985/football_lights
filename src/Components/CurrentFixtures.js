import { React } from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { groupDateFixtures,groupLiveFixtures } from "../Api/getFixtures.js";
import {Container, Box, Button, Typography, Avatar} from '@mui/material';

export default function CurrentFixtures(props) {

    const [liveFixtures,setLiveFixtures]=useState([]);
    const [todayFixtures,setToDayFixtures]=useState([])
    

    useEffect(()=>{            
        // Get current date
        var currentDate = new Date();

        // Extract date components
        var year = currentDate.getFullYear();
        var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero based
        var day = ('0' + currentDate.getDate()).slice(-2);

        // Form the date string in 'yyyy-mm-dd' format
        var dateString = year.toString() + '-' + month.toString() + '-' + day.toString();

        groupDateFixtures(dateString).then(result=>{
            setToDayFixtures(result);
        })

        // setInterval(()=>{
        //     groupLiveFixtures().then(result=>{
        //         setLiveFixtures(result);
        //     })
        //     console.log("triggered!");
        // },1000*60*10)
        
    },[])

    // console.log("live",groupedLiveFixtures);
    // console.log("today",groupedTodayFixtures);

    return(
        <Container> Welcome to home!
           <Container id="div-leagues"> Live
                {
                // liveFixtures?
                // Object.keys(liveFixtures)
                // .sort((a,b)=>a-b)
                // .map((elem,index)=>{
                //     return(
                //         <Box key={index}>
                //             <img src={liveFixtures[elem][0].league.logo} alt={''}/>
                //             <Typography>{Object.keys(liveFixtures)[index]}</Typography>
                //             <Box>
                //             {
                //                  liveFixtures[elem].map((fixture,i)=>{
                //                     return(
                //                         <Box display={"flex"} justifyContent={'center'} key={i}>
                //                             <Typography>{fixture.fixture.status.long}</Typography>
                //                             <img className="image" src={fixture.teams.home.logo} alt={fixture.teams.home.name}/>
                //                             <NavLink to={`/teams/${fixture.teams.home.id}?league=${fixture.league.id}`}><Typography>{fixture.teams.home.name}</Typography></NavLink>
                //                             <Typography>{fixture.goals.home}</Typography>
                //                             <Typography>{fixture.goals.away}</Typography>
                //                             <NavLink to={`/teams/${fixture.teams.away.id}?league=${fixture.league.id}`}><Typography>{fixture.teams.away.name}</Typography></NavLink>
                //                             <img className="image" src={fixture.teams.away.logo} alt={fixture.teams.away.name}/>
                //                         </Box>
                //                     ) 
                //             })
                //             }
                //             </Box>
                //         </Box>  
                //     )
                // })
                // :
                // <p>No current games</p>
                }
                </Container>
            <div id="div-teams"> Today Fixtures
                {
                    todayFixtures?
                    Object.keys(todayFixtures)
                    .map((elem,index)=>{
                        return(
                            <Box>
                            {
                                todayFixtures[elem].map((fixture,i)=>{
                                return(
                                    <Box display={"flex"} justifyContent={'center'} key={i}>
                                        <img className="image" src={fixture.teams.home.logo} alt={fixture.teams.home.name}/>
                                        <NavLink to={`/teams/${fixture.teams.home.id}?league=${fixture.league.id}`}><Typography>{fixture.teams.home.name}</Typography></NavLink>
                                        <Typography>{fixture.goals.home}</Typography>
                                        <Typography>{fixture.goals.away}</Typography>
                                        <NavLink to={`/teams/${fixture.teams.away.id}?league=${fixture.league.id}`}><Typography>{fixture.teams.away.name}</Typography></NavLink>
                                        <img className="image" src={fixture.teams.away.logo} alt={fixture.teams.away.name}/>
                                    </Box>
                                )
                                    
                            })
                            }
                            </Box>  
                        )
                    }) 
                    :
                    <p>No current games</p>
                }
                </div>           
        </Container>  
    )
    
}