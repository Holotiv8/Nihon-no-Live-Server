const axios = require("axios");

const youtubeFunction = async (youtubeId) => {
  const options = {
    method: "GET",
    url: "https://youtube138.p.rapidapi.com/channel/videos/",
    params: { id: youtubeId, filter: "streams_latest", hl: "en", gl: "US" },
    headers: {
      "X-RapidAPI-Key": "e1eba056a8mshdb43c782b6c0609p1e7846jsn2de07ec09145",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  };
  const { data } = await axios.request(options);
  return data.contents;
};

module.exports = youtubeFunction;
