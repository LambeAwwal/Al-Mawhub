const express = require('express');
const fs = require('fs');
const path = require('path'); 
const { Client } = require('pg');
const app = express();
const port = 3000;

// Create a new pool instance
const client = new Client({
    user: 'endowed_user',
    host: 'dpg-co78i9f109ks73845nlg-a',
    database: 'endowed',
    password: 'vv0LBLAQ2j1WGfjaPVDZunhDknhST3oM',
    port: 5432, // Default PostgreSQL port
});
client.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/The endowed project/The endowed.html'));
});

app.post('/register', async (req, res) => {
    const userData = {
        firstName: req.body.username,
        lastName: req.body.lastname,
        otherNames: req.body.othernames,
        mobileNumber: req.body.Number,
        emailAddress: req.body.Email,
        level: req.body.level,
        Socialmedia: req.body.Socialmedia,
        recommendation: req.body.recommendation
    };

    try {
        // Insert user data into the database
        await client.query('INSERT INTO users (first_name, last_name, other_names, mobile_number, email_address, level, social_media, recommendation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
            [userData.firstName, userData.lastName, userData.otherNames, userData.mobileNumber, userData.emailAddress, userData.level, userData.Socialmedia, userData.recommendation]);

        // If insertion is successful, send a response indicating successful registration
        const alertScript = '<script>alert("Registration successful!"); window.location.href = "/";</script>';
        res.send(alertScript);
    } catch (error) {
        // Log and handle any errors that occur during insertion
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
