import React from "react";
import { useState, useEffect } from "react";
import LinePosition from '../Game/LinePosition.js';
import getLineUps from "../../Api/getLineUp.js";
import getPlayers from "../../Api/getPlayers.js";
import "../../styles/lineup.css";

//main function
function LineUp(props) {
  const homeId = props.teams[0];
  const awayId = props.teams[1];
  const fixtureId = props.fixtureId;
  ///Home team details:
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeLineUp, setHomeLineUp] = useState([]);
  const [homeFormation, setHomeFormation] = useState([]);
  const [homeGkColor, setHomeGkColor] = useState([]); //kit colors
  const [homePlayerColor, setHomePlayrColor] = useState([]); //kit colors
  const [homeCoach, setHomeCoash] = useState({});
  const [homeSub, setHomeSub] = useState([]);
  /// Away team details:
  const [awayLineUp, setAwayLineUp] = useState([]);
  const [awayFormation, setAwayFormation] = useState([]);
  const [homePlayers, setHomePlayers] = useState([]);
  const [awayPlayers, setAwayPlayers] = useState([]);
  const [awayGkColor, setAwayGkColor] = useState([]); //kit colors
  const [awayPlayerColor, setAwayPlayrColor] = useState([]); //kit colors
  const [awayCoach, setAwayCoash] = useState({});
  const [awaySub, setAwaySub] = useState([]);

  let [clickedTeam, setClickedTeam] = useState(homeTeam);

  useEffect(() => {
    // call formation and line up players:
    getLineUps(fixtureId).then((result) => {
      console.log("line up:", result);
      setHomeLineUp(result.data.response[0].startXI);
      setHomeFormation(
        Array.from(result.data.response[0].formation.replaceAll("-", ""))
      );
      setHomeTeam(result.data.response[0].team.name);
      setHomeGkColor(result.data.response[0].team.colors.goalkeeper);
      setHomePlayrColor(result.data.response[0].team.colors.player);
      setHomeCoash(result.data.response[0].coach);
      setHomeSub(result.data.response[0].substitutes);
      //
      setAwayLineUp(result.data.response[1].startXI);
      setAwayFormation(
        Array.from(result.data.response[1].formation.replaceAll("-", ""))
      );
      setAwayTeam(result.data.response[1].team.name);
      setAwayCoash(result.data.response[1].coach);
      setAwaySub(result.data.response[1].substitutes);
      setAwayGkColor(result.data.response[1].team.colors.goalkeeper);
      setAwayPlayrColor(result.data.response[1].team.colors.player);
    });

    getPlayers(fixtureId).then((result) => {
      setHomePlayers(result.data.response[0].players);
      setAwayPlayers(result.data.response[1].players);
    });
  }, [homeId, awayId, fixtureId]);

  //to color the rating numbers of the home players:
  homeLineUp.forEach((player, index) => {
    homePlayers.forEach((home_player, index) => {
      if (player.player.id === home_player.player.id) {
        player.player.photo = home_player.player.photo;
        player.statistics = home_player.statistics;
        if (
          player.statistics[0].games.rating >= 0 &&
          player.statistics[0].games.rating < 5
        ) {
          player.statistics[0].games.ratingColor = "red";
        } else if (
          player.statistics[0].games.rating >= 5 &&
          player.statistics[0].games.rating < 7
        ) {
          player.statistics[0].games.ratingColor = "orange";
        } else if (
          player.statistics[0].games.rating >= 7 &&
          player.statistics[0].games.rating < 9
        ) {
          player.statistics[0].games.ratingColor = "green";
        } else if (player.statistics[0].games.rating >= 9) {
          player.statistics[0].games.ratingColor = "blue";
        }
      }
    });
  });

  //to color the rating numbers of the away players:
  awayLineUp.forEach((player, index) => {
    awayPlayers.forEach((away_player, index) => {
      if (player.player.id === away_player.player.id) {
        player.player.photo = away_player.player.photo;
        player.statistics = away_player.statistics;
        if (
          player.statistics[0].games.rating >= 0 &&
          player.statistics[0].games.rating < 5
        ) {
          player.statistics[0].games.ratingColor = "red";
        } else if (
          player.statistics[0].games.rating >= 5 &&
          player.statistics[0].games.rating < 7
        ) {
          player.statistics[0].games.ratingColor = "orange";
        } else if (
          player.statistics[0].games.rating >= 7 &&
          player.statistics[0].games.rating < 9
        ) {
          player.statistics[0].games.ratingColor = "green";
        } else if (player.statistics[0].games.rating >= 9) {
          player.statistics[0].games.ratingColor = "blue";
        }
      }
    });
  });

  let playerNameArr = [],
    playerName = "";
  return (
    <div>
      <div className="pitch">
        {/* home scoresheet */}
        <div className="home-scoresheet">
          <div className="line" key={1}>
            <LinePosition lineup={homeLineUp} grid={"1"} colors={homeGkColor} />
          </div>
          <div className="line" key={2}>
            <LinePosition
              lineup={homeLineUp}
              grid={"2"}
              colors={homePlayerColor}
            />
          </div>

          <div className="line" key={3}>
            <LinePosition
              lineup={homeLineUp}
              grid={"3"}
              colors={homePlayerColor}
            />
          </div>

          <div className="line" key={4}>
            <LinePosition
              lineup={homeLineUp}
              grid={"4"}
              colors={homePlayerColor}
            />
          </div>
          {homeFormation.length > 3 ? (
            <div className="line" key={5}>
              <LinePosition
                lineup={homeLineUp}
                grid={"5"}
                colors={homePlayerColor}
              />
            </div>
          ) : null}
        </div>

        {/* away scoresheet */}
        <div className="away-scoresheet">
          {awayFormation.length > 3 ? (
            <div className="line" key={5}>
              <LinePosition
                lineup={awayLineUp}
                grid={"5"}
                colors={awayPlayerColor}
              />
            </div>
          ) : null}
          <div className="line" key={4}>
            <LinePosition
              lineup={awayLineUp}
              grid={"4"}
              colors={awayPlayerColor}
            />
          </div>
          <div className="line" key={3}>
            <LinePosition
              lineup={awayLineUp}
              grid={"3"}
              colors={awayPlayerColor}
            />
          </div>
          <div className="line" key={2}>
            <LinePosition
              lineup={awayLineUp}
              grid={"2"}
              colors={awayPlayerColor}
            />
          </div>
          <div className="line" key={1}>
            <LinePosition lineup={awayLineUp} grid={"1"} colors={awayGkColor} />
          </div>
        </div>
      </div>

      {/* Coaches and subs section */}
      <div className="coachSubs-div">
        {
          <>
            <div>
              <button onClick={() => setClickedTeam(homeTeam)}>
                {homeTeam}
              </button>
              <button onClick={() => setClickedTeam(awayTeam)}>
                {awayTeam}
              </button>
            </div>
            {clickedTeam === homeTeam ? (
              <>
                {/* home coach and subs */}
                <div className="coach">
                  <img alt="" src={homeCoach.photo} />
                  <span>Coach: {homeCoach.name}</span>
                </div>
                <div>Formation: {homeFormation.join("-")}</div>
                <div className="substitues">
                  {homeSub.map((sub) => {
                    // eslint-disable-next-line no-lone-blocks
                    {
                      playerNameArr = sub.player.name.split(" ");
                      playerNameArr.length > 1
                        ? (playerName = playerNameArr.slice(1))
                        : (playerName = playerNameArr[0]);
                    }
                    return (
                      <div>
                        <span className="player-number">
                          {sub.player.number}
                        </span>
                        <span className="player-name">
                          {playerNameArr.length > 1
                            ? playerNameArr.slice(1)
                            : playerNameArr[0]}
                        </span>
                        <span>{sub.player.pos}</span>
                        <span>{}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {/* away coach and subs */}
                <div className="coach">
                  <img alt="" src={awayCoach.photo} />
                  <span>Coach: {awayCoach.name}</span>
                </div>
                <div>Formation: {awayFormation.join("-")}</div>
                <div className="substitues">
                  {awaySub.map((sub) => {
                    playerNameArr = sub.player.name.split(" ");
                    playerNameArr.length > 1
                      ? (playerName = playerNameArr.slice(1))
                      : (playerName = playerNameArr[0]);

                    return (
                      <div>
                        <span className="player-number">
                          {sub.player.number}
                        </span>
                        <span className="player-name">
                          {
                            // playerNameArr.length> 1 ?
                            // playerNameArr.slice(1) :
                            // playerNameArr[0]
                            playerName
                            // sub.player.id
                          }
                        </span>
                        <span>{sub.player.pos}</span>
                        <span>
                          {
                            //event:
                          }
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        }
      </div>
    </div>
  );
}

export default LineUp;
