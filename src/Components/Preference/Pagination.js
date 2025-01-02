import React, {useState} from "react";
import { setCookie,getCookie } from "../../Api/cookie.js";
// import { getLeagueRounds } from "../Api/getLeaguesTeams.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";


function Pagination(props) {
    
    
    let pages=[] // items pages that will be displayed
    const [pageIndex,setPageIndex]=useState(0);

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
        // console.log("page",page);   
        pages.push(page);
    }

    
    function handlePreferedLeagues(elemLeague){ //set prefered leagues cookie 
        let preferedLeaguesArr=getCookie('prefered_leagues');  
        if(preferedLeaguesArr !== null){
            if(preferedLeaguesArr.filter(obj=>obj.id===elemLeague.league.id)[0] === undefined){
                const filteredSeason=elemLeague.seasons.filter((season)=>{
                    return Date.parse(season.end) > Date.now()
                })[0];
                console.log("filtered season",filteredSeason);
                const seasonYear=filteredSeason.year;
                const endDate=filteredSeason.end;
                preferedLeaguesArr.push({
                    'id':elemLeague.league.id,
                    'name': elemLeague.league.name,
                    'logo':elemLeague.league.logo,
                    'season':seasonYear,
                    'endDate':endDate
                });
            }
            else
            {
                const index=preferedLeaguesArr.indexOf(preferedLeaguesArr.filter(obj=>obj.id===elemLeague.league.id)[0])
                preferedLeaguesArr=preferedLeaguesArr.slice(0,index).concat(preferedLeaguesArr.slice(index+1));
                // console.log("selected leagues: ",preferedLeaguesArr);    
            }
            setCookie(preferedLeaguesArr,"prefered_leagues");
        }     
    }

   
    // console.log("prefered teams",preferedTeamsArr);
    
    function handlePreferedTeams(elem){  //set prefered teams cookie 
        let preferedTeamsArr=getCookie("prefered_teams");  
        if(typeof(preferedTeamsArr) !== "undefined"){
            if(preferedTeamsArr.filter(obj=>obj.id === elem.team.id)[0] === undefined){
                preferedTeamsArr.push({
                    'id':elem.team.id,
                    'name':elem.team.name,
                    'logo':elem.team.logo
                });
            }
            else{
            const index=preferedTeamsArr.indexOf(preferedTeamsArr.filter(obj=>obj.id===elem.team.id)[0])
            preferedTeamsArr=preferedTeamsArr.slice(0,index).concat(preferedTeamsArr.slice(index+1));
            console.log("selected teams: ",preferedTeamsArr);    
            }
            setCookie(preferedTeamsArr,"prefered_teams");
        }     
        
    }

    function setPreferedLeaguesColor(leagueId){ //to mark prefered league
        let preferedLeaguesArr=getCookie('prefered_leagues'); 
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
        let preferedTeamsArr=getCookie("prefered_teams"); 
        let strokeClass="text-blue-100"; 
        preferedTeamsArr.map((elem)=>{
            if(elem.id===teamId){
                console.log("mark:",elem.id)
                strokeClass= "text-blue-600";
            }
        })
        return strokeClass;
    }
    
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
                                        <p className="w-[70%]">{elem.league?.name || elem.team?.name}</p>         
                                        {/* button to save prefered league or team in a cookie */}
                                        <FontAwesomeIcon 
                                            icon={faStar}
                                            className={`stroke-[4px]  w-10 h-10 cursor-pointer hover:stroke-blue-600
                                                        ${elem.league? setPreferedLeaguesColor(elem.league.id) : setPreferedTeamsColor(elem.team?.id)}`}                             
                                            onClick={(event)=>
                                            {
                                                const senderElement = event.currentTarget; 
                                                senderElement.classList.toggle("text-blue-600");
                                                senderElement.classList.toggle("text-blue-100");
                                                                                  
                                                elem.league?  //if there is leagues source data display leagues pages, if not, it will be teams       
                                                    handlePreferedLeagues(elem) 
                                                    :
                                                    handlePreferedTeams(elem)
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