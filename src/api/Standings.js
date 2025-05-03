import axios from 'axios'

 function getStandings(leagueId,season){
  let config = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/standings?league='+leagueId+'&season='+season,
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
    }
  };
  
  return axios(config)
  
}


export default getStandings


