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