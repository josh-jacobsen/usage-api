import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as mongodb from 'mongodb'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const conn = process.env.DB_CONN_STRING;

app.get('/', async (req: Request, res: Response) => {
    try {
        if (!conn) {
            process.exit(1)
        }
        console.log('conn string', conn)
        const client = new mongodb.MongoClient(conn, {})
        const connection = await client.connect()
        const collection = await connection
        .db('billing')
        .collection('usage')
        .find()
        .toArray();

        console.log(collection)
    }
    catch {
        console.log('something went wrong')
    }
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

