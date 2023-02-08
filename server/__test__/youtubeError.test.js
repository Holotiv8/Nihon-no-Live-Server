const app = require("../app");
const request = require("supertest");

jest.mock("../helpers/youtube", () => {
  return jest.fn((_) => {
    throw "Internal Server Error";
  });
});

describe("Feature Read Idol Youtube GET /idols/video/:youtubeId", () => {
  test("500 - Failed Read Youtube Idol", async () => {
    const response = await request(app).get(
      "/idols/video/UCP0BspO_AMEe3aQqqpo89Dg"
    );

    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Internal Server Error");
  });
});
