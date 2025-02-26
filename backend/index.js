const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database('./library.db');

// Create a book
app.post('/api/books', (req, res) => {
  const { title } = req.body;
  const sql = `INSERT INTO books (title) VALUES (?)`;
  db.run(sql, [title], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ id: this.lastID, title });
  });
});

// Read all books
app.get('/api/books', (req, res) => {
  const sql = `SELECT * FROM books`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

// Update a book
app.put('/api/books/:id', (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const sql = `UPDATE books SET title = ? WHERE id = ?`;
  db.run(sql, [title, id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send({ id, title });
  });
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM books WHERE id = ?`;
  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(204).send();
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});