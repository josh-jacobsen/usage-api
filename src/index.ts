import dotenv from 'dotenv'
import { UsageController } from './usage-controller'
import { UsageRepository } from './usage-repository'
import App from './app'

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

const myApp = new App(usageController)

const main = async () => {
    myApp.application.listen(port, () => {
        console.log(
            `⚡️[server]: Server is running at https://localhost:${port}`
        )
    })
}

main().catch((err) => {
    console.error(err)
})
