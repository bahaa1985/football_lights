import axios from 'axios'
import getEvents from './getEvents';

function getSubsEvents(fixtureId,teamId){
    //1.get all team events:
    const events=getEvents(fixtureId).then((result)=>{
        result.data.response[0].filter(event=>event.team.id===teamId)
    })
    //2.
    let config={
        method:'GET',
        url:`https://v3.football.api-sports.io/fixtures/lineups?fixture=${fixtureId}&team=${teamId}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
          }
    };
    return axios(config)
}

export default getSubsEvents