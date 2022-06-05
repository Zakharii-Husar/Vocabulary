const textContent = (currentArray, index, allKeys) => {
    const id = (id) => {
        return document.getElementById(id)
    };
    fetch('../words.json')
        .then(response => response.json())
        .then(data => {
            //ARRAYS WITH REAL DATA FROM JSON
            const english = data[0];
            const transcription = data[1];
            const ukrainian = data[2];

            if (currentArray?.length) {
                id("word").textContent = english[index];
                id("transcription").textContent = transcription[index];
                id("flipside").textContent = ukrainian[index];
            }
            else {
                id("word").textContent = "no words";
                id("flipside").textContent = "немає слів";
                id("transcription").textContent = "";
            }
            id("knownList").textContent = `ВИВЧЕНІ: ${allKeys.knownWordsArr.length}`;
            id("unknownList").textContent = `НОВІ: ${allKeys.unknownWordsArr.length}`;
            id("doubtfulList").textContent = `ПОВТОРЕННЯ: ${allKeys.doubtfulWordsArr.length}`;
            id("favouriteList").textContent = `УЛЮБЛЕНІ: ${allKeys.likedWordsArr.length}`;

            id("menuHead").textContent = `НОВІ: ${allKeys.unknownWordsArr.length}`;

            if (currentArray == null) {
                id("menuHead").textContent = "ВИБЕРІТЬ СПИСОК";
            }
            if (currentArray == allKeys.knownWordsArr) {
                id("menuHead").textContent = `ВИВЧЕНІ: ${allKeys.knownWordsArr.length}`;
            }
            if (currentArray == allKeys.doubtfulWordsArr) {
                id("menuHead").textContent = `ПОВТОРЕННЯ: ${allKeys.doubtfulWordsArr.length}`;
            }
            if (currentArray == allKeys.likedWordsArr) {
                id("menuHead").textContent = `УЛЮБЛЕНІ: ${allKeys.likedWordsArr.length}`;
            }
        })
};

export default textContent;