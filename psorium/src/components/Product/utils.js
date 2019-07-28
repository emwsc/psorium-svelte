import { NEVER_TYPE, GET_PRODUCT_URL } from "./constants.js";
import { selectedForRecipeProducts } from "../../stores/store.js";
import { PRODUCT_VIEW_TYPES } from "../../common/constants";

import lottie from "lottie-web";
import trashIconJson from "../../../public/assets/icons-lottie/trash/trash.json";
import plusIconJson from "../../../public/assets/icons-lottie/plus/plus-to-x.json";

/**
 * Получить класс для DOM элемента продукта
 * @param {object} product
 */
export const getProductClass = product => {
  let productClass = "product ";
  if (product.isRecommended) productClass += "product_recommeneded";
  else if (product.type === NEVER_TYPE) productClass += "product_never";
  return productClass;
};

export const getProductEdaId = async term => {
  const result = await fetch(GET_PRODUCT_URL + term);
  const json = await result.json();
  const { ObjectID: edaId } = json;
  return edaId;
};

/**
 * Обновить хранилище selectedForRecipeProducts
 */
export const updateSelectedProducts = async product => {
  const { name, id } = product;
  const edaId = await getProductEdaId(name);
  let isSelected;
  selectedForRecipeProducts.update(products => {
    isSelected = products[id] ? false : true;
    if (products[id]) {
      delete products[id];
      return products;
    }
    products[id] = { ...product, edaId };
    return products;
  });
  return isSelected;
};

/**
 * Включить анимацию для иконок lottie
 * @param {string} viewType
 * @param {boolean} isSelected
 * @param {string} productId
 * @param {string} iconId
 */
export const enableIconsAnimations = (viewType, iconId) => {
  const iconContainer = document.getElementById(iconId);
  const animation = lottie.loadAnimation({
    container: iconContainer,
    renderer: "svg",
    loop: false,
    autoplay: false,
    animationData:
      viewType === PRODUCT_VIEW_TYPES.SEARCH ? plusIconJson : trashIconJson
  });
  if (viewType === PRODUCT_VIEW_TYPES.SEARCH) animation.setSpeed(2);
  return animation;
};
