const app = require("../app");
const request = require("supertest");

jest.mock("../helpers/youtube", () => {
  return jest.fn((_) => {
    return [
      {
        type: "video",
        video: {
          badges: [],
          isLiveNow: false,
          lengthSeconds: 8548,
          movingThumbnails: [
            {
              height: 180,
              url: "https://i.ytimg.com/an_webp/VyUt8HOmB9c/mqdefault_6s.webp?du=3000&sqp=CIG0354G&rs=AOn4CLCtksP70kgp5_SCbxfWeE2B2UNaUg",
              width: 320,
            },
          ],
          publishedTimeText: "Streamed 3 hours ago",
          stats: {
            views: 84249,
          },
          thumbnails: [
            {
              height: 94,
              url: "https://i.ytimg.com/vi/VyUt8HOmB9c/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAaGiXkA6qvoiHdmWIWA0BjXM0qKw",
              width: 168,
            },
            {
              height: 110,
              url: "https://i.ytimg.com/vi/VyUt8HOmB9c/hqdefault.jpg?sqp=-oaymwEbCMQBEG5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDVqysxlWkD6TwEWqE860P1gFrEkA",
              width: 196,
            },
            {
              height: 138,
              url: "https://i.ytimg.com/vi/VyUt8HOmB9c/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBcik2I-BEZv2wmIvBjtDeeT1r7DA",
              width: 246,
            },
            {
              height: 188,
              url: "https://i.ytimg.com/vi/VyUt8HOmB9c/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDk1RLHcDpDd4kmyNe531jnFpTcLg",
              width: 336,
            },
          ],
          title: "【GeoGuessr】Let's guess a place!【holoID】",
          videoId: "VyUt8HOmB9c",
        },
      },
    ];
  });
});

describe("Feature Read Idol Youtube GET /idols/video/:youtubeId", () => {
  test("200 - Success Read Idols Youtube Video", async () => {
    const response = await request(app).get(
      "/idols/video/UCP0BspO_AMEe3aQqqpo89Dg"
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});