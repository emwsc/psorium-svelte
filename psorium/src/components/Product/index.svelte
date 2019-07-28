<script>
  import { onMount } from "svelte";
  import { selectedForRecipeProducts } from "../../stores/store.js";
  import { PRODUCT_VIEW_TYPES } from "../../common/constants";
  import {
    enableIconsAnimations,
    getProductClass,
    getProductEdaId,
    updateSelectedProducts
  } from "./utils.js";

  export let product;
  export let viewType;

  const productClass = getProductClass(product);
  const title = product.isRecommended ? "Это рекомендованный продукт" : "";
  const { edaId, id, name } = product;

  const productId = `selected-recipe-product-${id}`;
  const iconId = `selected-recipe-product-${id}-icon`;

  let isSelected = false;

  onMount(() => {
    const productContainer = document.getElementById(productId);
    const animation = enableIconsAnimations(viewType, iconId);

    const unsubscribe = selectedForRecipeProducts.subscribe(async value => {
      isSelected = value && value[id] ? true : false;
      if (isSelected && viewType === PRODUCT_VIEW_TYPES.SEARCH)
        animation.play();
    });

    switch (viewType) {
      case PRODUCT_VIEW_TYPES.SELECTED: {
        productContainer.addEventListener("mouseover", function() {
          animation.setDirection(1);
          animation.play();
        });
        productContainer.addEventListener("mouseout", function() {
          animation.setDirection(-1);
          animation.play();
        });
        break;
      }
      case PRODUCT_VIEW_TYPES.SEARCH: {
        productContainer.addEventListener("click", function() {
          animation.setDirection(isSelected ? -1 : 1);
          animation.play();
        });
      }
    }
  });

  const onProductClick = async event => {
    isSelected = await updateSelectedProducts(product);
  };
</script>

<style>
  .product {
    cursor: pointer;
    display: grid;
    grid-template-areas: "icon name type" "icon group type";
    grid-template-columns: auto 1fr 75px;
    align-items: center;
    margin: 10px 0px;
    padding: 5px;
    grid-gap: 1px;
  }

  .product_recommeneded {
    background: var(--honey);
  }

  .product_never {
    background: var(--red);
    color: white;
  }

  .product_never > .product__group {
    color: #ffa3a3;
  }

  .product__name {
    grid-area: name;
    font-size: 16px;
  }

  .product__group {
    grid-area: group;
    color: gray;
    font-size: 14px;
  }

  .product__icon {
    grid-area: icon;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    color: var(--honey);
  }

  .product__type {
    grid-area: type;
  }
</style>

<div id={productId} class={productClass} {title} on:click={onProductClick}>
  <div class="product__icon" id={iconId} />
  <div class="product__name">{product.name}</div>
  <div class="product__group">{product.group}</div>
  <div class="product__type">{product.type}</div>
</div>
