import { english, ukrainian, transcription } from "./words.js";

const favourite = [];
localStorage.setItem("favouriteWords", JSON.stringify(favourite));
let favouriteWords = JSON.parse(localStorage.getItem("favouriteWords"));

const like = document.getElementById("like");
like.addEventListener("click", favourite.push("wowo"))


const know = [];
const doubt = [];
const dontKnow = [];