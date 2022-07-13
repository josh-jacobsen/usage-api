import { addUsageRecord } from './library'

const usageRecord = {
    customerId: 1,
    pricePerUnit: 1.5,
    service: 'Load Balancer',
    unitsConsumed: 12,
}

addUsageRecord(usageRecord)
