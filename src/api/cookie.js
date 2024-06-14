import Cookies from "universal-cookie";

export function getPreferdLeaguesFromCookie(){
    const cookie=new Cookies();    
    const leaguesIds =  cookie.get("prefered leagues")
    if(typeof(leaguesIds)!=='undefined'){
        console.log("prefered leagues cookie",leaguesIds);
       return leaguesIds;       
    }
    else{
        return [];
    }
}

export function setPreferedLeaguesCookie(leaguesIds){
      const cookie = new Cookies();
      cookie.set("prefered leagues",leaguesIds,{path:'/',expires:new Date('9999-12-31T23:59:59.000Z')});
      console.log("cookie get",cookie.get("prefered league"));
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