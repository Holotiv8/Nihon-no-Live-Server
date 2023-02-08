const app = require('../app')
const request = require('supertest')
const { sequelize, Idol, Branch, User, Favorite } = require('../models')
const { hashPassword } = require('../helpers/index')
const queryInterface = sequelize.queryInterface
let access_token

beforeAll(async () => {
    let branchJSON = require('../data/branch.json')
    branchJSON.forEach(el => {
        el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Branches', branchJSON, {})
    let idolJSON = require('../data/talents.json')
    idolJSON.forEach(el => {
        el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Idols', idolJSON, {})
    let dataUser = require('../data/user.json')
    dataUser.forEach(el => {
        el.password = hashPassword(el.password)
        el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Users', dataUser, {})
    let response = await request(app).post("/users/login").send({
        email : "brian@mail.com", 
        password: "brian123"
    })
    access_token = response.body.access_token
    await queryInterface.bulkInsert('Favorites', [{ IdolId: 1, UserId: 1, createdAt: new Date(), updatedAt: new Date() }], {})
})

beforeEach(() => {
    jest.restoreAllMocks()
})

afterAll(async () => {
    await User.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
    await Branch.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
    await Idol.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
    await Favorite.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
})


describe('Feature Read Idol GET /idols/', () => {
    test('200 - Success Read Idols', async () => {
        const response = await request(app)
            .get('/idols')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })

    test('500 - Fail Read Idols', async () => {
        jest.spyOn(Idol, "findAll").mockRejectedValue("Internal Server Error")
        const response = await request(app)
            .get('/idols')

        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("message","Internal Server Error")
        expect(response.body).toBeInstanceOf(Object)
    })

    test('200 - Success Read Idol With Filter', async () => {
        const response = await request(app)
            .get('/idols?filter[branch]=3')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })

    test('200 - Success Read Specific Idol', async () => {
        const response = await request(app)
            .get('/idols/5')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })

    test('404 - Failed Read Specific Idol', async () => {
        const response = await request(app)
            .get('/idols/100')

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Data Not Found')
    })

})

describe('Feature Read Branches GET /idols/branches', () => {
    test('200 - Success Read Branches', async () => {
        const response = await request(app)
            .get('/idols/branches')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })

    test('500 - Fail Read Idols', async () => {
        jest.spyOn(Branch, "findAll").mockRejectedValue("Internal Server Error")
        const response = await request(app)
            .get('/idols/branches')

        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("message","Internal Server Error")
        expect(response.body).toBeInstanceOf(Object)
    })

})

describe('Feature Read Favorite Idol GET /favorites', () => {
    test('200 - Success Read Favorite Idol', async () => {
        const response = await request(app)
            .get('/favorites')
            .set('access_token', access_token)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })
    test('200 - Success Read Favorite Idol With Filter', async () => {
        const response = await request(app)
            .get('/favorites?filter[branch]=1')
            .set('access_token', access_token)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Array)
    })

    test('401 - Failed Read Favorite Idol', async () => {
        const response = await request(app)
            .get('/favorites')

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Error Authentication')
    })

    test('401 - Failed Read Favorite Idol', async () => {
        const response = await request(app)
            .get('/favorites')
            .set('access_token', 'adsaasdsvfdsbsddsvsd')

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Error Authentication')
    })

    test('401 - Failed Read Favorite Idol Unauthorize', async () => {
        const response = await request(app)
            .get('/favorites')
            .set('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NH0.VkoNZBAKUBmHfl2pSblWu_RxX0LGyYkKgbBYRiSHR84')

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Error Authentication')
    })

    test('500 - Fail Read Favorite Idols', async () => {
        jest.spyOn(Idol, "findAll").mockRejectedValue("Internal Server Error")
        const response = await request(app)
            .get('/favorites')
            .set('access_token', access_token)

        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("message","Internal Server Error")
        expect(response.body).toBeInstanceOf(Object)
    })

})

describe('Feature Add Favorite Idol POST /favorites/:IdolId', () => {
    test('201 - Success Read Favorite Idol', async () => {
        const response = await request(app)
            .post('/favorites/2')
            .set('access_token', access_token)

        expect(response.status).toBe(201)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Success Add Favorite Idol')
    })

    test('404 - Failed Add Favorite Idol', async () => {
        const response = await request(app)
            .post('/favorites/100')
            .set('access_token', access_token)

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Data Not Found')
    })

})

describe('Feature Delete Favorite',()=>{
    test('200 - success Delete Favorite',async()=>{
        const response = await request(app)
        .delete('/favorites/1').set('access_token',access_token)
        expect(response.status).toBe(200)
    })
    test('404 - Failed Delete Favorite Idol', async () => {
        const response = await request(app)
            .delete('/favorites/100')
            .set('access_token', access_token)

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Data Not Found')
    })
})

