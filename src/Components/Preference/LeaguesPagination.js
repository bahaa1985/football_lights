import React, {useState} from "react";
import { setCookie,getCookie } from "../../Api/cookie.js";
// import { getLeagueRounds } from "../Api/getLeaguesTeams.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";


function LeaguesPagination(props) {
    
    
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
        console.log("page",page);   
        pages.push(page);
    }

    let preferedLeaguesArr=getCookie('prefered_leagues'); 
    function handlePreferedLeagues(leagueId,season,endDate){ //set prefered leagues cookie  
        if(preferedLeaguesArr !== null){
            if(preferedLeaguesArr.filter(obj=>obj.id===leagueId)[0] === undefined){
                preferedLeaguesArr.push({'id':leagueId,'season':season,'endDate':endDate});
            }
            else
            {
                const index=preferedLeaguesArr.indexOf(preferedLeaguesArr.filter(obj=>obj.id===leagueId)[0])
                preferedLeaguesArr=preferedLeaguesArr.slice(0,index).concat(preferedLeaguesArr.slice(index+1));
                console.log("selected leagues: ",preferedLeaguesArr);    
            }
            setCookie(preferedLeaguesArr,"prefered_leagues");
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
                                            className={`stroke-[4px]  w-10 h-10 cursor-pointer hover:stroke-blue-900 ${setPreferedLeaguesColor(elem.league.id)}`}                             
                                            onClick={(event)=>
                                            {
                                                const senderElement = event.currentTarget; 
                                                senderElement.classList.toggle("text-blue-600");
                                                senderElement.classList.toggle("text-blue-100");
                                                // console.log("seasons",elem.seasons);
                                                
                                                const filteredSeason=elem.seasons.filter((season)=>{
                                                    return Date.parse(season.end) > Date.now()
                                                })[0];
                                                console.log("filtered season",filteredSeason);
                                                const seasonYear=filteredSeason.year;
                                                const endDate=filteredSeason.end;                                        
                                                handlePreferedLeagues(elem.league.id,seasonYear,endDate)                                                  
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

export default LeaguesPagination;