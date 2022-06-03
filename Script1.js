import { getLocalData } from './modules/localStorage.js';
import buttons from './modules/buttons.js';

//ARRAYS WITH INDEXES TO ACCES ARRAYS FROM JSON
const allKeys = {
    knownWordsArr: [],
    doubtfulWordsArr: [],
    unknownWordsArr: Array.from(Array(1000).keys()),
    likedWordsArr: []
};

//GETTING DATA FROM LOCAL STORAGE FROM PREVIOUS SESSION IF PRESENT
getLocalData(allKeys);

let currentArray = allKeys.unknownWordsArr;
let index = 0;
//DOM ELEMENTS
const elementsDOM = {
    knownWordsBtn: greenBtn,
    unknownWordsBtn: document.getElementById("redBtn"),
    doubtfulWordsBtn: document.getElementById("yellowBtn"),
    favouriteWordsBtn: document.getElementById("goldenBtn"),
    transcription: document.getElementById("transcription"),
    header: document.getElementById("menuHead"),
    starPic: document.getElementById("like"),
    greenBtn: document.getElementById("green"),
    yellowBtn: document.getElementById("yellow"),
    redBtn: document.getElementById("red"),
    menuBtn: document.getElementById("menuBtn"),
    topPanel: document.getElementById("topPanel"),
    panel: document.getElementById("panel"),
    menu: document.getElementById("menu"),
    likeBtn: document.getElementById("like"),
    flipBtn: document.getElementById("flip"),
    word: document.getElementById("word"),
    translation: document.getElementById("flipside")
}

buttons(elementsDOM, allKeys, currentArray, index);