const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/messenger', { useNewUrlParser: true, useUnifiedTopology: true });

// User schema and model
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

// Message schema and model
const MessageSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', MessageSchema);

// Register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ username }, 'secretkey');
    res.json({ token });
});

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send('Access denied');
    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
};

// Get messages
app.get('/messages', authenticateToken, async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

// Post a message
app.post('/messages', authenticateToken, async (req, res) => {
    const { message } = req.body;
    const newMessage = new Message({ username: req.user.username, message });
    await newMessage.save();
    res.status(201).json(newMessage);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
