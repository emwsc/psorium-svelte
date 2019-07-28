<script>
  export let recipe;
  const { title, url, imgUrl } = recipe;
</script>

<style>
  .recipe {
    margin: 0 auto;
    width: 70%;
  }

  .recipe__link {
    align-items: center;
    color: black;
    display: inline-grid;
    grid-template-columns: 1fr 1fr;
    text-decoration: none;
    width: 100%;
  }

  .recipe__img {
    border-radius: 50%;
    height: 150px;
    margin-right: 10px;
    width: 150px;
  }
</style>

<div class="recipe">
  <a class="recipe__link" target="_blank" href={url}>
    <img class="recipe__img " alt={title} src={imgUrl} />
    <span>{title}</span>
  </a>
</div>
