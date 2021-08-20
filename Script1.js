import { english, ukrainian, transcription } from "./words.js";

let favourite = ["first"];

const like = document.getElementById("like");
like.addEventListener("click", function () {
    favourite.push(english[7]);
    localStorage.setItem("favouriteWords", JSON.stringify(favourite));
});


let data = localStorage.getItem("favouriteWords");
let favouriteWords = JSON.parse(data);


console.log(favouriteWords);

const know = [];
const doubt = [];
const dontKnow = [];