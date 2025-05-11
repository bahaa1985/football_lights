import axios from "axios";

export function getPlayerSeasons(playerId){
    const config={
        method:"GET",
        url:`https://v3.football.api-sports.io/players/seasons?player=${playerId}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
        },

    };

    return axios(config);
}

export function getPlayerStats(playerId,season){
    const config={
        method:"GET",
        url:`https://v3.football.api-sports.io/players?id=${playerId}&season=${season}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
        },

    };

    return axios(config);
}

export function getPlayerProfile(playerId=null,season=null,search=null,leagueId=null){
    const config={
        method:"GET",
        url:`https://v3.football.api-sports.io/players?id=${playerId}&season=${season}&league=${leagueId}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
        },

    };

    return axios(config);
}

export function getPlayerByName(searchKey){
    const config={
        method:"GET",
        url:`https://v3.football.api-sports.io/players/profiles?search=${searchKey}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
        },

    };

    return axios(config);
}

export function getTopScorers(leagueId,season){
    const config={
        method:"GET",
        url:`https://v3.football.api-sports.io/players/topscorers?league=${leagueId}&season=${season}`,
        headers:{
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
        }
    }
    return axios(config);
}

export function getTopAssists(leagueId,season){
    const config={
        method:"GET",
        url:`https://v3.football.api-sports.io/players/topassists?league=${leagueId}&season=${season}`,
        headers:{
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
        }
    }
    return axios(config);
}

export default getPlayerProfile;