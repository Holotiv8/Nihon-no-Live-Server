const app = require('../app')
const request = require('supertest')
const { sequelize, User } = require('../models')
const queryInterface = sequelize.queryInterface
const { hashPassword } = require('../helpers/index')
const sendEmailObj= require('../helpers/nodemailerSubs')
let access_token


beforeAll(async () => {
    let dataUser = require('../data/user.json')
    dataUser.forEach(el => {
        el.password = hashPassword(el.password)
        el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Users", dataUser, {})
    let response = await request(app).post("/users/login").send({
        email : "brian@mail.com", 
        password: "brian123"
    })
    access_token = response.body.access_token
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
})


jest.mock("../helpers/payment", () => {
    return jest.fn((_) => {
        throw "Internal Server Error"
    })
})

// jest.mock("../helpers/nodemailerSubs", () => {
//     return jest.fn((_)=>{
//         return Promise.resolve('success')
//     })
// })

describe('Feature Failed Generate Token Midtrans /payments', () => {
    test('500 - Failed Failed Generate Token', async () => {
        jest.spyOn(sendEmailObj, "sendEmailSubs").mockRejectedValue("Error")
        const response = await request(app)
            .post('/payments')
            .set('access_token', access_token)


        expect(response.status).toBe(500)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Internal Server Error')
    })
})
