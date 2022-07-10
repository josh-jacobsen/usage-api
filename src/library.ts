import fetch from 'node-fetch'

const addUsageRecord = async ({
    customerId,
    service,
    unitsConsumed,
    pricePerUnit,
}: {
    customerId: number
    service: string
    unitsConsumed: number
    pricePerUnit: number
}) => {
    const url = new URL('http://localhost:8001')
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            customerId,
            service,
            unitsConsumed,
            pricePerUnit,
        }),
    })
}

module.exports.addUsageRecord = addUsageRecord
