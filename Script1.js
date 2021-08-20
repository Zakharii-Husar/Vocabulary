import { english, ukrainian, transcription } from "./words.js";

let inputFavourite = [];
let outputFavourite = JSON.parse(localStorage.getItem("favouriteWords"));
if (localStorage.getItem("favouriteWords") !== null) {
    inputFavourite = outputFavourite;
};

const star = () => {
    let starPic = document.getElementById("like");
    if (!inputFavourite.includes(english[7])) {
        starPic.setAttribute("src", "img/like.png");
        inputFavourite.push(english[7]);
    } else {
        starPic.setAttribute("src", "img/unlike.png")
        let i = inputFavourite.indexOf(english[7])
        if (i > -1) {
            inputFavourite.splice(i, 1)
        }
    }
    localStorage.setItem("favouriteWords", JSON.stringify(inputFavourite));
}

const like = document.getElementById("like");
like.addEventListener("click", star);

console.log(inputFavourite);

const know = [];
const doubt = [];
const dontKnow = [];