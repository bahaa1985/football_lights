import axios from 'axios'

export default function getSelectedGame(fixture){
    let config = {
      method: 'GET',
      url: `https://v3.football.api-sports.io/fixtures?id=${fixture}`,
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
      }
    };
    
    return axios(config)
    
  }