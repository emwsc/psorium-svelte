const axios = require("axios");
const cheerio = require("cheerio");
const nanoid = require("nanoid");

const {
  TILE_ITEM_CLASS_NAME,
  TILE_ITEM_IMG_CLASS_NAME,
  TILE_ITEM_TITLE_CLASS_NAME
} = require("./constants");

const { getFirstNode } = require("./utils");

const getRecipies = async includedProducts => {
  const { status, data } = await axios.get(
    `https://eda.ru/recepty/afishaeda/ingredienty/${includedProducts.join(
      "/"
    )}/eingredienty/13439`
  );
  if (status !== 200) return [];
  try {
    const $ = cheerio.load(data);
    const tileNodes = $(TILE_ITEM_CLASS_NAME);
    const recipies = Array.from(tileNodes).map(tileNode => {
      const titleNode = getFirstNode(
        $(tileNode).find(TILE_ITEM_TITLE_CLASS_NAME)
      );

      const url = titleNode
        ? "https://eda.ru" + $(titleNode).find("a")[0].attribs.href
        : "";
      const imgNode = getFirstNode($(tileNode).find(TILE_ITEM_IMG_CLASS_NAME));
      const imgUrl = imgNode ? imgNode.attribs["data-src"] : "";
      const title = imgNode ? imgNode.attribs["data-alt"].trim() : "";
      return {
        id: nanoid(),
        imgUrl,
        title,
        url
      };
    });
    return recipies;
  } catch (e) {
    return [];
  }
};

module.exports = { getRecipies };
