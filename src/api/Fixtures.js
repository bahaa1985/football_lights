import axios from "axios";
import { getCookie } from "./Cookie.js";
import { leaguesArray } from "../Components/Leagues.jsx";

export function getFixture(fixture){
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

export function getLeagueFixtures(league, season) {
  let config = {
    method: "GET",
    url: `https://v3.football.api-sports.io/fixtures?league=${league}&season=${season}`,
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": process.env.REACT_APP_XRAPIDAPIKEY,
    },
  };

  return axios(config);
}

function getLiveFixtures(leagues) {
  let config = {
    method: "GET",
    url: `https://v3.football.api-sports.io/fixtures?live=${leagues}`,
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": process.env.REACT_APP_XRAPIDAPIKEY,
    },
  };

  return axios(config);
}

function getDateFixtures(date) {
  let config = {
    method: "GET",
    url: `https://v3.football.api-sports.io/fixtures?date=${date}`,
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": process.env.REACT_APP_XRAPIDAPIKEY,
    },
  };

  return axios(config);
}

function getTeamFixtures(date) {
  let config = {
    method: "GET",
    url: `https://v3.football.api-sports.io/fixtures?date=${date}`,
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": process.env.REACT_APP_XRAPIDAPIKEY,
    },
  };

  return axios(config);
}

async function getPromisedDateFixtures(dateString) {
  if (dateString !== "") {
      let fixturesArray = [];
        let result = await getDateFixtures(dateString)       
        fixturesArray.push(...result.data.response);
        fixturesArray.sort((a, b) => {
          if (a.fixture.status !== "FT" && b.fixture.status === "FT") return -1;
          else if (a.fixture.status === "FT" && b.fixture.status !== "FT")  return 1;
          return 0;
        });
        const filteredFixtures =fixturesArray.filter(fixture=>leaguesArray.some((league) => league.id === fixture.league.id)) //to get only the identified leagues fixtures
      return filteredFixtures;
  }
}

export async function groupDateFixtures(dateString) {
  let grouped = [];
  try{
    await getPromisedDateFixtures(dateString).then((result) => {
      // const filteredFixtures =result.filter(fixture=>leaguesArray.some((league) => league.id === fixture.league.id)) //to get only the identified leagues fixtures
      grouped = Object.groupBy(result,(elem)=>{
        return elem.league.name + " - " + elem.league.round;
      })
      return grouped;
    });
  }
  catch(error){
    console.log("Error grouping date fixtures:",error);
  }
  // console.log("fixtures",grouped);
  return grouped;
}

async function getPromisedLiveFixtures() {
  let leagues = getCookie("prefered_leagues");
  let ids = leagues.map((league) => league.id).join("-");
  if (ids.length > 0) {
    let liveArray = [];
    try {
      const result = await getLiveFixtures(ids);
      liveArray.push(...result.data.response);
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
  } catch (error) {
    console.error("Error grouping live fixtures:", error);
  }

  return grouped;
}

async function getPromisedLeagueFixtures(leagueId, season) {
  let leagueFixtures = [];
  try {
    const result = await getLeagueFixtures(leagueId, season);
    leagueFixtures = result?.data.response.sort(
      (a, b) => Date.parse(a.fixture.date) - Date.parse(b.fixture.date)
    );
  } catch (error) {
    console.error("Error promised league fixtures:", error);
  }
  return leagueFixtures;
}

export async function groupLeagueFixtures(leagueId, season) {
  let grouped = [];
  const result = await getPromisedLeagueFixtures(leagueId, season);
  grouped = Object.groupBy(result , (elem)=>{
    return elem.league.name + " - " + elem.league.round;
  })
  return grouped;
}

export async function getPromisedTeamFixtures(date) {
  try {
    let fixtures = [];
    let uniqueFixtures = [];
    let teams = getCookie("prefered_teams");
    if (date !== "") {
      const result = (await getTeamFixtures(date)).data.response;
      for (let i = 0; i < teams.length; i++) {
        fixtures.push(
          result.filter(
            (res) =>
              res.teams.home.id === teams[i].id ||
              res.teams.away.id === teams[i].id
          )
        );
      }
      uniqueFixtures = [...new Set(fixtures)];
    }

    return uniqueFixtures;
  } catch (error) {
    console.log(error);
  }
}
