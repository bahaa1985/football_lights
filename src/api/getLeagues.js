import axios from 'axios'

function getLeagues(country,season){
    let config={
        method:'GET',
        url:`https://v3.football.api-sports.io/leagues?country=${country}&season=${season}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
          }
    };
    return axios(config)
}

export default getLeagues