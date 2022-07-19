import express, { Application, Request, Response } from 'express'
import bp from 'body-parser'
import { UsageController } from './usage-controller'

class App {
    public application: Application
    private readonly usageController: UsageController

    constructor(usageController: UsageController) {
        this.application = express()
        this.application.use(bp.json())
        this.application.use(bp.urlencoded({ extended: true }))

        this.usageController = usageController

        this.application.get('/usage', async (req: Request, res: Response) => {
            return await this.usageController.getAllUsageRecords(req, res)
        })

        this.application.post('/usage', async (req: Request, res: Response) => {
            return await this.usageController.addUsageRecord(req, res)
        })
    }
}

export default App
