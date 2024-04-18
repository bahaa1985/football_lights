import axios from "axios";

function getPlayerInfo(playerId,season){
    const config={
        method:"GET",
        url:`/players?player=${playerId}&season=${season}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '12c3d051c8f77e0840cd9c5e35fd8cd0'
        },

    };

    return axios(config);
}

export default getPlayerInfo;