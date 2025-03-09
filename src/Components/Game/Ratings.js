import {React,useState,useMemo} from "react";

export default function Ratings(props){

    const homeStatistics = props.statistics[0].sort((a,b)=>parseFloat(b.statistics[0].games.rating)-parseFloat(a.statistics[0].games.rating));
    const awayStatistics = props.statistics[1].sort((a,b)=>parseFloat(b.statistics[0].games.rating)-parseFloat(a.statistics[0].games.rating));
    //
    const teams = props.teams;
    //
    // console.log("home",homeStatistics);
    // console.log("away",awayStatistics);
    const statsLength= homeStatistics.lenght >= awayStatistics.length ? homeStatistics.length : awayStatistics.length;

    function manOfTheMatch(){
        const topHomePlayer = homeStatistics[0];
        const topAwayPlayer = awayStatistics[0];
        if(parseFloat(topHomePlayer.statistics[0].games.rating) >= parseFloat(topAwayPlayer.statistics[0].games.rating)){
            console.log(topHomePlayer);return topHomePlayer;
        }
        else{
            console.log(topAwayPlayer); return topAwayPlayer;
        }
    }

    // function combineAllStats(){
    //     let allStats=[];
    //     for(let i = 0 ; i<statsLength; i++){
    //         allStats.push({
    //             homeStatistics[i] !== undefined ?
    //             home: homeStatistics[i],
    //             away: awayStatistics[i]
    //         });
    //     }
    // }

    return(
        <div>
            <div>
                <span>Man of the match</span>
                <div>
                    <img className="w-10 h-1- rounded-full" src={manOfTheMatch().player.photo}  alt={manOfTheMatch().player.name}/>
                    <span className="border-none font-bold w-1/2 mx-2 text-slate-900">
                        {manOfTheMatch().player.name}
                    </span>
                    <span className="border-none font-bold w-1/2 mx-2 text-slate-900">
                        {manOfTheMatch().statistics[0].games.rating}
                    </span>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>{teams.homeTeam}</td>
                            <td>{teams.awayTeam}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            homeStatistics.map((elem,index)=>{
                              return(
                                <tr>
                                    <td>
                                        {
                                            elem.statistics[0].games.rating !== null ?
                                                [<span>{elem.player.name}</span>,
                                                <span>{elem.statistics[0].games.rating}</span>]
                                            :null
                                        }
                                    </td>
                                    <td>
                                        {
                                            awayStatistics[index] !== undefined && awayStatistics[index].statistics[0].games.rating !== null ?
                                                [<span>{awayStatistics[index].player.name}</span>,
                                                <span>{awayStatistics[index].statistics[0].games.rating}</span>]
                                            : null
                                        }
                                    </td>
                                </tr>
                              )  
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}         