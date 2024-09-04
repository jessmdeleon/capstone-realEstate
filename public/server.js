const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, )));

// Send index.html when the root route is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Simulated users data (in a real application, you'd use a database)
const users = [
    { username: 'jess4md', password: 'Dunwoody14', token: 'abc123' },
    { username: 'janedoe', password: 'mypassword', token: 'xyz789' }
];

// Login route
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and password matches
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Respond with a JSON object containing a token
        return res.json({ token: user.token });
    } else {
        // If user not found or password doesn't match, send 401 (Unauthorized)
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
