import React,{ Fragment, ReactDOM } from 'react'
import { useState,useEffect,useRef } from 'react'
import getFixtures from '../Api/getFixtures.js'
import  '../styles/fixtures.css'
import Events from './Events.js'
import Statistics from './Statistics.js'
import LineUp from './LineUp.js'



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

    // console.log("GWs: ",groupedFixtures)

    return(
        <div>
            {               
               Object.keys(groupedFixtures).sort((a,b)=>Date.parse(a)-Date.parse(b)).map((elem,day_index)=>{                            
                return(
                    <div>                
                        <div key={day_index} className="fixture-date">Game Week {day_index+1} </div>                                     
                        {groupedFixtures[elem].map((elem,fixture_index)=>{
                            return(
                                <div key={fixture_index} onClick={()=>[setDisplay(!display),setFixture(elem.fixture.id),console.log("display",display)]}>
                                    <div className="fixture-teams" key={elem.fixture.id}>                                                                                                                      
                                            <img alt="" src={elem.teams.home.logo}></img>
                                            <span className='team'>{elem.teams.home.name}</span>
                                            <span className='result'>{elem.goals.home}</span>                                
                                            <span className='result'>{elem.goals.away}</span>
                                            <span className='team'>{elem.teams.away.name}</span>
                                            <img alt="" src={elem.teams.away.logo}></img>                                                                                                                                                       
                                    </div> 
                                    {
                                        display === true && fixture===elem.fixture.id ? 
                                        <div className='fixture-details'>
                                        <span onClick={(e)=>{
                                                            e.stopPropagation();
                                                            setTab('Events');
                                                            // setFixture(elem.fixture.id);
                                                            setTeams([elem.teams.home.id,elem.teams.away.id]);}}>Events</span>
                                        <span onClick={(e)=>{
                                                            e.stopPropagation();
                                                            setTab('Statistics');
                                                            // setFixture(elem.fixture.id);
                                                            setTeams([elem.teams.home.id,elem.teams.away.id]);}}>Statistics</span>
                                        <span onClick={(e)=>{
                                                            e.stopPropagation();
                                                            setTab('Line Up');
                                                            // setFixture(elem.fixture.id);
                                                            setTeams([elem.teams.home.id,elem.teams.away.id]);}}>Line Up</span>
                                        <Fragment> 
                                            {
                                                //to display events, statistics and lineup panes below the fixture, 
                                                //depending on what user click:
                                                tab==='Events' && fixture===elem.fixture.id?
                                                <Events fixture={fixture} teams={teams}/>:
                                                tab==='Statistics' && fixture===elem.fixture.id? 
                                                <Statistics fixture={fixture} teams={teams}/>: 
                                                tab==='Line Up' && fixture===elem.fixture.id? 
                                                <LineUp fixture={fixture} teams={teams}/>: null
                                            }                                       
                                            
                                        </Fragment>                                    
                                    </div>
                                    :null
                                    }                                    
                                    
                                </div>
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