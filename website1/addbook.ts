class Book {
    id: any;
    title:string;
    author:string;
    ratings:number;
    price:number;
    constructor(id,title, author, ratings, price) {
      this.id=id;
      this.title = title;
      this.author = author;
      this.ratings=ratings;
      this.price=price;
    }
  }
  // UI Class: Handle UI Tasks
  class UI {
    static displayBooks() {
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
    static addBookToList(book) {
      const list = document.querySelector('#book-list') as HTMLSelectElement;
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.id}</td> 
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.ratings}</td>
        <td>${book.price}</td>
        <td><a href="#" class="btn delete" style="font-size:20px; text-allign:center; color:red;">&Cross;</a></td>
        ` ;
  
      list.appendChild(row);
    }
  
    static deleteBook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
    }// a . td,          tr 
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#id1').value='';
      document.querySelector('#title').value='';
      document.querySelector('#author').value='';
      document.querySelector('#ratings').value='';
      document.querySelector('#price').value='';
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books: any[];//                                 (key,values)---strings
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));//get
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();//[]
      books.push(book);//    [object,object]-------------[id,title,author,ratings,price]--  'id',title,author,ratings,price
      localStorage.setItem('books', JSON.stringify(books));//put--update
    }
  
    static removeBook(id:number) {
      const books = Store.getBooks();
  
      books.forEach((a, index)=> {
        if(a.id === id) {
        books.splice(index, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // Event: Add a Book
  document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
  
    // Get form values
    const id=document.querySelector('#id1').value!;
    const title = document.querySelector('#title').value!;
    const author = document.querySelector('#author').value!;
    const ratings = document.querySelector('#ratings').value!;
    const price = document.querySelector('#price').value!;

  
    // Validate
    if(title === '' || author === '' || id === '' || ratings==='' || price==='') {
      UI.showAlert('Please fill in all fields', 'danger');
    } else {
      // Instatiate book
      const book = new Book(id,title, author, ratings, price);
  
      // Add Book to UI
      UI.addBookToList(book);//website page
  
      // Add book to store
      Store.addBook(book);//local storage
  
      // Show success message
      UI.showAlert('Book Added', 'success');
  
      // Clear fields
      UI.clearFields();
    }
  });
  
  // Event: Remove a Book
  document.querySelector('#book-list').addEventListener('click', (e) => {
    // Remove book from UI
    UI.deleteBook(e.target);///website
  const v=e.target.parentElement.parentElement.children[0].textContent;///localstorage
        //    a.     td            tr -----------id.-----------1             
  console.log(v)//1
    // Remove book from store
    Store.removeBook(v);
  
    // Show success message
    UI.showAlert('Book Removed', 'success');
  });