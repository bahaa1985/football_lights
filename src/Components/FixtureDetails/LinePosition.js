import {memo} from 'react';
import { NavLink } from "react-router-dom";
 
function LinePosition(props) {
    //create squad lines
    const lineup = props.lineup;
    // console.log("lineup",lineup);
    
    const grid = props.grid.toString(); //position of the palyers
    const colors = props.colors; //kit colors
    const statistics=props.statistics;

    // console.log("statistics",statistics);
    
  
    // const sp_lineup = lineup.filter((elem) => elem.player.grid[0] === grid)
    //   .sort((playerA, playerB) =>parseInt(playerB.player.grid[2]) - parseInt(playerA.player.grid[2]));


    function getPlayerStats(playerId){
      const stats= statistics.filter(elem=>elem.player.id === playerId)
      return stats;
    } 

    let playerNameArr = [];
    
    return (
      <div className="flex flex-row h-auto my-auto">
        {lineup?.map((elem, index) => {
          //iterate each player in the line to get his details
          playerNameArr = elem.player.name.split(" ");
          return (
            <NavLink to={`/player/${elem.player.id}`} key={index} 
              className="text-center text-[12px] w-full m-auto z-10">
              <div className="flex justify-center items-center w-10 h-10 mx-auto my rounded-full" style={{backgroundColor:'#'+ colors.primary}}>
                <img className='w-10 h-10 sm:w-12 sm:h-12 rounded-full' src={getPlayerStats(elem.player.id)[0].player.photo} alt={getPlayerStats(elem.player.id)[0].player.name} />                
              </div>
              <div className='flex justify-center items-center'>
                <span className="p-1 font-bold text-slate-200 border-none">{elem.player.number}</span>
                <span className="p-1 font-bold text-slate-50 border-none">
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

  export default memo(LinePosition);