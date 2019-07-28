<script>
  import ComponentPlaceholder from "../ComponentPlaceholder/index.svelte";
  import { foundRecipes } from "../../stores/store.js";
  import Recipe from "./Recipe/index.svelte";

  let recipes;

  const unsubscribe = foundRecipes.subscribe(value => {
    recipes = [...value];
  });
</script>

<style>
  .disclaimer {
    margin: 20px;
    color: var(--red);
  }
</style>

{#if !recipes || recipes.length === 0}
  <ComponentPlaceholder
    text="Здесь будут отображены подходящие рецепты"
    imgUrl="./assets/images/recipes.png"
    width={325} />
{/if}

{#if recipes && recipes.length > 0}
  <div class="disclaimer">
    Найденные рецепты по прежнему могут создержать неподходящие продукты и
    способы приготовления
  </div>
{/if}

<div>
  {#each recipes as recipe (recipe.id)}
    <Recipe {recipe} />
  {/each}
</div>
