import { englishArray, ukrainianArray, transcriptionArray } from "./words.js";

let knownWordsArr = [];
let doubtfulWordsArr = [];
let unknownWordsArr = [];
let likedWordsArr = [];
let currentArray = englishArray;

let index;

const textContent = () => {
    const word = document.getElementById("word");
    word.textContent = englishArray[index];
    const transcription = document.getElementById("transcription");
    transcription.textContent = transcriptionArray[index];
    const translation = document.getElementById("flipside");
    translation.textContent = ukrainianArray[index];
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
    };
    if (JSON.parse(localStorage.getItem("likedWord")) !== null) {
        likedWordsArr = JSON.parse(localStorage.getItem("likedWord"));
    };
})();

const actionButtons = (inputArr, storage) => {

    const removeFromArray = (targetArr) => {
        let i = targetArr.indexOf(index);
        if (i > -1) {
            targetArr.splice(i, 1);
        };
    }

    if (knownWordsArr.includes(index)) {
        removeFromArray(knownWordsArr)
    }
    else if (doubtfulWordsArr.includes(index)) {
        removeFromArray(doubtfulWordsArr)
    }
    else if (unknownWordsArr.includes(index)) {
        removeFromArray(index)
    };

    if (!inputArr.includes(index)) {
        inputArr.push(index);

    } else {
        if (inputArr == likedWordsArr) {
            removeFromArray(likedWordsArr);
        }
    }

    localStorage.setItem(storage, JSON.stringify(inputArr));

};

console.log(doubtfulWordsArr);
console.log(knownWordsArr);
console.log(unknownWordsArr);
console.log("notworking")


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
    actionButtons(knownWordsArr, "knownWord");
    update();
});

const yellowBtn = document.getElementById("yellow");
yellowBtn.addEventListener("click", () => {
    actionButtons(doubtfulWordsArr, "doubtfulWord")
    update();
});

const redBtn = document.getElementById("red");
redBtn.addEventListener("click", () => {
    update();
    actionButtons(unknownWordsArr, "unknownWord")
});

const likeBtn = document.getElementById("like");
likeBtn.addEventListener("click", () => {
    actionButtons(likedWordsArr, "likedWord");
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
    update();
};


menuBtn.addEventListener("click", () => {
    hide();
});

// MENU BUTTONS

const knownWordsBtn = document.getElementById("greenBtn");
knownWordsBtn.addEventListener("click", () => {
    unHide();
    currentArray = knownWordsArr;
});

const UnknownWordsBtn = document.getElementById("redBtn");
UnknownWordsBtn.addEventListener("click", () => {
    unHide();
    currentArray = unknownWordsArr;
});

const doubtfulWordsBtn = document.getElementById("yellowBtn");
doubtfulWordsBtn.addEventListener("click", () => {
    currentArray = doubtfulWordsArr;
    unHide();
});

const favouriteWordsBtn = document.getElementById("goldenBtn");
favouriteWordsBtn.addEventListener("click", () => {
    currentArray = likedWordsArr;
    unHide();

})
