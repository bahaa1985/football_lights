import React, { useState, useMemo, memo } from "react";
import { getTeamStatistics } from "../../Api/TeamDetails.js";
import { getTranslation } from "../../Translation/labels.js";
import { useSelector, useDispatch } from "react-redux";
import {
  requestsIncrement,
  resetRequests,
} from "../../ReduxStore/counterSlice.js";

function TeamStatistics({ team, league, season }) {
  const [teamStatistics, setTeamStatistics] = useState({});
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [yellowCards, setYellowCards] = useState(0);
  const [redCards, setRedCards] = useState(0);

  const dispatch = useDispatch();
  const requests_count = useSelector((state) => state.counter.requestsCount);

  useMemo(() => {
    let isMount = true;
    async function fetchData() {
      try {
        if (isMount) {
          const fetchedStats = await getTeamStatistics(team, season, league);
          const stats = fetchedStats.data.response;
          setTeamStatistics(stats);
          // sessionStorage.setItem('stats',fetchedStats.data.response);
          if (stats.cards) {
            let yellow = 0,
              red = 0;
            Object.values(stats.cards.yellow || {}).forEach(
              (val) => (yellow += val.total)
            );
            Object.values(stats.cards.red || {}).forEach(
              (val) => (red += val.total)
            );
            setYellowCards(yellow);
            setRedCards(red);
          }
          setStatsLoaded(true);

          //redux reducer increase requests count by one:
          dispatch(requestsIncrement());
        }
      } catch {
        alert("Error in Team statistics");
      }
    }

    if (requests_count < 10) {
      fetchData();
    } else {
      alert(
        "API request limit reached. Please wait a minute before making more requests."
      );
    }

    //reset api requests to zero
    dispatch(resetRequests());

    return () => (isMount = false);
  }, [team, season, league]);

  const lang =
    JSON.parse(localStorage.getItem("user_preferences")).lang || "en";

  const Section = ({ title, children }) => (
    <div className="my-4">
      <h2 className="text-center bg-slate-800 text-white py-2 text-lg font-bold rounded-md">
        {getTranslation(title, lang)}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center border border-slate-700 rounded-md overflow-hidden">
          {children}
        </table>
      </div>
    </div>
  );

  const TableRow = ({ children }) => (
    <tr className="border-b border-slate-700">{children}</tr>
  );

  const TableHeader = ({ children }) => (
    <thead className="bg-slate-700 text-white text-sm sm:text-lg">
      {children}
    </thead>
  );

  const TableCell = ({ children }) => (
    <td className="capitalize py-2 px-3 text-sm sm:text-lg">{children}</td>
  );

  if (!statsLoaded || Object.keys(teamStatistics).length === 0) {
    return (
      <div className="text-center mt-10 text-slate-600">No data available.</div>
    );
  }

  return (
    <div className="p-1 md:px-4 md:py-2">
      {/* Fixtures */}
      <Section title="Fixtures">
        <TableHeader>
          <TableRow>
            <TableCell>{getTranslation("Type", lang)}</TableCell>
            <TableCell>{getTranslation("Home", lang)}</TableCell>
            <TableCell>{getTranslation("Away", lang)}</TableCell>
            <TableCell>{getTranslation("Total", lang)}</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.fixtures || {}).map(
            ([key, value], index) => (
              <TableRow key={index}>
                <TableCell className="font-medium capitalize">
                  {getTranslation(key, lang)}
                </TableCell>
                {Object.values(value).map((val, idx) => (
                  <TableCell key={idx}>{val}</TableCell>
                ))}
              </TableRow>
            )
          )}
        </tbody>
      </Section>

      {/* Goals For*/}
      <Section title="Goals For">
        <TableHeader>
          <TableRow>
            <TableCell>{getTranslation("Type", lang)}</TableCell>
            <TableCell>{getTranslation("Home", lang)}</TableCell>
            <TableCell>{getTranslation("Away", lang)}</TableCell>
            <TableCell>{getTranslation("Total", lang)}</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.goals.for || {}).map(
            ([key, value], index) =>
              key === "total" || key === "average" ? (
                <TableRow key={index}>
                  <TableCell className="font-medium capitalize">
                    {getTranslation(key, lang)}
                  </TableCell>
                  {Object.values(value).map((val, idx) => (
                    <TableCell key={idx} className="capitalize">
                      {val}
                    </TableCell>
                  ))}
                </TableRow>
              ) : null
          )}
        </tbody>
      </Section>

      {/* Goals Against */}
      <Section title="Goals Against">
        <TableHeader>
          <TableRow>
            <TableCell>{getTranslation("Type", lang)}</TableCell>
            <TableCell>{getTranslation("Home", lang)}</TableCell>
            <TableCell>{getTranslation("Away", lang)}</TableCell>
            <TableCell>{getTranslation("Total", lang)}</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.goals.against || {}).map(
            ([key, value], index) =>
              key === "total" || key === "average" ? (
                <TableRow key={index}>
                  <TableCell className="font-medium capitalize">
                    {getTranslation(key, lang)}
                  </TableCell>
                  {Object.values(value).map((val, idx) => (
                    <TableCell key={idx} className="capitalize">
                      {val}
                    </TableCell>
                  ))}
                </TableRow>
              ) : null
          )}
        </tbody>
      </Section>

      {/* Biggest Results */}
      <Section title="Biggest Results">
        <TableHeader>
          <TableRow>
            <TableCell>{getTranslation("Type", lang)}</TableCell>
            <TableCell>{getTranslation("Home", lang)}</TableCell>
            <TableCell>{getTranslation("Away", lang)}</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.biggest || {}).map(
            ([key, value], index) =>
              (key === "wins" || key === "loses") && (
                <TableRow key={index}>
                  <TableCell className="font-medium capitalize">
                    {getTranslation(key, lang)}
                  </TableCell>
                  {Object.values(value).map((val, idx) => (
                    <TableCell key={idx}>{val}</TableCell>
                  ))}
                </TableRow>
              )
          )}
        </tbody>
      </Section>

      {/* Biggest Goals */}
      <Section title="Biggest Goals">
        <TableHeader>
          <TableRow>
            <TableCell>{getTranslation("Type", lang)}</TableCell>
            <TableCell>{getTranslation("Home", lang)}</TableCell>
            <TableCell>{getTranslation("Away", lang)}</TableCell>
            <TableCell>{getTranslation("Total", lang)}</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.biggest?.goals || {}).map(
            ([key, value], index) => (
              <TableRow key={index}>
                <TableCell className="font-medium capitalize">
                  {getTranslation(key, lang)}
                </TableCell>
                {Object.values(value).map((val, idx) => (
                  <TableCell key={idx}>{val}</TableCell>
                ))}
              </TableRow>
            )
          )}
        </tbody>
      </Section>

      {/* Clean Sheet */}
      <Section title="Clean Sheet">
        <TableHeader>
          <TableRow>
            <TableCell>{getTranslation("Home", lang)}</TableCell>
            <TableCell>{getTranslation("Away", lang)}</TableCell>
            <TableCell>{getTranslation("Total", lang)}</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          <TableRow>
            {/* <TableCell>{getTranslation('Clean Sheet',lang)}</TableCell> */}
            {Object.values(teamStatistics.clean_sheet || {}).map((val, idx) => (
              <TableCell key={idx}>{val}</TableCell> // to not get ckean sheets type
            ))}
          </TableRow>
        </tbody>
      </Section>

      {/* Penalty */}
      <Section title="Penalty">
        <TableHeader>
          <TableRow>
            <TableCell>{getTranslation("Type", lang)}</TableCell>
            <TableCell>{getTranslation("Home", lang)}</TableCell>
            <TableCell>{getTranslation("Away", lang)}</TableCell>
            {/* <TableCell>{getTranslation('Total',lang)}</TableCell> */}
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.penalty || {}).map(
            ([key, value], index) => (
              <TableRow key={index}>
                <TableCell className="capitalize">
                  {getTranslation(key, lang)}
                </TableCell>
                {key !== "total" ? (
                  Object.values(value).map((val, idx) => (
                    <TableCell key={idx}>{val}</TableCell>
                  ))
                ) : (
                  <TableCell colSpan="3">{value}</TableCell>
                )}
              </TableRow>
            )
          )}
        </tbody>
      </Section>

      {/* Cards */}
      <Section title="Cards">
        <TableHeader>
          <TableRow>
            <TableCell>{getTranslation("Yellow Cards", lang)}</TableCell>
            <TableCell>{getTranslation("Red Cards", lang)}</TableCell>
            <TableCell>{getTranslation("Total", lang)}</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          <TableRow>
            <TableCell>{yellowCards}</TableCell>
            <TableCell>{redCards}</TableCell>
            <TableCell>{yellowCards + redCards}</TableCell>
          </TableRow>
        </tbody>
      </Section>
    </div>
  );
}

export default memo(TeamStatistics);
