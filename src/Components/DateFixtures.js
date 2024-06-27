import React ,{useState, useEffect} from "react";
import { groupDateFixtures } from "../Api/getFixtures.js";
import {Container, Box, Button, Typography, Avatar} from '@mui/material';
import useTheme from "@mui/material/styles/useTheme.js";

export default function DateFixtures(){

    const theme = useTheme();
    const [groupFixtures,setGroupFixtures]=useState([]);
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
        groupDateFixtures(dateString).then(result=>{
            setGroupFixtures(result);
        })        
    },[dateString])

    
    console.log("date fixtures",groupFixtures);
   
    return(
        <Container>
            <Box  display={"flex"} justifyContent={"center"} margin={2}>
                {
                    dates.map((date,index)=>{
                        return(
                        <Button variant={'contained'} sx={{mx:'4px',borderRadius:'15px',backgroundColor:'navy',color:'#fff'}}
                            onClick={()=>setDateString(dates[index].year+'-'+dates[index].month+'-'+dates[index].date)}>
                            {date.date + '/' + date.month}
                        </Button>)
                    })
                }
            </Box>
            {/* selected date fixtures */}
            <Container maxWidth={'lg'}>
                <Box margin={2}>
                    <Typography className={theme.typography}>
                        Fixtures of {dateString}
                    </Typography>
                </Box>
                {
                    groupFixtures?
                    Object.keys(groupFixtures)
                    .map((elem,index)=>{
                        return(
                            <Box key={index}>
                                <Box sx={{borderBottom:'1px solid black',borderTop:'1px solid black'}} display={'flex'} justifyContent={'start'} padding={1} my={2}  >
                                    <Avatar sx={{ml:'2px',width:'80px', height:'80px', objectFit:'contain'}} variant="square" src={groupFixtures[elem][0].league.logo} alt={''}/>
                                    <Typography>{Object.keys(groupFixtures)[index]}</Typography>                              
                                </Box>
                                <Box padding={2} margin={2} justifyContent={'start'}>
                                    {
                                        groupFixtures[elem]?.map((fixture,i)=>{
                                            return(
                                                <Box display={"flex"} justifyContent={'space-around'} width={'60%'} padding={2} my={2} mx={'auto'} key={i}>
                                                    <Avatar  sx={{ml:'2px',minWidth:'80px', minHeight:'60px', objectFit:'contain'}} variant="square" src={fixture.teams.home.logo} alt={fixture.teams.home.name}/>
                                                    <Typography>{fixture.teams.home.name}</Typography>
                                                    <Typography>{fixture.goals.home}</Typography>
                                                    <Typography>{fixture.goals.away}</Typography>
                                                    <Typography>{fixture.teams.away.name}</Typography>
                                                    <Avatar  sx={{ml:'2px',minWidth:'80px', minHeight:'60px', objectFit:'contain'}} variant="square" src={fixture.teams.away.logo} alt={fixture.teams.away.name}/>
                                                </Box>
                                            )
                                            
                                        })
                                    }
                                </Box>
                            </Box>
                        )
                    })
                    :
                    <p>No current games</p>
                }
            </Container>
        </Container>
        
    )
}