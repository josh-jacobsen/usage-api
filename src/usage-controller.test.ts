import { UsageController } from './usage-controller'
import { UsageRepository } from './usage-repository'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'

describe('Usage controller tests', () => {
    let usageController: UsageController
    let con: MongoClient
    let mongoServer: MongoMemoryServer
    beforeEach(async () => {
        mongoServer = await MongoMemoryServer.create()
        con = await MongoClient.connect(mongoServer.getUri(), {})
        const uri = mongoServer.getUri()
        usageController = new UsageController(new UsageRepository(uri))
    })

    afterEach(async () => {
        if (con) {
            await con.close()
        }
        if (mongoServer) {
            await mongoServer.stop()
        }
    })

    it('writes usage record', async () => {
        const result = await usageController.addUsageRecord({
            customerId: 1,
            unitsConsumed: 2,
            pricePerUnit: 1.5,
            service: 'will this work',
        })
        expect(result._id).toBeDefined()
    })

    it('returns all usage records', async () => {
        const db = con.db('billing')
        const col = db.collection('usage')
        await col.insertMany([
            {
                customerId: 1,
                unitsConsumed: 2,
                pricePerUnit: 1.5,
                service: 'Load balancer',
            },
            {
                customerId: 2,
                unitsConsumed: 2,
                pricePerUnit: 1.5,
                service: 'Scaling group',
            },
        ])

        const result = await usageController.getAllUsageRecords()

        expect(result.length).toEqual(2)
        expect(result[0]._id).toBeDefined()
        expect(result[1]._id).toBeDefined()
    })
})
