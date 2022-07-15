import { DBUsage, UsageRepository } from './usage-repository'

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

    async getAllUsageRecords(): Promise<DBUsage[]> {
        return await this.usageRepository.getAllUsageRecords()
    }

    async addUsageRecord(usage: Usage): Promise<DBUsage> {
        const insertedRecord = await this.usageRepository.addUsageRecord(usage)
        return await this.usageRepository.getUsageRecordById(
            insertedRecord.insertedId
        )
    }
}
