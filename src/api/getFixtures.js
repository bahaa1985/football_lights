import axios from 'axios'
import { getCookie, setCookie } from './cookie.js';
import { getLeagues } from './getLeaguesTeams.js';

export function getLeagueFixtures(league, season) {
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

function getTeamFixtures(teamId) {
  let config = {
    method: 'GET',
    url: `https://v3.football.api-sports.io/fixtures?team=${teamId}`,
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': process.env.REACT_APP_XRAPIDAPIKEY
    }
  };

  return axios(config)

}

async function getPromisedDateFixtures(dateString) {
  let leagues = getCookie("prefered_leagues");
  // console.log("getFixtures-leagues",leagues);
  if (leagues.length > 0) {
    let dayArray = [];
    let promises = leagues.map(async (league,index) =>{
      // if the league is still running get its fixtures, if not delete it from cookie:
      // if(Date.parse(league.endDate) >= (Date.now()-1000*60*60*24) ){ 
        await getDateFixtures(league.id, league.season, dateString).then(result => {
          dayArray.push(...result.data.response);
          dayArray.sort((a,b)=>{
            if(a.fixture.status !== 'FT' && b.fixture.status === 'FT') return -1
            else if(a.fixture.status === 'FT' && b.fixture.status !== 'FT') return 1
            return 0;
          })
        })
    });
    await Promise.all(promises);
    return dayArray;
  }
  else {
    return [];
  }
}

export async function groupDateFixtures(dateString) {
  let grouped =[];
  await getPromisedDateFixtures(dateString).then(result => {
    result?.reduce((group, elem) => {
      const title = elem.league.name + '  ' + elem.league.round;
      if (!group[title]) {
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
  let ids = leagues.map(league => league.id).join('-');
  console.log("ids", ids);

  if (ids.length > 0) {
    let liveArray = [];
    
    try {
      const result = await getLiveFixtures(ids);
      liveArray.push(...result.data.response);
      console.log("live result:", liveArray);  
    } catch (error) {
      console.error("Error fetching live fixtures:", error);
    }

    return liveArray;
  } else {
    return [];
  }
}

export async function groupLiveFixtures() {
  let grouped = {};
  
  try {
    const result = await getPromisedLiveFixtures();
    result?.reduce((group, elem) => {
      const title = `${elem.league.name}  ${elem.league.round}`;
      if (!group[title]) {
        group[title] = [];
      }
      group[title].push(elem);
      return group;
    }, grouped);

    console.log("grouped live", grouped);
  } catch (error) {
    console.error("Error grouping live fixtures:", error);
  }
  
  return grouped;
}

async function getPromisedLeagueFixtures(leagueId,season){
  let leagueFixtures=[];
  try{
    const result=await getLeagueFixtures(leagueId,season);
    leagueFixtures=result?.data.response;
  }
  catch(error){
    console.error("Error promised league fixtures:",error);    
  }
  return leagueFixtures;
}

export async function groupLeagueFixtures(leagueId,season){
  let grouped =[];
  const result= await getPromisedLeagueFixtures(leagueId,season);
  result?.reduce((group, elem) => {
    const gw = elem.league.round;
    if (!group[gw]) {
      group[gw] = [];
    }
    group[gw].push(elem);
    console.log("grouped fixtures", group);
    grouped=group;
    return group;
  }, [])
  return grouped
}

export async function getPromisedTeamFixtures(teamId){
  let teamFixtures=[];
  let uniqueFixtures=[];
  try {
    let teams=getCookie("prefered_teams");
    for(let i=0;i<teams.length-1;i++){
      const result=await getTeamFixtures(parseInt(teams[i].id))  ;
      console.log("team fixtures: ",result);    
      teamFixtures.push(result.data.response[0]);
    }    
    uniqueFixtures = [...new Set(teamFixtures)];
    
  } catch (error) {
    
  }
  return uniqueFixtures;
}



