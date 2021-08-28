
fetch("words.json")
    .then(response => response.json())
    .then(data => {    
//GLOBAL VARIABLES
let englishArray;
let transcriptionArray;
let ukrainianArray;
let knownWordsArr = [];
let doubtfulWordsArr = [];
let unknownWordsArr = Array.from(Array(1000).keys());
let likedWordsArr = [];
        let currentArray = unknownWordsArr;
        console.log("ive made it!!!")
        //RETRIEVING DATA FROM JSON AND STORING TO THE ARRAYS
        englishArray = data[0];
        transcriptionArray = data[1];
        ukrainianArray = data[2];

const knownWordsBtn = document.getElementById("greenBtn");
const UnknownWordsBtn = document.getElementById("redBtn");
const doubtfulWordsBtn = document.getElementById("yellowBtn");
const favouriteWordsBtn = document.getElementById("goldenBtn");

let index = 0;

//CHANGING TEXT OF THE WORD, TRANSLATION AND TRANSCRIPTION
const textContent = () => {
    const word = document.getElementById("word");
    const transcription = document.getElementById("transcription");
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
};

//SETS STAR IF CURRENT WORD IS ALREADY IN THE FAVOURITE ARRAY 
const star = () => {
    let starPic = document.getElementById("like");
    if (likedWordsArr.includes(index)) {
        starPic.setAttribute("src", "img/like.png");
    } else {
        starPic.setAttribute("src", "img/unlike.png")
    }
};

const update = () => {
    let randomNum = Math.floor(Math.random() * currentArray.length);
    index = currentArray[randomNum];
    textContent();
    star();
};

update();

//GETTING DATA FROM PREVIOUS SESSION IF POSSIBLE 
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

const card = document.getElementsByClassName("toggle")[0];

const flipBtn = document.getElementById("flip");
flipBtn.addEventListener("click", () => {
    card.classList.toggle("active");
});

//MENU
menuBtn.addEventListener("click", () => {
    hide();
    update();
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
    });