import React,{ Fragment, ReactDOM } from 'react'
import { useState,useEffect,useRef } from 'react'
import { BrowserRouter as Router , Routes, Route, NavLink } from 'react-router-dom'
import getFixtures from '../Api/getFixtures.js'
import  '../styles/fixtures.css'
import Events from './Events.js'
import Statistics from './Statistics.js'
import LineUp from './LineUp.js'
import Game from './Game.js'



function Fixtures(props){
    const [Fixtures,setFixtures]=useState([])
    const [fixture,setFixture]=useState(0)
    const [teams,setTeams]=useState([])
    const [tab,setTab]=useState('')
    const [display,setDisplay]=useState(true)
   
    const league=props.league
    const season=props.season
    
    useEffect(()=>{                                                  
            console.log(league,season);
                getFixtures(league,season).then((result)=>{                                 
               setFixtures( result.data.response )
            });
        }
    ,[league,season])
            
    const groupedFixtures=Fixtures.reduce((group,elem)=>{
        const gw=elem.league.round;            
        if(group[gw]==null) 
        {
            group[gw]=[]
        }
        group[gw].push(elem)
        return group
    },{})

    return(
        <div>
            <Routes>
                <Route path="/game" element={<Game/>}>
                    <Route path=":id"></Route> 
                </Route>
            </Routes>  
            {               
               Object.keys(groupedFixtures).sort((a,b)=>Date.parse(a)-Date.parse(b)).map((elem,day_index)=>{
                                  
                return(
                    <div> 
                                    
                        <div key={day_index} className="fixture-date">Game Week {day_index+1} </div>                                     
                        {groupedFixtures[elem].map((elem,fixture_index)=>{
                            return(
                            <NavLink to={`/game/${elem.fixture.id}`} >  
                                <div key={fixture_index} onClick={()=>[setDisplay(!display),setFixture(elem.fixture.id),console.log("display",display)]}>
                                    <div className="fixture-teams" key={elem.fixture.id}>                                                                                                                      
                                        <img alt="" src={elem.teams.home.logo}></img>
                                        <span className='team'>{elem.teams.home.name}</span>
                                        <span className='result'>{elem.goals.home}</span>                                
                                        <span className='result'>{elem.goals.away}</span>
                                        <span className='team'>{elem.teams.away.name}</span>
                                        <img alt="" src={elem.teams.away.logo}></img>                                                                                                                                                       
                                    </div>                                                                       
                                </div>
                             </NavLink>    
                            )
                        })}                                            
                        </div>                                 
                    )               
                })
            }
                                                      
        </div>
    )
}

export default Fixtures