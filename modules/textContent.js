const textContent = (currentArray, index, allKeys, elementsDOM) => {
    fetch('../words.json')
        .then(response => response.json())
        .then(data => {
            //ARRAYS WITH REAL DATA FROM JSON
            const english = data[0];
            const transcription = data[1];
            const ukrainian = data[2];

            if (currentArray?.length) {
                elementsDOM.word.textContent = english[index];
                elementsDOM.transcription.textContent = transcription[index];
                elementsDOM.translation.textContent = ukrainian[index];
            }
            else {
                elementsDOM.word.textContent = "no words";
                elementsDOM.translation.textContent = "немає слів";
                elementsDOM.transcription.textContent = "";
            }
            elementsDOM.knownWordsBtn.textContent = `ВИВЧЕНІ: ${allKeys.knownWordsArr.length}`;
            elementsDOM.unknownWordsBtn.textContent = `НОВІ: ${allKeys.unknownWordsArr.length}`;
            elementsDOM.doubtfulWordsBtn.textContent = `ПОВТОРЕННЯ: ${allKeys.doubtfulWordsArr.length}`;
            elementsDOM.favouriteWordsBtn.textContent = `УЛЮБЛЕНІ: ${allKeys.likedWordsArr.length}`;

            elementsDOM.header.textContent = `НОВІ: ${allKeys.unknownWordsArr.length}`;

            if (currentArray == null) {
                elementsDOM.header.textContent = "ВИБЕРІТЬ СПИСОК";
            }
            if (currentArray == allKeys.knownWordsArr) {
                elementsDOM.header.textContent = `ВИВЧЕНІ: ${allKeys.knownWordsArr.length}`;
            }
            if (currentArray == allKeys.doubtfulWordsArr) {
                elementsDOM.header.textContent = `ПОВТОРЕННЯ: ${allKeys.doubtfulWordsArr.length}`;
            }
            if (currentArray == allKeys.likedWordsArr) {
                elementsDOM.header.textContent = `УЛЮБЛЕНІ: ${allKeys.likedWordsArr.length}`;
            }
        })
};

export default textContent;