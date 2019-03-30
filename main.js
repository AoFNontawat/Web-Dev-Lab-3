// const form = document.getElementById('my-form');
// const myForm = document.querySelector('#my-form');
// const nameInput = document.querySelector('#name');
// const emailInput = document.querySelector('#email');
// const msgsInput = document.querySelector('#msgs');
// const msg = document.querySelector('.msg');
// const usersList = document.querySelector('#users');

// myForm.addEventListener('submit',onSubmit);
// function onSubmit(e){
//     e.preventDefault();
//     // console.log(nameInput.value + ' ' + emailInput.value);
//     if(nameInput.value ==='' || emailInput.value==='' || msgsInput.value==='') {
//         msg.classList.add('error');
//         msg.innerHTML = 'Please enter all fields';
        
//     }else{
//         const li = document.createElement('li'); //ระบุ tag
//         const text = document.createTextNode(`Name :  ${nameInput.value} |Eamil : ${emailInput.value}|Massage : ${msgsInput.value}`);
//         li.appendChild(text);


//         usersList.appendChild(li);
//         nameInput.value = '';
//         emailInput.value ='';
//         msgsInput.value = '';

//     }

//   }


//data input
// 1. Book Class: Represents a Book
class Book {
  constructor(name, email, msgs) {
    this.name = name;
    this.email = email;
    this.msgs = msgs;
  }
}

// 2. UI Class: Handle UI Tasks
class UI {
  static displayBooks() {

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

// 4. add book
  static addBookToList(book) {
    const list = document.querySelector('#data');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.name}</td>
      <td>${book.email}</td>
      <td>${book.msgs}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
    `;

    list.appendChild(row);
  }

// 11. delete book  
  static deleteBook(el) {
    // if element contains .delete class
    if(el.classList.contains('delete')) {
    // remove <a> -> <td> -> <tr>       
      el.parentElement.parentElement.remove();
    }
  }

// 13. show alert  
// <div class="alert alert-success/alert-danger>Message</div>
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const ul = document.querySelector('.alerttop');
    const li = document.querySelector('.alertbot');
    ul.insertBefore(div, li);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

// 9. clear fields  
  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#msgs').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(msgs) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.msgs === msgs) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// 4. Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// 5. Event: Add a Book
document.querySelector('#my-form').addEventListener('submit', (e) => {
  // 7. Prevent actual submit action
  e.preventDefault();

  // Get form values
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const msgs = document.querySelector('#msgs').value;

  // 12. Validate
  if(name === '' || email === '' || msgs === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // 6. Instatiate book
    const book = new Book(name, email, msgs);
    // console.log(book);

    // 8. Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // 13. Show success message
    UI.showAlert('Contact Added', 'success');

    // 9. Clear fields
    UI.clearFields();
  }
});

// 10. Event: Remove a Book - event propagation by selecting the parent
document.querySelector('#data').addEventListener('click', (e) => {
  // console.log(e.target);
  
  // 11. Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // 13. Show success message
  UI.showAlert('Contact Removed', 'success');
});



