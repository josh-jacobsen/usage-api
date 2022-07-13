import { addUsageRecord } from './library'
import fetch from 'node-fetch'

jest.mock('node-fetch')

const { Response } = jest.requireActual('node-fetch')

describe('Library tests', () => {
    const mockResponse = [
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
    ]
    it('calls the API with correctly formatted payload', async () => {
        // @ts-ignore
        fetch.mockReturnValue(
            Promise.resolve(new Response(JSON.stringify(mockResponse)))
        )

        const answer = await addUsageRecord({
            customerId: 12,
            service: 'another service',
            unitsConsumed: 8,
            pricePerUnit: 1.25,
        })
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('http://localhost:8001/usage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"customerId":12,"service":"another service","unitsConsumed":8,"pricePerUnit":1.25}',
        })
    })
})
