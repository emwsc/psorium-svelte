<script>
  import { TABS } from "../../common/constants";
  import {
    foundRecipes,
    selectedForRecipeProducts
  } from "../../stores/store.js";
  import Tab from "./Tab/index.svelte";

  export let foundProductsCount;
  export let setCurrentTabKey;

  let selectedProductsCount;

  selectedForRecipeProducts.subscribe(async value => {
    selectedProductsCount = value ? Object.keys(value).length : 0;
  });

  let recipesCount;

  foundRecipes.subscribe(value => {
    recipesCount = value ? value.length : 0;
  });

  $: tabs = [
    {
      label: `Результаты поиска ${
        foundProductsCount > 0 ? `(${foundProductsCount})` : ""
      }`.trim(),
      key: TABS.SEARCH_RESULTS,
      isSelected: true
    },
    {
      label: `Выбранные продукты ${
        selectedProductsCount > 0 ? `(${selectedProductsCount})` : ""
      }`,
      key: TABS.SELECTED_PRODUCTS,
      isSelected: false
    },
    {
      label: `Найденные рецепты ${recipesCount > 0 ? `(${recipesCount})` : ""}`,
      key: TABS.FOUND_RECIPES,
      isSelected: false
    }
  ];

  const onTabClick = key => {
    tabs = [...tabs.map(tab => ({ ...tab, isSelected: key === tab.key }))];
    setCurrentTabKey(key);
  };
</script>

<style>
  .tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 10px;
    font-size: 14px;
  }
</style>

<div class="tabs">
  {#each tabs as tab}
    <Tab {...tab} {onTabClick} />
  {/each}
</div>
