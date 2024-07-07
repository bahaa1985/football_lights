import React ,{useState, useEffect} from "react";
import { groupDateFixtures } from "../Api/getFixtures.js";
import {Container, Box, Button, Typography, Avatar} from '@mui/material';
import { NavLink } from "react-router-dom";
import useTheme from "@mui/material/styles/useTheme.js";
import FixtureRow from "./FixtureRow.js";

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
                    <FixtureRow fixturesSource={groupFixtures}/>
                    :
                    <p>No current games</p>
                }
            </Container>
        </Container>
        
    )
}