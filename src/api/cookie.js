// import Cookies from "universal-cookie";
import Cookies from 'js-cookie';
import  getLeagues  from './getLeaguesTeams.js';

export function setCookies(data,name){
    // const cookie = new Cookies();
    const jsonData = JSON.stringify(data);
    console.log("jsonData: ",jsonData);
    
    if(name==="prefered_leagues"){
    Cookies.set("prefered_leagues",jsonData,{expires:365 * 100});
    console.log("new cookie: ",getCookies("prefered_leagues"));
    
    }
    else{
        Cookies.set("prefered_teams",jsonData,{expires:365 * 100});
    }
}

export function getCookies(name){

    const jsonData =  Cookies.get(name);
    if(jsonData){
       const data=JSON.parse(jsonData);
             
       return data;
    }
    else{
        return [];
    }
}



// new Date('9999-12-31T23:59:59.000Z')