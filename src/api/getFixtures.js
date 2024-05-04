import axios from 'axios'

 export function getAllFixtures(league,season){
  let config = {
    method: 'GET',
    url: `https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}`,
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
    }
  };
  
  return axios(config)
  
}



export default getAllFixtures


