import React, { useState, useEffect } from "react";
import {
  groupDateFixtures,
  getPromisedTeamFixtures,
} from "../../Api/Fixtures.js";
import "react-calendar/dist/Calendar.css";
import FixtureRow from "../Tools/FixtureRow.jsx";
import { getCookie } from "../../Api/cookie.js";
import { leaguesArray } from "../Tools/Leagues.jsx";
import Tabs from "../Tools/Tabs.jsx";
import getLocalLabels from "../../Api/Localization.js";
import { getAllTranslations, getTranslation } from "../Translation/labels.js";
import { getLeagueTranslationByCountry } from "../Translation/countries.js";
import { teamsArray } from "../Tools/Teams.jsx";
import { useSearchParams } from "react-router-dom";
import Spinner from "../Tools/Spinner.jsx";

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
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [dateFixtures, setDateFixtures] = useState([]);
  const [teamsFixtures, setTeamsFixtures] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isClicked, setClicked] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [message, setMessage] = useState("");

  const leagues = leaguesArray;
  const teams = teamsArray;
  const lang = JSON.parse(localStorage.getItem("user_preferences"))?.lang || "en";

  const labels = getAllTranslations(lang);

  useEffect(() => {
    if (leagues.length > 0 && teams.length > 0 && isClicked) {
      async function fetchFixtures() {
        const date_response = await groupDateFixtures(selectedDate);
        // const teams_response = await getPromisedTeamFixtures(selectedDate);
        setDateFixtures(date_response);
        // setTeamsFixtures(teams_response);
        setLoaded(true);
        setClicked(false);
      }
      fetchFixtures();

      window.addEventListener("resize", () => {
        setDeviceWidth(window.innerWidth);
      });
      return () => {
        window.removeEventListener("resize", () => {
          setDeviceWidth(window.innerWidth);
        });
      };
    } else {
      setMessage(
        getTranslation("No Current Fixtures", lang) ||
          "No Leagues Or Teams Are Selected. Go to Preferences"
      );
    }
  }, [selectedDate, isClicked]);

  function handleSelectedTab(index) {
    setActiveTab(index);
  }

  return (
    <div className="w-full sm:w-[65%] my-2 bg-slate-50 ">
      <div className="w-full p-2 text-center text-xl font-bold lg:text-lg bg-slate-800 text-slate-50">
        {getTranslation("Fixtures", lang) || "Fixtures"}
      </div>
      {/* date picker */}
      <div className="flex justify-center gap-2 my-4">
        <span className="flex justify-center items-center border-none text-lg font-bold mx-2">{getTranslation('Select date',lang)}</span>
        <input
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          value={selectedDate}
          className="border border-slate-300 rounded px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 shadow-sm transition"
        />
        <button
          className="w-16 bg-slate-900 text-white rounded-md"
          onClick={() => setClicked(true)}
        >
          Confirm
        </button>
      </div>

      {isLoaded ? (
        <div className="w-full mx-auto rounded-lg bg-slate-50 p-2">
          <div className="w-full">
            <Tabs
              tabs={["Leagues", "Teams"]}
              activeTab={activeTab}
              onTabChange={handleSelectedTab}
            />
            <div className="w-full h-auto sm:h-96 sm:overflow-y-scroll text-center">
              {leagues.length > 0 ? (
                activeTab === 0 ? (
                  dateFixtures ? (
                    <FixtureRow
                      type={"day_matches"}
                      fixturesSource={dateFixtures}
                    />
                  ) : (
                    <div className="flex justify-center items-center">
                      {getTranslation("No Current Fixtures", lang)}
                    </div>
                  )
                ) : activeTab === 1 ? (
                  teamsFixtures.length > 0 ? (
                    <FixtureRow
                      type={"fav_teams_matches"}
                      fixturesSource={teamsFixtures}
                    />
                  ) : (
                    <div className="flex justify-center items-center">
                      {getTranslation("No Current Fixtures", lang) ||
                        "No Current Fixtures"}
                    </div>
                  )
                ) : null
              ) : (
                "No Prefered Leagues Or Teams Selected. Go To Preferences"
              )}
            </div>
          </div>
        </div>
      ) : (
        isClicked && (
          // To show animated spinner while loading fixtures:
          <Spinner />
        )
      )}
    </div>
  );
}
