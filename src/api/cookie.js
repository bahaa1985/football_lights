import Cookies from "universal-cookie";

export function getPreferdLeaguesFromCookie(){
    const cookie=new Cookies();    
    const leagues =  cookie.get("prefered_leagues")
    if(typeof(leagues)!=='undefined'){
       return leagues;       
    }
    else{
        return [];
    }
}

export function setPreferedLeaguesCookie(leagues){
      const cookie = new Cookies();
      cookie.set("prefered_leagues",leagues,{path:'/',expires:new Date('9999-12-31T23:59:59.000Z')});
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
}