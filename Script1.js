import { english, ukrainian, transcription } from "./words.js";

let favourite = [];
localStorage.setItem("favouriteWords", JSON.stringify(favourite));

let data = localStorage.getItem("favouriteWords");
let favouriteWords = JSON.parse(data);

favourite.push("kek");

const like = document.getElementById("like");
like.addEventListener("click", function () {
    console.log(favourite);
    console.log(favouriteWords);
});


const know = [];
const doubt = [];
const dontKnow = [];