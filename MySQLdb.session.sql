-- @block Create the database
CREATE DATABASE IF NOT EXISTS mysql_practice;
-- @block Use the database
USE mysql_practice;
-- @block Create the table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    about TEXT
);
-- -- @block Insert the data
-- INSERT INTO users (fullName, email, password, about)
-- VALUES (
--         'Oliver Soderlund',
--         'lexrudolf06@gmail.com',
--         'password123',
--         'I am a web developer'
--     ),
--     (
--         'John Doe',
--         'JohnDoe@gmail.com',
--         'password',
--         'I am a web designer'
--     );
-- @block Select the data
SELECT *
FROM users;
--@block Drop Table Users
DROP TABLE IF EXISTS users;
--@block Drop Database
DROP DATABASE IF EXISTS mysql_practice;