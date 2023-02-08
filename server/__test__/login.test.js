const app = require('../app')
const request = require('supertest')
const { sequelize, User } = require('../models')
const queryInterface = sequelize.queryInterface
const { hashPassword } = require('../helpers/index')


beforeAll(async () => {
    let dataUser = require('../data/user.json')
    dataUser.forEach(el => {
        el.password = hashPassword(el.password)
        el.createdAt = el.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Users", dataUser, {});
})

afterAll(async () => {
    await User.destroy({
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
})


describe('Feature Login User POST /users/login', () => {
    test('200 - Success login', async () => {
        let input = {
            email: 'brian@mail.com',
            password: 'brian123',
        }
        const response = await request(app)
            .post('/users/login')
            .send(input)

        expect(response.status).toBe(200)
        expect(response.body).toBeInstanceOf(Object)
    })

    test('302 - Success verify', async () => {
        const response = await request(app)
            .get('/users/verify/12345678')

        expect(response.status).toBe(302)
    })

    test('400 - Failed Login - Email/Password Required', async () => {
        let input = {
            email: '',
            password: 'brian123',
        }
        const response = await request(app)
            .post('/users/login')
            .send(input)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email/Password Invalid')
    })

    test('400 - Failed Login - Invalid Credentials', async () => {
        let input = {
            email: 'risanto@mail.com',
            password: 'brian123',
        }
        const response = await request(app)
            .post('/users/login')
            .send(input)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email/Password Invalid')
    })

    test('400 - Failed Login - Invalid Credentials', async () => {
        let input = {
            email: 'brian@mail.com',
            password: 'brian123454',
        }
        const response = await request(app)
            .post('/users/login')
            .send(input)

        expect(response.status).toBe(401)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Email/Password Invalid')
    })

    test('400 - Failed Login - Verify Your Account', async () => {
        let input = {
            email: 'bintang@mail.com',
            password: 'bintang123',
        }
        const response = await request(app)
            .post('/users/login')
            .send(input)

        expect(response.status).toBe(400)
        expect(response.body).toBeInstanceOf(Object)
        expect(response.body).toHaveProperty('message', 'Verify Your Account')
    })
})