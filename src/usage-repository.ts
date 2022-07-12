import * as mongodb from 'mongodb'
import { MongoClient } from 'mongodb'
import { InsertedRecord, Usage } from './usage-controller'

export interface DBUsage extends Usage {
    _id: string
}

export class UsageRepository {
    private readonly dbName = 'billing'
    private readonly collectionName = 'usage'
    private readonly client: MongoClient

    public constructor(conn: string) {
        this.client = new mongodb.MongoClient(conn)
    }

    async getAllUsageRecords(): Promise<DBUsage[]> {
        const connection = await this.client.connect()
        const records = connection
            .db(this.dbName)
            .collection(this.collectionName)
            .find()
            .toArray()
        return records as unknown as DBUsage[]
    }

    async addUsageRecord({
        customerId,
        service,
        unitsConsumed,
        pricePerUnit,
    }: Usage): Promise<InsertedRecord> {
        const connection = await this.client.connect()
        const record = connection
            .db(this.dbName)
            .collection(this.collectionName)
            .insertOne({
                customerId,
                service,
                unitsConsumed,
                pricePerUnit,
            })
        return record as unknown as InsertedRecord
    }

    async getUsageRecordById(id: string): Promise<DBUsage> {
        const connection = await this.client.connect()
        const record = connection
            .db(this.dbName)
            .collection(this.collectionName)
            .findOne({
                _id: id,
            })
        return record as unknown as DBUsage
    }
}
