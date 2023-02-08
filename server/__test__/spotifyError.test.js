const app = require('../app')
const request = require('supertest')

jest.mock("../helpers/spotify", () => {
    return jest.fn((_)=>{
        throw "Internal Server Error"
    })
})

describe('Feature Read Idol Songs GET /idols/songs/:spotifyId', () => {
    test('500 - Failed Read Spotify Idol', async () => {
        const response = await request(app)
            .get('/idols/songs/3PLJjPD8KDRzaEdznJT16j')

        expect(response.status).toBe(500)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Internal Server Error')
    })
})
