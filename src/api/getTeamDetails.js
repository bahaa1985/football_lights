import axios from "axios";

export function getTeamSeasons(teamId){
    const config={
        method:'GET',
        url:`https://v3.football.api-sports.io/teams/seasons/team=${teamId}`,
        headers:{
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
        }
    }

    return axios(config)
}

export function getTeamInformation(teamId){
    const config={
        method:'GET',
        url:`https://v3.football.api-sports.io/teams/id=${teamId}`,
        headers:{
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
        }
    }

    return axios(config)
}

export function getTeamStatistics(season,leagueId,teamId){
    const config={
        method:'GET',
        url:`https://v3.football.api-sports.io/teams/statistics/team=${teamId}&season=${season}&league=${leagueId}`,
        headers:{
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
        }
    }
    return axios(config)
}