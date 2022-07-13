import { addUsageRecord } from './library'

const usageRecord = {
    customerId: 121212,
    pricePerUnit: 1.51,
    service: 'My awesome service 2',
    unitsConsumed: 120,
}

addUsageRecord(usageRecord)
