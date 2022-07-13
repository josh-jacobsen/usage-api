import fetch from 'node-fetch'

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
    await fetch('http://localhost:8001/usage', {
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
