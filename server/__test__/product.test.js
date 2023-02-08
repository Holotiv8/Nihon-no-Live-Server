const app = require('../app')
const request = require('supertest')
const { sequelize, Products, Idol, Branch } = require('../models')
// const { hashPassword } = require('../helpers/index')
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
    let data = require("../data/product.json");
     data.forEach((el) => {
       el.createdAt = el.updatedAt = new Date();
     });
    await queryInterface.bulkInsert('Products', data, {})
    // await queryInterface.bulkInsert('Users', dataUser, {})
    // let response = await request(app).post("/users/login").send({
    //     email : "brian@mail.com", 
    //     password: "brian123"
    // })
    // access_token = response.body.access_token
    // // await queryInterface.bulkInsert('Users', userJSON, {})
})

beforeEach(() => {
    jest.restoreAllMocks()
})

afterAll(async () => {
    await Idol.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
    await Products.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
})


describe('Feature Read Product GET /products/', () => {
    test('200 - Success Read Products', async () => {
        const response = await request(app)
            .get('/products')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })

    test('200 - Success Read Specific Product', async () => {
        const response = await request(app)
            .get('/products/9')

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })

    test('404 - Failed Read Specific Product', async () => {
        const response = await request(app)
            .get('/products/100')

        expect(response.status).toBe(404)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Data Not Found')
    })

    test('500 - Fail Read Products', async () => {
        jest.spyOn(Idol, "findAll").mockRejectedValue("Internal Server Error")
        const response = await request(app)
            .get('/products')

        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("message","Internal Server Error")
        expect(response.body).toBeInstanceOf(Object)
    })


})