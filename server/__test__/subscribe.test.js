const app = require('../app')
const request = require('supertest')
const {sequelize,User}= require('../models')
const queryInterface = sequelize.queryInterface
const { hashPassword } = require('../helpers/index')
let access_token

beforeAll(async ()=>{
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

afterAll(async()=>{
    await User.destroy({truncate:true,restartIdentity:true,cascade:true})
})

describe('Change Status User',()=>{
    test('200 - Success Change Status',async()=>{
        const response = await request(app)
        .patch('/users/subscribe').set('access_token',access_token)

    expect(response.status).toBe(200)
    })
    test('500 - Failed change Status',async()=>{
        jest.spyOn(User, "update").mockRejectedValue("Internal Server Error")
        const response = await request(app)
            .patch('/users/subscribe')
            .set('access_token', access_token)

        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("message","Internal Server Error")
        expect(response.body).toBeInstanceOf(Object)
    })
})