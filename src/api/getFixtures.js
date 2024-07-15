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

function getLiveFixtures(leagues) {
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


function getDateFixtures(league, season, date) {
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
  console.log("leagues",leagues);
  if (leagues.length > 0) {
    let todayArray = [];
    let promises = leagues.map(league =>
      getDateFixtures(league.id, league.season, dateString).then(result => {
        todayArray.push(...result.data.response);
        // console.log(`today ${league.id}`, todayArray); // logging by league id instead of index
      })
    );
    await Promise.all(promises);
    return todayArray;
  }
  else {
    return [];
  }
}

async function getPromisedLiveFixtures() {
  let leagues = getPreferdLeaguesFromCookie();
  let ids=leagues.map(league=>league.id).join('-');
  if (leagues.length > 0) {
    let liveArray=[];
    let promise = new Promise(()=>{
      getLiveFixtures(ids).then(result => {
        liveArray.push(...result.data.response);
      })
    })
    
    await promise;
    return liveArray;
  }
  else {
    return [];
  }
}

export async function groupLiveFixtures() {
  let grouped =[];
  await getPromisedLiveFixtures()?.then(result => {
    console.log("result", result);
    result?.reduce((group, elem) => {
      const title = elem.league.name + '  ' + elem.league.round;
      if (!group[title]) {
        // console.log(title,group[title]);
        group[title] = [];
      }
      group[title].push(elem);
      console.log("grouped live", group);
      grouped=group;
      return group;
    }, [])
  })
  return grouped
}

export async function groupDateFixtures(dateString) {
  let grouped =[];
  await getPromisedFixtures(dateString)?.then(result => {
    // console.log("result", result);
    result?.reduce((group, elem) => {
      const title = elem.league.name + '  ' + elem.league.round;
      if (!group[title]) {
        // console.log(title,group[title]);
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

export function groupAllFixtures(leagueId,season){
  let grouped =[]; 
  getAllFixtures(leagueId,season).then(result=>{
      grouped = result.reduce((group, elem) => {
        const gw = elem.league.round;
        if (group[gw] == null) {
          group[gw] = [];
        }
        group[gw].push(elem);
        return group
      }, {});
    })
    return grouped;
}

export default getAllFixtures


