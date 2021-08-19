import { english, ukrainian, transcription } from "./words.js";

let favourite = [];
const like = document.getElementById("like");
like.addEventListener("click", function () { favourite.push("kek") });
localStorage.setItem("favouriteWords", JSON.stringify(favourite));
let data = localStorage.getItem("favouriteWords");
let favouriteWords = JSON.parse(data);


console.log(favouriteWords);
console.log(favourite);

const know = [];
const doubt = [];
const dontKnow = [];