<script>
  import ComponentPlaceholder from "../ComponentPlaceholder/index.svelte";
  import Product from "../Product/index.svelte";
  import { PRODUCT_VIEW_TYPES } from "../../common/constants";

  import {
    isRecipiesSearchEnable,
    foundRecipes,
    selectedForRecipeProducts
  } from "../../stores/store.js";

  let products;

  const unsubscribe = selectedForRecipeProducts.subscribe(async value => {
    products = value;
    // const keys = Object.keys(products);
    // if (!keys || keys.length === 0) return;
    // const result = await fetch(
    //   GET_PRODUCT_URL + keys.map(key => products[key].edaId).join(",")
    // );
    // const json = await result.json();
    // isRecipiesSearchEnable.update(() => false);
    // foundRecipes.update(recipes => {
    //   return json;
    // });
  });

  $: keys = Object.keys(products);
</script>

{#if !products || keys.length === 0}
  <ComponentPlaceholder
    text="Здесь будут отображены выбранные вами продукты"
    imgUrl="./assets/images/products.png"
    width={360} />
{/if}

<div>
  {#each keys as key (key)}
    <Product product={products[key]} viewType={PRODUCT_VIEW_TYPES.SELECTED} />
  {/each}
</div>
