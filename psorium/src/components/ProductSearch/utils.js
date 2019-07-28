export const isProductNameMatching = (product, searchValue) =>
  product.name.toLowerCase().indexOf(searchValue) > -1;
