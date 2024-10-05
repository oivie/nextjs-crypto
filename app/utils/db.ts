// utils/db.ts

import mysql, { Pool } from 'mysql2/promise';

// Create a connection pool
const db: Pool = mysql.createPool({
    host: 'localhost', // Database host
    user: 'root', // Database username
    password: 'romy', // Database password
    database: 'crypto', // Database name
    waitForConnections: true,
    connectionLimit: 10, // Adjust this based on your app's needs
    queueLimit: 0,
});

export default db;
