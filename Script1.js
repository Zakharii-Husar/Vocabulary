import { english, ukrainian, transcription } from "./words.js";

let favourite = [];
if (favourite.length > 0) {
    localStorage.setItem("favouriteWords", JSON.stringify(favourite));
}
let data = localStorage.getItem("favouriteWords");
let favouriteWords = JSON.parse(data);

const like = document.getElementById("like");
like.addEventListener("click", function () { favourite.push("kek") });

console.log(favouriteWords);
console.log(favourite);

const know = [];
const doubt = [];
const dontKnow = [];