import { english, ukrainian, transcription } from "./words.js";

const favourite = [];
localStorage.setItem("favouriteWords", JSON.stringify(favourite));
let data = localStorage.getItem("favouriteWords");
let favouriteWords = JSON.parse(data);

const like = document.getElementById("like");
like.addEventListener("click", function () { favourite.push("wss") });

console.log(favouriteWords);
console.log(favourite[0] + "1");

const know = [];
const doubt = [];
const dontKnow = [];