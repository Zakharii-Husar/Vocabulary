# Vocabulary
Learning English vocabulary.
Imitates the cards for learning a language.
JSON contains 3 arrays with English words, Ukrainian translation and transcription.
JavaScript contains only arrays with numbers(indexes from 0 to 999), keys so to say to acces the words from JSON. At the beginning all indexes are at "unknownWordsArr"
but during learning process they pass to other arrays(lists);
Onload script checks if user already has  arrays with indexes saved in local storage, if so the arrays are updated.
Every time user changes location of a word its location is updated and saved to local storage.
