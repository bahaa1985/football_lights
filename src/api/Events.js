import axios from 'axios'

 function getEvents(fixture){
  let config = {
    method: 'GET',
    url: `https://v3.football.api-sports.io/fixtures/events?fixture=${fixture}`,  
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key':process.env.REACT_APP_XRAPIDAPIKEY,
    }
  };
  
  return axios(config)
  
}


export default getEvents


