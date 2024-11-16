import { NextApiRequest, NextApiResponse } from "next";
import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    try {
        const connection = await mysql.createConnection(dbConfig);

        if (method === 'GET') {
            const [rows, fields]: [any, any] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
            if (rows.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(rows[0]);
        }
        else if (method === 'PUT') {
            const { fullName, email, password, about } = req.body;
            await connection.execute(
                'UPDATE users SET fullName = ?, email = ?, password = ?, about = ? WHERE id = ?',
                [fullName, email, password, about, id]
            );
            res.status(200).json({ message: 'User updated' });
        }
        else if (method === 'DELETE') {
            await connection.execute('DELETE FROM users WHERE id = ?', [id]);
            res.status(200).json({ message: 'User deleted' });
        }
        else {
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).json({ message: `Method ${method} Not Allowed` });
        }

        connection.end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}