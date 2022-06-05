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

buttons(allKeys, currentArray, index);