import { english, ukrainian, transcription } from "./words.js";

const favourite = [];
localStorage.setItem("favouriteWords", JSON.stringify(favourite));
let favouriteWords = JSON.parse(localStorage.getItem("favouriteWords"));

const like = document.getElementById("like");
like.addEventListener("click", function () { favourite.push("wowo") });

console.log(favourite[0]);

const know = [];
const doubt = [];
const dontKnow = [];