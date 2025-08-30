import React, { useState, useEffect } from "react";
import { groupDateFixtures } from "../../api/Fixtures.js";
import "react-calendar/dist/Calendar.css";
import FixtureRow from "../../Components/FixtureRow.jsx";
import { leaguesArray } from "../../Components/Leagues.jsx";
import Tabs from "../../Components/Tabs.jsx";
import { getTranslation } from "../../Translation/labels.js";
import { teamsArray } from "../../Components/Teams.jsx";
import Spinner from "../../Components/Spinner.jsx";
import { useSelector, useDispatch } from "react-redux";
import {
  requestsIncrement,
  resetRequests,
} from "../../ReduxStore/counterSlice.js";

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
  const [activeTab, setActiveTab] = useState(0);
  const [isClicked, setClicked] = useState(false);
  const [message, setMessage] = useState("");

  const requests_count = useSelector((state) => state.counter.requestsCount);
  const dispatch = useDispatch();

  const leagues = leaguesArray;
  const teams = teamsArray;
  const lang =
    JSON.parse(localStorage.getItem("user_preferences"))?.lang || "en";

  useEffect(() => {
    let intervalId;
    let isMounted = true; // Track if the component is still mounted

    async function fetchFixtures() {
      try {
        if (selectedDate === new Date().toDateString()) {
          const cached_fixtures = JSON.parse(
            localStorage.getItem("cached_fixtures")
          );
          if (cached_fixtures) {
            setDateFixtures(
              JSON.parse(localStorage.getItem("cached_fixtures"))
            );
          } else {
            const fixtures_response = await groupDateFixtures(selectedDate);
            if (isMounted) {
              setDateFixtures(fixtures_response);
              setLoaded(true);
              setClicked(false);
              console.log("Fixtures fetched!");
              //redux reducer increase requests count by one:
              dispatch(requestsIncrement());
              //set cached fixtures:
              localStorage.setItem("cached_fixtures", fixtures_response);
            }
          }
        } else {
          const fixtures_response = await groupDateFixtures(selectedDate);
          if (isMounted) {
            setDateFixtures(fixtures_response);
            setLoaded(true);
            setClicked(false);
            console.log("Fixtures fetched!");
            //redux reducer increase requests count by one:
            dispatch(requestsIncrement());
          }
        }
      } catch (error) {
        alert("Error fetching fixtures:", error);
      }
    }

    //fetch data from api if the confirm button is clicked:
    if (leagues.length > 0 && teams.length > 0 && isClicked) {
      if (requests_count < 6) {
        fetchFixtures();
      } else {
        alert(
          "API request limit reached. Please wait a minute before making more requests."
        );
      }
    } else {
      setMessage(
        getTranslation("No Current Fixtures", lang) ||
          "No Leagues Or Teams Are Selected. Go to Preferences"
      );
    }

    // Check for live fixtures and set up interval if needed
    function hasLiveFixtures(fixtures) {
      if (isLoaded) {
        return Object.values(fixtures)?.some((league) =>
          league.some((elem) =>
            ["1H", "2H", "ET", "BT", "P", "SUSP", "INT"].includes(
              elem.fixture.status.short
            )
          )
        );
      }
      return false;
    }

    if (requests_count < 10) {
      if (hasLiveFixtures(dateFixtures)) {
        intervalId = setInterval(fetchFixtures, 1000 * 60);
        console.log("Live game detected, polling every minute.");
      }
    }

    //reset api requests to zero
    dispatch(resetRequests());

    // Cleanup function to clear interval and prevent state updates on unmounted component
    return () => {
      clearInterval(intervalId);

      isMounted = false; // Mark the component as unmounted
    };
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
        <span className="flex justify-center items-center border-none text-lg font-bold mx-2">
          {getTranslation("Select date", lang)}
        </span>
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
          {getTranslation("Confirm", lang)}
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
