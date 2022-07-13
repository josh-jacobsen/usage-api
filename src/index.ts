import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import bp from 'body-parser'
import { Usage, UsageController } from './usage-controller'
import { UsageRepository } from './usage-repository'

dotenv.config()

const port = process.env.PORT

/**
 * Newing up classes here is an anti-pattern and I would bring in a DI container
 * pretty fast. In this instance as there is a time limit and there are only a few
 * classes involved, I've elected to defer setting up the DI container and will do it if I get time
 */

const usageRepository = new UsageRepository(
    'mongodb://username:password@localhost:27019'
)
const usageController = new UsageController(usageRepository)

const main = async (usageController: UsageController) => {
    const server: Express = express()
    server.use(bp.json())
    server.use(bp.urlencoded({ extended: true }))

    server.get('/usage', async (req: Request, res: Response) => {
        try {
            const records = await usageController.getAllUsageRecords()
            return res.status(200).send(records)
        } catch (e: any) {
            console.error(e.message)
            return res.status(500).send(e.message)
        }
    })

    server.post('/usage', async (req: Request, res: Response) => {
        const usage: Usage = req.body
        try {
            const record = await usageController.addUsageRecord(usage)
            return res.status(201).send(record)
        } catch (e: any) {
            console.error(e.message)
            return res.status(500).send(e.message)
        }
    })

    server.listen(port, () => {
        console.log(
            `⚡️[server]: Server is running at https://localhost:${port}`
        )
    })
}

main(usageController).catch((err) => {
    console.error(err)
})
