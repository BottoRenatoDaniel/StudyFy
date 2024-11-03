const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL kapcsolat
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Regisztráció
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Jelszó hashelése
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Felhasználó hozzáadása az adatbázishoz
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, results) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: 'Regisztráció sikeres!' });
    });
});

// Bejelentkezés
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send({ message: err.message });
        if (results.length === 0) return res.status(404).send({ message: 'Felhasználó nem található!' });

        const user = results[0];

        // Jelszó ellenőrzése
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // JWT token generálása
        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: 86400 }); // 24 óra
        res.status(200).send({ auth: true, token });
    });
});

// Szerver indítása
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});