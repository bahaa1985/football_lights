import React, { useState, useEffect, useMemo ,memo} from 'react';
import { useParams } from 'react-router-dom';
import { getTeamSeasons, getTeamStatistics } from '../../Api/getTeamDetails.js';
import { getCookie } from '../../Api/cookie.js';

function TeamStatistics(props){

    const team = props.team;
    const league= props.league
    const season = props.season;
    //
    // const [teamSeasons,setTeamSeasons]=useState([]); 
    // const [teamLeagues,setTeamLeagues]=useState([]);
    const [teamStatistics,setTeamStatistics]=useState({});
    const [statsLoaded,setStatsLoaded]=useState(false);
    // const [selectedLeague,setSelectedLeague]=useState(leagueParam ? leagueParam : 0);
    const [yellowCards,setYellowCards] = useState(0);
    const [redCards,setRedCards] = useState(0);
    const [teamCards,setTeamCards] = useState({});

    useMemo(()=>{
        let isMount = true;
        async function fetchData(){
            if(isMount){
            const fetchedStats = await getTeamStatistics(team,season,league);
            setTeamStatistics(fetchedStats.data.response);
            setTeamCards(fetchedStats.data.response.cards);
            //
            if (fetchedStats.data.response.cards) {
                const cards = fetchedStats.data.response.cards;
                let yellow = 0, red = 0;

                if (cards?.yellow) {
                    Object.entries(cards.yellow).forEach(([_, value]) => {
                        yellow += value.total;
                    });
                }
                if (cards?.red) {
                    Object.entries(cards.red).forEach(([_, value]) => {
                        red += value.total;
                    });
                }

                setYellowCards(yellow);
                setRedCards(red);
            }
            setStatsLoaded(true);
        }
    }

        fetchData();
        return()=> isMount = false;
    },[team,season,league])

    return(
        <div>
        {
            statsLoaded && Object.keys(teamStatistics).length > 0 ?   // if statistics are ready, display it:               
            <>
            {/* fixtures */}
            <div>
                <div>Fixtures</div>
                <table className='w-full table-fixed'>
                    <thead>                                
                        <tr>
                            <td></td>
                            <td>Home</td>
                            <td>Away</td>
                            <td>total</td>                                   
                        </tr>
                    </thead>
                    <tbody>
                    {                                                         
                        Object.entries(teamStatistics?.fixtures).map(([key, value],index) => (                                                       
                            // <React.Fragment key={key}>
                            <tr key={index}>
                                <td>{key}</td>
                                {Object.entries(value).map(([subKey, subValue],index) => (
                                    <td key={index}>{subValue}</td>                                            
                                ))}
                            </tr>
                                
                            // </React.Fragment>
                            ))                    
                    }
                    </tbody>
                </table>
            </div>
            {/* Goals */}
            <div>
            <div>Goals</div>
            <table className='w-full table-fixed'>
                <thead>                                
                    <tr>
                        <td></td>
                        <td>Home</td>
                        <td>Away</td>
                        <td>total</td>                                   
                    </tr>
                </thead>
                <tbody>
                {    
                    // statsLoaded ?  
                    // Iterate over the "goals" object using map
                    Object.entries(teamStatistics?.goals).map(([key, value],index) => (                                    
                        // <React.Fragment key={index}>
                            <tr key={key}>{key}                                   
                                {
                                    Object.entries(value).map(([subKey, subValue],index) => (
                                    subKey === "total" || subKey === "average" ? 
                                        <tr key={index}>
                                            
                                            <td key={subKey}>{subKey}</td>
                                            {
                                                Object.entries(subValue).map(([nestedKey, nestedValue]) => (
                                                <td key={nestedKey}>{nestedValue}</td>
                                            ))  
                                            }
                                        </tr>
                                    :null
                            ))}
                            </tr> 
                        // </React.Fragment>
                        ))                                                                      
                }
                </tbody>
            </table>
            </div>
            {/* biggest results */}
            <div>
                <div>Biggest Results</div>
                <table className='w-full table-fixed'>
                <thead>                                
                    <tr>
                        <td></td>
                        <td>Home</td>
                        <td>Away</td>
                        <td></td>                                  
                    </tr>
                </thead>
                <tbody>
                {
                    Object.entries(teamStatistics?.biggest).map(([key,value],index)=>(
                        // <React.Fragment key={index}>
                            // {
                                key === "wins" || key === "loses" ? 
                                <tr key={key}>{key}
                                    {Object.entries(value).map(([subKey, subValue],index)=>                                                 
                                        <td key={index}>{subValue}</td>
                                    )}
                                </tr>                                            
                                : null
                            // }
                        // </React.Fragment>
                    ))
                }
                </tbody>
                </table>
            </div>
            {/* biggest goals */}
            <div>
                <div>Biggest Goals</div>
                <table className='w-full table-fixed'>
                <thead>                                
                    <tr>
                        <td></td>
                        <td>Home</td>
                        <td>Away</td>
                        <td>Total</td>                                 
                    </tr>
                </thead>
                <tbody>
                {
                    Object.entries(teamStatistics?.biggest.goals).map(([key,value],index)=>(
                        // <React.Fragment key={index}>
                        //     {                                      
                                <tr key={key}>{key}
                                    {Object.entries(value).map(([subKey, subValue],index)=> 
                                        <td>                                              
                                            <td key={index}>{subValue}</td>
                                        </td>
                                    )}
                                </tr>
                        //     }
                        // </React.Fragment>
                    ))
                }
                </tbody>
                </table>
            </div>
            {/* clean sheet */}
            <div>
                <div>Clean Sheet</div>
                <table className='w-full table-fixed'>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Home</td>
                            <td>Away</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td></td>
                        {
                            Object.entries(teamStatistics?.clean_sheet).map(([key,value],index)=>
                            (
                                // console.log(`${key},${value}`)
                                
                                // Object.entries(value).map(([key,value],index)=>{
                                    <td key={index}>
                                        {value}
                                    </td>
                                // })
                            ))
                        }
                            </tr>
                    </tbody>
                </table>
            </div>
            {/* penalty */}
            <div>
                <div>Penalty</div>
                <table className='w-full table-fixed'>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Total</td>
                            <td>Percentage</td>
                            <td>Total</td>
                        </tr>
                        {
                            Object.entries(teamStatistics?.penalty).map(([key,value],index)=>(
                                <tr key={index}>
                                    <td>{key}</td>
                                    {
                                        key !== 'total' ?
                                        Object.entries(value).map(([subKey,subValue])=>(
                                            <td key={subKey}>{subValue}</td>
                                        ))
                                        :
                                        <td>{value}</td>
                                        
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                </table>
            </div>
            {/* Cards */}
            <div>
            <div>Cards</div>
                <table className='w-full table-fixed'>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Yellow</td>
                            <td>Red</td>
                            <td>Total</td>
                        </tr>
                        <tr>
                            <td></td>
                            {/* {
                                Object.entries(teamStatistics?.cards.yellow).map(([key,value],index)=>(
                                    setYellowCards(yellowCards+value.total)
                                ))
                            } */}
                            <td>
                                {yellowCards}
                            </td>
                            <td>{redCards}</td>
                            <td>{yellowCards+redCards}</td>
                        </tr>
                    </thead>
                </table>
            </div>
            </>                                                                       
            :"No data"
        }
        </div>
    )
}

export default memo(TeamStatistics);