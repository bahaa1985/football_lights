import React, { useRef } from "react";
import getStatistics from "../../Api/getStatistics.js";
import { useEffect,useState } from "react";

function Statistics(props){

    const fixtureId=props.fixtureId
    const [homeStatistics,setHomeStatistics]=useState([]);    
    const [awayStatistics,setAwayStatistics]=useState([]);

    useEffect(()=>{
        getStatistics(fixtureId).then((result)=>{ 
            console.log("result",result);                      
            setHomeStatistics(result.data.response[0].statistics);
            setAwayStatistics(result.data.response[1].statistics); 
            //
                                        
        });                                      
    },[fixtureId])

    console.log("re",homeStatistics);

    let total=0;

    return(
        <section style={{width:'90%',height: 'auto',margin:'auto',textAlign: 'center'}}>                                                      
        {
            [homeStatistics?.map((item,index)=>{
                return (item.value === null ? item.value = 0 : null)
            }),
            awayStatistics?.map((item,index)=>{
                return (item.value === null ? item.value = 0 : null)
            }), 
            console.log("re",homeStatistics),
            
            homeStatistics?.map((item,index)=>{
                               
                total=Number.parseInt(item.value)+Number.parseInt(awayStatistics[index].value);             
                return(
                    <div key={index} className="w-[90%] text-center">                       
                        
                        <div>{item.type}</div>
                            
                            <div className="flex justify-center">
                            <div className="flex justify-between">
                               
                               <span>{`${item.value === null ? 0 : item.value}`}</span>
                               <div className="w-56 bg-gray-200 rounded-r-full h-2 rotate-180">
                                   {
                                       item.value !== null && item.value !== 0 && !item.value.toString().includes('%')  ?
                                       <div style={{width:`${Number.parseInt(item.value) *100 / total}%`}} className={`bg-green-600 rounded-r-full  h-2`}></div>:
                                       item.value.toString().includes('%') ? 
                                       <div style={{width:`${item.value}`}} className={`bg-green-600 rounded-r-full  h-2`}></div>
                                       :null
                                   }
                                   
                               </div>
                              
                           </div>

                           <div className="flex justify-between"> 
                               <div className="w-56 bg-gray-200 rounded-r-full h-2">
                                   {
                                       awayStatistics[index].value !== null && awayStatistics[index].value !== 0 && !awayStatistics[index].value.toString().includes('%')  ?
                                       <div style={{width:`${Number.parseInt(awayStatistics[index].value) *100 / total}%`}} className={` bg-blue-600 rounded-r-full h-2`}></div>:
                                       awayStatistics[index].value.toString().includes('%') ?
                                       <div style={{width:`${awayStatistics[index].value}`}} className={` bg-blue-600 rounded-r-full h-2`}></div>
                                       :null
                                   }
                               </div>                              
                               <span>{`${awayStatistics[index].value === null ? 0 : awayStatistics[index].value}`}</span> 
                           </div>
                            </div>
                           
                    </div>
                )
            })]
        }                                      
        </section>
    )
}

export default Statistics