import dotenv from 'dotenv'
import { server } from './server'

dotenv.config()

const port = process.env.PORT

server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
