import { setLocalData } from './localStorage.js';
import textContent from './textContent.js';
const buttons = (elementsDOM, allKeys, currentArray, index) => {
    let HEADERCOLOR = 'red';
    const actions = (moveTo) => {

        //REMOVING THE WORD FROM THE CURRENT LIST (EXCEPT WHEN ADDING TO FAVOURITES)
        if (moveTo !== allKeys.likedWordsArr &&
            currentArray !== moveTo &&
            currentArray !== allKeys.likedWordsArr) {
            currentArray.splice(currentArray.indexOf(index), 1);
        }


        //PUSHING THE WORD TO A NEW LIST
        if (!moveTo.includes(index) && index > -1) {
            moveTo.push(index);

            //DELETIG THE WORD FROM FAVOURITE LIST ON SECOND CLICK
        } else {
            if (moveTo == allKeys.likedWordsArr) {
                allKeys.likedWordsArr.splice(allKeys.likedWordsArr.indexOf(index), 1);
            }
        }

        //SAVING EDITED ARRAYS TO LOCAL STORAGE
        setLocalData(allKeys);

    };

    const like = () => {
        elementsDOM.likeBtn.addEventListener("click", () => {
            actions(allKeys.likedWordsArr, allKeys, currentArray, index);
        });
    }
    like();

    const flip = () => {
        elementsDOM.flipBtn.addEventListener("click", () => {
            card.classList.toggle("active");
        });
    };
    flip();

    const moveWord = (btn, arr) => {
        btn.addEventListener("click", () => {
            actions(arr, allKeys, currentArray, index);
            textContent(currentArray, index, allKeys, elementsDOM)
        });
    };
    moveWord(elementsDOM.greenBtn, allKeys.knownWordsArr);
    moveWord(elementsDOM.yellowBtn, allKeys.doubtfulWordsArr);
    moveWord(elementsDOM.redBtn, allKeys.unknownWordsArr);

    const changeVisibility = (obj, visibility) => {
        obj.style.display = visibility;
    };

    const showMenu = () => {
        elementsDOM.menuBtn.addEventListener("click", () => {
            currentArray = null;
            HEADERCOLOR = "darkblue";
            changeVisibility(card, "none");
            changeVisibility(elementsDOM.topPanel, "none");
            changeVisibility(elementsDOM.panel, "none");
            changeVisibility(elementsDOM.menu, "flex");
        });
    };
    showMenu();

    const switchList = (btn, arr, color) => {
        const hideMenu = () => {
            changeVisibility(card, "flex");
            changeVisibility(elementsDOM.topPanel, "flex");
            changeVisibility(elementsDOM.panel, "flex");
            changeVisibility(elementsDOM.menu, "none");
        };

        btn.addEventListener("click", () => {
            btn.style.boxShadow = "10px 5px 5px Highlight";
            setTimeout(() => {
                btn.style.boxShadow = "none";
                HEADERCOLOR = color;
                currentArray = arr;
                hideMenu();
                update();
            }, 300)
        })
    };

    switchList(elementsDOM.unknownWordsBtn, allKeys.unknownWordsArr, "red");
    switchList(elementsDOM.doubtfulWordsBtn, allKeys.doubtfulWordsArr, "yellow");
    switchList(elementsDOM.knownWordsBtn, allKeys.knownWordsArr, "green");
    switchList(elementsDOM.favouriteWordsBtn, allKeys.likedWordsArr, "darkgoldenrod");

    const update = () => {
        if (currentArray) index = currentArray[0];
        const star = () => {
            if (allKeys.likedWordsArr.includes(index)) {
                elementsDOM.starPic.setAttribute("src", "img/like.png");
            } else {
                elementsDOM.starPic.setAttribute("src", "img/unlike.png")
            }
        };
        star();
        elementsDOM.header.style.backgroundColor = HEADERCOLOR;
        textContent(currentArray, index, allKeys, elementsDOM);
    }
    update();

    document.addEventListener("click", update);
}

export default buttons;