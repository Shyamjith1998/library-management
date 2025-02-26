const sqlite3 = require('sqlite3').verbose();

// Connect to the database (or create it if it doesn't exist)
const db = new sqlite3.Database('./library.db');

// Create the books table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Books table created successfully');
    }
  });
});

// Close the database connection
db.close();