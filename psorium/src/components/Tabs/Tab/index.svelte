<script>
  export let onTabClick;
  export let isSelected;
  export let label;
  export let key;

  $: tabClassName = `tab ${isSelected ? "tab_selected" : ""}`.trim();
</script>

<style>
  .tab {
    min-width: 150px;
    color: var(--grayish);
    cursor: pointer;
  }

  .tab_selected {
    color: var(--nice-blue);
  }
</style>

<div on:click={() => onTabClick(key)} class={tabClassName}>{label}</div>
