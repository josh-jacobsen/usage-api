import { addUsageRecord } from './library'
import fetch from 'node-fetch'

jest.mock('node-fetch')

const { Response } = jest.requireActual('node-fetch')

describe('Library tests', () => {
    const existingRecord = {
        customerId: 2,
        unitsConsumed: 2,
        pricePerUnit: 1.5,
        service: 'Scaling group',
    }

    beforeEach(() => {
        // @ts-ignore
        fetch.mockClear()
    })

    it('Creates new record if no matching record exists', async () => {
        // @ts-ignore
        fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify([]))))

        await addUsageRecord({
            customerId: 12,
            service: 'another service',
            unitsConsumed: 8,
            pricePerUnit: 1.25,
        })
        expect(fetch).toHaveBeenCalledTimes(2)
        expect(fetch).toHaveBeenCalledWith('http://localhost:8001/usage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"customerId":12,"service":"another service","unitsConsumed":8,"pricePerUnit":1.25}',
        })
    })

    it('Does not create new record if matching record already exists', async () => {
        // @ts-ignore
        fetch.mockReturnValue(
            Promise.resolve(new Response(JSON.stringify([existingRecord])))
        )

        await addUsageRecord(existingRecord)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith('http://localhost:8001/usage', {
            method: 'GET',
        })
    })
})
