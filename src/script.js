let searchForm = document.getElementById("form-search");
let addForm = document.getElementById("form-add");
let createForm = document.getElementById("form-create");
let alertTextFirst = document.getElementById("text-alert-first");
let alertTextSecond = document.getElementById("text-alert-second");
let wordsCard = document.getElementById("card-words");
let searchedWordDescription = document.getElementById("word-searched-description");

function addNewWord() {
    createForm.classList.remove("visually-hidden");
}

let wordsList = {};
let wordInput = document.getElementById("word");
let descriptionInput = document.getElementById("description");
const isWordAdded = new Map();

function createNewWord() {
    let word = wordInput.value.toLowerCase();
    let description = descriptionInput.value.toLowerCase();

    if (word === "" || description === "") {
        alertTextSecond.classList.remove("visually-hidden");
        return;
    }

    if (!wordsList[word]) {
        wordsList[word] = [];
    }
    wordsList[word].push(description);

    console.log("New word added:", word, description);

    isWordAdded[word] = true;
    wordInput.value = "";
    descriptionInput.value = "";
    alertTextSecond.classList.add("visually-hidden");
    createForm.classList.add("visually-hidden");
}

function sortWords() {
    let sortedWords = Object.keys(wordsList).sort();
    let sortedWordsList = {};

    sortedWords.forEach(word => {
        sortedWordsList[word] = wordsList[word];
    });

    return sortedWordsList;
}


function displayWordsList() {
    wordsList = sortWords();
    wordsCard.innerHTML = "";

    for (let word in wordsList) {
        let wordListItem = document.createElement('li');
        wordListItem.classList.add("list-group-item", "my-2");
        wordListItem.style.width = "100%";

        let wordHeader = document.createElement("h5");
        wordHeader.classList.add("text-primary", "mx-5");
        wordHeader.textContent = word;

        let descriptionList = document.createElement("ul");
        descriptionList.classList.add("list-group", "list-group-flush", "mx-5", "border", "border-primary");
        wordsList[word].forEach((description, index) => {
            let descriptionItem = document.createElement("li");
            descriptionItem.classList.add("list-group-item", "border", "border-primary");
            descriptionItem.textContent = `${index + 1}. ${description}`;
            descriptionList.appendChild(descriptionItem);
        });

        wordListItem.appendChild(wordHeader);
        wordListItem.appendChild(descriptionList);
        wordsCard.appendChild(wordListItem);
    }

    wordsCard.classList.remove("visually-hidden");
}

function searchWord() {
    let searchedWord = document.getElementById("word-searched").value.toLowerCase();
    searchedWordDescription.innerHTML = "";
    alertTextFirst.classList.add("visually-hidden");

    if (isWordAdded[searchedWord]) {
        let wordListItem = document.createElement('li');
        wordListItem.classList.add("list-group-item", "my-2");
        wordListItem.style.width = "100%";

        let wordHeader = document.createElement("h5");
        wordHeader.classList.add("text-primary", "mx-5");
        wordHeader.textContent = searchedWord;

        let descriptionList = document.createElement("ul");
        descriptionList.classList.add("list-group", "list-group-flush", "mx-5", "border", "border-primary");
        wordsList[searchedWord].forEach((description, index) => {
            let descriptionItem = document.createElement("li");
            descriptionItem.classList.add("list-group-item", "border", "border-primary");
            descriptionItem.textContent = `${index + 1}. ${description}`;
            descriptionList.appendChild(descriptionItem);
        });

        wordListItem.appendChild(wordHeader);
        wordListItem.appendChild(descriptionList);
        searchedWordDescription.appendChild(wordListItem);

        searchedWordDescription.classList.remove("visually-hidden");
        alertTextFirst.classList.add("visually-hidden");
    } else {
        alertTextFirst.classList.remove("visually-hidden");
        searchedWordDescription.classList.add("visually-hidden");
    }
}
