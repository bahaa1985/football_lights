import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Typography, Avatar } from "@mui/material";

function FixtureRow(props) {

    const fixtures =props.fixturesSource;
    
    return Object.keys(fixtures).map((elem, index) => {
        return (
        <Box>
            <Box display={"flex"} justifyContent={"flex-start"}>
            <Avatar
                src={fixtures[elem][0].league.logo}
                variant="circle"
                sx={{
                ml: "2px",
                width: { xs: "60px", sm: "80px" },
                height: "50px",
                objectFit: "contain",
                }}
            />
            <Typography sx={{ textAlign: "left" }}>{elem}</Typography>
            </Box>
            {fixtures[elem].map((fixture, i) => {
            return (
                <Box
                sx={{
                    display: { xs: "block", sm: "flex" },
                    width: "80%",
                    px: "2px",
                    py: "auto",
                    my: "2px",
                    mx: "auto",
                    borderBottom: "1px black solid",
                }}
                key={i}
                >
                <Box
                    sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: { xs: "100%", sm: "50%" },
                    }}
                >
                    <Avatar
                    src={fixture.teams.home.logo}
                    variant="rounded"
                    sx={{
                        width: { xs: "60px", sm: "80px" },
                        height: "50px",
                        objectFit: "contain",
                        objectPosition: "center",
                    }}
                    alt={fixture.teams.home.name}
                    />
                    <NavLink
                    to={`/teams/${fixture.teams.home.id}?league=${fixture.league.id}&season=${fixture.league.season}`}
                    >
                    <Typography>{fixture.teams.home.name}</Typography>
                    </NavLink>
                    <Typography sx={{ width: "10%" }}>
                    {fixture.goals.home}
                    </Typography>
                </Box>
                <Box
                    sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: { xs: "100%", sm: "50%" },
                    direction: {
                        xs: "rtl",
                        sm: "ltr",
                    },
                    }}
                >
                    <Typography sx={{ width: "10%" }}>
                    {fixture.goals.away}
                    </Typography>
                    <NavLink
                    to={`/teams/${fixture.teams.away.id}?league=${fixture.league.id}`}
                    >
                    <Typography>{fixture.teams.away.name}</Typography>
                    </NavLink>
                    <Avatar
                    src={fixture.teams.away.logo}
                    variant="rounded"
                    sx={{
                        width: { xs: "60px", sm: "80px" },
                        height: "50px",
                        objectFit: "contain",
                        objectPosition: "center",
                    }}
                    alt={fixture.teams.away.name}
                    />
                </Box>
                </Box>
            );
            })}
        </Box>
        );
    });
    }

export default FixtureRow;
