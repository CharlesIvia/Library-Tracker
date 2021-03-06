const table = document.querySelector("tbody");
const addTitle = document.getElementById("addTitle");
const addAuthor = document.getElementById("addAuthor");
const addPages = document.getElementById("addPages");
const addRead = document.getElementById("addRead");
const addButton = document.querySelector(".addBookBtn");
const removeButton = document.querySelector(".remove");
const toggleAddBook = document.querySelector(".showBookForm");
const addForm = document.querySelector(".bookForm");

addButton.addEventListener("click", addBookBar);
toggleAddBook.addEventListener("click", showAddBook);

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

let myLibrary = [];

addBooktoLibrary("The Great Gatsby", "F.Scot Fitzgerald", 271, true);
addBooktoLibrary("Antifragile Things", "Nassim Taleb", 675, true);
addBooktoLibrary("The Way of Kings", "Brandon Sanderson", 12375, false);

function addBooktoLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  clearTable();
  render();
}

function render() {
  //Grabs each book
  myLibrary.forEach((element) => {
    let newRow = document.createElement("tr");
    newRow.setAttribute("class", "book_" + myLibrary.indexOf(element));

    //Grabs books key
    for (const key in element) {
      let newData = document.createElement("td");

      //Makes Read Button
      if (key == "read") {
        let readButton = document.createElement("input");
        readButton.type = "button";
        readButton.addEventListener("click", () => toggleRead(newRow));

        if (element[key]) {
          readButton.value = "Read";
          readButton.setAttribute("class", "bookRead");
          readButton.setAttribute("style", "font-family:Raleway,sans-serif");
        } else {
          readButton.value = "Not Read";
          readButton.setAttribute("class", "bookUnRead");
          readButton.setAttribute("style", "font-family:Raleway,sans-serif");
        }
        newData.appendChild(readButton);
        newRow.appendChild(newData);
        //Fills rest of info
      } else {
        newData.innerHTML = element[key];
        newRow.appendChild(newData);
      }
    }
    table.appendChild(newRow);
  });
  addRemoveButton();
}

function clearTable() {
  while (table.hasChildNodes()) {
    table.removeChild(table.lastChild);
  }
}

function addBookBar() {
  let newTitle = addTitle.value;
  let newAuthor = addAuthor.value;
  let newPages = addPages.value;
  let newRead;
  if (addRead.value === "true") {
    newRead = true;
  } else {
    newRead = false;
  }
  //If inputs invalid returns
  if (
    newTitle === "" ||
    newAuthor === "" ||
    newPages === "" ||
    hasNumbers(newAuthor) ||
    hasLetters(newPages)
  ) {
    document.querySelector(".warning").setAttribute("style", "display:block");
    return;
  }

  document.querySelector(".warning").setAttribute("style", "display:none");
  addBooktoLibrary(newTitle, newAuthor, newPages, newRead);
  showAddBook();
}

function addRemoveButton() {
  let amount = myLibrary.length;

  for (let i = 0; i < amount; i++) {
    let tableRow = document.querySelector(".book_" + i);
    let makeTD = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.value = "Remove";
    deleteButton.addEventListener("click", () => deleteBook(tableRow));
    makeTD.appendChild(deleteButton);
    tableRow.appendChild(makeTD);
  }
}

function deleteBook(element) {
  let bookIndex = element.className.slice(5, 6);

  myLibrary.splice(bookIndex, 1);
  clearTable();
  render();
}

function toggleRead(element) {
  let bookIndex = element.className.slice(5, 6);
  let readStatus = myLibrary[bookIndex].read;
  let button = element.querySelector("input");

  if (readStatus) {
    myLibrary[bookIndex].read = false;
    button.setAttribute("class", "Not Read");
    button.setAttribute("value", "Not Read");
    button.setAttribute("style", "font-family:Raleway,sans-serif");
  } else {
    myLibrary[bookIndex].read = true;
    button.setAttribute("class", "Read");
    button.setAttribute("value", "Read");
    button.setAttribute("style", "font-family:Raleway,sans-serif");
  }
}

function showAddBook() {
  if (addForm.style.display == "flex") {
    addForm.setAttribute("style", "display: none");
    //addForm.setAttribute('style', 'font-family:Raleway,sans-serif');
  } else {
    addForm.setAttribute("style", "display: flex", "margin-top: 90px");
    //addForm.setAttribute('style', 'font-family:Raleway,sans-serif');
  }
}

function hasLetters(string) {
  var regex = /\D/g;
  return regex.test(string);
}
function hasNumbers(string) {
  var regex = /\d/g;
  return regex.test(string);
}
