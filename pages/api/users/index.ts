import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2/promise';
import { getConnection } from "@/lib/db";

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    try {
        const connection = await mysql.createConnection(dbConfig);

        if (method === 'GET') {
            const [rows] = await connection.execute('SELECT * FROM users');
            res.status(200).json(rows);
        }
        else if (method === 'POST') {
            const { fullName, email, password, about } = req.body;
            console.log("req.body: ", req.body);
            await connection.execute(
                'INSERT INTO users (fullName, email, password, about) VALUES (?, ?, ?, ?)',
                [fullName, email, password, about]
            );
            res.status(201).json({ message: 'User created' });
        }
        else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).json({ message: `Method ${method} Not Allowed` });
        }

        connection.end();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });

    }
}