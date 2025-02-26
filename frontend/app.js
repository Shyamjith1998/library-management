async function addBook() {
  const title = document.getElementById('bookTitle').value;
  const response = await fetch('http://localhost:3000/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const book = await response.json();
  console.log('Book added:', book);
  fetchBooks();
}

async function fetchBooks() {
  const response = await fetch('http://localhost:3000/api/books');
  const books = await response.json();
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = books.map((book) => `
    <p>
      ${book.title}
      <button onclick="updateBook(${book.id})">Update</button>
      <button onclick="deleteBook(${book.id})">Delete</button>
    </p>
  `).join('');
}

async function updateBook(id) {
  const newTitle = prompt('Enter new title:');
  const response = await fetch(`http://localhost:3000/api/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTitle }),
  });
  const updatedBook = await response.json();
  console.log('Book updated:', updatedBook);
  fetchBooks();
}

async function deleteBook(id) {
  await fetch(`http://localhost:3000/api/books/${id}`, { method: 'DELETE' });
  console.log('Book deleted');
  fetchBooks();
}

fetchBooks();