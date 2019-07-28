<script>
  import { isRecipiesSearchEnable, foundRecipes } from "../../stores/store.js";
  import { onMount } from "svelte";
  import ComponentPlaceholder from "../ComponentPlaceholder/index.svelte";
  import Recipe from "./Recipe/index.svelte";

  import lottie from "lottie-web";
  import loadingIconJson from "../../../public/assets/icons-lottie/loading/loading.json";

  let recipes, showLoader;

  const unsubscribe = foundRecipes.subscribe(value => {
    recipes = [...value];
  });

  isRecipiesSearchEnable.subscribe(value => {
    showLoader = value;
  });

  onMount(() => {
    if (!showLoader) return;
    const animation = lottie.loadAnimation({
      container: document.getElementById("recipes-loader"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loadingIconJson
    });
  });
</script>

<style>
  .disclaimer {
    margin: 20px;
    color: var(--red);
  }

  .loader {
    align-items: center;
    color: var(--grayish);
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 20px auto;
    width: 80px;
  }
  .loader__spinner {
    height: 20px;
    margin: 0 auto;
    padding-top: 10px;
    width: 20px;
  }
</style>

{#if showLoader}
  <div class="loader">
    <div>Идет поиск</div>
    <div id="recipes-loader" class="loader__spinner" />
  </div>
{/if}

{#if !recipes || recipes.length === 0}
  <ComponentPlaceholder
    text="Здесь будут отображены подходящие рецепты"
    imgUrl="./assets/images/recipes.png"
    width={325} />
{/if}

{#if recipes && recipes.length > 0}
  <div class="disclaimer">
    Найденные рецепты по прежнему могут содержать неподходящие продукты и
    способы приготовления
  </div>
{/if}

<div>
  {#each recipes as recipe (recipe.id)}
    <Recipe {recipe} />
  {/each}
</div>
