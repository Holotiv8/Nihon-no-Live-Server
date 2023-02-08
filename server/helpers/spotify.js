const axios = require("axios");

const spotifyFunction = async (spotifyId) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/artist_singles/",
    params: { id: spotifyId, offset: "0", limit: "20" },
    headers: {
      "X-RapidAPI-Key": "e1eba056a8mshdb43c782b6c0609p1e7846jsn2de07ec09145",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const { data } = await axios.request(options);
  return data.data.artist.discography.singles.items;
};

module.exports = spotifyFunction;
