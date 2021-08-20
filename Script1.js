import { english, ukrainian, transcription } from "./words.js";

let inputFavourite = [];
let outputFavourite = JSON.parse(localStorage.getItem("favouriteWords"));
if (localStorage.getItem("favouriteWords") !== null) {
    inputFavourite = outputFavourite;
};


const like = document.getElementById("like");
like.addEventListener("click", function () {
    inputFavourite.push(english[7]);
    localStorage.setItem("favouriteWords", JSON.stringify(inputFavourite));
});

console.log(inputFavourite);

const know = [];
const doubt = [];
const dontKnow = [];