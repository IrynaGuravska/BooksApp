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
  
  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];

      thisBooksList.initData();
      thisBooksList.render();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }
  
    initData() {
      
      this.data = dataSource.books;
    }
  
    render() {
  
      const thisBookList = this;
      for (const book of dataSource.books) {
        book.ratingBgc = thisBookList.determineRatingBgc(book.rating);
        book.ratingWidth = (book.rating / 10) * 100;
        /*generate HTML based on template*/
        const generatedHTML = templates.books(book);  
        /*create element using utils.createElementFromHTML*/
        const generateDOMElement = utils.createDOMFromHTML(generatedHTML);
        /* find list container*/
        const booksContainer = document.querySelector(select.containerOf.booksList);
        /*add element to list*/
        booksContainer.appendChild(generateDOMElement);
      }
    }
  
    getElements() {
      const thisBooksList = this;

      thisBooksList.booksList = document.querySelector(select.containerOf.booksList);
      thisBooksList.checkbox = document.querySelector(select.containerOf.filters);
      console.log(thisBooksList.filters);
    }

    initActions (){
      const thisBooksList = this;
  
      /* add event listener to clickable trigger on event dbclick */
      thisBooksList.booksList.addEventListener('dblclick', function (event) {
      /* prevent default action for event */
        event.preventDefault();

        if ((event.target.offsetParent).classList.contains('book__image')) {
          const bookId = (event.target.offsetParent).getAttribute('data-id');

          if (!thisBooksList.favoriteBooks.includes(bookId)) {
            (event.target.offsetParent).classList.add(classes.favorite);
            /*add bookId to favoriteBooks*/
            thisBooksList.favoriteBooks.push(bookId);
          } else {
            (event.target.offsetParent).classList.remove(classes.favorite);
            const noFavorite = thisBooksList.favoriteBooks.indexOf(bookId);
            thisBooksList.favoriteBooks.splice(noFavorite, 1);
          }
        }
      });

      thisBooksList.checkbox.addEventListener('click', function (event) {
        const form = event.target;
        if (
          form.tagName == 'INPUT' && form.name == 'filter' && form.type == 'checkbox'
        ) {
          const formValue = form.value;
          console.log(formValue);

          if (form.checked == true) {
            thisBooksList.filters.push(formValue);
          } else {
            const checkedValue = thisBooksList.filters.indexOf(formValue);
            thisBooksList.filters.splice(checkedValue, 1);
          }
          console.log('filters:', thisBooksList.filters);
        }
        thisBooksList.filterBooks();
      });
    }

    filterBooks(){
      const thisBooksList = this;

      for(let book of dataSource.books){
        let shouldBeHidden = false;  

        thisBooksList.Image = document.querySelector('.book__image[data-id="' + book.id + '"]');

        for (let filter of thisBooksList.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }    
        }
        if (shouldBeHidden) {
          thisBooksList.Image.classList.add('hidden');
        } else {
          thisBooksList.Image.classList.remove('hidden');
        }
      }
    }
  
    determineRatingBgc(rating){
      const thisBookList = this;

      thisBookList.ratingBgc = '';
      if (rating < 7) {
        thisBookList.ratingBgc = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%';
      } else if (rating > 7 && rating <= 8) {
        thisBookList.ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
      } else if (rating > 8 && rating <= 9) {
        thisBookList.ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
      } else if (rating > 9) {
        thisBookList.ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
      }
      return thisBookList.ratingBgc;
    }
  }
  new BooksList();
}






