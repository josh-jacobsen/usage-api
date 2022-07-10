import dotenv from 'dotenv'
import * as mongodb from 'mongodb'
import { Usage } from './server'

dotenv.config()

const conn = process.env.DB_CONN_STRING
const dbName = process.env.DB_NAME
const collectionName = process.env.COLLECTION_NAME
if (!conn || !collectionName) {
    throw new Error('Invalid connection config')
}
const client = new mongodb.MongoClient(conn)

export const getUsage = async (): Promise<any> => {
    const connection = await client.connect()
    return connection.db(dbName).collection(collectionName).find().toArray()
}

export const addUsage = async ({
    customerId,
    service,
    unitsConsumed,
    pricePerUnit,
}: Usage): Promise<any> => {
    console.log('adding thing')
    const connection = await client.connect()
    return connection.db(dbName).collection(collectionName).insertOne({
        customerId,
        service,
        unitsConsumed,
        pricePerUnit,
    })
}
