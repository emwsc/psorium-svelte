<script>
  import ProductSearch from "./components/ProductSearch/index.svelte";
  import ProductSearchResults from "./components/ProductSearchResults/index.svelte";
  import SelectedRecipeProducts from "./components/SelectedRecipeProducts/index.svelte";
  import FoundRecipes from "./components/FoundRecipes/index.svelte";
  import Tabs from "./components/Tabs/index.svelte";

  import { GET_PRODUCT_URL } from "./constants";

  import {
    isRecipiesSearchEnable,
    foundRecipes,
    selectedForRecipeProducts
  } from "./stores/store.js";

  import { TABS } from "./common/constants";

  let isSearchedAtLeastOnce = false;
  let searchResults = [];
  let currentTabKey = TABS.SEARCH_RESULTS;

  const setSearchResults = results => {
    isSearchedAtLeastOnce = true;
    searchResults = results ? results : [];
  };
  const setCurrentTabKey = key => (currentTabKey = key);

  $: components = { 
    [TABS.SEARCH_RESULTS]: {
      component: ProductSearchResults,
      props: { searchResults, isSearchedAtLeastOnce }
    },
    [TABS.SELECTED_PRODUCTS]: {
      component: SelectedRecipeProducts,
      props: {}
    },
    [TABS.FOUND_RECIPES]: { component: FoundRecipes, props: {} }
  };

  const unsubscribe = selectedForRecipeProducts.subscribe(async products => {
    const keys = Object.keys(products);
    if (!keys || keys.length === 0) return;
    const result = await fetch(
      GET_PRODUCT_URL + keys.map(key => products[key].edaId).join(",")
    );
    const recipes = await result.json();
    isRecipiesSearchEnable.update(() => false);
    foundRecipes.update(() => {
      return recipes;
    });
  });
</script>

<style>
  :global(:root) {
    --nice-blue: #07a0c3;
    --honey: #ffbd41;
    --red: #d72638;
    --grayish: #625454;
  }

  :global(body) {
    font-family: "Fira Sans Condensed", sans-serif;
    margin: 10px;
    padding: 10px;
  }

  .main {
    max-width: 700px;
    margin: 10px auto;
  }
</style>

<main class="main">
  <ProductSearch {setSearchResults} />
  <Tabs foundProductsCount={searchResults.length} {setCurrentTabKey} />
  <svelte:component
    this={components[currentTabKey].component}
    {...components[currentTabKey].props} />
</main>
