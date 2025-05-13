import { getCookie } from "./cookie.js";

const language = getCookie("language") || "en";

export default function getLocalLabels(){ 
    fetch('multi_language_translations.json').then(response =>{
    console.log(response.json());
})
}