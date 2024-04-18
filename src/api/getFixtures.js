import axios from 'axios'

 function getResults(league,season){
  let config = {
    method: 'GET',
    url: `/fixtures?league=${league}&season=${season}`,
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '12c3d051c8f77e0840cd9c5e35fd8cd0'
    }
  };
  
  return axios(config)
  
}


export default getResults


