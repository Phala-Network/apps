<script lang="ts">
  import Computation from '~/lib/Computation.svelte'
  import Nav from '~/lib/Nav.svelte'
  import PhatContract from '~/lib/PhatContract.svelte'
  import {initChartJS} from '~/lib/chart'

  initChartJS()
</script>

<svelte:head>
  <title>Phala Analytics</title>
</svelte:head>

<header class="mx-auto px-4 md:px-6 mt-4 md:mt-6 max-w-7xl">
  <Nav />
</header>

<main class="max-w-5xl mx-auto mt-6 md:mt-14 px-4 md:px-6 mb-6">
  <Computation />
  <div class="mt-4 overflow-hidden" />
  <PhatContract />
</main>
