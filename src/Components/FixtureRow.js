import React from "react";
import { NavLink } from "react-router-dom";
import { getCookie, setCookie } from "../Api/cookie.js";
import stadium from '../images/stadium.png'
import { faLocationDot, faCalendar, faClock} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FixtureRow(props) {

    const fixtures =props.fixturesSource;
    
    console.log("fixtures row: ",fixtures);
    
    const preferedLeagues = getCookie("prefered_leagues");;

    return Object.keys(fixtures).map((elem, index) => {
        return (
        <div key={index} className="block w-[90%] sm:w-[60%] mx-auto my-4">
            {               
                <>
                <div className="text-left">
                
                    <img alt="" src={fixtures[elem][0].league.logo} className="ml xs:w-15 sm:w-20 h-12 object-contain"/>
                    
                    <span className="text-left">{elem}</span>

                </div>

                <button onClick={setCookie("prefered_leagues",preferedLeagues.map(item=>item !== fixtures[elem][0].league.id))}>
                    {/* <StarIcon></StarIcon> */}
                </button>

                {
                    fixtures[elem].map((elem, i) => {
                    return (
                        <div className="m-4 border-b border-b-black border-solid">
                           
                        <div className="flex justify-start">
                            <FontAwesomeIcon className="mx-2 h-6" icon={faCalendar}></FontAwesomeIcon>
                            <span>
                            {
                                new Date(elem.fixture.date).toDateString() 
                            }
                            </span>
                            <span className="mx-2">|</span>
                            <FontAwesomeIcon className="h-6" icon={faClock}></FontAwesomeIcon>
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
                        </div>
                            
                        <div className="block w-full sm:flex justify-around p-auto my-2 mx-auto " key={i}>
                            

                            <div className="flex justify-between items-center w-full sm:w-[50%] p-2">
                                
                                <img src={elem.teams.home.logo} className="ml w-15 sm:w-20 h-14" alt={elem.teams.home.name}/>
                                
                                <NavLink  to={`/teams/${elem.teams.home.id}?league=${elem.league.id}&season=${elem.league.season}`}>
                                    <span>{elem.teams.home.name}</span>
                                </NavLink>
                                
                                <span className="w-[10%]">{elem.goals.home === null ? '-' : elem.goals.home}</span>
                            </div>
                            
                            <div className="flex justify-between items-center w-full sm:w-[50%] sm:flex-row-reverse p-2">
                                
                                <img src={elem.teams.away.logo} className="w-15 sm:w-20 h-14"  alt={elem.teams.away.name} />
                                
                                <NavLink to={`/teams/${elem.teams.away.id}?league=${elem.league.id}&season=${elem.league.season}`}>
                                    <span>{elem.teams.away.name}</span>
                                </NavLink> 

                                <span className="w-[10%]">{elem.goals.away === null ? '-' : elem.goals.away } </span>

                            </div>
                            
                        </div>

                        <div className="">
                            <div className="">
                                <FontAwesomeIcon className="w-10 mx-2" icon={faLocationDot}></FontAwesomeIcon>
                                <span>{elem.fixture.venue.city}</span>
                            </div>

                            <div className="flex">
                                <img className="w-10 h-10 mx-2" src={stadium} alt="" />
                                
                                <span>{elem.fixture.venue.name}</span>
                            </div>
                                  
                            
                                    {/* <a href="https://www.flaticon.com/free-icons/stadium" title="stadium icons">Stadium icons created by monkik - Flaticon</a> */}
                        </div>
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
