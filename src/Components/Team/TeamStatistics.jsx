import React, { useState, useMemo, memo } from 'react';
import { getTeamStatistics } from '../../Api/getTeamDetails.js';

function TeamStatistics({ team, league, season }) {
  const [teamStatistics, setTeamStatistics] = useState({});
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [yellowCards, setYellowCards] = useState(0);
  const [redCards, setRedCards] = useState(0);

  useMemo(() => {
    let isMount = true;
    async function fetchData() {
      if (isMount) {
        const fetchedStats = await getTeamStatistics(team, season, league);
        const stats = fetchedStats.data.response;
        setTeamStatistics(stats);

        if (stats.cards) {
          let yellow = 0, red = 0;
          Object.values(stats.cards.yellow || {}).forEach(val => yellow += val.total);
          Object.values(stats.cards.red || {}).forEach(val => red += val.total);
          setYellowCards(yellow);
          setRedCards(red);
        }
        setStatsLoaded(true);
      }
    }
    fetchData();
    return () => (isMount = false);
  }, [team, season, league]);

  const Section = ({ title, children }) => (
    <div className="my-8">
      <h2 className="text-center bg-slate-800 text-white py-2 text-lg font-bold rounded-md">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center mt-2 border border-slate-700 rounded-md overflow-hidden">
          {children}
        </table>
      </div>
    </div>
  );

  const TableRow = ({ children }) => (
    <tr className="border-b border-slate-700 hover:bg-slate-100">{children}</tr>
  );

  const TableHeader = ({ children }) => (
    <thead className="bg-slate-700 text-white">{children}</thead>
  );

  const TableCell = ({ children }) => (
    <td className="py-2 px-3">{children}</td>
  );

  if (!statsLoaded || Object.keys(teamStatistics).length === 0) {
    return <div className="text-center mt-10 text-slate-600">No data available.</div>;
  }

  return (
    <div className="p-4">
      {/* Fixtures */}
      <Section title="Fixtures">
        <TableHeader>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Home</TableCell>
            <TableCell>Away</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.fixtures || {}).map(([key, value], index) => (
            <TableRow key={index}>
              <TableCell className="font-medium capitalize">{key}</TableCell>
              {Object.values(value).map((val, idx) => (
                <TableCell key={idx}>{val}</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Section>

      {/* Goals */}
      <Section title="Goals">
        <TableHeader>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Home</TableCell>
            <TableCell>Away</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.goals || {}).map(([key, value], index) => (
            
              <TableRow key={index}>
                <TableCell className="font-medium capitalize">{key}</TableCell>
                {
                Object.entries(value).map((keyx, valx) => (
                    keyx === 'total' || keyx === 'average' ? (
                  <TableCell key={keyx}>{valx}</TableCell>):null
                ))
                }
              </TableRow>
            
          ))}
        </tbody>
      </Section>

      {/* Biggest Results */}
      <Section title="Biggest Results">
        <TableHeader>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Home</TableCell>
            <TableCell>Away</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.biggest || {}).map(([key, value], index) => (
            (key === "wins" || key === "loses") && (
              <TableRow key={index}>
                <TableCell className="font-medium capitalize">{key}</TableCell>
                {Object.values(value).map((val, idx) => (
                  <TableCell key={idx}>{val}</TableCell>
                ))}
              </TableRow>
            )
          ))}
        </tbody>
      </Section>

      {/* Biggest Goals */}
      <Section title="Biggest Goals">
        <TableHeader>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Home</TableCell>
            <TableCell>Away</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.biggest?.goals || {}).map(([key, value], index) => (
            <TableRow key={index}>
              <TableCell className="font-medium capitalize">{key}</TableCell>
              {Object.values(value).map((val, idx) => (
                <TableCell key={idx}>{val}</TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </Section>

      {/* Clean Sheet */}
      <Section title="Clean Sheet">
        <TableHeader>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Home</TableCell>
            <TableCell>Away</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          <TableRow>
            <TableCell>Clean Sheets</TableCell>
            {Object.values(teamStatistics.clean_sheet || {}).map((val, idx) => (
              <TableCell key={idx}>{val}</TableCell>
            ))}
          </TableRow>
        </tbody>
      </Section>

      {/* Penalty */}
      <Section title="Penalty">
        <TableHeader>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Scored</TableCell>
            <TableCell>Missed</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {Object.entries(teamStatistics.penalty || {}).map(([key, value], index) => (
            <TableRow key={index}>
              <TableCell className="capitalize">{key}</TableCell>
              {key !== 'total'
                ? Object.values(value).map((val, idx) => (
                    <TableCell key={idx}>{val}</TableCell>
                  ))
                : <TableCell colSpan="3">{value}</TableCell>}
            </TableRow>
          ))}
        </tbody>
      </Section>

      {/* Cards */}
      <Section title="Cards">
        <TableHeader>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Yellow</TableCell>
            <TableCell>Red</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHeader>
        <tbody>
          <TableRow>
            <TableCell>Cards</TableCell>
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
