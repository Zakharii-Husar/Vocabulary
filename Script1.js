import { getLocalData, setLocalData } from './modules/localStorage.js';
import textContent from './modules/textContent.js';

//ARRAYS WITH INDEXES TO ACCES ARRAYS FROM JSON
const ALLKEYS = {
    knownWordsArr: [],
    doubtfulWordsArr: [],
    unknownWordsArr: Array.from(Array(1000).keys()),
    likedWordsArr: []
};
//GETTING DATA FROM LOCAL STORAGE FROM PREVIOUS SESSION IF PRESENT
getLocalData(ALLKEYS);

let CURRENTARRAY = ALLKEYS.unknownWordsArr;
let INDEX = 0;
let HEADERCOLOR = 'red';

const id = (id) => {
    return document.getElementById(id)
};

const update = () => {
    if (CURRENTARRAY) INDEX = CURRENTARRAY[0];

    const star = () => {
        if (ALLKEYS.likedWordsArr.includes(INDEX)) {
            id("like").setAttribute("src", "img/like.png");
        } else {
            id("like").setAttribute("src", "img/unlike.png");
        }
    };

    star();

    id("menuHead").style.backgroundColor = HEADERCOLOR;

    textContent(CURRENTARRAY, INDEX, ALLKEYS);
}
update();

document.addEventListener("click", update);

const actions = (moveTo, swipeDirection) => {

    const toggleLike = () => {
        if (!moveTo.includes(INDEX)) {
            moveTo.push(INDEX);
        }
        else {
            ALLKEYS.likedWordsArr.splice(ALLKEYS.likedWordsArr.indexOf(INDEX), 1);
        }
    };

    const move = () => {
        if (CURRENTARRAY !== moveTo &&
            CURRENTARRAY !== ALLKEYS.likedWordsArr) {
            CURRENTARRAY.splice(CURRENTARRAY.indexOf(INDEX), 1);
            moveTo.push(INDEX);
        }
    }

    const swipe = () => {
        if (swipeDirection == "right") {
            const firstElement = CURRENTARRAY.shift();
            CURRENTARRAY.push(firstElement);
        }
        if (swipeDirection == "left") {
            const lastElement = CURRENTARRAY.pop();
            CURRENTARRAY.unshift(lastElement);
        }
    };

    if (INDEX > -1) {
        if (moveTo == ALLKEYS.likedWordsArr && !swipeDirection) {
            toggleLike();
        }
        else {
            move();
            swipe();
        }
    }

    //SAVING EDITED ARRAYS TO LOCAL STORAGE
    setLocalData(ALLKEYS);

};

const swipeCardAnimation = (btn, swipeDirection, arr) => {
    id(btn).addEventListener("click", () => {
        if (arr !== CURRENTARRAY) {
            actions(CURRENTARRAY, swipeDirection);
            id("card").classList.add("swipe" + swipeDirection);
            setTimeout(() => { id("card").classList.remove("swipe" + swipeDirection); }, 1000)
        }

    });

}

swipeCardAnimation("arrowRight", "right");
swipeCardAnimation("arrowLeft", "left");

const moveWord = (btn, arr) => {
    swipeCardAnimation(btn, "down", arr);
    id(btn).addEventListener("click", () => {
        actions(arr, "down");
    });
};
moveWord("know", ALLKEYS.knownWordsArr);
moveWord("doubt", ALLKEYS.doubtfulWordsArr);
moveWord("dontKnow", ALLKEYS.unknownWordsArr);

const like = () => {
    id("like").addEventListener("click", () => {
        actions(ALLKEYS.likedWordsArr);
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
        CURRENTARRAY = null;
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
            CURRENTARRAY = arr;
            update();
        }, 300)
    })
};

switchList(id("unknownList"), ALLKEYS.unknownWordsArr, "red");
switchList(id("doubtfulList"), ALLKEYS.doubtfulWordsArr, "yellow");
switchList(id("knownList"), ALLKEYS.knownWordsArr, "green");
switchList(id("favouriteList"), ALLKEYS.likedWordsArr, "darkgoldenrod");