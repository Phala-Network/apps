<script lang="ts">
  import {onMount} from 'svelte'
  import Nav from '~/components/Nav.svelte'
  import PhatContractChart from '~/components/PhatContractChart.svelte'
  import {initChartJS} from '~/lib/chart'

  onMount(() => {
    initChartJS()
  })
</script>

<svelte:head>
  <title>Phala Analytics</title>
</svelte:head>

<header class="mx-auto px-4 md:px-6 mt-4 md:mt-6 max-w-6xl">
  <Nav />
</header>

<main
  class="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto mt-6 md:mt-10 px-4 md:px-6"
>
  <section class="card h-80">
    <PhatContractChart />
  </section>
</main>
