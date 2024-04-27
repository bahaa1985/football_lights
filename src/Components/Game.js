import React,{ Fragment, ReactDOM } from 'react'
import { useState,useEffect,useRef} from 'react'
import { useParams } from 'react-router-dom'
import  '../styles/fixtures.css'
import Events from './Events.js'
import Statistics from './Statistics.js'
import LineUp from './LineUp.js'

export default function Game (){
    let {id}=useParams();
    return(
<div>
    <h1>{id}</h1>
      {/* {
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
                                    }                                     */}
</div>
    )
}