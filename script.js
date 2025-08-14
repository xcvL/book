const bookmarkTrigger = document.getElementById("bookmark");
const remove = document.getElementById("remove");
const move = document.getElementById("move");
const canvas = document.getElementById("text");

let createNextClick = false;
let currentObject = null;

const STORAGE_KEY = "persistedObjectY"

function restorageObject() {
    const savedY = localStorage.getItem(STORAGE_KEY);
    if(savedY !== null) {
        createObjectAtY(parseInt(savedY, 10));
    }
}

function createObjectAtY(y) {
    if(currentObject && currentObject.parentNode) {
        currentObject.remove();
    }

    const bookmarker = document.createElement("div");
    bookmarker.className = "bookmarker-style";
    bookmarker.style.top = `${y}px`;

    canvas.appendChild(bookmarker);
    currentObject = bookmarker
}

bookmarkTrigger.addEventListener("click", (e) => {
    createNextClick = true;
});

canvas.addEventListener("click", (e) => {
    if(!createNextClick) return;

    const y = e.clientY + window.scrollY;

    createObjectAtY(y);

    localStorage.setItem(STORAGE_KEY, y);

    createNextClick = false;
});

remove.addEventListener("click", () => {
    if(currentObject && currentObject.parentNode) {
        currentObject.remove();
        currentObject = null;
    }
    localStorage.removeItem(STORAGE_KEY);
});

move.addEventListener("click", () => {
    const savedY = localStorage.getItem(STORAGE_KEY);
    if(savedY !== null) {
        window.scrollTo({
            top: parseInt(savedY, 10) - window.innerHeight / 2,
            behavior: "smooth"
        });
    }
})

window.addEventListener("load", restorageObject);