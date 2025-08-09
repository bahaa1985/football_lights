export default function setPreferences(language,countryName){
   
        switch(language){
            case 'en':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'en',tags:'soccer ' +countryName}))
                break;
            case 'ar':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'ar',tags:'كرة القدم '+countryName}))
                break;
            case 'fr':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'fr',tags:'football '+countryName}))
                break;
            case 'es':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'es',tags:'fútbol '+countryName}))
                break;
            case 'pt':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'pt',tags:'futebol '+countryName}))
                break;
            case 'it':
                localStorage.setItem("user_preferences", JSON.stringify({lang:'it',tags:'calcio '+countryName}))
                break;
            default:
                localStorage.setItem("user_preferences", JSON.stringify({lang:'en',tags:'soccer '+countryName}))
                break;
        }
}