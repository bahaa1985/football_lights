import React, { useEffect, useState } from 'react';
import getNews from '../../Api/getNews.js';
import { getCookie } from '../../Api/cookie.js';
// import dotenv from 'dotenv'
// dotenv.config();
// console.log(process.env.MY_SECRET); // Output: hello123

export default function News(){
    
    
    const userLang= getCookie('language') || 'en';
    const [news,setNews]= useState([]);
    const [loading,setLoading]= useState(false);
    const [TZD,setTZD]=useState({from:'',to:''}); // set TZD dates format to use in news api

    function setDatesTZD(){
        const dd=new Date().toISOString();
        const yy=new Date(new Date()-(24*60*60*1000)).toISOString()
        setTZD({from:yy,to:dd});
    }
    console.log("tzd",TZD.from,TZD.to);
    
    useEffect(()=>{
        setDatesTZD();
        const response = getNews({tag:'football',lang:userLang,from: TZD.from,to:TZD.to})
        response.then((result)=>{
            console.log("news",result.data.articles);
        });
       
        

    },[])
    return(
        <div>

        </div>
    )
}