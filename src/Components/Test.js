import React, { useState, useEffect, useRef } from "react";
import Cookies from "universal-cookie";

export default function Test(){

    const [anyInput,setAnyInput]=useState("");
    const [result,setRersult]=useState([]);

    function storeCookie() {
        const cookie = new Cookies();
        cookie.set("myCookie",[{'id':34},{'id':56},{'id':678}],{path:'/'});
        console.log("Cookie is stored!");
    }

    function readCookie(){
        const cookie = new Cookies();
        const data= cookie.get("myCookie");
        console.log("data",data);
        if(data){

            setRersult(data);
        }
        
    }
    
    return(
        <div>
            <input type="text" onChange={(e)=>setAnyInput(e.target.value)}/>
            <button onClick={()=>storeCookie()}>Store Cookie</button>
            <button onClick={()=>readCookie()}>Read Cookie</button>
            <div>{result.map((val)=>{
               return(<p>{val.id}</p>)
            })}</div>
        </div>
    )
}