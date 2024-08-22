import React from "react";
import { NavLink } from "react-router-dom";
import { getPreferdLeaguesFromCookie,setPreferedLeaguesCookie } from "../Api/cookie.js";

function FixtureRow(props) {

    const fixtures =props.fixturesSource;
    const preferedLeagues = getPreferdLeaguesFromCookie();

    return Object.keys(fixtures).map((elem, index) => {
        return (
        <div key={index}>
            <div className="flex float-start">
            <img alt=""
                src={fixtures[elem][0].league.logo}
                className="ml xs:w-15 sm:w-20 h-12 object-contain"
            />
            <span className="text-left">{elem}</span>
            </div>
            <button onClick={setPreferedLeaguesCookie(preferedLeagues.map(item=>item !== fixtures[elem][0].league.id))}>
                {/* <StarIcon></StarIcon> */}
            </button>
            {fixtures[elem].map((fixture, i) => {
            return (
                <div className="xs:block sm:flex w-[80%] px py-auto my mx-auto border-b border-b-black border-solid"
                key={i}
                >
                <div className="flex justify-between xs:w-full sm:w-[50%]">
                    <img
                    src={fixture.teams.home.logo}
                    className="ml xs:w-15 sm:w-20 h-12 object-contain"
                    alt={fixture.teams.home.name}
                    />
                    <NavLink
                    to={`/teams/${fixture.teams.home.id}?league=${fixture.league.id}&season=${fixture.league.season}`}
                    >
                    <span>{fixture.teams.home.name}</span>
                    </NavLink>
                    <span className="w-[10%]">
                        {fixture.goals.home}
                    </span>
                </div>
                <div
                    sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: { xs: "100%", sm: "50%" },
                    direction: {
                        xs: "rtl",
                        sm: "ltr",
                    },
                    }}>
                    <span className="w-[10%]">
                    {fixture.goals.away}
                    </span>
                    <NavLink
                    to={`/teams/${fixture.teams.away.id}?league=${fixture.league.id}&season=${fixture.league.season}`}
                    >
                    <span>{fixture.teams.away.name}</span>
                    </NavLink>
                    <img
                    src={fixture.teams.away.logo}
                    className="xs:w-15 sm:w-20 h-12 object-contain object-center"
                    alt={fixture.teams.away.name}
                    />
                </div>
                </div>
            );
            })}
        </div>
        );
    });
    }

export default FixtureRow;
