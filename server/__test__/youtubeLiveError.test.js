const app = require("../app");
const request = require("supertest");

jest.mock("../helpers/youtubeLive", () => {
  return jest.fn((_) => {
    throw "Internal Server Error";
  });
});

describe("Feature Read Idol Live Youtube GET /idols/video/live/:youtubeId", () => {
  test("500 - Failed Read Youtube Idol", async () => {
    const response = await request(app).get(
      "/idols/video/live/UCP0BspO_AMEe3aQqqpo89Dg"
    );

    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Internal Server Error");
  });
});
