import { englishArray, ukrainianArray, transcriptionArray } from "./words.js";

let currentArrayEng = englishArray;
let currentArrayUa = ukrainianArray;
let currentTranscription = transcriptionArray;

let random = Math.floor(Math.random() * currentArrayEng.length);

const word = document.getElementById("word");
word.textContent = currentArrayEng[random];
const transcription = document.getElementById("transcription");
transcription.textContent = currentTranscription[random];
const translation = document.getElementById("flipside");
translation.textContent = currentArrayUa[random];


// FAVOURITE WORDS

//RUNTIME ARRAY
let inputFavourite = [[], [], []];

console.log(inputFavourite[0]);
console.log(inputFavourite[1]);
console.log(inputFavourite[2]);

//CHECKING IF USER HAS FAVOURITE WORDS IN LS IF SO UPDATING RUNTIME ARRAY
let outputFavourite = JSON.parse(localStorage.getItem("favouriteWords"));
if (outputFavourite !== null) {
    inputFavourite = outputFavourite;
};


const star = () => {

    //ADDING FAVOURITE TO THE ARRAY
    const likingWord = () => {
        starPic.setAttribute("src", "img/like.png");
        inputFavourite[0].push(currentArrayEng[random]);
        inputFavourite[1].push(currentArrayUa[random]);
        inputFavourite[2].push(currentTranscription[random]);
    };
    //REMOVING FROM THE ARRAY
    const unlikingWord = () => {
        starPic.setAttribute("src", "img/unlike.png");
        let i = inputFavourite.indexOf(currentArrayEng[random])
        if (i > -1) {
            inputFavourite[0].splice(i, 1);
            inputFavourite[1].splice(i, 1);
            inputFavourite[2].splice(i, 1);
        }
    };

    //CHECKING IF THE ARRAY HAS THE WORD
    if (!inputFavourite[0].includes(currentArrayEng[random])) {
        likingWord()
    } else {
        unlikingWord();
    }

    //SAVING MODIFIED ARRAY TO LOCAL STORAGE
    localStorage.setItem("favouriteWords", JSON.stringify(inputFavourite));
}

//SETS STAR IF CURRENT WORD IS ALREADY IN THE FAVOURITE ARRAY 
let starPic = document.getElementById("like");
if (inputFavourite.includes(currentArrayEng[random])) {
    starPic.setAttribute("src", "img/like.png");
} else {
    starPic.setAttribute("src", "img/unlike.png")
}

const like = document.getElementById("like");
like.addEventListener("click", star);


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