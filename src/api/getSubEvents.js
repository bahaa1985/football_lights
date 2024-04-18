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
        url:`/fixtures/lineups?fixture=${fixtureId}&team=${teamId}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '12c3d051c8f77e0840cd9c5e35fd8cd0'
          }
    };
    return axios(config)
}

export default getSubsEvents