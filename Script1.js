import { englishArray, ukrainianArray, transcriptionArray } from "./words.js";

let currentArray = englishArray;
let random = Math.floor(Math.random() * currentArray.length);
const word = document.getElementById("word");
word.textContent = currentArray[random];
const transcription = document.getElementById("transcription");
transcription.textContent = transcriptionArray[random];



// FAVOURITE WORDS

let inputFavourite = [];
let outputFavourite = JSON.parse(localStorage.getItem("favouriteWords"));
if (localStorage.getItem("favouriteWords") !== null) {
    inputFavourite = outputFavourite;
};

let starPic = document.getElementById("like");
if (inputFavourite.includes(currentArray[random])) {
    starPic.setAttribute("src", "img/like.png");
} else {
    starPic.setAttribute("src", "img/unlike.png")
}

const star = () => {
    if (!inputFavourite.includes(currentArray[random])) {
        starPic.setAttribute("src", "img/like.png");
        inputFavourite.push(currentArray[random]);
    } else {
        starPic.setAttribute("src", "img/unlike.png");
        let i = inputFavourite.indexOf(currentArray[random])
        if (i > -1) {
            inputFavourite.splice(i, 1)
        }
    }

    localStorage.setItem("favouriteWords", JSON.stringify(inputFavourite));
}

const like = document.getElementById("like");
like.addEventListener("click", star);

console.log(inputFavourite);

//FLIP THE CARD

const card = document.getElementsByClassName("card")[0];

const flipBtn = document.getElementById("flip");
flipBtn.addEventListener("click", () => {
    console.log("shhh")
    card.classList.toggle("active");
});

const knownWords = [];
const doubtfulWords = [];
const unknownWords = [];