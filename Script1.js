﻿
fetch("words.json")
    .then(response => response.json())
    .then(data => {    
//GLOBAL VARIABLES
        //ARRAYS WITH REAL DATA FROM JSON
let englishArray;
let transcriptionArray;
let ukrainianArray;
        //ARRAYS WITH INDEXES TO ACCES ARRAYS FROM JSON
let knownWordsArr = [];
let doubtfulWordsArr = [];
let unknownWordsArr = Array.from(Array(1000).keys());
let likedWordsArr = [];
        //CURRENT ARRAY = ARRAY WITH INDEXES; INDEX = INDEX OF CURRENT ARRAY;
let currentArray = unknownWordsArr;
let index = 0;
     //DOM ELEMENTS
        //MENU BUTTONS 
const knownWordsBtn = document.getElementById("greenBtn");
const UnknownWordsBtn = document.getElementById("redBtn");
const doubtfulWordsBtn = document.getElementById("yellowBtn");
const favouriteWordsBtn = document.getElementById("goldenBtn");

const transcription = document.getElementById("transcription");
const header = document.getElementById("menuHead");

let HeaderColor = "red";

        //RETRIEVING DATA FROM JSON AND STORING TO THE ARRAYS
        englishArray = data[0];
        transcriptionArray = data[1];
        ukrainianArray = data[2];

        //GETTING DATA FROM LOCAL STORAGE FROM PREVIOUS SESSION IF POSSIBLE
        //const retrievingLocalData = (() => {
        //    if (JSON.parse(localStorage.getItem("knownWord")) !== null) {
        //        knownWordsArr = JSON.parse(localStorage.getItem("knownWord"));
        //    };
        //    if (JSON.parse(localStorage.getItem("doubtfulWord")) !== null) {
        //        doubtfulWordsArr = JSON.parse(localStorage.getItem("doubtfulWord"));
        //    };
        //    if (JSON.parse(localStorage.getItem("unknownWord")) !== null) {
        //        unknownWordsArr = JSON.parse(localStorage.getItem("unknownWord"));
        //    };
        //    if (JSON.parse(localStorage.getItem("likedWord")) !== null) {
        //        likedWordsArr = JSON.parse(localStorage.getItem("likedWord"));
        //    };
        //})();

        const retrievingLocalData = (dataArr, localData) => {
            if (JSON.parse(localStorage.getItem(localData)) !== null) {
                dataArr = JSON.parse(localStorage.getItem(localData));
            };
        };
        retrievingLocalData(knownWordsArr, "knownWord");
        retrievingLocalData(doubtfulWordsArr, "doubtfulWord");
        retrievingLocalData(unknownWordsArr, "unknownWord");
        retrievingLocalData(likedWordsArr, "likedWord");

        console.log("work bitch!!!")

//CHANGING TEXT OF THE ELEMENTS
const textContent = () => {
    const word = document.getElementById("word");
    const translation = document.getElementById("flipside");

    if (currentArray.length !== 0) {
        word.textContent = englishArray[index];
        transcription.textContent = transcriptionArray[index];
        translation.textContent = ukrainianArray[index];
    }
    else {
        word.textContent = "no words";
        translation.textContent = "немає слів";
        transcription.textContent = "";
    }
    knownWordsBtn.textContent = `ВИВЧЕНІ: ${knownWordsArr.length}`;
    UnknownWordsBtn.textContent = `НОВІ: ${unknownWordsArr.length}`;
    doubtfulWordsBtn.textContent = `ПОВТОРЕННЯ: ${doubtfulWordsArr.length}`;
    favouriteWordsBtn.textContent = `УЛЮБЛЕНІ: ${likedWordsArr.length}`;

    if (HeaderColor == "darkblue") {
        header.textContent = "ВИБЕРІТЬ СПИСОК";
    }
    else {
        if (currentArray == knownWordsArr) {
            header.textContent = `ВИВЧЕНІ: ${knownWordsArr.length}`;
        }
        else if (currentArray == doubtfulWordsArr) {
            header.textContent = `ПОВТОРЕННЯ: ${doubtfulWordsArr.length}`;
        }
        else if (currentArray == likedWordsArr) {
            header.textContent = `УЛЮБЛЕНІ: ${likedWordsArr.length}`;
        }
        else {
            header.textContent = `НОВІ: ${unknownWordsArr.length}`;
        }
    }
};

//SETS STAR ON CLICK OR IF CURRENT WORD IS ALREADY IN THE FAVOURITE ARRAY 
const star = () => {
    let starPic = document.getElementById("like");
    if (likedWordsArr.includes(index)) {
        starPic.setAttribute("src", "img/like.png");
    } else {
        starPic.setAttribute("src", "img/unlike.png")
    }
        };

const headerStyle = () => {
            header.style.backgroundColor = HeaderColor;
            if (HeaderColor == "darkblue") {
                header.style.color = "white";
            }
            else {
                header.style.color = "black";
            }
        }

const update = () => {
    let randomNum = Math.floor(Math.random() * currentArray.length);
    index = currentArray[randomNum];
    headerStyle();
    textContent();
    star();
};

update();

const actionButtons = (inputArr) => {
    //REMOVING THE WORD FROM WHENEVER IT MIGHT BE BEFORE ADDING TO A NEW LIST
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

    //PUSHING THE WORD TO A NEW LIST
    if (!inputArr.includes(index) && index > -1) {
        inputArr.push(index);

        //DELETIG THE WORD FROM FAVOURITE LIST ON SECOND CLICK
    } else {
        if (inputArr == likedWordsArr && d > -1) {
                likedWordsArr.splice(d, 1);
        }
    }

    //SAVING EDITED ARRAYS TO LOCAL STORAGE

    localStorage.setItem("knownWord", JSON.stringify(knownWordsArr));
    localStorage.setItem("doubtfulWord", JSON.stringify(doubtfulWordsArr));
    localStorage.setItem("unknownWord", JSON.stringify(unknownWordsArr));
    localStorage.setItem("likedWord", JSON.stringify(likedWordsArr));

};

//THE BUTTONS ON BOTTOM PANEL

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

//FUNCTIONS FOR SWITCHING BETWEEN MENU AND THE CARD
const menuBtn = document.getElementById("menuBtn");
const topPanel = document.getElementById("topPanel");
const panel = document.getElementById("panel");
const menu = document.getElementById("menu");

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

//THE BUTTONS ON TOP PANEL

//LIKE
const likeBtn = document.getElementById("like");
likeBtn.addEventListener("click", () => {
    actionButtons(likedWordsArr);
    star();
});

//FLIP

const flipBtn = document.getElementById("flip");
flipBtn.addEventListener("click", () => {
    card.classList.toggle("active");
});

//THE BUTTON SWITCHING TO MENU
        menuBtn.addEventListener("click", () => {
            HeaderColor = "darkblue";
    hide();
    update();
});

// MENU BUTTONS
        const buttonEffect = (btn, arr, color) => {
            btn.addEventListener("click", () => {
                btn.style.boxShadow = "10px 5px 5px black";
                btn.style.padding = "6%";
                setTimeout(() => {
                    btn.style.boxShadow = "none";
                    btn.style.padding = "5%";
                    HeaderColor = color;
                    currentArray = arr;
                    unHide();
                    update();
                }, 300)
            })
        };

        buttonEffect(UnknownWordsBtn, unknownWordsArr, "red");
        buttonEffect(doubtfulWordsBtn, doubtfulWordsArr, "yellow");
        buttonEffect(knownWordsBtn, knownWordsArr, "green");
        buttonEffect(favouriteWordsBtn, likedWordsArr, "darkgoldenrod");



    });