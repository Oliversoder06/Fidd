// lib/db.js
import mysql from 'mysql2/promise';

let connection: mysql.Connection;

export async function getConnection() {
    if (!connection) {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'your_username',
            password: 'ben10123',
            database: 'mysql_practice',
        });
    }
    return connection;
}
