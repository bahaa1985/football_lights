import axios from 'axios'

export function getLeagues(search=null,leagueId=0){
    let leaguesURL="";
    if(search){
        leaguesURL=`https://v3.football.api-sports.io/leagues?search=${search}`
    }
    else{
        leaguesURL=`https://v3.football.api-sports.io/leagues?id=${leagueId}`
    }
    let config={
        method:'GET',
        url:leaguesURL,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
          }
    };
    return axios(config)
}

export function getLeagueRounds(leagueId,season){
    let config={
        method:'GET',
        url:`https://v3.football.api-sports.io/fixtures/rounds?league=${leagueId}&season=${season}`,
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