// import Cookies from "universal-cookie";
import Cookies from 'js-cookie';

export function setCookie(name,data){
    // const cookie = new Cookies();
    const jsonData = JSON.stringify(data);
    console.log("jsonData: ",jsonData);
    
    Cookies.set(name,jsonData,{expires:new Date(2099,11,31),path:'/'});
    console.log("new cookie: ",getCookie("prefered_leagues")); 
}

export function getCookie(name){

    const jsonData =  Cookies.get(name);
    if(jsonData){
        const data=JSON.parse(jsonData);
        // console.log("cookies",data);
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