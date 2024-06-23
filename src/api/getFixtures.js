import axios from 'axios'
import { getPreferdLeaguesFromCookie } from './cookie.js';
export function getAllFixtures(league, season) {
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

export function getLiveFixtures(leagues) {
  let config = {
    method: 'GET',
    url: `https://v3.football.api-sports.io/fixtures?live=${leagues}`,
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
    }
  };

  return axios(config)
}


export function getDateFixtures(league, season, date) {
  let config = {
    method: 'GET',
    url: `https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}&date=${date}`,
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
    }
  };

  return axios(config)

}

async function getPromisedFixtures(dateString) {
  let leagues = getPreferdLeaguesFromCookie();
  if (leagues.length > 0) {
    let todayArray = [];
    let promises = leagues.map(league =>
      getDateFixtures(league.id, league.season, dateString).then(result => {
        todayArray.push(...result.data.response);
        console.log(`today ${league.id}`, todayArray); // logging by league id instead of index
      })
    );
    await Promise.all(promises);
    return todayArray;
  }
  else {
    return [];
  }
}

export async function createGroupedDateFixtures(dateString) {
  let grouped =[];
  await getPromisedFixtures(dateString)?.then(result => {
    console.log("result", result);
    result?.reduce((group, elem) => {
      console.log("elem",elem);
      const title = elem.league.name + '  ' + elem.league.round;
      if (!group[title]) {
        console.log(title,group[title]);
        group[title] = [];
      }
      group[title].push(elem);
      console.log("grouped fixtures", group);
      grouped=group;
      return group;
    }, [])
  })
  return grouped
}

export default getAllFixtures


