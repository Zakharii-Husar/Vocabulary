import { englishArray, ukrainianArray, transcriptionArray } from "./words.js";

let knownWordsArr = [];
let doubtfulWordsArr = [];
let unknownWordsArr = Array.from(Array(998).keys());
let likedWordsArr = [];
let currentArray = unknownWordsArr;

const knownWordsBtn = document.getElementById("greenBtn");
const UnknownWordsBtn = document.getElementById("redBtn");
const doubtfulWordsBtn = document.getElementById("yellowBtn");
const favouriteWordsBtn = document.getElementById("goldenBtn");

let index;

const textContent = () => {
    const word = document.getElementById("word");
    word.textContent = englishArray[index];
    const transcription = document.getElementById("transcription");
    transcription.textContent = transcriptionArray[index];
    const translation = document.getElementById("flipside");
    translation.textContent = ukrainianArray[index];

    knownWordsBtn.textContent = `ВИВЧЕНІ: ${knownWordsArr.length}`;
    UnknownWordsBtn.textContent = `НОВІ: ${unknownWordsArr.length}`;
    doubtfulWordsBtn.textContent = `ПОВТОРЕННЯ: ${doubtfulWordsArr.length}`;
    favouriteWordsBtn.textContent = `УЛЮБЛЕНІ: ${likedWordsArr.length}`;
};




//GETTING DATA FROM PREVIOUS SESSION
const retrievingData = (() => {
    if (JSON.parse(localStorage.getItem("knownWord")) !== null) {
        knownWordsArr = JSON.parse(localStorage.getItem("knownWord"));
    };
    if (JSON.parse(localStorage.getItem("doubtfulWord")) !== null) {
        doubtfulWordsArr = JSON.parse(localStorage.getItem("doubtfulWord"));
    };
    if (JSON.parse(localStorage.getItem("unknownWord")) !== null) {
        unknownWordsArr = JSON.parse(localStorage.getItem("unknownWord"));
    }

    if (JSON.parse(localStorage.getItem("likedWord")) !== null) {
        likedWordsArr = JSON.parse(localStorage.getItem("likedWord"));
    };
})();

//const retrievingData = (arr, item) => {
//    if (JSON.parse(localStorage.getItem(item)) !== null) {
//        arr = JSON.parse(localStorage.getItem(item));
//    };
//};

//retrievingData(knownWordsArr, "knownWord");
//retrievingData(doubtfulWordsArr, "doubtfulWord");
//retrievingData(unknownWordsArr, "unknownWord");
//retrievingData(likedWordsArr, "likedWord");

const actionButtons = (inputArr) => {
    //REMOVING THE WORD FROM WHENEVER IT MIGHT BE
    let a = knownWordsArr.indexOf(index);
    let b = unknownWordsArr.indexOf(index);
    let c = doubtfulWordsArr.indexOf(index);
    let d = likedWordsArr.indexOf(index);

    if (inputArr !== likedWordsArr) {
        if (knownWordsArr.includes(index) && a > -1) {
            knownWordsArr.splice(a, 1);
        }

        if (unknownWordsArr.includes(index) && b > -1) {
            unknownWordsArr.splice(b, 1);
        }

        if (doubtfulWordsArr.includes(index) && c > -1) {
            doubtfulWordsArr.splice(c, 1);
        };
    };

    //PUSHING THE WORD TO NEW LIST
    if (!inputArr.includes(index) && index > -1) {
        inputArr.push(index);

        //DELETIG THE WORD FROM FAVOURITE LIST ON SECOND CLICK
    } else {
        if (inputArr == likedWordsArr && d > -1) {
                likedWordsArr.splice(d, 1);
        }
    }

    /*localStorage.setItem(storage, JSON.stringify(inputArr));*/

    localStorage.setItem("knownWord", JSON.stringify(knownWordsArr));
    localStorage.setItem("doubtfulWord", JSON.stringify(doubtfulWordsArr));
    localStorage.setItem("unknownWord", JSON.stringify(unknownWordsArr));
    localStorage.setItem("likedWord", JSON.stringify(likedWordsArr));

};

console.log(doubtfulWordsArr);
console.log(knownWordsArr);
console.log(unknownWordsArr);
console.log(likedWordsArr);
console.log("test1")


//SETS STAR IF CURRENT WORD IS ALREADY IN THE FAVOURITE ARRAY 
const star = () => {
    let starPic = document.getElementById("like");
    if (likedWordsArr.includes(index)) {
        starPic.setAttribute("src", "img/like.png");
    } else {
        starPic.setAttribute("src", "img/unlike.png")
    }
};

//UPDATING DATA

const update = () => {
    let randomNum = Math.floor(Math.random() * currentArray.length);
    index = currentArray[randomNum];
    textContent();
    star();
};

update();

//DOWN PANEL

const greenBtn = document.getElementById("green");
greenBtn.addEventListener("click", () => {
    actionButtons(knownWordsArr);
    update();
});

const yellowBtn = document.getElementById("yellow");
yellowBtn.addEventListener("click", () => {
    actionButtons(doubtfulWordsArr)
    update();
});

const redBtn = document.getElementById("red");
redBtn.addEventListener("click", () => {
    actionButtons(unknownWordsArr);
    update();
});

const likeBtn = document.getElementById("like");
likeBtn.addEventListener("click", () => {
    actionButtons(likedWordsArr);
    star();
    update();
});


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
knownWordsBtn.addEventListener("click", () => {
    unHide();
    currentArray = knownWordsArr;
    update();
});

UnknownWordsBtn.addEventListener("click", () => {
    unHide();
    currentArray = unknownWordsArr;
    update();
});

doubtfulWordsBtn.addEventListener("click", () => {
    currentArray = doubtfulWordsArr;
    unHide();
    update();
});

favouriteWordsBtn.addEventListener("click", () => {
    currentArray = likedWordsArr;
    unHide();
    update();
})
