import axios from "axios";

function getPlayerProfile(playerId,season){
    const config={
        method:"GET",
        url:`https://v3.football.api-sports.io/players?id=${playerId}&season=${season}`,
        headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '12c3d051c8f77e0840cd9c5e35fd8cd0'
        },

    };

    return axios(config);
}

export default getPlayerProfile;