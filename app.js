"use strict";

const header = document.querySelector(".header-container");
const addBook = document.querySelector(".btn1");

const closeBtn = document.querySelector(".btn3");
const bookInfo = document.querySelector(".add-book");

addBook.addEventListener("click", () => {
  header.classList.add("active");
  bookInfo.classList.remove("active");
});

closeBtn.addEventListener("click", () => {
  header.classList.remove("active");
  bookInfo.classList.add("active");
});

let myLibrary = [
  // new Book("The Lord of the Rings", "J.R.R. Tolkien", 1954),
  // new Book("The Lord of the Rings", "J.R.R. Tolkien", 1954),
  // new Book("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 1979),
  // new Book("The Lord of the Rings", "J.R.R. Tolkien", 1954),
];

// Load books from localStorage when the page loads
window.addEventListener("load", () => {
  const storedLibrary = localStorage.getItem("myLibrary");
  if (storedLibrary) {
    myLibrary = JSON.parse(storedLibrary);
    displayBooks(myLibrary); // Display the loaded books
  }
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function saveLibraryToLocalStorage() {
  // Save myLibrary to localStorage
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function addBookToLibrary(book) {
  myLibrary.push(book);

  // Clear the form fields.
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#page").value = "";
  document.querySelector("#status").checked;

  displayBooks(myLibrary); // Display the updated library
  saveLibraryToLocalStorage(); // Save the updated library to localStorage
}

function addBookFormSubmit() {
  // Get the form Data
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#page").value;
  let read = document.querySelector("#status").checked;

  // Create a new Book object with the form data.
  let newBook = new Book(title, author, pages, read);

  // Add the new book to the library.
  addBookToLibrary(newBook);
}

const addBookForm = document.getElementById("add-book-form");
addBookForm.addEventListener("submit", (event) => {
  bookInfo.classList.add("active");
  header.classList.remove("active");

  // Prevent the form from submitting to the server.
  event.preventDefault();

  addBookFormSubmit();
});

function displayBooks(books) {
  // Get the container element where we will display the books.
  const container = document.querySelector("#book-container");
  // const status = document.querySelector("#status");

  // Clear the container before adding the updated books.
  container.innerHTML = "";

  // Create a card for each book.
  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    const card = document.createElement("div");
    card.classList.add("book-card");

    const screen = document.createElement("div");
    screen.classList.add("screen");
    card.appendChild(screen);

    // Add the book title to the card.
    const title = document.createElement("h3");
    title.classList.add("title");
    title.innerText = book.title;
    screen.appendChild(title);

    // Add the book author to the card.
    const author = document.createElement("p");
    author.innerText = `by ${book.author}`;
    card.appendChild(author);

    // Add the book release date to the card.
    const pages = document.createElement("p");
    pages.innerText = `${book.pages} pages`;
    card.appendChild(pages);

    // Add the Delete button COntainer
    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    buttons.style.display = "flex";
    buttons.style.justifyContent = "space-between";
    card.appendChild(buttons);

    // Add a delete button to the card.
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      const response = confirm("Do you want to delete this file?");

      if (response) {
        // Remove the book from myLibrary array   // Delete the file.
        myLibrary.splice(i, 1);
      } else {
        // Do nothing.
      }

      // Update the display and localStorage
      displayBooks(myLibrary);
      saveLibraryToLocalStorage();
    });
    buttons.appendChild(deleteButton);

    //Add a Status button wether read the book or not
    const status = document.createElement("button");
    const status1 = document.querySelector(".or");
    book.read === true
      ? ((status.innerText = "Read"), (status1.innerText = "Read"))
      : ((status.innerText = "Not Read"), (status1.innerText = "Not Read"));
    buttons.appendChild(status);

    status1.addEventListener("click", () => {
      alert("HI");
    });

    // Add the card to the container element.
    container.appendChild(card);
  }
}
