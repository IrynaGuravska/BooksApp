/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    book: {
      image: '.books-list .book__image',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  
  const renderBooks = function () {

    for (const book of dataSource.books) {
      /*generate HTML based on template*/
      const generatedHTML = templates.books(book);  
      /*create element using utils.createElementFromHTML*/
      const generateDOMElement = utils.createDOMFromHTML(generatedHTML);
      /* find list container*/
      const booksContainer = document.querySelector(select.containerOf.booksList);
      /*add element to list*/
      booksContainer.appendChild(generateDOMElement);
    }
  };
  renderBooks();
}
