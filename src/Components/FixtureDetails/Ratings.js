import {React,useState,useMemo, useEffect} from "react";

export default function Ratings(props){

    const homeStatistics = props.statistics.home.sort((a,b)=>parseFloat(b.statistics[0].games.rating)-parseFloat(a.statistics[0].games.rating));
    const awayStatistics = props.statistics.away.sort((a,b)=>parseFloat(b.statistics[0].games.rating)-parseFloat(a.statistics[0].games.rating));

    console.log(homeStatistics);
    console.log(awayStatistics);
    
    //
    const homeTeam = props.teams.home;
    const awayTeam = props.teams.away;
    //
    //set division of the clicked team ( in small screens)
    const [screenWidth,setScreenWidth] = useState(0);
    const [clickedTeam,setClickedTeam] = useState(null);

    useEffect(()=>{
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
            if(screenWidth >=425){
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
        if(rating >= 0 && rating <=4.9 ) bgColor = 'bg-red-700'
        else if (rating >= 5 && rating <=6) bgColor = 'bg-red-500'
        else if(rating >=6.1 && rating <=6.5) bgColor = 'bg-orange-500'
        else if(rating >=6.6 && rating <=7.9) bgColor = 'bg-green-500'
        else if(rating >=8 &rating <=10) bgColor = 'bg-blue-500'
        return bgColor;
    }
    
    return (
      <div className="mx-auto">
        <div className="w-full p-2 mx-auto">
          <span className="border-none">Man of the match</span>
          <div className="flex flex-row justify-center items-center space-x-2 mx-auto">
            <img
              className="w-12 h-12 rounded-full"
              src={manOfTheMatch().player.photo}
              alt={manOfTheMatch().player.name}
            />
            <span className="border-none font-bold mx-2 text-slate-900">
              {manOfTheMatch().player.name}
            </span>
            <span className={`border-none w-8 h-8 font-bold text-center  mx-2 text-slate-900 ${ratingBGColor(manOfTheMatch().statistics[0].games.rating)}`}>
              {manOfTheMatch().statistics[0].games.rating}
            </span>
          </div>
        </div>
        {/*  */}
        <div className="w-full p-2">
          <table className="w-full table-auto p-1 border border-b-[0px] rounded-t-md border-slate-800 border-solid">
            <thead className="w-full">
              <tr className="flex flex-row w-full">
                <th className="flex justify-start items-center w-1/2 p-2 bg-slate-800 text-slate-50 rounded-tl-md">
                    <img alt={homeTeam.name} src={homeTeam.logo} className="w-8 h-8" onClick={()=>setClickedTeam(homeTeam.id)}/>
                    <span className="w-1/2 text-center text-slate-50 border-none align-middle py-1">
                        {homeTeam.name}
                    </span>
                </th>
                <th className="flex flex-row-reverse justify-start  items-center w-1/2 p-2 bg-slate-800 text-slate-50 rounded-tr-md">
                    <img alt={awayTeam} src={awayTeam.logo} className="w-8 h-8" onClick={()=>setClickedTeam(awayTeam.id)}/>
                    <span className="w-1/2 text-center text-slate-50 border-none align-middle">
                        {awayTeam.name}
                    </span></th>
              </tr>
            </thead>
            <tbody>
            {
                screenWidth >= 425 ? //if screen size is more than 425 display both of teams ratings,
                // otherwise displaying depends on user's selection  
                homeStatistics.map((elem, index) => {
                return (
                  <tr key={index} className="sm:flex flex-row w-full border-b-2 border-slate-500 border-solid">
                    {
                      elem.statistics[0].games.rating !== null ? 
                        <td className="flex justify-between sm:w-[50%] sm:px-3">
                            <span className="border-none">{elem.player.name}</span>
                            <span className={`border-none w-8 h-8 text-center font-bold text-md text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
                                {elem.statistics[0].games.rating}
                            </span>
                        </td>
                        : null
                    }
                    
                    {awayStatistics[index] !== undefined && awayStatistics[index].statistics[0].games.rating !== null ? 
                        <td className="flex justify-between sm:w-[50%] sm:px-3">
                            <span className="border-none">{awayStatistics[index].player.name}</span>
                            <span className={`border-none w-8 h-8 text-center font-bold text-md text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
                              {awayStatistics[index].statistics[0].games.rating}
                            </span>
                        </td>
                        : null
                    }
                  </tr>
                );
                })
            :
                <tr className="flex flex-col w-full">
                {
                    clickedTeam === homeTeam.id ?
                    homeStatistics.map((elem, index) => {
                        return (
                            elem.statistics[0].games.rating !== null ?
                            <td key={index} className="flex justify-between w-full px-3 border-b border-solid border-slate-800">
                                <span className="border-none">{elem.player.name}</span>
                                <span className={`border-none w-8 h-8 text-center font-bold text-md text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
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
                            <td key={index} className="flex justify-between w-full px-3 border-b border-solid border-slate-800">
                                <span className="border-none">{elem.player.name}</span>
                                <span className={`border-none w-8 h-8 text-center font-bold text-md text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
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