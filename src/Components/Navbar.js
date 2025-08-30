import { NavLink } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import logo from '../../src/images/logo.jpg';
import Search from "../UI/Home/Search.jsx";
import Preferences from "../UI/Preference/PreferenceContainer.js";
import { getTranslation } from "../Translation/labels.js";
import Leagues from "./Leagues.jsx";
import Teams from "./Teams.jsx";

function Navbar() {
  const hamburger_button = useRef(null);
  const hamburger_items = useRef(null);

  const lang = JSON.parse(localStorage.getItem("user_preferences"))?.lang || "en";

  const [searchWindow, setSearchWindow] = useState(false);
  const [preferenceWindow, setPreferenceWindow] = useState(false);
  const [leaguesBar, setLeaguesBar] = useState(false);
  const [teamsBar, setTeamsBar] = useState(false);
  const [leaguesBarMini, setLeaguesBarMini] = useState(false); //for mobile view
  const [teamsBarMini, setTeamsBarMini] = useState(false); //for mobile view

  useEffect(() => {
    const button = hamburger_button.current;
    button.addEventListener("click", handleHamburgerClick);
    return () => {
      button.removeEventListener("click", handleHamburgerClick);
    };
  }, []);

  function handleHamburgerClick() {
    hamburger_items.current.classList.toggle("h-0");
    hamburger_items.current.classList.toggle("h-auto");
    hamburger_button.current.children[0].classList.toggle("hidden");
    hamburger_button.current.children[1].classList.toggle("hidden");
  }

  function handleSearchWindow() {
    setSearchWindow(!searchWindow);
  }

  function handlePreferenWindow() {
    setPreferenceWindow(!preferenceWindow);
  }

  return (
    <div className="flex flex-col w-full">
      <nav
        id="nav_bar"
        className="bg-slate-800 w-full h-16 p-1 fixed top-0 left-0 flex no-wrap justify-center shadow-lg shadow-slate-400 overflow-x-hidden z-40"
      >
        {/* Hamburger button */}
        <div className="my-auto md:hidden basis-1/3 px-3">
          <button id="hamburger_button" ref={hamburger_button}>
            <svg
              id="hamburger_lines"
              className="h-12 w-12 stroke-slate-100"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <svg
              id="hamburger_close"
              className="hidden h-12 w-12 stroke-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          className="w-[90%] flex flex-row justify-end sm:justify-center items-center px-3 mx-auto 
        basis-2/3 sm:basis-6/12 lg:basis-4/12"
        >
          {/* logo */}
          <div className="flex justify-start gap-2 items-center float-left px-3 xs:basis-1/3 sm:basis-1/12">
            <NavLink className="px-3" to="/">
              <img
                className="mx-auto sm:mx-0 rounded-full max-w-14 h-14"
                alt=""
                src={logo}
              />
            </NavLink>
          </div>

          {/* navigation links */}
          <div className="px-3 my-0 hidden md:visible text-center md:flex md:basis-6/12">
            <ul className="w-[90%] flex sm:space-x-2 text-slate-100 font-semibold">
              <li
                className={`py-5 px-3 border-gray-900 leading-3 cursor-pointer text-lg font-bold rounded ${leaguesBar || window.location.pathname.startsWith("/leagues")
                    ? "bg-orange-500 text-white"
                    : ""
                  }`}
                onClick={() => {
                  setLeaguesBar(!leaguesBar);
                  setTeamsBar(false);
                }}
              >
                {getTranslation("Leagues", lang)}
              </li>
              <li
                className={`py-5 px-3 border-gray-900 leading-3 cursor-pointer text-lg font-bold rounded ${teamsBar || window.location.pathname.startsWith("/teams")
                    ? "bg-orange-500 text-white"
                    : ""
                  }`}
                onClick={() => {
                  setTeamsBar(!teamsBar);
                  setLeaguesBar(false);
                }}
              >
                {getTranslation("Teams", lang)}
              </li>
              <li
                className={`py-5 px-3 border-gray-900 leading-3 cursor-pointer text-lg font-bold rounded ${preferenceWindow ? "bg-orange-500 text-white" : ""
                  }`}
                onClick={() => {
                  handlePreferenWindow();
                }}
              >
                {getTranslation("Preferences", lang)}
              </li>
              <li
                className={`py-5 px-3 border-gray-900 leading-3 cursor-pointer text-lg font-bold rounded ${searchWindow ? "bg-orange-500 text-white" : ""
                  }`}
                onClick={() => {
                  handleSearchWindow();
                }}
              >
                {getTranslation("Search", lang)}
              </li>
            </ul>
          </div>
        </div>

        {/* ٍSearch window */}
        {searchWindow && (
          <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-full sm:w-2/3">
              <button
                onClick={() => [setSearchWindow(false), window.location.href = '/']}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <Search />
            </div>
          </div>
        )}

        {/* Prefernces window */}
        {preferenceWindow && (
          <div className="w-full fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-full sm:w-2/3">
              <button
                onClick={() => [setPreferenceWindow(false), window.location.href = '/']}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <Preferences />
            </div>
          </div>
        )}
      </nav>

      {/* leagues bar */}
      {leaguesBar && (
        <div className="w-full fixed top-16 inset-0  bg-black bg-opacity-50 flex justify-center z-50">
          <Leagues />
        </div>
      )}

      {/* teams bar */}
      {teamsBar && (
        <div className="w-full fixed top-16 inset-0  bg-black bg-opacity-50 flex justify-center z-50">
          <Teams />
        </div>)}

      {/* Hambruger items */}
      <div
        id="hamburger_items"
        ref={hamburger_items}
        className="fixed w-full h-0 overflow-y-hidden my-auto top-16 left-0 text-center z-10"
      >
        <ul className="myul w-full flex flex-col items-center px-2 bg-slate-900 z-10 text-slate-100">
          <li className="liclass w-full  py-2 border-b border-gray-600 border-solid"
            onClick={() => {
              setLeaguesBarMini(!leaguesBarMini);
              setTeamsBarMini(false);
            }}
          >
            {getTranslation("Leagues", lang)}
            {
              leaguesBarMini ? <Leagues /> : null
            }
          </li>
          <li
            className="liclass w-full  py-2 border-b border-gray-600 border-solid"
            onClick={() => {
              setTeamsBarMini(!teamsBarMini);
              setLeaguesBarMini(false);
            }}
          >
            {getTranslation("Teams", lang)}
            {
              teamsBarMini ? <Teams /> : null
            }
          </li>
          <li
            className="liclass w-full  py-2 border-b border-gray-600 border-solid"
            onClick={() => {
              handlePreferenWindow();
              setLeaguesBarMini(false);
              setTeamsBarMini(false);
              handleHamburgerClick();
            }
            }
          >
            {getTranslation("Preferences", lang)}
          </li>
          <li
            className="liclass w-full  py-2 border-b border-gray-600 border-solid"
            onClick={() => {
              handleSearchWindow();
              setLeaguesBarMini(false);
              setTeamsBarMini(false);
              handleHamburgerClick();
            }
            }
          >
            {getTranslation("Search", lang)}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
