import { UsageController } from './usage-controller'
import { UsageRepository } from './usage-repository'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient } from 'mongodb'
import { Request, Response } from 'express'

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
        const status = jest.fn(() => {
            return this
        })
        const send = jest.fn()
        const res = {
            send,
            json: function (err: unknown) {
                console.log('\n : ' + err)
            },
            status: function (responseStatus: unknown) {
                // This next line makes it chainable
                return this
            },
        }
        const result = await usageController.addUsageRecord(
            {
                body: {
                    customerId: 1,
                    unitsConsumed: 2,
                    pricePerUnit: 1.5,
                    service: 'will this work',
                },
            } as Request,
            res as unknown as Response
        )
        expect(send).toHaveBeenCalledTimes(1)
        expect(send).toBeCalledWith(
            expect.objectContaining({
                acknowledged: true,
            })
        )
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

        const status = jest.fn(() => {
            return this
        })
        const send = jest.fn()
        const res = {
            send,
            json: function (err: unknown) {
                console.log('\n : ' + err)
            },
            status: function (responseStatus: unknown) {
                // This next line makes it chainable
                return this
            },
        }

        const result = await usageController.getAllUsageRecords(
            {
                body: {
                    customerId: 1,
                    unitsConsumed: 2,
                    pricePerUnit: 1.5,
                    service: 'will this work',
                },
            } as Request,
            res as unknown as Response
        )

        expect(send).toHaveBeenCalledTimes(1)

        // expect(result.length).toEqual(2)
        // expect(result[0]._id).toBeDefined()
        // expect(result[1]._id).toBeDefined()
    })
})
