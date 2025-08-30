import React, { useState, useEffect } from "react";

export default function PlayerStatsTable({columnsProp,statisticsProp,TeamsProp,}) {
  const homeStatistics = statisticsProp.home;
  const awayStatistics = statisticsProp.away;
  const homeTeam = TeamsProp.home;
  const awayTeam = TeamsProp.away;

  const [screenWidth, setScreenWidth] = useState(0);
  const [clickedTeam, setClickedTeam] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      if (screenWidth >= 425) {
        setClickedTeam(null);
      } else {
        setClickedTeam(homeTeam.id);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div>
      <table className="w-full table-auto p-1 border border-b-[0px] rounded-t-md border-slate-800 border-solid">
        <thead className="w-full">
          <tr className="flex flex-row w-full">
            {/*home team */}
            <th className="flex justify-start items-center w-1/2 p-2 bg-slate-800 text-slate-50 rounded-tl-md">
              <img
                alt={homeTeam.name}
                src={homeTeam.logo}
                className="w-8 h-8"
                onClick={() => setClickedTeam(homeTeam.id)}
              />
              <span className="w-1/2 text-center text-slate-50 border-none align-middle py-1">
                {homeTeam.name}
              </span>
            </th>
            {/* away team */}
            <th className="flex flex-row-reverse justify-start  items-center w-1/2 p-2 bg-slate-800 text-slate-50 rounded-tr-md">
              <img
                alt={awayTeam}
                src={awayTeam.logo}
                className="w-8 h-8"
                onClick={() => setClickedTeam(awayTeam.id)}
              />
              <span className="w-1/2 text-center text-slate-50 border-none align-middle">
                {awayTeam.name}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {screenWidth >= 425 ? ( //if screen size is more than 425 display both of teams ratings,
            // otherwise displaying depends on user's selection
            homeStatistics.map((elem, index) => {
              return (
                <tr
                  key={index}
                  className="sm:flex flex-row w-full border-b-2 border-slate-500 border-solid"
                >
                  {elem.statistics[0].games.rating !== null ? (
                    <td className="flex justify-between sm:w-[50%] sm:px-3">
                      <span className="border-none">{elem.player.name}</span>
                      {/* <span className={`border-none w-8 h-8 text-center font-bold text-md text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
                                {elem.statistics[0].games.rating}
                            </span> */}
                    </td>
                  ) : null}

                  {awayStatistics[index] !== undefined &&
                  awayStatistics[index].statistics[0].games.rating !== null ? (
                    <td className="flex justify-between sm:w-[50%] sm:px-3">
                      <span className="border-none">
                        {awayStatistics[index].player.name}
                      </span>
                      {/* <span className={`border-none w-8 h-8 text-center font-bold text-md text-slate-50 ${ratingBGColor(elem.statistics[0].games.rating)}`}>
                              {awayStatistics[index].statistics[0].games.rating}
                            </span> */}
                    </td>
                  ) : null}
                </tr>
              );
            })
          ) : (
            <tr className="flex flex-col w-full">
              {clickedTeam === homeTeam.id
                ? homeStatistics.map((elem, index) => {
                    return elem.statistics[0].games.rating !== null ? (
                      <td
                        key={index}
                        className="flex justify-between w-full px-3 border-b border-solid border-slate-800"
                      >
                        <span className="border-none">{elem.player.name}</span>
                      </td>
                    ) : null;
                  })
                : awayStatistics.map((elem, index) => {
                    return elem.statistics[0].games.rating !== null ? (
                      <td
                        key={index}
                        className="flex justify-between w-full px-3 border-b border-solid border-slate-800"
                      >
                        <span className="border-none">{elem.player.name}</span>
                      </td>
                    ) : null;
                  })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
