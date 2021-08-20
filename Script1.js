import { english, ukrainian, transcription } from "./words.js";

let currentArray = english;
let inputFavourite = [];
let outputFavourite = JSON.parse(localStorage.getItem("favouriteWords"));
if (localStorage.getItem("favouriteWords") !== null) {
    inputFavourite = outputFavourite;
};

const randomNum = () => {
    return Math.floor(Math.random() * currentArray.length)
};

const star = () => {
    let starPic = document.getElementById("like");
    if (!inputFavourite.includes(english[randomNum()])) {
        starPic.setAttribute("src", "img/like.png");
        inputFavourite.push(english[randomNum()]);
    } else {
        starPic.setAttribute("src", "img/unlike.png")
        let i = inputFavourite.indexOf(english[randomNum()])
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