const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const USERS_FILE = './user.json';

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

app.listen(5000, () => console.log('Server running on port 5000'));