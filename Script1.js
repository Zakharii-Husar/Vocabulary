import { english, ukrainian, transcription } from "./words.js";

const favourite = ["wow"];
localStorage.setItem("favouriteWords", JSON.stringify(favourite));
let favouriteWords = JSON.parse(localStorage.getItem("favouriteWords"));

favourite.push("wowo")

const like = document.getElementById("like");
like.addEventListener("click", function () { console.log(favourite[0]); });

const know = [];
const doubt = [];
const dontKnow = [];