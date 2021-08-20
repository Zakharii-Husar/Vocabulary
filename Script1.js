import { english, ukrainian, transcription } from "./words.js";

let inputFavourite = ["first"];
let outputFavourite = JSON.parse(localStorage.getItem("favouriteWords"));

const like = document.getElementById("like");
like.addEventListener("click", function () {
    inputFavourite.push(english[7]);
    localStorage.setItem("favouriteWords", JSON.stringify(inputFavourite));
});


console.log(localStorage.getItem("fav"));

const know = [];
const doubt = [];
const dontKnow = [];