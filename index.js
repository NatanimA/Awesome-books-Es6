/* eslint-disable max-classes-per-file */
import localStorage from './modules/localStorage'
import BookObject from './modules/bookClass'
import CreateBookElement from './modules/createElement';


const btn = document.querySelector('#btn');
const list = document.querySelector('.list');
const form = document.querySelector('form');




CreateBookElement.createBookElement();

btn.addEventListener('click', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    let status = true;
    const bookCard = new BookObject(title, author);
    const booksList = localStorage.getBooks();
    for (let i = 0; i < booksList.length; i += 1) {
        if (title.value === booksList[i].title && author.value === booksList[i].author) {
            status = false;
            alert('Book already exists please add a new one');
        }
    }
    if (status) {
        ClassLocalStorage.addBooks(bookCard);
        const bookContainer = document.createElement('div');
        bookContainer.className = 'books';
        bookContainer.innerHTML = `<h2 id="title-name">${bookCard.title}</h2><p id="author-name">${bookCard.author}</p> <button class="remove-btn">Remove</button>`;
        list.appendChild(bookContainer);
    }
    form.reset();
});

const removeBtn = document.querySelector('.list');

removeBtn.addEventListener('click', (event) => {
    event.target.parentElement.className = 'delete';
    const title = event.target.parentElement.firstElementChild.textContent;
    event.target.parentElement.remove();
    const author = event.target.parentElement.firstElementChild.nextElementSibling.textContent;
    const books = localStorage.getBooks();
    const filtered = books.filter((book) => book.title !== title || book.author !== author);
    localStorage.setItem('booksData', JSON.stringify(filtered));
});

// Adding Navigation
const navLinksContainer = document.querySelector('.nav-links');
const navListContent = document.querySelectorAll('.nav-list-content');

navLinksContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.nav-link');
    if (!clicked) return;
    clicked.classList.add('nav-link-active');

    navListContent.forEach((c) => c.classList.remove('nav-list-content-active'));

    document.querySelector(`.nav-list-content-${clicked.dataset.link}`).classList.add('nav-list-content-active');
});