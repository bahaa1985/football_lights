import axios from 'axios';
import { getCookie } from './cookie.js';



function getNews(tag,lang,from,to){
    let config ={
        url:`https://gnews.io/api/v4/search?q=${tag}&lang=${lang}&from=${from}&to=${to}&max=10&apikey=${process.env.REACT_APP_NEWS_API_KEY}`,
        
    }
    return axios(config);
}

export default getNews;