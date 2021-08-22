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


//CHECKING IF USER HAS FAVOURITE WORDS IN LS IF SO UPDATING RUNTIME ARRAYS
let outputFavouriteEng = JSON.parse(localStorage.getItem("favouriteWordsEng"));
let outputFavouriteUa = JSON.parse(localStorage.getItem("favouriteWordsUa"));
let outputFavouriteTranscription = JSON.parse(localStorage.getItem("favouriteWordsTranscription"));

if (outputFavouriteEng !== null) {
    inputFavouriteEng = outputFavouriteEng;
    inputFavouriteUa = outputFavouriteUa;
    inputFavouriteTranscription = outputFavouriteTranscription;
};


const star = () => {

    //ADDING FAVOURITE TO THE ARRAY
    const likingWord = () => {
        starPic.setAttribute("src", "img/like.png");
        inputFavouriteEng.push(currentArrayEng[random]);
        inputFavouriteUa.push(currentArrayUa[random]);
        inputFavouriteTranscription.push(currentTranscription[random]);
    };
    //REMOVING FROM THE ARRAY
    const unlikingWord = () => {
        starPic.setAttribute("src", "img/unlike.png");
        let i = inputFavouriteEng.indexOf(currentArrayEng[random])
        if (i > -1) {
            inputFavouriteEng.splice(i, 1);
            inputFavouriteUa.splice(i, 1);
            inputFavouriteTranscription.splice(i, 1);
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

console.log(inputFavouriteEng);
console.log(inputFavouriteUa);
console.log(inputFavouriteTranscription);

//FLIP THE CARD

const card = document.getElementsByClassName("toggle")[0];

const flipBtn = document.getElementById("flip");
flipBtn.addEventListener("click", () => {
    card.classList.toggle("active");
});

//MENU
const hidingObject = (obj, visibility) => {
    obj.style.display = visibility;
};

const hide = () => {
    hidingObject(card, "none");
    hidingObject(topPanel, "none");
    hidingObject(panel, "none");
    menu.classList.toggle("active");
};

const unHide = () => {
    hidingObject(card, "flex");
    hidingObject(topPanel, "flex");
    hidingObject(panel, "flex");
    menu.classList.toggle(" ");
};

const topPanel = document.getElementById("topPanel");
const panel = document.getElementById("panel");
const menu = document.getElementsByClassName("toggleMenu")[0];

const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => {
    hide();
});

const knownWordsBtn = document.getElementById("greenBtn");
knownWordsBtn.addEventListener("click", () => {
    unHide();
})

const knownWordsArr = [];
const doubtfulWordsArr = [];
const unknownWordsArr = [];