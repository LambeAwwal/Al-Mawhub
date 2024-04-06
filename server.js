const express = require('express');
const fs = require('fs');
const path = require('path'); 
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Create a new pool instance
const pool = new Pool({
    user: "endowed_user",
    host: "dpg-co78i9f109ks73845nlg-a",
    database: "endowed",
    password: "vv0LBLAQ2j1WGfjaPVDZunhDknhST3oM",
    port: 5432, // Default PostgreSQL port
//  Internal Database URL: "postgres://endowed_user:vv0LBLAQ2j1WGfjaPVDZunhDknhST3oM@dpg-co78i9f109ks73845nlg-a/endowed",
//  External Database URL: "postgres://endowed_user:vv0LBLAQ2j1WGfjaPVDZunhDknhST3oM@dpg-co78i9f109ks73845nlg-a.oregon-postgres.render.com/endowed",
//  PSQL Command: "PGPASSWORD=vv0LBLAQ2j1WGfjaPVDZunhDknhST3oM psql -h dpg-co78i9f109ks73845nlg-a.oregon-postgres.render.com -U endowed_user endowed",
});

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
        socialMedia: req.body.socialMedia,
        recommendation: req.body.recommendation
    };

  try {
        // Insert user data into the database
        const client = await pool.connect();
        await client.query('INSERT INTO users (first_name, last_name, other_names, mobile_number, email_address, level, social_media, recommendation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
            [userData.firstName, userData.lastName, userData.otherNames, userData.mobileNumber, userData.emailAddress, userData.level, userData.socialMedia, userData.recommendation])
            await client.release();
        // If insertion is successful, redirect to registration success page
        res.redirect('/successful.html');
    } catch (error) {
        // Log and handle any errors that occur during insertion
        console.error('Error registering user:', error);
        res.status(500).send('Internal Server Error');
    }
});
async function registerUser() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lasttName').value;
    const othertNames = document.getElementById('otherNames').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const emailAddress = document.getElementById('emailAdress').value;
    const level = document.getElementById('level').value;
    const socialMedia = document.getElementById('socialMedia').value;
    const recommendation = document.getElementById('recommendation').value;
    // ... other user data from form fields

    const data = {
        username: firstName,
        lastName: lastname,
        otherNames: othernames,
        mobileNumber: Number,
        emailAddress: Email,
        level: level,
        socialMedia: socialMedia,
        recommendation: recommendation
    };

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        // Handle successful registration (e.g., display success message)
    } catch (error) {
        console.error('Error registering user:', error);
        // Handle registration error (e.g., display error message)
    }
}
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
