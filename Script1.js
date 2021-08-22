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

//RUNTIME ARRAYS
let inputFavouriteEng = [];
let inputFavouriteUa = [];
let inputFavouriteTranscription = [];

console.log(inputFavouriteEng);
console.log(inputFavouriteUa);
console.log(inputFavouriteTranscription);

//CHECKING IF USER HAS FAVOURITE WORDS IN LS IF SO UPDATING RUNTIME ARRAYS
let outputFavouriteEng = JSON.parse(localStorage.getItem("favouriteWordsEng"));
let outputFavouriteUa = JSON.parse(localStorage.getItem("favouriteWordsUa"));
let outputFavouriteTranscription = JSON.parse(localStorage.getItem("favouriteWordsTranscription"));

if (outputFavouriteEng !== null) {
    inputFavouriteEng = outputFavouriteEng;
    inputFavouriteUa = outputFavouriteUa;
    inputFavouriteTranscription = outputFavouriteTranscription;
    console.log("1.checking memory")
};


const star = () => {

    //ADDING FAVOURITE TO THE ARRAY
    const likingWord = () => {
        starPic.setAttribute("src", "img/like.png");
        inputFavouriteEng.push(currentArrayEng[random]);
        inputFavouriteUa.push(currentArrayUa[random]);
        inputFavouriteTranscription.push(currentTranscription[random]);
        console.log("3.liking")
    };
    //REMOVING FROM THE ARRAY
    const unlikingWord = () => {
        starPic.setAttribute("src", "img/unlike.png");
        let i = inputFavouriteEng.indexOf(currentArrayEng[random])
        if (i > -1) {
            inputFavouriteEng.splice(i, 1);
            inputFavouriteUa.splice(i, 1);
            inputFavouriteTranscription.splice(i, 1);
            console.log("4.unliking")
        }
    };

    //CHECKING IF THE ARRAY HAS THE WORD
    if (!inputFavouriteEng.includes(currentArrayEng[random])) {
        likingWord()
    } else {
        unlikingWord();
    }

    //SAVING MODIFIED ARRAY TO LOCAL STORAGE
    localStorage.setItem("favouriteWordsEng", JSON.stringify(inputFavouriteEng));
    localStorage.setItem("favouriteWordsUa", JSON.stringify(inputFavouriteUa));
    localStorage.setItem("favouriteWordsTranscription", JSON.stringify(inputFavouriteTranscription));

    console.log("2.updating")
}

//SETS STAR IF CURRENT WORD IS ALREADY IN THE FAVOURITE ARRAY 
let starPic = document.getElementById("like");
if (inputFavouriteEng.includes(currentArrayEng[random])) {
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