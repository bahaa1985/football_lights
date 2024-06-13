import Cookies from "universal-cookie";
import { getLeagues } from "./getLeaguesTeams";

export function getPreferdLeaguesFromCookie(){
    const cookie=new Cookies();
    let leaguesIds=[],preferedLeagues=[];
    leaguesIds =  cookie.get("prefered leagues")
    if(leaguesIds){
        for(let i=0;i<leaguesIds.length;i++){
            getLeagues(null,leaguesIds[i])
            .then(result=>{
                preferedLeagues.push(result.data.response[0]);
            })
        }
    }
    console.log("prefered leagues",preferedLeagues);
    return preferedLeagues;
}

export function setPreferedLeaguesCookie(preferedLeagues){
      const cookie = new Cookies();
      cookie.set("prefered leagues",preferedLeagues,{path:'/',expires:new Date('9999-12-31T23:59:59.000Z')});
      console.log("cookie get",cookie.get("prefered leagues"));
}

export function getTeamsCookie(){
    const cookie=new Cookies();
    let teamsIds=[]
    teamsIds =  cookie.get("prefered teams")
    return teamsIds
}

export function setTeamsCookie(preferedTeams){
      const cookie = new Cookies();
      cookie.set("prefered teams",preferedTeams,{path:'/',expires:new Date('9999-12-31T23:59:59.000Z')});
      console.log("cookie get",cookie.get("prefered teams"));
}