import { englishArray, ukrainianArray, transcriptionArray } from "./words.js";

const knownWordsArr = [];
const doubtfulWordsArr = [];
const unknownWordsArr = [];

let currentArrayEng = englishArray;
let currentArrayUa = ukrainianArray;
let currentTranscription = transcriptionArray;

const textContent = () => {
    const word = document.getElementById("word");
    word.textContent = currentArrayEng[0];
    const transcription = document.getElementById("transcription");
    transcription.textContent = currentTranscription[0];
    const translation = document.getElementById("flipside");
    translation.textContent = currentArrayUa[0];
};

// FAVOURITE WORDS

//RUNTIME ARRAYS
let inputFavouriteEng = [];
let inputFavouriteUa = [];
let inputFavouriteTranscription = [];


//CHECKING IF USER HAS FAVOURITE WORDS IN LOCAL STORAGE IF SO UPDATING RUNTIME ARRAYS
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
        inputFavouriteEng.length.push(currentArrayEng[0]);
        inputFavouriteUa.push(currentArrayUa[0]);
        inputFavouriteTranscription.push(currentTranscription[0]);
    };
    //REMOVING FROM THE ARRAY
    const unlikingWord = () => {
        starPic.setAttribute("src", "img/unlike.png");
        let i = inputFavouriteEng.indexOf(currentArrayEng[0])
        if (i > -1) {
            inputFavouriteEng.splice(i, 1);
            inputFavouriteUa.splice(i, 1);
            inputFavouriteTranscription.splice(i, 1);
        }
    };

    //CHECKING IF THE ARRAY HAS THE WORD
    if (!inputFavouriteEng.includes(currentArrayEng[0])) {
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
if (inputFavouriteEng.includes(currentArrayEng[0])) {
    starPic.setAttribute("src", "img/like.png");
} else {
    starPic.setAttribute("src", "img/unlike.png")
}

const like = document.getElementById("like");
like.addEventListener("click", star);


//FLIP THE CARD

const card = document.getElementsByClassName("toggle")[0];

const flipBtn = document.getElementById("flip");
flipBtn.addEventListener("click", () => {
    card.classList.toggle("active");
});

//MENU
const topPanel = document.getElementById("topPanel");
const panel = document.getElementById("panel");
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");

const hidingObject = (obj, visibility) => {
    obj.style.display = visibility;
};

const hide = () => {
    hidingObject(card, "none");
    hidingObject(topPanel, "none");
    hidingObject(panel, "none");
    hidingObject(menu, "flex");
};

const unHide = () => {
    hidingObject(card, "flex");
    hidingObject(topPanel, "flex");
    hidingObject(panel, "flex");
    hidingObject(menu, "none");
};


menuBtn.addEventListener("click", () => {
    hide();
});

// MENU BUTTONS

const knownWordsBtn = document.getElementById("greenBtn");
knownWordsBtn.addEventListener("click", () => {
    unHide();
});

const UnknownWordsBtn = document.getElementById("redBtn");
UnknownWordsBtn.addEventListener("click", () => {
    unHide();
});

const doubtfulWordsBtn = document.getElementById("yellowBtn");
doubtfulWordsBtn.addEventListener("click", () => {
    unHide();
});

const favouriteWordsBtn = document.getElementById("goldenBtn");
favouriteWordsBtn.addEventListener("click", () => {
    currentArrayEng = inputFavouriteEng;
    currentArrayUa = inputFavouriteUa;
    currentTranscription = inputFavouriteTranscription;
    textContent(); //UPDATING
    unHide();
})

textContent();

console.log(currentArrayEng);
console.log(currentArrayUa);
console.log(currentTranscription);

console.log(inputFavouriteEng);
console.log(inputFavouriteUa);
console.log(inputFavouriteTranscription);