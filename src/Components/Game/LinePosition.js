import { NavLink } from "react-router-dom";

export default function LinePosition(props) {
    //create squad lines
  
    const lineup = props.lineup;
    const grid = props.grid.toString(); //position of the palyers
    const colors = props.colors; //kit colors
  
    const sp_lineup = lineup.filter((player) => player.player.grid[0] === grid)
      .sort((playerA, playerB) =>parseInt(playerB.player.grid[2]) - parseInt(playerA.player.grid[2]));
    
    let playerNameArr = [],playerName = "";
    
    return (
      <>
        {sp_lineup.map((player, index) => {
          //iterate each player in the line to get his details
          playerNameArr = player.player.name.split(" ");
          playerNameArr.length > 1
            ? (playerName = playerNameArr.slice(1))
            : (playerName = playerNameArr[0]);
          return (
            <NavLink
              to={`/player/${player.player.id}`}
              key={index}
              style={{ textAlign: "center", maxWidth: "18%" }}
            >
              <div
                className="player-mark"
                style={{ backgroundColor: "#" + colors.primary }}
              >
                <span
                  className="player-rating"
                  style={{
                    backgroundColor: player.statistics[0].games.ratingColor,
                  }}
                >
                  {player.statistics[0].games.rating}
                </span>
              </div>
              <span className="player-number" style={{ color: colors.number }}>
                {player.player.number}
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