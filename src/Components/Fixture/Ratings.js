import {React,useState, useEffect} from "react";
import {faStar} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Ratings(props){

    const homeStatistics = props.statistics.home.filter((elem)=>elem.statistics[0].games.rating !==null).sort((a,b)=>parseFloat(b.statistics[0].games.rating)-parseFloat(a.statistics[0].games.rating));
    const awayStatistics = props.statistics.away.filter((elem)=>elem.statistics[0].games.rating !==null).sort((a,b)=>parseFloat(b.statistics[0].games.rating)-parseFloat(a.statistics[0].games.rating));

    // console.log(homeStatistics);
    // console.log(awayStatistics);
    
    //
    const homeTeam = props.teams.home;
    const awayTeam = props.teams.away;
    //
    //set division of the clicked team ( in small screens)
    console.log("homeTeam",homeTeam.id);
    
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
    
    return (
      <div className="mx-auto my-2">
        {/* man of the match */}
        <div className="flex flex-col justify-center items-center 
              w-full p-2 mx-auto rounded-md bg-slate-800 text-slate-50">
          <span className="border-none text-sm sm:text-md">Man of the match</span>
          <div className="flex flex-row justify-center items-center space-x-2 mx-auto">         
            <img className="w-12 h-12 rounded-full" src={manOfTheMatch().player.photo} alt={manOfTheMatch().player.name}/>
            <span className="border-none font-bold mx-2 text-slate-50 text-sm sm:text-md">
              {manOfTheMatch().player.name}
            </span>
            <span className={`border-none w-8 h-8 sm:w-10 sm:h-10 font-bold text-center 
              flex items-center justify-center mx-2 text-slate-50 ${ratingBGColor(manOfTheMatch().statistics[0].games.rating)}`}>
              {manOfTheMatch().statistics[0].games.rating}
            </span>
          </div>
        </div>
        
        <div className="">
          <table className="w-full mx-auto table-auto p-1 rounded-lg ">
            {/* teams header */}
            <thead className="w-full flex flex-row ">
              <tr className="flex flex-row justify-between w-full divide-x-2">
                <th className={`flex justify-start items-center p-1 w-[90%] rounded-lg my-2 cursor-pointer
                     ${clickedTeam === homeTeam.id ? 'bg-slate-800': 'bg-slate-400'}`}
                   onClick={()=>setClickedTeam(homeTeam.id)} >
                    <img alt={homeTeam.name} src={homeTeam.logo} className="size-8"/>
                    <span className="text-center text-slate-50 border-none py-1 text-sm">
                        {homeTeam.name}
                    </span>
                </th>
                <th className={`flex flex-row-reverse  items-center p-1 w-[90%] rounded-lg my-2 cursor-pointer
                   ${clickedTeam === awayTeam.id ? 'bg-slate-800': 'bg-slate-400'}`}
                   onClick={()=>setClickedTeam(awayTeam.id)} >
                    <img alt={awayTeam} src={awayTeam.logo} className="size-8"/>
                    <span className="text-center text-slate-50 border-none py-1 text-sm">
                        {awayTeam.name}
                    </span>
                </th>
              </tr>
            </thead>
            {/* players ratings */}
            <tbody className="border-b-[0px] border-slate-800 border-solid">
            {
                // screenWidth >= 500 ? //if screen size is more than 425, display both of teams ratings,
                // // otherwise displaying depends on user's selection  
                // homeStatistics.map((elem, index) => {
                // return (
                  
                //   <tr key={index} className="sm:flex flex-row w-full border-b border-slate-500 border-solid">
                //     {
                //       elem.statistics[0].games.rating !== null ? 
                //         <td className="flex justify-between sm:w-[50%] sm:px-3">
                //             <span className="border-none">{elem.player.name}</span>
                //             <span className={`flex justify-center items-center border-none w-8 h-8 font-bold text-md text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
                //                 {elem.statistics[0].games.rating}
                //             </span>
                //         </td>
                //         : null
                //     }
                    
                //     {
                //       awayStatistics[index] !== undefined && awayStatistics[index].statistics[0].games.rating !== null ? 
                //         <td className="flex justify-between sm:w-[50%] sm:px-3">
                //             <span className="border-none">{awayStatistics[index].player.name}</span>
                //             <span className={`flex justify-center items-center border-none w-8 h-8 font-bold text-md text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
                //               {awayStatistics[index].statistics[0].games.rating}
                //             </span>
                //         </td>
                //         : null
                //     }
                //   </tr>
                // );
                // })
                // :
                <tr className="flex flex-col w-full">
                {
                    clickedTeam === homeTeam.id ?
                    homeStatistics.map((elem, index) => {
                        return (
                            elem.statistics[0].games.rating !== null ?
                            <td key={index} className="flex justify-between items-center w-full px-3 border-b border-solid border-slate-800">
                                <span className="border-none text-sm">{elem.player.name}</span>
                                <span className={`border-none size-6 flex items-center justify-center font-bold text-sm text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
                                    {elem.statistics[0].games.rating}
                                </span>
                            </td>
                            :null
                            )
                    })
                    :
                    awayStatistics.map((elem, index) => {
                        return (
                            elem.statistics[0].games.rating !== null ?
                            <td key={index} className="flex justify-between items-center w-full px-3 border-b border-solid border-slate-800">
                                <span className="border-none text-sm">{elem.player.name}</span>
                                <span className={`border-none size-6 text-center font-bold text-md text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
                                    {elem.statistics[0].games.rating}
                                </span>
                            </td>
                            :null
                        )
                    })
                }
                </tr>
            }
            </tbody>
          </table>
        </div>
      </div>
    );
}         