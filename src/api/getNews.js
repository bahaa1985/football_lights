import axios from 'axios';
import { getCookie } from './cookie.js';



function getNews(params){
    console.log("key",process.env.REACT_APP_NEWS_API_KEY);
    const lang= getCookie('language') || 'en';
    let config ={
        url:`https://gnews.io/api/v4/search?q=${params.tag}&lang=${lang}&from=${params.from}&to=${params.to}&max=10&apikey=${process.env.REACT_APP_NEWS_API_KEY}`,
        
    }
    return axios(config);
}

export default getNews;