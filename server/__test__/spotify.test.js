const app = require('../app')
const request = require('supertest')

jest.mock("../helpers/spotify", () => {
    return jest.fn((_)=>{
        return [
            {
                "releases": {
                    "items": [
                        {
                            "id": "2tnTVBJQqfKUbO2Wf1H6A4",
                            "uri": "spotify:album:2tnTVBJQqfKUbO2Wf1H6A4",
                            "name": "NEZUMI Scheme",
                            "type": "SINGLE",
                            "date": {
                                "year": 2022,
                                "isoString": "2022-11-21T00:00:00Z"
                            },
                            "coverArt": {
                                "sources": [
                                    {
                                        "url": "https://i.scdn.co/image/ab67616d00001e020cf4b30083b2bb3155997fe3",
                                        "width": 300,
                                        "height": 300
                                    },
                                    {
                                        "url": "https://i.scdn.co/image/ab67616d000048510cf4b30083b2bb3155997fe3",
                                        "width": 64,
                                        "height": 64
                                    },
                                    {
                                        "url": "https://i.scdn.co/image/ab67616d0000b2730cf4b30083b2bb3155997fe3",
                                        "width": 640,
                                        "height": 640
                                    }
                                ]
                            },
                            "playability": {
                                "playable": true,
                                "reason": "PLAYABLE"
                            },
                            "sharingInfo": {
                                "shareId": "7V2q9X1OQ5e_a2Omq0B3Hw",
                                "shareUrl": "https://open.spotify.com/album/2tnTVBJQqfKUbO2Wf1H6A4?si=7V2q9X1OQ5e_a2Omq0B3Hw"
                            },
                            "tracks": {
                                "totalCount": 1
                            }
                        }
                    ]
                }
            },
        ]
    })
})

describe('Feature Read Idol Songs GET /idols/songs/:spotifyId', () => {
    test('200 - Success Read Idols Songs', async () => {

        const response = await request(app)
        .get('/idols/songs/3PLJjPD8KDRzaEdznJT16j')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
})
