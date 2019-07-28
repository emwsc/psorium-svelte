<script>
  import Product from "../Product/index.svelte";
  import ComponentPlaceholder from "../ComponentPlaceholder/index.svelte";
  import { PRODUCT_VIEW_TYPES } from "../../common/constants";

  export let searchResults;
  export let isSearchedAtLeastOnce;
</script>

<style>
  .results {
    grid-area: results;
  }
</style>

<div class="results">
  {#each searchResults as product (product.id)}
    <Product {product} viewType={PRODUCT_VIEW_TYPES.SEARCH} />
  {/each}
  {#if !isSearchedAtLeastOnce}
    <ComponentPlaceholder
      text="Здесь будут отображены результаты поиска"
      imgUrl="./assets/images/search.png"
      width={300} />
  {/if}
  {#if isSearchedAtLeastOnce && searchResults.length === 0}
    <ComponentPlaceholder
      text=" К сожалению, ничего не найдено. Это не значит что продукт запрещен
      или разрешен, скорее всего его просто нет в базе данных."
      imgUrl="./assets/images/not-found.png"
      width={500} />
  {/if}
</div>
