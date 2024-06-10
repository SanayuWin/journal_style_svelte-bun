<script>
  import { Router, Route } from "svelte-routing";
  import HelloWorld from './pages/HelloWorld.svelte';
  import QRCode from './pages/QRCode.svelte';
  import Graphics from './pages/Graphics.svelte';
</script>

<main>
    
  <Router>
    <Route path="/graphics" component={Graphics} />
    <Route path="/qrcode" component={QRCode} />
    <Route path="/"><HelloWorld /></Route>
  </Router>

</main>
