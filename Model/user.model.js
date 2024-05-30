const pool = new Pool({
    user: "postgres",
    host: "localHost",
    database: "Endowed",
    password: "12345",
    port: 5432,
    // user: "the_endowed_user",
    // host: "dpg-cokgutv79t8c73cafu80-a",
    // database: "the_endowed",
    // password: "CLPP3rOkQmcXuv2UGod82cemYlvqL6Qp",
    // port: 5432, // Default PostgreSQL port
//  Internal Database URL: "postgres://the_endowed_user:CLPP3rOkQmcXuv2UGod82cemYlvqL6Qp@dpg-cokgutv79t8c73cafu80-a/the_endowed",
//  External Database URL: "postgres://the_endowed_user:CLPP3rOkQmcXuv2UGod82cemYlvqL6Qp@dpg-cokgutv79t8c73cafu80-a.oregon-postgres.render.com/the_endowed",
//  PSQL Command: "PGPASSWORD=CLPP3rOkQmcXuv2UGod82cemYlvqL6Qp psql -h dpg-cokgutv79t8c73cafu80-a.oregon-postgres.render.com -U the_endowed_user the_endowed",
});
// connectionString = `postgres://${firstName}: ${Password}@${Host}:${Port}/${DataBase}`;

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