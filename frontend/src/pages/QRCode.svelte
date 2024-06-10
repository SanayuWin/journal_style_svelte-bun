<script>
  import { onMount } from 'svelte';
  import QRCode from '@castlenine/svelte-qrcode';

  let data = null;  
  let error = null;

  const BACKEND_SERVER = import.meta.env.VITE_SVELTE_APP_BACKEND_SERVER;
  onMount(async () => {
    try {
      const response = await fetch(`${BACKEND_SERVER}qrcode`);
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

<div style="display: flex; justify-content: center; align-items: center; height: 300px; width: 300px; margin: auto;">
  {#if error}
    Error fetching data: {error.message}
  {:else if data === null}
    Loading...
  {:else}
    <QRCode data={data.msg} />
  {/if}
</div>