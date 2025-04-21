import React, { useState, useEffect } from "react";
import {
  groupDateFixtures,
  getPromisedTeamFixtures,
} from "../../Api/getFixtures.js";
import "react-calendar/dist/Calendar.css";
import FixtureRow from "../Tools/FixtureRow.jsx";
import { getCookie } from "../../Api/cookie.js";

export default function DayFixtures() {
  function getCurrentDate() {
    const day =
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate();
    const month =
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const currentDate =
      year.toString() + "-" + month.toString() + "-" + day.toString();
    return currentDate;
  }

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [dateFixtures, setDateFixtures] = useState([]);
  const [teamsFixtures, setTeamsFixtures] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [selectedTab,setSelectedTab] = useState(0);

  const leagues = getCookie("prefered_leagues");
  const teams = getCookie("prefered_teams");

  useEffect(() => {
    async function fetchFixtures() {
      const date_response = await groupDateFixtures(selectedDate);
      const teams_response = await getPromisedTeamFixtures(selectedDate);
      setDateFixtures(date_response);
      setTeamsFixtures(teams_response);
      setLoaded(true);
    }
    fetchFixtures();

    console.log("ty", dateFixtures);
  }, [selectedDate]);

  return (
    <div className="w-full lg:w-[48%] mx-auto">
      {isLoaded ? (
        ((
          <div className="absolute hidden left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10">
            Loading ....
          </div>
        ),
        (
          <div className="w-full sm:w-[90%] mx-auto rounded-md bg-slate-50 p-2">
            {/* date picker */}
            <div>
              <input
                type="date"
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              />
            </div>

            
            <div className="w-full">
                <div className="w-full flex  flex-row justify-center">
                    {/* favourite champions fixtures tab */}
                    <div className="w-[50%] bg-slate-200" onClick={()=>setSelectedTab(0)}>
                        {
                            <div className="p-2 bg-slate-800 text-slate-50">
                            Favourite Leagues
                            </div>
                        }
                    </div>
                    {/* favourite teams fixtures tab */}
                    <div className="w-[50%] bg-slate-200" onClick={()=>setSelectedTab(1)}>
                        {
                            <div className="p-2 bg-slate-800 text-slate-50">
                            Favourite Teams
                            </div>
                        }
                    </div>
                </div>
                
              {/* fixtures */}
                <div>
                    {
                        selectedTab === 0 ? 
                            dateFixtures ? 
                                <FixtureRow  type={"day_matches"}  fixturesSource={dateFixtures} />
                                : 
                                <div className="flex justify-center items-center">
                                    No current games
                                </div>
                        :
                        selectedTab === 1 ?
                            teamsFixtures ? 
                                <FixtureRow type={"fav_teams_matches"} fixturesSource={teamsFixtures}    />
                                : 
                                <div className="flex justify-center items-center">
                                No current fixtures
                                </div>  
                            :null
                    }
                </div>
            </div>
          </div>
        ))
      ) : (
        <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-10">
          Loading ....
        </div>
      )}
    </div>
  );
}
