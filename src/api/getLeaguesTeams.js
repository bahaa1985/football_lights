import axios from 'axios'

export function getLeagues(search){
    let config={
        method:'GET',
        url:`https://v3.football.api-sports.io/leagues?search=${search}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
          }
    };
    return axios(config)
}

export function getTeam(search) {
    let config={
        method:'GET',
        url:`https://v3.football.api-sports.io/teams?search=${search}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
          }
    };
    return axios(config)
}