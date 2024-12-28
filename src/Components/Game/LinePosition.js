import { NavLink } from "react-router-dom";
export default function LinePosition(props) {
    //create squad lines
    const lineup = props.lineup;
    const grid = props.grid.toString(); //position of the palyers
    const colors = props.colors; //kit colors
    const statistics=props.statistics;
  
    const sp_lineup = lineup.filter((player) => player.player.grid[0] === grid)
      .sort((playerA, playerB) =>parseInt(playerB.player.grid[2]) - parseInt(playerA.player.grid[2]));
    
      // console.log("sp_lineup:",sp_lineup);
    function getPlayerStats(playerId){
      const stats= statistics.filter(elem=>elem.player.id === playerId)
      console.log("stats",stats); 
      // if(stats[0].statistics[0].games.rating > 0 && stats[0].statistics[0].games.rating <= 4.9){
      //   return(
      //     <span  className="text-slate-50 bg-red-800 border-none">
      //       {stats[0].statistics[0].games.rating}
      //     </span>
      //   )
      // }
      // else if(stats[0].statistics[0].games.rating >= 5 && stats[0].statistics[0].games.rating <= 6.4){
      //   return(
      //     <span  className="text-slate-50 bg-orange-700 border-none">
      //       {stats[0].statistics[0].games.rating}
      //     </span>
      //   )
      // }
      // else if(stats[0].statistics[0].games.rating >= 6.5 && stats[0].statistics[0].games.rating <= 6.9){
      //   return(
      //     <span  className="text-slate-50 bg-orange-400 border-none">
      //       {stats[0].statistics[0].games.rating}
      //     </span>
      //   )
      // }
      // else if(stats[0].statistics[0].games.rating >= 7 && stats[0].statistics[0].games.rating <= 7.9){
      //   return(
      //     <span  className="text-slate-50 bg-green-600 border-none">
      //       {stats[0].statistics[0].games.rating}
      //     </span>
      //   )
      // }
      // else if(stats[0].statistics[0].games.rating >= 8 && stats[0].statistics[0].games.rating <= 10){
      //   return(
      //     <span  className="text-slate-50 bg-blue-600 border-none">
      //       {stats[0].statistics[0].games.rating}
      //     </span>
      //   )
      // }
       
      return stats;
    } 

    let playerNameArr = [];
    
    return (
      <div className="flex justify-around w-full">
        {sp_lineup?.map((elem, index) => {
          //iterate each player in the line to get his details
          playerNameArr = elem.player.name.split(" ");
          // playerNameArr.length > 1  ? (playerName = playerNameArr.slice(1)) : (playerName = playerNameArr[0]);
          return (
            <NavLink to={`/player/${elem.player.id}`} key={index} className="text-center max-w-[18%]">
              <div className="flex justify-center items-center w-8 h-8 mx-auto rounded-full" style={{backgroundColor:'#'+ colors.primary}}>
                <span className="border-none">{getPlayerStats(elem.player.id)[0].statistics[0].games.number}</span>
              </div>
              <div className="flex justify-center items-center">
                <span className={`p-1
                  ${
                    getPlayerStats(elem.player.id)[0].statistics[0].games.rating >= 0 && getPlayerStats(elem.player.id)[0].statistics[0].games.rating <= 4.9 ?
                    "bg-red-800":
                    getPlayerStats(elem.player.id)[0].statistics[0].games.rating >= 5 && getPlayerStats(elem.player.id)[0].statistics[0].games.rating <= 6.4 ?
                    "bg-orange-600":
                    getPlayerStats(elem.player.id)[0].statistics[0].games.rating >= 6.5 && getPlayerStats(elem.player.id)[0].statistics[0].games.rating <= 6.9 ?
                    "bg-orange-400":
                    getPlayerStats(elem.player.id)[0].statistics[0].games.rating >= 7 && getPlayerStats(elem.player.id)[0].statistics[0].games.rating <= 7.9 ?
                    "bg-green-600":
                    getPlayerStats(elem.player.id)[0].statistics[0].games.rating >= 8 && getPlayerStats(elem.player.id)[0].statistics[0].games.rating <= 10 ?
                    "bg-blue-700":
                    null
                  }
                   border-none
                  `}>
                  {getPlayerStats(elem.player.id)[0].statistics[0].games.rating}
                </span>
                <span className="p-1 bg-slate-300 text-slate-900 border-none">
                  {playerNameArr.length > 1
                    ? playerNameArr.slice(1)
                    : playerNameArr[0]}
                </span>
              </div>
              
            </NavLink>
          );
        })}
      </div>
    );
  }