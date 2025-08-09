import React, {useState} from "react";
import Favourite from '../../Components/Favourite.jsx';
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
        <div className="w-full flex flex-col items-center justify-center p-4">
            <>
                {/* Data pages */}
                <div className="w-full">
                    {
                        pages[pageIndex]?.map((elem, index) => {
                            return (
                                <div key={index} className="page-item flex items-center my-3 border-b border-gray-300">
                                    {/* Element logo */}
                                    <img
                                        src={elem.league?.logo || elem.team?.logo}
                                        className="logo w-12 h-12 rounded-full mr-4"
                                        alt={elem.league?.name || elem.team?.name}
                                    />
                                    {/* Element name */}
                                    <p className="name flex-grow text-lg font-medium text-gray-700">
                                        {elem.league?.name || elem.team?.name}
                                    </p>
                                    {/* Favourite button */}
                                    <Favourite
                                        elem_id={elem.league?.id || elem.team?.id}
                                        cookie_name={items_type === 'league' ? 'prefered_leagues' : 'prefered_teams'}
                                        obj={
                                            items_type === 'league'
                                                ? {
                                                      id: elem.league.id,
                                                      name: elem.league.name,
                                                      logo: elem.league.logo,
                                                      country: elem.country.name,
                                                      season: elem.seasons.at(-1).year,
                                                      endDate: elem.seasons.at(-1).end,
                                                  }
                                                : {
                                                      id: elem.team.id,
                                                      name: elem.team.name,
                                                      country: elem.team.country,
                                                      logo: elem.team.logo,
                                                  }
                                        }
                                    />
                                </div>
                            );
                        })
                    }
                </div>
                {/* Pagination buttons */}
                <div className="flex justify-center flex-wrap mt-4">
                    {
                        pages.map((page, index) => {
                            return (
                                <button
                                    key={index}
                                    className={`pagination-button rounded-full w-10 h-10 mx-1 ${
                                        index === pageIndex
                                            ? "bg-blue-500 text-white font-bold"
                                            : "bg-gray-200 text-gray-700"
                                    }`}
                                    onClick={() => setPageIndex(index)}
                                >
                                    {index + 1}
                                </button>
                            );
                        })
                    }
                </div>
            </>
        </div>
    );
}

export default Pagination;