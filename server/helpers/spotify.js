const axios = require("axios");

const spotifyFunction = async (spotifyId) => {
  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/artist_singles/",
    params: { id: spotifyId, offset: "0", limit: "20" },
    headers: {
      "X-RapidAPI-Key": "4d7ec34579msh01e41d823cb9416p13d6e6jsne35744429b63",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  const { data } = await axios.request(options);
  return data.data.artist.discography.singles.items;
};

module.exports = spotifyFunction;
