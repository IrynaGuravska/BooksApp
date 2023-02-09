/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
    },
    book: {
      image: '.books-list .book__image',
    },
  };
  const classes = {
    favorite: 'favorite',
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
  
  const favoriteBooks = [];

  const initActions = function(){

    const booksList = document.querySelector(select.containerOf.booksList);
    /* add event listener to clickable trigger on event dbclick */
    booksList.addEventListener('dblclick', function (event) {
      /* prevent default action for event */
      event.preventDefault();

      if ((event.target.offsetParent).classList.contains('book__image')) {
        const bookId = (event.target.offsetParent).getAttribute('data-id');

        if (!favoriteBooks.includes(bookId)) {
          (event.target.offsetParent).classList.add(classes.favorite);
          /*add bookId to favoriteBooks*/
          favoriteBooks.push(bookId);
        } else {
          (event.target.offsetParent).classList.remove(classes.favorite);
          const noFavorite = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(noFavorite, 1);
        }
      }
    });
  };
  
  const filters = [];

  const checkbox = document.querySelector(select.containerOf.filters);

  checkbox.addEventListener('click', function (event) {
    const form = event.target;
    if (
      form.tagName == 'INPUT' && form.name == 'filter' && form.type == 'checkbox'
    ) {
      const formValue = form.value;
      console.log(formValue);

      if (form.checked == true) {
        filters.push(formValue);
      } else {
        const checkedValue = filters.indexOf(formValue);
        filters.splice(checkedValue, 1);
      }
    }
    console.log('filters:', filters);
    filterBooks();
  });

  const filterBooks = function(){
    for(let book of dataSource.books){
      let shouldBeHidden = false;  

      const Image = document.querySelector('.book__image[data-id="' + book.id + '"]');
      
      for (let filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }    
      }
      if (shouldBeHidden) {
        Image.classList.add('hidden');
      } else {
        Image.classList.remove('hidden');
      }
    }
  };

  renderBooks();
  initActions();
}






