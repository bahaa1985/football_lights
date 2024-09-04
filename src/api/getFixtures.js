import axios from 'axios'
import { getCookie, setCookie , removeCookie} from './cookie.js';
import { getLeagues } from './getLeaguesTeams.js';

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


async function getPromisedFixtures(dateString) {
    let leagues = getCookie('prefered_leagues');
    console.log("leagues",leagues);
    if (leagues.length > 0) {
      let todayArray = [];
      let promises = leagues.map(league =>{
        if(league.endDate >= Date.now()){ //to check of season status, if it is finished then remove it from the cookie it may be beacause the season is finished: 
          getDateFixtures(league.id, league.season, dateString).then(result => {
            if(result.data.response.length>0){
              todayArray.push(...result.data.response);
            }         
          })
        }
        else{
          const currentLeagues=leagues.filter((elem)=>elem.id !== league.id);
          setCookie(currentLeagues,'prefered_leagues');
        }
      });
      await Promise.all(promises);
      return todayArray;
    }
    else {
      return [];
    }
  
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

async function getPromisedLiveFixtures() {
  let leagues = getCookie("prefered_leagues");
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





export default getAllFixtures


