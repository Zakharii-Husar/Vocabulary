import { english, ukrainian, transcription } from "./words.js";

let favourite = [];
let income = JSON.stringify(favourite);
localStorage.setItem("favouriteWords", income);

let data = localStorage.getItem("favouriteWords");
let favouriteWords = JSON.parse(data);

favourite.push("kek");

const like = document.getElementById("like");
like.addEventListener("click", function () {
    console.log(income);
    console.log(favouriteWords);
});


const know = [];
const doubt = [];
const dontKnow = [];