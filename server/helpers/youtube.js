const axios = require("axios");

const youtubeFunction = async (youtubeId) => {
  const options = {
    method: "GET",
    url: "https://youtube138.p.rapidapi.com/channel/videos/",
    params: { id: youtubeId, filter: "streams_latest", hl: "en", gl: "US" },
    headers: {
      "X-RapidAPI-Key": "cca1deff66mshb630dfb5df4a4cfp13d61cjsn01b1cc2f9813",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  };
  const { data } = await axios.request(options);
  return data.contents;
};

module.exports = youtubeFunction;
