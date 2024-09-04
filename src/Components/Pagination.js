import React, {useState} from "react";
import { setCookie,getCookie } from "../Api/cookie.js";
// import { getLeagueRounds } from "../Api/getLeaguesTeams.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";


function Pagination(props) {
    
    
    let pages=[] // items pages that will be displayed
    const [pageIndex,setPageIndex]=useState(0);
    // const [leagueId,setLeagueId]=useState(0);
    // const [season,setSeason]=useState(0);
    // const [lastRound,setLastRound]=useState("") // to update season value after the season finished 

    const items=props.source;
    const pagesCount=Math.ceil(items.length/10); //get pages count by 10 items in each page
    

    for(let i=0;i<pagesCount;i++){ //for loop to create items pages, every page has 10 items
        console.log("loop!");        
        let page=[];
        for(let k=i*10;k<(i*10)+10;k++){ // to create single page of 10 items
            if(k<items.length){
            page.push(items[k])
            }             
            else{
                break;
            }       
        }
        console.log("page",page);   
        pages.push(page);
    }

    let preferedLeaguesArr=getCookie('prefered_leagues'); 
    function handlePreferedLeagues(league,leagueType,season,endDate){ //set prefered leagues cookie  
        if(preferedLeaguesArr !== null){
            if(preferedLeaguesArr.filter(obj=>obj.id===league.id)[0] === undefined){
                preferedLeaguesArr.push({'id':league.id,'type':leagueType,'season':season,'endDate':endDate});
                }
                else{
                const index=preferedLeaguesArr.indexOf(preferedLeaguesArr.filter(obj=>obj.id===leagueId)[0])
                preferedLeaguesArr=preferedLeaguesArr.slice(0,index).concat(preferedLeaguesArr.slice(index+1));
                console.log("selected leagues: ",preferedLeaguesArr);    
                }
                setCookies(preferedLeaguesArr,"prefered_leagues");
        }     
    }

    let preferedTeamsArr=getCookies("prefered_teams"); 
    console.log("prefered teams",preferedTeamsArr);
    
    function handlePreferedTeams(team){  //set prefered teams cookie  
        if(typeof(preferedTeamsArr) !== "undefined"){
            if(preferedTeamsArr.filter(obj=>obj.id === team.id)[0] === undefined){
                preferedTeamsArr.push({'id':team.id});
            }
            else{
            const index=preferedTeamsArr.indexOf(preferedTeamsArr.filter(obj=>obj.id===team.id)[0])
            preferedTeamsArr=preferedTeamsArr.slice(0,index).concat(preferedTeamsArr.slice(index+1));
            console.log("selected teams: ",preferedTeamsArr);    
            }
            setCookies(preferedTeamsArr,"prefered_teams");
        }     
        
    }

    function setPreferedLeaguesColor(leagueId){ //to mark prefered league
        let strokeClass="text-blue-100"; 
        preferedLeaguesArr.map((elem)=>{
        if(elem.id===leagueId){
        console.log("mark:",elem.id)
        strokeClass= "text-blue-600";
        }
        })
        return strokeClass;
    }

    
    function setPreferedTeamsColor(teamId){ // to mark prefered team
        let strokeClass="text-blue-100"; 
        preferedTeamsArr.map((elem)=>{
            if(elem.id===teamId){
                console.log("mark:",elem.id)
                strokeClass= "text-blue-600";
            }
        })
        return strokeClass;
    }

    console.log("pagintation",pages);
    
    return ( 
            <div>
                {
                    <>
                    {/* data pages */}
                    <div className="pl-2">
                        {
                            pages[pageIndex]?.map((elem,index)=>{
                                return(
                                    <div key={index} className="w-full flex justify-start my-2 border-b border-b-black" >
                                        {/* element logo */}
                                        <img
                                        src={elem.league?.logo || elem.team?.logo}
                                        className="w-10 h-10"
                                        alt={elem.league?.name || elem.team?.name}/> 
                                        {/* element name */}
                                        <p className="w-[70%]">{elem.league?.name || elem.team?.name} {elem.league?.id || elem.team?.id}</p>         
                                        {/* button to save prefered league or team in a cookie */}
                                        <FontAwesomeIcon 
                                            icon={faStar}
                                            className={`stroke-[4px]  w-10 h-10 cursor-pointer hover:stroke-blue-900
                                                        ${elem.league? setPreferedLeaguesColor(elem.league.id) : setPreferedTeamsColor(elem.team?.id)}`}                             
                                            onClick={(event)=>
                                            {
                                                const senderElement = event.currentTarget; 
                                                senderElement.classList.toggle("text-blue-600");
                                                senderElement.classList.toggle("text-blue-100");
                                                const filteredSeason=league.seasons.filter((season)=>Date.parse(season.end) > Date.now());
                                                const seasonYear=filteredSeason.year;
                                                const endDate=filteredSeason.endDate;
                                                const leagueType=elem.league.type;

                                                elem.league?         
                                                    handlePreferedLeagues(elem.league.id,leagueType,seasonYear,endDate)
                                                    :
                                                    (handlePreferedTeams(elem.team))
                                            }}/>
                                    </div>
                                        )
                            })
                        }
                    </div>
                    {/* pagination buttons */}
                    <div className="w-full flex justify-start flex-wrap">
                        {
                            pages.map((page,index)=>{
                                return(
                                    <button key={index}
                                            className={`rounded-full w-8 h-8 mx-2 ${index===pageIndex ? "bg-red-700 text-white" : "bg-red-200 text-black"}`} 
                                            onClick={()=>setPageIndex(index)}>
                                        {index+1}
                                    </button>
                                )
                            })
                        }
                    </div>
                    </>
                }
            </div>
        );
}

export default Pagination;