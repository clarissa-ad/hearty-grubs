const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());

const USERS_FILE = './user.json';
const REVIEWS_FILE = './reviews.json';

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  let users = [];
  if (fs.existsSync(USERS_FILE)) {
    users = JSON.parse(fs.readFileSync(USERS_FILE));
  }
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  users.push({ username, password });
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ message: 'Registration successful' });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!fs.existsSync(USERS_FILE)) return res.status(400).json({ message: 'No users found' });
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Get reviews endpoint
app.get('/reviews', (req, res) => {
  fs.readFile(REVIEWS_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({error: 'Failed to read reviews'});
    const reviews = JSON.parse(data);
    res.json(reviews);
  });
});

// Add review endpoint
app.post('/reviews', (req, res) => {
  const { user, rating, rev } = req.body;
  if (user || !rating || !rev) {
    return res.status(400).json({error: 'Missing fields'});
  }
  fs.readFile(REVIEWS_FILE, 'utf-8', (err, data) => {
    let reviews = [];
    if (!err && data) reviews = JSON.parse(data);
    reviews.push({user, rating, rev});
    fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2), err2 => {
      if (err2) return res.status(500).json({error: 'Failed to save review'});
      res.json({success: true});
    });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));