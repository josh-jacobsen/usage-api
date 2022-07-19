import { UsageRepository } from './usage-repository'
import { Request, Response } from 'express'

export interface Usage {
    customerId: number
    service: string
    unitsConsumed: number
    pricePerUnit: number
}

export interface InsertedRecord {
    insertedId: string
}

/**
 * TODO: Refactor this to a routes component. Its called UsageController but in fact the controller logic is contained in index.ts. So this in fact
 * functions more like a service, in that it sits between the controller and repository layers.
 * */

export class UsageController {
    private readonly usageRepository

    constructor(usageRepository: UsageRepository) {
        this.usageRepository = usageRepository
    }

    async getAllUsageRecords(req: Request, res: Response) {
        try {
            const records = await this.usageRepository.getAllUsageRecords()
            return res.status(200).send(records)
        } catch (e: any) {
            console.error(e.message)
            return res.status(500).send(e.message)
        }
    }

    async addUsageRecord(req: Request, res: Response) {
        const usage: Usage = req.body
        try {
            const record = await this.usageRepository.addUsageRecord(usage)
            return res.status(201).send(record)
        } catch (e: any) {
            console.error(e.message)
            return res.status(500).send(e.message)
        }
    }
}
