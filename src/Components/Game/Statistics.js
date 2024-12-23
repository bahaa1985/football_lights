import React, { useRef } from "react";
import getStatistics from "../../Api/getStatistics.js";
import { useEffect,useState } from "react";

function Statistics(props){

    const fixtureId=props.fixtureId
    const [homeStatistics,setHomeStatistics]=useState([]);    
    const [awayStatistics,setAwayStatistics]=useState([]);
    const [statistics_arr,setStatisticsArr]=useState([]);
    // let statistics_arr=[];
    const progress_div_ref=useRef();

    useEffect(()=>{
        getStatistics(fixtureId).then((result)=>{ 
            
            console.log("result",result);                      
            setHomeStatistics(result.data.response[0].statistics);
            setAwayStatistics(result.data.response[1].statistics);                              
           
            let ss_arr=[]
            for(let i=0;i<18;i++){
                ss_arr.push({type:'',home:0,away:0});
                ss_arr[i].type=homeStatistics[i]?.type;
                homeStatistics[i]?.value===null? ss_arr[i].home=0 : ss_arr[i].home=homeStatistics[i]?.value;
                //
                ss_arr[i].type=awayStatistics[i]?.type;             
                awayStatistics[i]?.value===null? ss_arr[i].away=0 : ss_arr[i].away=awayStatistics[i]?.value;
            }

            setStatisticsArr(ss_arr);
            // homeStatistics?.map((item,index)=>{                
            //     statistics_arr.push({type:'',home:0,away:0});
            //     statistics_arr[index].type=item.type;
            //     item.value===null? statistics_arr[index].home=0 : statistics_arr[index].home=item.value;
            // })
            // awayStatistics?.map((item,index)=>{ 
            //     statistics_arr[index].type=item.type;             
            //     item.value===null? statistics_arr[index].away=0 : statistics_arr[index].away=item.value; 
            // })
            
        });                                      
    },[fixtureId])

   
    
    console.log("re",statistics_arr);

    // const allStatistics =()=>{
    //     let statistics_arr=[];
    //     for(let i=0;i<17;i++){
    //         statistics_arr.push({home:0,away:0,type:''})
    //     } 
    //     //
    //     homeStatistics?.map((item,index)=>{
    //         statistics_arr[index].type=item.type;
    //         item.value===null? statistics_arr[index].home=0 : statistics_arr[index].home=item.value;
    //     })
    //     awayStatistics?.map((item,index)=>{              
    //         item.value===null? statistics_arr[index].away=0 : statistics_arr[index].away=item.value; 
    //     })
    //     return statistics_arr;
    // }

    let total=0;

    return(
        <section style={{width:'90%',height: 'auto',margin:'auto',textAlign: 'center'}}>                              
            
            
            {homeStatistics?.map((item,index)=>{                                
                total=Number.parseInt(item.value)+Number.parseInt(awayStatistics[index].value);             
                return(
                    <div key={index} style={{width:'100%',textAlign:'center'}}>                       
                        <div ref={progress_div_ref} className="flex justify-center">
                           
                            <div className="flex justify-between">
                                <span>{item.value}</span>
                                <progress className="rounded-md h-2 bg-slate-400 after:bg-blue-400" max={total} value={Number.parseInt(item.value)}></progress>
                            </div>

                            <div>{item.type}</div>

                            <div className="flex justify-between">                                
                                <progress className="rounded-md h-2 rotate-180 bg-slate-400 after:bg-blue-400" max={total} value={Number.parseInt(awayStatistics[index].value)}></progress>
                                <span>{awayStatistics[index].value}</span>
                            </div>
                            
                        </div>
                    </div>
                )
            })}                                      
        </section>
    )
}

export default Statistics