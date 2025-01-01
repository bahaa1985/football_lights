import { useState } from "react";
import Standings from "./Standing.js";
import LeagueFixtures from "./LeagueFixtures.js";
import TopPlayers from "./TopPlayers.js";
import { useParams } from "react-router-dom";

export default function League() {
  const leagueId = parseInt(useParams().leagueId);
  const season = parseInt(useParams().season);
  // console.log("league:",leagueId);console.log("season:",season);

  let [tab, setTab] = useState("Fixtures");

  return (
    <div>
      <div className="relative top-20 left-[50%] -translate-x-[50%] w-[90%]">
        <div className="flex justify-start space-x-8 w-96 my-2">
          <button
            className="p-2 w-20 h-10 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-500"
            onClick={() => setTab("Fixtures")}
          >
            Fixtures
          </button>
          <button
            className="p-2 w-20 h-10 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-500"
            onClick={() => setTab("Standing")}
          >
            Standing
          </button>
          <button
            className="p-2 w-20 h-10 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-500"
            onClick={() => setTab("Scorers")}
          >
            Scorers
          </button>
          <button
            className="p-2 w-20 h-10 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-500"
            onClick={() => setTab("Assisters")}
          >
            Assisters
          </button>
        </div>
        {tab === "Fixtures" ? (
          <LeagueFixtures league={leagueId} season={season} />
        ) : tab === "Standing" ? (
          <Standings league={leagueId} season={season} />
        ) : tab === "Scorers" ? (
          <TopPlayers league={leagueId} season={season} type={"goals"} />
        ) : tab === "Assisters" ? (
          <TopPlayers league={leagueId} season={season} type={"assists"} />
        ) : null}
      </div>
    </div>
  );
}
