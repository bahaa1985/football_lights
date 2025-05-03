import React, {useState} from "react";
import Favourite from "../Tools/Favourite.jsx";

function Pagination(props) {
       
    let pages=[] // items pages that will be displayed
    const [pageIndex,setPageIndex]=useState(0);

    const items=props.source;
    const items_type=props.type;

    const pagesCount=Math.ceil(items.length/10); //get pages count by 10 items in each page
    

    for(let i=0;i<pagesCount;i++){ //loop to create pagination, every page has 10 items       
        let page=[];
        for(let k=i*10;k<(i*10)+10;k++){ // to create single page of 10 items
            if(k<items.length){
            page.push(items[k])
            }             
            else{
                break;
            }       
        }
        pages.push(page);
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
                                        {
                                            <Favourite 
                                                elem_id={elem.league?.id || elem.team?.id} 
                                                cookie_name={items_type === 'league' ? 'prefered_leagues' : 'prefered_teams'}
                                                obj={
                                                    items_type === 'league' ?
                                                    {
                                                        'id':elem.league.id,
                                                        'name': elem.league.name,
                                                        'logo':elem.league.logo,
                                                        'season':elem.seasons.at(-1).year,
                                                        'endDate':elem.seasons.at(-1).end
                                                    }
                                                    :
                                                    {
                                                        'id':elem.team.id,
                                                        'name':elem.team.name,
                                                        'logo':elem.team.logo
                                                    }
                                                } />
                                        }
                                    </div>)
                            })
                        }
                    </div>
                    {/* pagination buttons */}
                    <div className="w-full flex justify-start flex-wrap">
                        {
                            pages.map((page,index)=>{
                                return(
                                    <button key={index}
                                            className={`rounded-full w-8 h-8 mx-2 ${index===pageIndex ? "bg-blue-600 text-white" : "bg-blue-200 text-black"}`} 
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