import React, { useRef } from "react";
import getStatistics from "../../Api/getStatistics.js";
// import '../styles/statistics.css'
import { useEffect,useState } from "react";

function Statistics(props){

    const fixtureId=props.fixtureId
    const [homeStatistics,setHomeStatistics]=useState([]);    
    const [awayStatistics,setAwayStatistics]=useState([]);
    const [statistics_arr,setStatisticsArr]=useState([]);
    const progress_div_ref=useRef();
    

    // let statistics_arr=[];
    // for(let i=0;i<17;i++){
    //     statistics_arr.push({home:0,away:0,type:''})
    // } 

    useEffect(()=>{
        getStatistics(fixtureId).then((result)=>{ 
            
            console.log(result);                      
            setHomeStatistics(result.data.response[0].statistics);
            setAwayStatistics(result.data.response[1].statistics);
            //
            for(let i=0;i<17;i++){
                statistics_arr.push()
            }

            homeStatistics?.map((item,index)=>{
                statistics_arr[index].type=item.type;
                item.value===null? statistics_arr[index].home=0 : statistics_arr[index].home=item.value;
            })
            awayStatistics?.map((item,index)=>{ 
                statistics_arr[index].type=item.type;             
                item.value===null? statistics_arr[index].away=0 : statistics_arr[index].away=item.value; 
            })
            
        });                                      
    },[fixtureId])
 

   
    
    console.log("re",homeStatistics);

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
            
            
            {statistics_arr?.map((item,index)=>{                                
                total=Number.parseInt(item.home)+Number.parseInt(item.away);             
                return(
                    <div key={index} style={{width:'100%',textAlign:'center'}}>
                        <div>{item.type}</div>
                        <div ref={progress_div_ref} style={{display: 'flex',justifyContent:'center',width:'100%'}}>
                            <span>{item.home}</span>
                            <div style={{width:'45%'}}>
                                <progress className="progress-home" max={total} value={Number.parseInt(item.home)}></progress>
                            </div>
                            <div style={{width:'45%'}}>
                                <progress className="progress-away" max={total} value={Number.parseInt(item.away)}></progress>
                            </div>
                            <span>{item.away}</span>
                        </div>
                    </div>
                )
            })}                                      
        </section>
    )
}

export default Statistics