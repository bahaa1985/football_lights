import express from 'express';
import { groupDateFixtures,groupLiveFixtures } from '../Api/getFixtures.js'

const home_router = express.Router();


function getCurrentDate(){
    const day=new Date().getDate()<10 ? '0'+ new Date().getDate(): new Date().getDate();
    const month=new Date().getMonth()+1 <10 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
    const year=new Date().getFullYear();
    const currentDate=year.toString()+'-'+month.toString()+'-'+day.toString();
    return currentDate;
}

home_router.get('/',async (req, res) => {
    console.log("home router:",req.url);
    const currentDate = getCurrentDate();
    // const dateFixtures = await groupDateFixtures("2025-01-15");
    // console.log("date fixtures:",dateFixtures);
    // groupLiveFixtures().then((result)=>
    // {
    //     console.log("live fixtures:",result)
    //      res.json({today:liveFixtures}); 
    // });
    const liveFixtures =await groupLiveFixtures();
    // console.log("live fixtures:",liveFixtures);
    res.status(200).send({dd:liveFixtures});
    
});

export default home_router;

