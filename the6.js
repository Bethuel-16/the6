document.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("user");
  if (user) {
    showDashboard(user);
  } else {
    showLoginForm();
  }
});

function showLoginForm() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

function showDashboard(username) {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("username-display").innerText = username;
  loadBooks();
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error-message");

  if (username && password) {
    errorEl.innerText = "";
    localStorage.setItem("user", username);
    showDashboard(username);
  } else {
    errorEl.innerText = "Please enter both username and password.";
  }
}

function logout() {
  localStorage.removeItem("user");
  showLoginForm();
}

function loadBooks() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  if (books.length === 0) {
    bookList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                No books added yet. Add your first book above!
            </div>`;
    return;
  }

  books.forEach((book, index) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.innerHTML = `
            <div class="book-item-info">
                <div class="book-item-title"><strong>${book.title}</strong> &mdash; ${book.author}</div>
                <div class="book-item-dates">
                    <i class="fas fa-calendar-alt"></i> Borrowed: ${book.borrowDate}
                    &nbsp;&nbsp;
                    <i class="fas fa-calendar-check"></i> Return by: ${book.returnDate}
                </div>
            </div>
            <button class="delete-btn" onclick="deleteBook(${index})">
                <i class="fas fa-trash-alt"></i> Delete
            </button>
        `;
    bookList.appendChild(bookItem);
  });
}

function addBook() {
  const title = document.getElementById("book-title").value.trim();
  const author = document.getElementById("book-author").value.trim();
  const borrowDate = document.getElementById("borrow-date").value;
  const returnDate = document.getElementById("return-date").value;

  if (title && author && borrowDate && returnDate) {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    books.push({ title, author, borrowDate, returnDate });
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();

    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("borrow-date").value = "";
    document.getElementById("return-date").value = "";
  } else {
    alert("Please fill in all fields before adding a book.");
  }
}

function deleteBook(index) {
  if (!confirm("Are you sure you want to delete this book?")) return;
  const books = JSON.parse(localStorage.getItem("books")) || [];
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  loadBooks();
}
