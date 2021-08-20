import { english, ukrainian, transcription } from "./words.js";

let favourite = ["first"];

const like = document.getElementById("like");
like.addEventListener("click", function () {
    favourite.push("second");
});


localStorage.setItem("favouriteWords", favourite);

let data = localStorage.getItem("favouriteWords");
let favouriteWords = JSON.parse(data);



console.log(income);
console.log(favouriteWords);

const know = [];
const doubt = [];
const dontKnow = [];