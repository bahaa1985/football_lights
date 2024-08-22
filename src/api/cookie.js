// import Cookies from "universal-cookie";
import Cookies from 'js-cookie';

export function setCookies(data,name){
    // const cookie = new Cookies();
    const jsonData = JSON.stringify(data);
    if(name==="prefered_leagues"){
    Cookies.set("prefered_leagues",jsonData,{path:'/',expires:-1});
    }
    else{
        Cookies.set("prefered_teams",jsonData,{path:'/',expires:-1});
    }
}

export function getCookies(name){
    // const cookie=new Cookies();    
    const jsonData =  Cookies.get(name);
    if(typeof(jsonData)!=='undefined'){
       const data=JSON.parse(jsonData);       
       return data;
    }
    else{
        return [];
    }
}



// new Date('9999-12-31T23:59:59.000Z')