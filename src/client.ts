const library = require('./library')

const usageRecord = {
    customerId: 12,
    pricePerUnit: 1.28,
    service: 'My awesome service',
    unitsConsumed: 120,
}

library.addUsageRecord(usageRecord)
