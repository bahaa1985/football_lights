import React,{ Fragment } from 'react'
import { useState} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import  '../styles/fixtures.css'
import Events from './Events.js'
import Statistics from './Statistics.js'
import LineUp from './LineUp.js'

export default function Game(){
    const [tab, setTab] = useState("");  
    const [searchparams]=useSearchParams();
    const teams=[searchparams.get('home'),searchparams.get('away')]; //get teams ids from url  query string
    // console.log("teams",teams);
    const {fixture_id}=useParams(); //get fixture id from /game/:fixture_id route
    return(
<div>
    {/* <h1>{fixture_id}</h1> */}
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