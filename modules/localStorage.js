//GETTING DATA FROM LOCAL STORAGE FROM PREVIOUS SESSION IF PRESENT
//problem in getting local data
const getLocalData = (allKeys) => {
    if (JSON.parse(localStorage.getItem("knownWord")) !== null) {
        allKeys.knownWordsArr = JSON.parse(localStorage.getItem("knownWord"));
    };
    if (JSON.parse(localStorage.getItem("doubtfulWord")) !== null) {
        allKeys.doubtfulWordsArr = JSON.parse(localStorage.getItem("doubtfulWord"));
    };
    if (JSON.parse(localStorage.getItem("unknownWord")) !== null) {
        allKeys.unknownWordsArr = JSON.parse(localStorage.getItem("unknownWord"));
    };
    if (JSON.parse(localStorage.getItem("likedWord")) !== null) {
        allKeys.likedWordsArr = JSON.parse(localStorage.getItem("likedWord"));
    };
}
;
const setLocalData = ({knownWordsArr, doubtfulWordsArr, unknownWordsArr, likedWordsArr}) => {

    //SAVING UPDATED ARRAYS TO LOCAL STORAGE
    const update = (key, arr) => {
        localStorage.setItem(key, JSON.stringify(arr))
    }
    update("knownWord", knownWordsArr);
    update("doubtfulWord", doubtfulWordsArr);
    update("unknownWord", unknownWordsArr);
    update("likedWord", likedWordsArr);
};

export { getLocalData, setLocalData };