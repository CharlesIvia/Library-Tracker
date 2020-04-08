let myLibrary = [];
let addBook;
let libraryRender;
let removeBook;
let booksCreated = 3;

const deleteBtns = document.querySelectorAll('.del-btn');
const addBtn = document.querySelector('.add-btn');
let libraryTable = document.querySelector('.library-list');
const confirmBtn = document.querySelector('.confirm-btn')

deleteBtns.forEach(button => button.addEventListener('click', removeBook));

confirmBtn.addEventListener('click', button => {

});

addBtn.addEventListener('click', button => {
    
});

function Book(title, author, pages, status, action) {
    this.id = booksCreated;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.action = action;

    booksCreated+=1
};
