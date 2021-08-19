import { english, ukrainian, transcription } from "./words.js";

let favourite = [];
let data = localStorage.getItem("favouriteWords");
let favouriteWords = JSON.parse(data);

const like = document.getElementById("like");
like.addEventListener("click", function () { favourite.push("kek") });
localStorage.setItem("favouriteWords", JSON.stringify(favourite));

console.log(favouriteWords);

const know = [];
const doubt = [];
const dontKnow = [];