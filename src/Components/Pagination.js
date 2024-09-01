import React, {useState} from "react";



function Pagination(props) {
    
    const items=props.source;
    console.log("items? ",items);
    console.log("length", items.length);
    const pagesCount=Math.ceil(items.length/10); //get pages count by 10 items in each page
    console.log("pages count", pagesCount);
    
    let pages=[] // items pages that will be displayed
    const [pageIndex,setPageIndex]=useState(0)
    const [currentPage,setCurrentPage]=useState(pages[pageIndex]);

    for(let i=0;i<pagesCount;i++){ //for loop to create items pages, every page has 10 items
        console.log("loop!");        
        let page=[];
        for(let k=i*10;k<(i*10)+10;k++){
            page.push(items[k])                    
        }
        console.log("page",page);   
        pages.push(page);
    }
      
    console.log("pagintation",pages);
    
    return ( 
            <div>
                {
                    <>
                        <div>
                            {
                                pages[pageIndex].map((item,index)=>{
                                    return(<p key={index}>
                                        {
                                            item.league.name
                                        }
                                    </p>)
                                })
                            }
                        </div>
                        <div className="flex justify-between">
                            {
                                pages.map((page,index)=>{
                                    return(
                                        <button key={index} onClick={()=>setPageIndex(index)}>
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