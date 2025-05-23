import React, {useState} from "react";
import { setCookie,getCookie } from "../../Api/cookie.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons";


function TeamsPagination(props) {
    
    
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
           
    function handlePreferedTeams(elemTeam){  //set prefered teams cookie  
        let preferedTeamsArr=getCookie("prefered_teams"); 
        console.log("prefered teams",preferedTeamsArr);
        if(preferedTeamsArr !== null){
            if(preferedTeamsArr.filter(obj=>obj.id === elemTeam.team.id)[0] === undefined){
                preferedTeamsArr.push({'id':elemTeam.team.id,'name':elemTeam.team.name,'logo':elemTeam.team.logo});
            }
            else{
            const index=preferedTeamsArr.indexOf(preferedTeamsArr.filter(obj=>obj.id===elemTeam.team.id)[0])
            preferedTeamsArr=preferedTeamsArr.slice(0,index).concat(preferedTeamsArr.slice(index+1));
            console.log("selected teams: ",preferedTeamsArr);    
            }
            setCookie("prefered_teams",preferedTeamsArr);
        }     
        
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
                                            className={`stroke-[4px] text-blue-100 w-10 h-10 cursor-pointer hover:stroke-blue-900 ${setPreferedTeamsColor(elem.team?.id)}`}                             
                                            onClick={(event)=>
                                            {
                                                //toggle star button color:
                                                const senderElement = event.currentTarget; 
                                                senderElement.classList.toggle("text-blue-600");
                                                senderElement.classList.toggle("text-blue-100");
                                                //set prefered team or remove it:                                               
                                                (handlePreferedTeams(elem))
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

export default TeamsPagination;