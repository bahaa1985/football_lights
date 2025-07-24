import React, { useEffect, useState } from 'react';
import getNews from '../../Api/News.js';
import { getCookie } from '../../Api/cookie.js';
import { getTranslation } from '../Translation/labels.js';

export default function News(){
           
    const [news,setNews]= useState([]);
    const [loaded,setLoaded]= useState(false);
    const [TZD,setTZD]=useState({from:'',to:''}); // set TZD dates format to use in news api
    const [storyIndex,setStoryindex] = useState();
    const [isClicked,setClicked] = useState(false);
    const lang= JSON.parse(localStorage.getItem("language"))?.lang || 'en';
    const newsTag = JSON.parse(localStorage.getItem('language'))?.tag || 'soccer';

    function setDatesTZD(){
        const dd=new Date().toISOString();
        const yy=new Date(new Date()-(24*60*60*1000)).toISOString()
        setTZD({from:yy,to:dd});
    }
    
    useEffect(()=>{       
        setDatesTZD();
        
        const cachedNews = sessionStorage.getItem('news');
        if (cachedNews) {
            setNews(JSON.parse(cachedNews));
            setLoaded(true);
            console.log('news from sessionStorage');
        } else 
            {
            getNews(newsTag, lang, TZD.from, TZD.to).then((result) => {
                setNews(result.data.articles);
                setLoaded(true);
                sessionStorage.setItem('news', JSON.stringify(result.data.articles));                
                console.log('news from API');
            });
        }         
        return()=>{

        }
    },[]);
    return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mx-auto bg-slate-50 rounded-lg my-2 p-4">

        {
            news.length > 0 && loaded ? 
                news.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-between w-full sm:w-[80%] sm:gap-2 mx-auto bg-white rounded-lg shadow p-2 text-center"
                    >
                        <div className="flex justify-between items-center w-full mb-2">
                            <h3 className="text-sm text-gray-500">{item.source.name}</h3>
                            <p className="text-xs text-gray-400">{new Date(item.publishedAt).toDateString()}</p>
                        </div>
                        <img
                            className="w-full sm:w-[80%] h-48 rounded-md mb-2"
                            src={item.image}
                            alt=""
                            loading="lazy"
                        />
                        <h3 className="px-2 font-semibold">{item.title}</h3>
                        <button
                            className="bg-blue-600 text-slate-50 font-bold w-16 h-8 my-2 mx-auto rounded-lg"
                            onClick={() => [setStoryindex(index),setClicked(!isClicked)]}
                        >
                            {getTranslation('Show', lang) || 'Show'}
                        </button>
                        {storyIndex === index && isClicked ? (
                            <div className="w-full h-32 overflow-visible">
                                <p className="text-sm text-gray-500">{item.description}</p>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {getTranslation('Read More', lang) || 'Read More'}
                                </a>
                            </div>
                        ) : null}
                    </div>
                ))
            : null
        }
    </div>
)
}