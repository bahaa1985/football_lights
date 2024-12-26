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
      
      return stats;
    } 

    let playerNameArr = [];
    
    return (
      <>
        {sp_lineup?.map((elem, index) => {
          //iterate each player in the line to get his details
          playerNameArr = elem.player.name.split(" ");
          // playerNameArr.length > 1  ? (playerName = playerNameArr.slice(1)) : (playerName = playerNameArr[0]);
          return (
            <NavLink
              to={`/player/${elem.player.id}`}
              key={index}
              style={{ textAlign: "center", maxWidth: "18%" }}
            >
              <div className="player-mark" style={{ backgroundColor: "#" + colors.primary }}>
                <span  className="player-rating">
                  {getPlayerStats(elem.player.id)[0].statistics[0].games.rating}
                </span>
              </div>
              <span className="player-number" style={{ color: colors.number }}>
                {getPlayerStats(elem.player.id)[0].statistics[0].games.number}
              </span>
              <span className="player-name">
                {playerNameArr.length > 1
                  ? playerNameArr.slice(1)
                  : playerNameArr[0]}
              </span>
            </NavLink>
          );
        })}
      </>
    );
  }