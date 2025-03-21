import express from 'express';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || './database.sqlite';

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Initialize database schema
    initDatabase();
  }
});

// Function to initialize database schema
function initDatabase() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  fs.readFile(schemaPath, 'utf-8', (err, sql) => {
    if (err) {
      console.error('Error reading schema file:', err);
      return;
    }
    db.exec(sql, (execErr) => {
      if (execErr) {
        console.error('Error executing schema:', execErr);
      } else {
        console.log('Database schema initialized successfully.');
      }
    });
  });
}

// User Management Endpoints
app.post('/api/users', (req, res) => {
  const { username, email, bio, profilePicture } = req.body;
  db.run(`INSERT INTO users (username, email, bio, profilePicture) VALUES (?, ?, ?, ?)`, 
    [username, email, bio, profilePicture],
    function(err) {
      if (err) {
        return res.status(422).json({ error: err.message });
      }
      res.status(201).json({ userId: this.lastID, username, email, bio, profilePicture });
  });
});

app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  db.get(`SELECT * FROM users WHERE userId = ?`, [userId], (err, user) => {
    if (err) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  });
});

// Blog Post Management Endpoints
app.post('/api/posts', (req, res) => {
  const { title, body, tags } = req.body;
  db.run(`INSERT INTO posts (title, body) VALUES (?, ?)`, [title, body], function(err) {
    if (err) {
      return res.status(422).json({ error: err.message });
    }
    const postId = this.lastID;
    // Handle tags if necessary
    res.status(201).json({ postId, title, body, dateCreated: new Date().toISOString() });
  });
});

app.get('/api/posts/:postId', (req, res) => {
  const { postId } = req.params;
  db.get(`SELECT * FROM posts WHERE postId = ?`, [postId], (err, post) => {
    if (err) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  });
});

// Comment Management Endpoints
app.post('/api/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  const { commentText } = req.body;
  db.run(`INSERT INTO comments (postId, commentText) VALUES (?, ?)`, [postId, commentText], function(err) {
    if (err) {
      return res.status(422).json({ error: err.message });
    }
    res.status(201).json({ commentId: this.lastID, datePosted: new Date().toISOString() });
  });
});

app.get('/api/posts/:postId/comments', (req, res) => {
  const { postId } = req.params;
  db.all(`SELECT * FROM comments WHERE postId = ?`, [postId], (err, comments) => {
    if (err) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ comments });
  });
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});