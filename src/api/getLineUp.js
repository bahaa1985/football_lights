import axios from 'axios'

function getLineUps(fixtureId){
    let config={
        method:'GET',
        url:`/fixtures/lineups?fixture=${fixtureId}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '12c3d051c8f77e0840cd9c5e35fd8cd0'
          }
    };
    return axios(config)
}

export default getLineUps