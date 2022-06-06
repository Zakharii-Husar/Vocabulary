import { getLocalData, setLocalData } from './modules/localStorage.js';
import textContent from './modules/textContent.js';

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

    let HEADERCOLOR = 'red';

    const id = (id) => {
        return document.getElementById(id)
    };
    
    const update = () => {
        if (currentArray) index = currentArray[0];
        const star = () => {
            if (allKeys.likedWordsArr.includes(index)) {
                id("like").setAttribute("src", "img/like.png");
            } else {
                id("like").setAttribute("src", "img/unlike.png");
            }
        };
        star();
        id("menuHead").style.backgroundColor = HEADERCOLOR;
        textContent(currentArray, index, allKeys);
    }
    update();

    document.addEventListener("click", update);

    const actions = (moveTo, swipeDirection) => {

        const toggleLike = () => {
            if (!moveTo.includes(index)) {
                moveTo.push(index);
            }
            else {
                allKeys.likedWordsArr.splice(allKeys.likedWordsArr.indexOf(index), 1);
            }
        };

        const move = () => {
            if (currentArray !== moveTo &&
                currentArray !== allKeys.likedWordsArr) {
                currentArray.splice(currentArray.indexOf(index), 1);
                moveTo.push(index);
            }
        }

        const swipe = () => {
            if (swipeDirection == "right") {
                const firstElement = currentArray.shift();
                currentArray.push(firstElement);
            }
            if (swipeDirection == "left") {
                const lastElement = currentArray.pop();
                currentArray.unshift(lastElement);
            }
        };

        if (index > -1) {
            if (moveTo == allKeys.likedWordsArr && !swipeDirection) {
                toggleLike();
            }
            else {
                move();
                swipe();
            }
        }

        //SAVING EDITED ARRAYS TO LOCAL STORAGE
        setLocalData(allKeys);

    };

    const swipeCardAnimation = (btn, swipeDirection, arr) => {
        id(btn).addEventListener("click", () => {
            if(arr !== currentArray){
                actions(currentArray, swipeDirection);
                id("card").classList.add("swipe" + swipeDirection);
                setTimeout(() => { id("card").classList.remove("swipe" + swipeDirection); }, 1000)
            }

        });

    }

    swipeCardAnimation("arrowRight", "right");
    swipeCardAnimation("arrowLeft", "left");

    const moveWord = (btn, arr) => {
        id(btn).addEventListener("click", () => {
            swipeCardAnimation(btn, "down", arr);
            actions(arr, "down");
        });
    };
    moveWord("know", allKeys.knownWordsArr);
    moveWord("doubt", allKeys.doubtfulWordsArr);
    moveWord("dontKnow", allKeys.unknownWordsArr);

    const like = () => {
        id("like").addEventListener("click", () => {
            actions(allKeys.likedWordsArr);
        });
    }
    like();

    const flip = () => {
        id("flip").addEventListener("click", () => {
            id("card").classList.toggle("flip");
            setTimeout(() => { id("transcription").classList.toggle("active"); }, 150)
        });
    };
    flip();

    const changeVisibility = (obj, visibility) => {
        obj.style.display = visibility;
    };

    const showMenu = () => {
        id("menuBtn").addEventListener("click", () => {
            currentArray = null;
            HEADERCOLOR = "darkblue";
            changeVisibility(card, "none");
            changeVisibility(id("topPanel"), "none");
            changeVisibility(id("panel"), "none");
            changeVisibility(id("menu"), "flex");
            changeVisibility(id("arrows"), "none");
        });
    };
    showMenu();

    const switchList = (btn, arr, color) => {
        const hideMenu = () => {
            changeVisibility(card, "flex");
            changeVisibility(id("topPanel"), "flex");
            changeVisibility(id("panel"), "flex");
            changeVisibility(id("menu"), "none");
            changeVisibility(id("arrows"), "flex");
        };

        btn.addEventListener("click", () => {
            btn.style.boxShadow = "10px 5px 5px Highlight";
            setTimeout(() => {
                btn.style.boxShadow = "none";
                HEADERCOLOR = color;
                hideMenu();
                currentArray = arr;
                update();
            }, 300)
        })
    };

    switchList(id("unknownList"), allKeys.unknownWordsArr, "red");
    switchList(id("doubtfulList"), allKeys.doubtfulWordsArr, "yellow");
    switchList(id("knownList"), allKeys.knownWordsArr, "green");
    switchList(id("favouriteList"), allKeys.likedWordsArr, "darkgoldenrod");