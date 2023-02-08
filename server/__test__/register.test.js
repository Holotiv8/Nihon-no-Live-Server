const app = require("../app");
const request = require("supertest");
const { sequelize, User } = require("../models");
const { hashPassword } = require("../helpers/index");
const sendEmailRegis = require("../helpers/nodemailer");

const queryInterface = sequelize.queryInterface;

beforeAll(async () => {
  let dataUser = require("../data/user.json");
  dataUser.forEach((el) => {
    el.password = hashPassword(el.password);
    el.createdAt = el.updatedAt = new Date();
  });
  await queryInterface.bulkInsert("Users", dataUser, {});
});

beforeEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await User.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

// jest.mock("../helpers/nodemailer", () => {
//     return jest.fn((_)=>{
//         return Promise.resolve('success')
//     })
// })

describe("Feature Register Customer POST /users/register", () => {
  test("201 - Success create", async () => {
    jest.spyOn(sendEmailRegis, "sendEmail").mockResolvedValue("Success");
    let input = {
      username: "risanto",
      email: "risanto@mail.com",
      password: "risanto123",
    };
    const response = await request(app).post("/users/register").send(input);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("id", 4);
    expect(response.body).toHaveProperty("email", "risanto@mail.com");
  });

  test("400 - Failed Create - Username is Required!", async () => {
    let input = {
      email: "risanto@mail.com",
      password: "risanto123",
    };
    const response = await request(app).post("/users/register").send(input);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("Username is required");
    // expect(response.body).toHaveProperty('message', expect.any(String))
  });

  test("400 - Failed Create - Username is Required!", async () => {
    let input = {
      username: "",
      email: "risanto@mail.com",
      password: "risanto123",
    };
    const response = await request(app).post("/users/register").send(input);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("Username is required");
    // expect(response.body).toHaveProperty('message', expect.any(String))
  });

  test("400 - Failed Create - Email is Required!", async () => {
    let input = {
      username: "risanto",
      password: "risanto123",
    };
    const response = await request(app).post("/users/register").send(input);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("Email is required");
  });

  test("400 - Failed Create - Email is Required!", async () => {
    let input = {
      username: "risanto",
      email: "",
      password: "risanto123",
    };
    const response = await request(app).post("/users/register").send(input);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("Email is required");
  });

  test("400 - Failed Create - Invalid Email Format", async () => {
    let input = {
      username: "risanto",
      email: "risanto",
      password: "risanto123",
    };
    const response = await request(app).post("/users/register").send(input);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("Must be email format");
  });

  test("400 - Failed Create - Email Has Been Used", async () => {
    let input = {
      username: "risanto",
      email: "brian@mail.com",
      password: "risanto123",
    };
    const response = await request(app).post("/users/register").send(input);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("Email already taken");
  });

  test("400 - Failed Create - Password is Required!", async () => {
    let input = {
      username: "risanto",
      email: "risanto@mail.com",
    };
    const response = await request(app).post("/users/register").send(input);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("Password is required");
  });

  test("400 - Failed Create - Password is Required!", async () => {
    let input = {
      username: "risanto",
      email: "risanto@mail.com",
      password: "",
    };
    const response = await request(app).post("/users/register").send(input);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("Password is required");
  });

  test("400 - Failed Create - Password Minimal 5 Characters", async () => {
    let input = {
      username: "risanto",
      email: "risanto@mail.com",
      password: "asd",
    };
    const response = await request(app).post("/users/register").send(input);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.message).toContain("Password Minimal 5 Characters");
  });
});
