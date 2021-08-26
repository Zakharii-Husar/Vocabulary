import { englishArray, ukrainianArray, transcriptionArray } from "./words.js";

let knownWordsArr = [];
let doubtfulWordsArr = [];
let unknownWordsArr = englishArray;
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




//SAVING TO LOCAL STORAGE
const retrievingData = (() => {
    if (JSON.parse(localStorage.getItem("knownWord")) !== null) {
        knownWordsArr = JSON.parse(localStorage.getItem("knownWord"));
    };
    if (JSON.parse(localStorage.getItem("doubtfulWord")) !== null) {
        doubtfulWordsArr = JSON.parse(localStorage.getItem("doubtfulWord"));
    };
    if (JSON.parse(localStorage.getItem("unknownWord")) !== null) {
        unknownWordsArr = JSON.parse(localStorage.getItem("unknownWord"));
    } else {
        unknownWordsArr = englishArray;
    }

    if (JSON.parse(localStorage.getItem("likedWord")) !== null) {
        likedWordsArr = JSON.parse(localStorage.getItem("likedWord"));
    };
})();

const actionButtons = (inputArr) => {


    if (knownWordsArr.includes(index)) {
        let a = knownWordsArr.indexOf(index);
        if (a > -1) {
            knownWordsArr.splice(a, 1);
        };
    }

    if (unknownWordsArr.includes(index)) {
        let b = unknownWordsArr.indexOf(index);
        if (b > -1) {
            unknownWordsArr.splice(b, 1);
        };
    }

    if (doubtfulWordsArr.includes(index)) {
        let c = doubtfulWordsArr.indexOf(index);
        if (c > -1) {
            doubtfulWordsArr.splice(c, 1);
        };
    }
    if (!inputArr.includes(index) && index !== null) {
        inputArr.push(index);

    } else {
        if (inputArr == likedWordsArr) {
            let j = likedWordsArr.indexOf(index);
            if (j > -1) {
                likedWordsArr.splice(j, 1);
            };
        }
    }

    /*localStorage.setItem(storage, JSON.stringify(inputArr));*/



};

localStorage.setItem("knownWord", JSON.stringify(knownWordsArr));
localStorage.setItem("doubtfulWord", JSON.stringify(doubtfulWordsArr));
localStorage.setItem("unknownWord", JSON.stringify(unknownWordsArr));
localStorage.setItem("likedWord", JSON.stringify(likedWordsArr));

console.log(doubtfulWordsArr);
console.log(knownWordsArr);
console.log(unknownWordsArr);
console.log(likedWordsArr);
console.log("test18")


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
    if (currentArray == englishArray) {
        index = randomNum;
    }
    else
    {
        index = currentArray[randomNum];
    }
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
    update();
    actionButtons(unknownWordsArr)
});

const likeBtn = document.getElementById("like");
likeBtn.addEventListener("click", () => {
    actionButtons(likedWordsArr);
    star();
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
