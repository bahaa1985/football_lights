// import Cookies from "universal-cookie";
import Cookies from 'js-cookie';

export function setCookie(name,data){
    // const cookie = new Cookies();
    const jsonData = JSON.stringify(data);
    console.log("jsonData: ",jsonData);
    
    // if(name==="prefered_leagues"){
    Cookies.set(name,jsonData,{expires:365 * 100});
    console.log("new cookie: ",getCookie("prefered_leagues")); 
    // }
    // else{
        // Cookies.set("prefered_teams",jsonData,{expires:365 * 100});
    // }
}

export function getCookie(name){

    const jsonData =  Cookies.get(name);
    if(jsonData){
        const data=JSON.parse(jsonData);
        console.log("cookies",data);
        return data;
    }
    else{
        return [];
    }
}

export function removeCookie(name){
    try{
        Cookies.remove(name);
    }
    catch{
        
    }
}



// new Date('9999-12-31T23:59:59.000Z')