import axios from 'axios';
import { getCookie } from './cookie.js';



function getNews(tag,country,lang,from,to){
    const encodedQuery = encodeURIComponent(tag);
    console.log(encodedQuery);
    
    let config ={
        url:`https://gnews.io/api/v4/search?q=${tag}&country=${country}&lang=${lang}&from=${from}&to=${to}&max=10&apikey=${process.env.REACT_APP_NEWS_API_KEY}`,
        
    }
    return axios(config);
}

export default getNews;