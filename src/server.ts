import express, { Express, Request, Response } from 'express'
import bp from 'body-parser'

import { addUsageRecord, getAllUsageRecords, getUsageRecordById } from './db'

export interface Usage {
    customerId: number
    service: string
    unitsConsumed: number
    pricePerUnit: number
}

interface InsertedRecord {
    insertedId: string
}

const server: Express = express()

server.use(bp.json())
server.use(bp.urlencoded({ extended: true }))

server.get('/', async (req: Request, res: Response) => {
    try {
        const usage = await getAllUsageRecords()
        res.status(200).send(usage)
    } catch (e: any) {
        console.error(e.message)
        res.status(500).send(e.message)
    }
})

server.post('/', async (req: Request, res: Response) => {
    try {
        const usage: Usage = req.body
        const insertedRecord: InsertedRecord = await addUsageRecord(usage)
        const record = await getUsageRecordById(insertedRecord.insertedId)
        res.status(201).send(record)
    } catch (e: any) {
        console.error(e.message)
        res.status(500).send(e.message)
    }
})

export { server }
