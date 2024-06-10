<script>
  import { onMount } from 'svelte';

  let data = null;  
  let error = null;

  const BACKEND_SERVER = import.meta.env.VITE_SVELTE_APP_BACKEND_SERVER;
  onMount(async () => {
    try {
      const response = await fetch(`${BACKEND_SERVER}helloworld`);
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
  {#if error}
    Error fetching data: {error.message}
  {:else if data === null}
    Loading...
  {:else}
      {data.msg}
  {/if}
</div>
