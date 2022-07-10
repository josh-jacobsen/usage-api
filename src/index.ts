import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import bp from 'body-parser'

import { addUsage, getUsage } from './db'

export interface Usage {
    customerId: number
    service: string
    unitsConsumed: number
    pricePerUnit: number
}

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
    try {
        const usage = await getUsage()
        res.status(200).send(usage)
    } catch (e: any) {
        console.error(e.message)
        res.status(500).send(e.message)
    }
})

app.post('/', async (req: Request, res: Response) => {
    console.log('Start of function')
    try {
        const thingToInsert: Usage = req.body
        console.log('thing to insert: ', thingToInsert)
        const record = await addUsage(thingToInsert)
        res.status(201).send(record)
    } catch (e: any) {
        console.error(e.message)
        res.status(500).send(e.message)
    }
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
