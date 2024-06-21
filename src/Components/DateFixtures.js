import React ,{useState, useEffect} from "react";
import { getDateFixtures } from "../Api/getFixtures.js";
import { getPreferdLeaguesFromCookie } from "../Api/cookie.js";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Nav, Button, Container } from "react-bootstrap";

export default function DateFixtures(){

    const [datefixtures,setDateFixtures]=useState([]);
    const [groupedFixtures,setGroupedFixtures]=useState([]);
    //
    let dates=[];
    for(let i=0;i<7 ;i++){
        const nowValue=Date.now();
        const date =new  Date((nowValue+ i*24*60*60*1000));
        const day=date.getDate()<10 ? '0'+ date.getDate(): date.getDate();
        const month=date.getMonth()+1 <10 ? '0'+(date.getMonth()+1) : date.getMonth()+1;
        const year=date.getFullYear();
        dates.push({'date':day,'month':month,'year':year});
    }
    const [dateString,setDateString]=useState(dates[0].year.toString()+'-'+dates[0].month.toString()+'-'+dates[0].date.toString())

    let  todayArray= [];
    useEffect(()=>{
        let leagues=getPreferdLeaguesFromCookie();
        if(leagues.length>0){
            console.log("triggered!");
          
            for(let i=0;i<leagues.length;i++){
                getDateFixtures(leagues[i].id,leagues[i].season,dateString).then(result=>{ 
                    todayArray.push(...result.data.response)
                    setDateFixtures(todayArray);
            })}

                     
        }
        
    },[dateString])

    const groupedDateFixtures=datefixtures?.reduce((group,elem)=>{
        const title= elem.league.name + '  ' + elem.league.round;
        if(group[title] ==null){
            group[title]=[];
        }
        group[title].push(elem);
        return group;

    },[])
    
    console.log("fixtures",groupedDateFixtures);
    return(
        <Container>
            <Nav variant="tabs">
                {
                    dates.map((date,index)=>{
                        return(
                        <Nav.Item 
                            onClick={()=>setDateString(dates[index].year+'-'+dates[index].month+'-'+dates[index].date)} 
                            className="m-2 bg-primary text-light" role="button" key={index}
                        >{date.date + '/' + date.month}
                        </Nav.Item>)
                    })
                }
            </Nav>
            {/* selected date fixtures */}
            <Container>
            {
                    groupedDateFixtures?
                    Object.keys(groupedDateFixtures)
                    .sort((a,b)=>a-b)
                    .map((elem,index)=>{
                        return(
                            <div>
                                <img src={groupedDateFixtures[elem][0].league.logo} alt={''}/>
                                <span>{Object.keys(groupedDateFixtures)[index]}</span>
                                <div>
                                {
                                     groupedDateFixtures[elem]?.map((fixture,index)=>{
                                        return(
                                            <div key={index}>
                                                <img className="image" src={fixture.teams.home.logo} alt={fixture.teams.home.name}/>
                                                <span>{fixture.teams.home.name}</span>
                                                <span>{fixture.goals.home}</span>
                                                <span>{fixture.goals.away}</span>
                                                <span>{fixture.teams.away.name}</span>
                                                <img className="image" src={fixture.teams.away.logo} alt={fixture.teams.away.name}/>
                                            </div>
                                        )
                                        
                                })
                                }
                                </div>
                            </div>  
                        )
                    })
                    :
                    <p>No current games</p>
                }
            </Container>
        </Container>
        
    )
}