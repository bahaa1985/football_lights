import React from "react";
import { NavLink } from "react-router-dom";
import { getCookie, setCookie } from "../../Api/cookie.js";
import stadium from '../../images/stadium.png'
import { faLocationDot, faCalendar, faClock} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function FixtureRow(props) {

    const fixtures =props.fixturesSource;
    const type = props.type;
    
    // const preferedLeagues = getCookie("prefered_leagues");;

    return Object.keys(fixtures).map((elem, index) => {
        return (
        <div key={index} className="block w-full mx-auto sm:w-[96] ">
            {               
                <>
                {
                     // checking if this component is rendered within leagueFixtures or todayFixtures as some designs will be changed
                type !== "league"?  
                    <div className="text-left bg-slate-500 p-2 flex justify-start">
                    
                        <img alt="" loading="lazy" src={fixtures[elem][0].league.logo} className="ml xs:w-15 sm:w-16 h-12 object-contain"/>
                        
                        <NavLink className="my-auto ml-2" to={`/leagues/${fixtures[elem][0].league.id}/${fixtures[elem][0].league.season}`}>
                            <span className="text-left text-slate-100 ">{elem}</span>
                        </NavLink>
                    
                    </div> : 
                    <div  className="bg-slate-500 text-slate-50">
                        { parseInt(fixtures[elem][0].league.id)!==2 ? 'Game Week ' + parseInt(index + 1) : 'Round ' + Object.keys(fixtures)[index]}
                    </div>
                }

                {/* <button onClick={setCookie("prefered_leagues",preferedLeagues.map(item=>item !== fixtures[elem][0].league.id))}>
                </button> */}

                {
                    fixtures[elem].map((elem, i) => {
                    return (
                        <div key={i} className="flex justify-center my-2 border-b border-b-black border-solid">
                           
                       {/* Match details */}
                       {
                        type !== "league"?
                        <div className="block w-[25%]"> 
                            {/* <FontAwesomeIcon className="mx-2 h-4" icon={faCalendar}></FontAwesomeIcon>                            */}
                            <FontAwesomeIcon className="h-4" icon={faClock}></FontAwesomeIcon>
                            <span className="mx-2">
                                {
                                    new Date(elem.fixture.date).getHours()+
                                    ':'+(new Date(elem.fixture.date).getMinutes().toString().length<2 ? 
                                    '0'+new Date(elem.fixture.date).getMinutes().toString():new Date(elem.fixture.date).getMinutes().toString()) 
                                }
                            </span>
                            {
                                elem.fixture.status.short === '1H' || elem.fixture.status.short === '2H' || elem.fixture.status.short === 'HT' || 
                                elem.fixture.short === 'ET' || elem.fixture.short === 'BT' || elem.fixture.short === 'P' || 
                                elem.fixture.short === 'SUSB' || elem.fixture.short === 'INT' ? 
                                <div className="flex ml-auto">
                                    <span class="relative flex h-3 w-3">
                                        <span class="animate-ping absolute top-[50%]   inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span class="relative top-[50%] inline-flex rounded-full h-3 w-3 bg-red-700"></span>
                                    </span>
                                    <span className="text-red-800">{"  Live"}</span>
                                </div>
                                : null
                            }
                            <div className="py-auto">
                                <span className="h-[50%] mx-2 sm:my-auto px-2 rounded-sm bg-green-600 text-slate-100">{elem.fixture.status.short}</span>
                            </div>
                        </div>
                        :null
                       }
                        
                           
                        <div className={`w-[75%] ${type === "league" ? "flex justify-between" : "block"} p-auto my-2 mx-auto`} key={i}>
                            
                            {/* Home team */}
                            <div className="flex justify-between items-center w-full my-1">
                                
                                <img src={elem.teams.home.logo} loading="lazy" className="ml w-10 h-10" alt={elem.teams.home.name}/>
                                
                                <NavLink className="w-[50%]"  to={`/teams/${elem.teams.home.id}`}>
                                    <span>{elem.teams.home.name}</span>
                                </NavLink>
                                
                                <span className="w-[10%] bg-red-800 text-slate-100 text-center rounded-sm">{elem.goals.home === null ? '-' : elem.goals.home}</span>
                            </div>
                            
                            

                            {/* Away team */}
                            <div className="flex justify-between items-center w-full my-1">
                                
                                <img src={elem.teams.away.logo} loading="lazy" className="w-10 h-10"  alt={elem.teams.away.name} />
                                
                                <NavLink className="w-[50%]" to={`/teams/${elem.teams.away.id}`}>
                                    <span>{elem.teams.away.name}</span>
                                </NavLink> 

                                <span className="w-[10%] bg-red-800 text-slate-100 text-center rounded-sm">{elem.goals.away === null ? '-' : elem.goals.away } </span>

                            </div>
                            
                        </div>
                        
                        {/* <div className="flex flex-center w-full">
                            <div className="">
                                <FontAwesomeIcon className="w-10 mx-2" icon={faLocationDot}></FontAwesomeIcon>
                                <span>{elem.fixture.venue.city}</span>
                            </div>

                            <div className=" flex-col">
                                <img className="w-10 h-10 mx-2" src={stadium} alt="" />                                                               
                                <span>{elem.fixture.venue.name}</span>
                            </div>                                                                                                  
                        </div> */}
                        </div>
                    )})
                }
                </>
            }
            
        </div>
        );
    });
    }

export default FixtureRow;
