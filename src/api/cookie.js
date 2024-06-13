import Cookies from "universal-cookie";

export function getLeaguesCookie(){
    const cookie=new Cookies();
    const leaguesIds =  cookie.get("prefered leagues")
    return leaguesIds
}

export function setLeaguesCookie(preferedLeagues){
      const cookie = new Cookies();
      cookie.set("prefered leagues",preferedLeagues,{path:'/',expires:new Date('9999-12-31T23:59:59.000Z')});
      console.log("cookie get",cookie.get("prefered leagues"));
}

export function getTeamsCookie(){
    const cookie=new Cookies();
    const leaguesIds =  cookie.get("prefered teams")
    return leaguesIds
}

export function setTeamsCookie(preferedTeams){
      const cookie = new Cookies();
      cookie.set("prefered teams",preferedTeams,{path:'/',expires:new Date('9999-12-31T23:59:59.000Z')});
      console.log("cookie get",cookie.get("prefered teams"));
}