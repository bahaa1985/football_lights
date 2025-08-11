export default function setPreferences(language,countryName){
   
        switch(language){
            case 'en':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'en',tag:'soccer',country:countryName}))
                break;
            case 'ar':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'ar',tag:'كرة',country:countryName}))
                break;
            case 'fr':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'fr',tag:'football' ,country:countryName}))
                break;
            case 'es':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'es',tag:'fútbol' ,country:countryName}))
                break;
            case 'pt':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'pt',tag:'futebol' ,country:countryName}))
                break;
            case 'it':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'it',tag:'calcio' ,country:countryName}))
                break;
            default:
                localStorage.setItem("user_preferences", JSON.stringify({lang:'en',tag:'soccer' ,country:countryName}))
                break;
        }
}