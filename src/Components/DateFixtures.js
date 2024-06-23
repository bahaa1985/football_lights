import React ,{useState, useEffect} from "react";
import { getDateFixtures,createGroupedDateFixtures } from "../Api/getFixtures.js";
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

    useEffect(()=>{
        createGroupedDateFixtures(dateString).then(result=>{
            setGroupedFixtures(result);
        })        
    },[dateString])

    
    console.log("date fixtures",groupedFixtures);
   
    return(
        <Container>
            {/* <Nav variant="tabs">
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
            </Nav> */}
            {/* selected date fixtures */}
            <Container>
            {
                    groupedFixtures?
                    Object.keys(groupedFixtures)
                    .map((elem,index)=>{
                        return(
                            <div key={elem}>
                                <img src={groupedFixtures[elem][0].league.logo} alt={''}/>
                                <span>{Object.keys(groupedFixtures)[index]}</span>
                                <span>{index}</span>
                                <div>
                                {
                                     groupedFixtures[elem]?.map((fixture,i)=>{
                                        return(
                                            <div key={i}>
                                                 <span>{i}</span>
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