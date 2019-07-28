<script>
  export let text;
  export let width;
  export let imgUrl;

  $: style = `width:${width}px`;
</script>

<style>
  .placeholder {
    align-items: center;
    color: var(--grayish);
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
  }

  .placeholder__img {
    margin: 20px auto;
    width: 300px;
  }
</style>

<div class="placeholder" {style}>
  <div>{text}</div>
  <img class="placeholder__img" src={imgUrl} alt={text} />
</div>
