<script>
  import productGroups from "../../../public/assets/result_250719.json";
  export let setSearchResults;

  import { isProductNameMatching } from "./utils.js";
  import { productTypes } from "./constants.js";

  const onSearchSubmit = event => {
    const searchValue = event.target.elements[
      "search-input"
    ].value.toLowerCase();
    if (!searchValue || searchValue.length < 2) return [];
    let results = [];
    for (let i = 0; i < productGroups.length; i++) {
      const group = productGroups[i];
      let products = [];
      productTypes.forEach(productType => {
        products = products.concat(
          group[productType.fieldName]
            .filter(product => isProductNameMatching(product, searchValue))
            .map(product => ({
              ...product,
              group: group.group,
              type: productType.type
            }))
        );
      });

      if (products) {
        results = results.concat(products);
      }
    }
    setSearchResults(results);
  };
</script>

<style>
  .product-search {
    align-items: center;
    border-radius: 30px;
    border: 1px solid var(--nice-blue);
    display: grid;
    grid-area: search;
    grid-template-columns: auto 1fr;
    margin: 5px;
  }

  .product-search__icon {
    color: var(--nice-blue);
    margin: 8px;
  }

  .product-search__input {
    border: none;
    font-family: "Fira Sans Condensed", sans-serif;
    margin: 8px;
    outline: none;
    padding: 10px;
  }
</style>

<div>
  <form
    autocomplete="off"
    class="product-search"
    on:submit|preventDefault={onSearchSubmit}>
    <i class="material-icons product-search__icon">search</i>
    <input
      name="search-input"
      class="product-search__input"
      placeholder="Введите название продукта" />
  </form>
</div>
