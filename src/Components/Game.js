import React,{ Fragment, ReactDOM } from 'react'
import { useState,useEffect,useRef} from 'react'
import { useParams } from 'react-router-dom'
import  '../styles/fixtures.css'
import getFixtures from '../Api/getFixtures.js'
import Events from './Events.js'
import Statistics from './Statistics.js'
import LineUp from './LineUp.js'

export default function Game(props){
    const [tab, setTab] = useState("");
    const [display, setDisplay] = useState(true);
    const teams = props.teams;
    console.log("teams",teams)
    const {fixture_id}=useParams();

    return(
<div>
    <h1>{fixture_id}</h1>
{
            <div className='fixture-details'>
            <span onClick={(e)=>{
                                e.stopPropagation();
                                setTab('Events');
                                }}>Events</span>
            <span onClick={(e)=>{
                                e.stopPropagation();
                                setTab('Statistics');
                                }}>Statistics</span>
            <span onClick={(e)=>{
                                e.stopPropagation();
                                setTab('Line Up');
                                }}>Line Up</span>
            <Fragment> 
                {
                    //to display events, statistics and lineup panes below the fixture, 
                    //depending on what user click:
                    tab==='Events'?
                    <Events fixture={fixture_id} teams={teams}/>:
                    tab==='Statistics'? 
                    <Statistics fixture={fixture_id} teams={teams}/>: 
                    tab==='Line Up' ? 
                    <LineUp fixture={fixture_id} teams={teams}/>: null
                }                                       
                
            </Fragment>                                    
        </div>
        }                                    
</div>
    )
}