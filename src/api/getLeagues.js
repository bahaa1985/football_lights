import axios from 'axios'

function getLeagues(country){
    let config={
        method:'GET',
        url:`https://v3.football.api-sports.io/leagues?country=${country}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '12c3d051c8f77e0840cd9c5e35fd8cd0'
          }
    };
    return axios(config)
}

export default getLeagues