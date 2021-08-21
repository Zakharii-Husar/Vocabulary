import { englishArray, ukrainianArray, transcriptionArray } from "./words.js";

let currentArrayEng = englishArray;
let currentArrayUa = ukrainianArray;
let currentTranscription = transcriptionArray

let random = Math.floor(Math.random() * currentArrayEng.length);

const word = document.getElementById("word");
word.textContent = currentArrayEng[random];
const transcription = document.getElementById("transcription");
transcription.textContent = currentTranscription[random];
const translation = document.getElementById("flipside");
translation.textContent = currentArrayUa[random];


// FAVOURITE WORDS

let inputFavourite = [];
let outputFavourite = JSON.parse(localStorage.getItem("favouriteWords"));
if (localStorage.getItem("favouriteWords") !== null) {
    inputFavourite = outputFavourite;
};

let starPic = document.getElementById("like");
if (inputFavourite.includes(currentArrayEng[random])) {
    starPic.setAttribute("src", "img/like.png");
} else {
    starPic.setAttribute("src", "img/unlike.png")
}

const star = () => {

    //ADDING FAVOURITE TO THE ARRAY
    const likingWord = () => {
        starPic.setAttribute("src", "img/like.png");
        inputFavourite.push(currentArrayEng[random]);
    };
    //REMOVING FROM THE ARRAY
    const unlikingWord = () => {
        starPic.setAttribute("src", "img/unlike.png");
        let i = inputFavourite.indexOf(currentArrayEng[random])
        if (i > -1) {
            inputFavourite.splice(i, 1)
        }
    };

    //CHECKING IF THE ARRAY HAS THE WORD
    if (!inputFavourite.includes(currentArrayEng[random])) {
        likingWord()
    } else {
        unlikingWord();
    }

    //SAVING MODIFIED ARRAY TO LOCAL STORAGE
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