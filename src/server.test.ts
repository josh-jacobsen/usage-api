import { server } from './server'
import { MongoMemoryServer } from 'mongodb-memory-server'

const request = require('supertest')

describe('Test the root path', () => {
    const env = process.env
    let mongo: MongoMemoryServer
    beforeAll(async () => {
        mongo = await MongoMemoryServer.create({
            auth: {
                extraUsers: [
                    {
                        createUser: 'username',
                        pwd: 'password',
                        roles: ['dbAdmin'],
                    },
                ],
            },
            instance: {
                port: 27019,
            },
        })
    })

    afterAll(async () => {
        await mongo.stop()
    })

    test('It should response the GET method', async () => {
        const response = await request(server).get('/')
        expect(response.statusCode).toBe(200)
    })
})
