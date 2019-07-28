const axios = require("axios");

const { BASE_URL } = require("../common/constants");

const getProductId = async term => {
  try {
    const url =
      BASE_URL + `Ingredient/FindByName?term=${encodeURIComponent(term)}`;
    const { data } = await axios.get(url);
    return data[0];
  } catch (e) {
    return {};
  }
};

module.exports = {
  getProductId
};
