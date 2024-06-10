<script>
  import { onMount } from 'svelte';

  export let data = [];
  let error = null;

  const BACKEND_SERVER = import.meta.env.VITE_SVELTE_APP_BACKEND_SERVER;
  onMount(async () => {
    try {
      const response = await fetch(`${BACKEND_SERVER}graphics`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      data = jsonData; 
    } catch (err) {
      console.error("Error fetching data:", err);
      error = err;
    }
  });
</script>

<div>
  {#if data.length > 0}
    {#each data as item (item.row_id)}
      <div
        id={item.num}
        style="
          z-index: {item.layer};
          height: {item.height}px;
          width: {item.width}px;
          position: absolute;
          left: {item.xaxis}px;
          top: {item.yaxis}px;
          border-width: {item.borderweight}px;
          border-color: rgb({item.bordercolor.join(', ')});
          border-radius: {item.borderradius}px;
          border-style: solid;
        "
      ></div>
    {/each}
  {:else}
    <p>Loading...</p>
  {/if}
</div>
