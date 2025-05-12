import React, { useEffect, useState } from 'react';
import getNews from '../../Api/News.js';
import { getCookie } from '../../Api/cookie.js';

export default function News(){
           
    const [news,setNews]= useState([]);
    const [loaded,setLoaded]= useState(false);
    const [TZD,setTZD]=useState({from:'',to:''}); // set TZD dates format to use in news api
    const [storyIndex,setStoryindex] = useState();

    function setDatesTZD(){
        const dd=new Date().toISOString();
        const yy=new Date(new Date()-(24*60*60*1000)).toISOString()
        setTZD({from:yy,to:dd});
    }
    
    useEffect(()=>{       
        setDatesTZD();
        const userLang= getCookie('language').lang || 'en';
        const newsTag = getCookie('language').tag || 'soccer';
        const cachedNews = sessionStorage.getItem('news');
        if (cachedNews) {
            setNews(JSON.parse(cachedNews));
            setLoaded(true);
            console.log('news from sessionStorage');
        } else {
            getNews(newsTag, userLang, TZD.from, TZD.to).then((result) => {
                setNews(result.data.articles);
                setLoaded(true);
                sessionStorage.setItem('news', JSON.stringify(result.data.articles));                
                console.log('news from API');
            });
        }         
        return()=>{

        }
    },[]);
    return(
        <div className='w-full flex flex-col sm:flex-row sm:flex-wrap mx-auto bg-slate-50 rounded-md my-2'>
            {
                news.length > 0 && loaded ? 
                    news.map((item,index)=>{
                        return (
                            <div key={index} className={`flex flex-col items-center justify-center md:w-[40%] mx-auto my text-center`}>
                                <div className='flex justify-between items-center'>
                                    <h3 className='text-sm text-gray-500'>{item.source.name}</h3>
                                    <p className='text-xs text-gray-400'>{item.publishedAt}</p>
                                </div>
                                <img className='w-[90%] md:w-[70%] h-36 rounded-md mx-auto' src={item.image} alt='' loading='lazy' />
                                <h3 className='px-2'>{item.title}</h3>
                                <button className='bg-blue-600 text-slate-50 font-bold w-16 h-8 my-2 mx-auto rounded-lg' onClick={()=>setStoryindex(index)}>Show</button>
                                {
                                    storyIndex === index ?
                                    <div className='w-full h-32 overflow-visible'>
                                        <p className='text-sm text-gray-500'>{item.description}</p>
                                        {/* <p className='text-sm text-gray-500'>{item.content}</p> */}
                                        <a href={item.url} target='_blank' rel='noopener noreferrer'>Read more</a>
                                    </div> : null
                                }
                                <hr/>
                            </div>
                        )              
                    })                
                :null
            }
        </div>
    )
}