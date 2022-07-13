import fetch from 'node-fetch'

interface Usage {
    customerId: number
    service: string
    unitsConsumed: number
    pricePerUnit: number
}

export const addUsageRecord = async ({
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
    const response = await fetch('http://localhost:8001/usage', {
        method: 'GET',
    })
    const existingRecords: Usage[] = await response.json()

    const hasMatchingRecord = existingRecords.filter(
        (record) =>
            record.unitsConsumed === unitsConsumed &&
            record.pricePerUnit === pricePerUnit &&
            record.service === service &&
            record.customerId === customerId
    )

    if (hasMatchingRecord.length < 1) {
        console.log('No matching record found; creating record')
        return await fetch('http://localhost:8001/usage', {
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

    console.log('Existing record found; no new record created')
}
