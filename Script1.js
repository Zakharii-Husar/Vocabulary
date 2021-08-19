import { english, ukrainian, transcription } from "./words.js";

const favourite2 = ["wew"];
localStorage.setItem("favouriteWords2", JSON.stringify(favourite2));
let favouriteWords = JSON.parse(localStorage.getItem("favouriteWords2"));



console.log(favouriteWords[0]);
const know = [];
const doubt = [];
const dontKnow = [];