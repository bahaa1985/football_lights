// This script sets the document direction based on the 'language' cookie
// import { getCookie } from "../src/Api/cookie";

//     const lang = getCookie('language').lang || 'en';
    
//     if(lang === 'ar'){
//         document.body.setAttribute('dir','rtl');
//     } else {
//         document.body.setAttribute('dir','ltr');
//     }

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const language = getCookie('language');
let langObj = null;

if (language) {
    try {
        langObj = JSON.parse(language);
        // Now you can access langObj.lang or langObj.tag
        console.log(langObj.lang); // e.g., "ar"
        console.log(langObj.tag);  // e.g., "soccer"
    } catch (e) {
        console.error("Cookie is not valid JSON", e);
    }
}

// console.log(language);