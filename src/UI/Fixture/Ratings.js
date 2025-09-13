import {React,useState, useEffect} from "react";
import { getTranslation } from "../../Translation/labels.js";
import { getTeamByName } from "../../Translation/teams.js";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Ratings(props){

    const homeStatistics = props.statistics.home.filter((elem)=>elem.statistics[0].games.rating !==null).sort((a,b)=>parseFloat(b.statistics[0].games.rating)-parseFloat(a.statistics[0].games.rating));
    const awayStatistics = props.statistics.away.filter((elem)=>elem.statistics[0].games.rating !==null).sort((a,b)=>parseFloat(b.statistics[0].games.rating)-parseFloat(a.statistics[0].games.rating));
    //
    const homeTeam = props.teams.home;
    const awayTeam = props.teams.away;
    //
    //set division of the clicked team ( in small screens)
    // console.log("homeTeam",homeTeam.id);
    
    const [screenWidth,setScreenWidth] = useState(0);
    const [clickedTeam,setClickedTeam] = useState(homeTeam.id);

    useEffect(()=>{
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
            if(screenWidth >=500){
                setClickedTeam(null);
            }
            else{
                setClickedTeam(homeTeam.id);
            }
        };
    
        window.addEventListener("resize", handleResize);
        
        // Cleanup function to remove event listener when component unmounts
        return () => window.removeEventListener("resize", handleResize);
    })
    //

    function manOfTheMatch(){
        const topHomePlayer = homeStatistics[0];
        const topAwayPlayer = awayStatistics[0];
        if(parseFloat(topHomePlayer.statistics[0].games.rating) >= parseFloat(topAwayPlayer.statistics[0].games.rating)){
            return topHomePlayer;
        }
        else{
            return topAwayPlayer;
        }
    }

    function ratingBGColor(value){
        let rating = parseFloat(value);
        let bgColor ='';
        if(rating >= 0 && rating <5 ) bgColor = 'bg-red-700'
        else if (rating >= 5 && rating <6) bgColor = 'bg-orange-500'
        else if(rating >=6 && rating <6.5) bgColor = 'bg-yellow-500'
        else if(rating >=6.5 && rating <8) bgColor = 'bg-green-500'
        else if(rating >=8 &rating <=10) bgColor = 'bg-blue-500'
        return bgColor;
    }
    
    const lang = JSON.parse(localStorage.getItem('user_preferences'))?.lang || 'en'; 
    
    return (
      <div className="mx-auto my-2">
        {/* man of the match */}
        <div className="flex flex-col justify-center items-center 
              w-full p-2 mx-auto rounded-md bg-slate-800 text-slate-50">
          <span className="border-none text-sm sm:text-lg">{getTranslation('Man Of The Match',lang)}</span>
          <div className="flex flex-row justify-center items-center gap-2 mx-auto">         
            <img className="w-12 h-12 rounded-full" referrerPolicy="no-referrer" src={manOfTheMatch().player.photo} alt={manOfTheMatch().player.name}/>
            <span className="border-none font-bold mx-2 text-slate-50 text-sm sm:text-lg">
              <NavLink to={`/players/${manOfTheMatch().player.id}`}>
                {manOfTheMatch().player.name}
              </NavLink>              
            </span>
            <span className={`border-none w-8 h-8 sm:w-10 sm:h-10 font-bold text-center 
              flex items-center justify-center mx-2 text-slate-50 text-lg ${ratingBGColor(manOfTheMatch().statistics[0].games.rating)}`}>
              {manOfTheMatch().statistics[0].games.rating}
            </span>
          </div>
        </div>
        
        <div>
          <table className="w-full mx-auto table-auto p-1 rounded-lg ">
            {/* teams header */}
            <thead className="w-full flex flex-row ">
              <tr className="flex flex-row justify-between w-full divide-x-2">
                <th className={`flex justify-start items-center p-1 w-[90%] rounded-lg my-2 cursor-pointer
                     ${clickedTeam === homeTeam.id ? 'bg-slate-800': 'bg-slate-400'}`}
                   onClick={()=>setClickedTeam(homeTeam.id)} >
                    <img alt={homeTeam.name} src={homeTeam.logo} referrerPolicy="no-referrer" className="size-8"/>
                    <span className="text-center text-slate-50 border-none py-1 text-sm sm:text-lg">
                        {lang === 'ar' ? getTeamByName(homeTeam.name):homeTeam.name}
                    </span>
                </th>
                <th className={`flex flex-row-reverse  items-center p-1 w-[90%] rounded-lg my-2 cursor-pointer
                   ${clickedTeam === awayTeam.id ? 'bg-slate-800': 'bg-slate-400'}`}
                   onClick={()=>setClickedTeam(awayTeam.id)} >
                    <img alt={awayTeam} src={awayTeam.logo} referrerPolicy="no-referrer" className="size-8"/>
                    <span className="text-center text-slate-50 border-none py-1 text-sm sm:text-lg">
                        {lang === 'ar' ? getTeamByName(awayTeam.name):awayTeam.name}
                    </span>
                </th>
              </tr>
            </thead>
            {/* players ratings */}
            <tbody className="border-b-[0px] border-slate-800 border-solid">
            {              
                <tr className="flex flex-col w-full">
                {
                    clickedTeam === homeTeam.id ?
                    homeStatistics.length>0 ?
                    homeStatistics.map((elem, index) => {
                        return (
                            elem.statistics[0].games.rating !== null ?
                            <td key={index} className="flex justify-between items-center w-full px-3 border-b border-solid border-slate-800">
                                <NavLink to={`/players/${elem.player.id}`}>
                                    <span className="border-none text-sm sm:text-lg">{elem.player.name}</span>
                                </NavLink>                                
                                <span className={`border-none size-8 flex items-center justify-center font-bold text-sm sm:text-lg text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
                                    {elem.statistics[0].games.rating}
                                </span>
                            </td>
                            :null
                            )
                    }):'No available data'
                    :
                    awayStatistics.length>0 ?
                    awayStatistics.map((elem, index) => {
                        return (
                            elem.statistics[0].games.rating !== null ?
                            <td key={index} className="flex justify-between items-center w-full px-3 border-b border-solid border-slate-800">
                                <span className="border-none text-sm sm:text-lg">{elem.player.name}</span>
                                <span className={`border-none size-8 flex items-center justify-center font-bold text-sm sm:text-lg text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
                                    {elem.statistics[0].games.rating}
                                </span>
                            </td>
                            :null
                        )
                    }):'No available data'
                }
                </tr>
            }
            </tbody>
          </table>
        </div>
      </div>
    );
}         