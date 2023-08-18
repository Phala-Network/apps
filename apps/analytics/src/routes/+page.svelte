<script lang="ts">
  import AverageAprChart from '~/components/AverageAprChart.svelte'
  import DelegationValueChart from '~/components/DelegationValueChart.svelte'
  import DelegatorChart from '~/components/DelegatorChart.svelte'
  import Nav from '~/components/Nav.svelte'
  import OnlineWorkerChart from '~/components/OnlineWorkerChart.svelte'
  import PhatContractChart from '~/components/PhatContractChart.svelte'
  import {initChartJS} from '~/lib/chart'

  initChartJS()
</script>

<svelte:head>
  <title>Phala Analytics</title>
</svelte:head>

<header class="mx-auto px-4 md:px-6 mt-4 md:mt-6 max-w-7xl">
  <Nav />
</header>

<main
  class="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto mt-6 md:mt-14 px-4 md:px-6"
>
  <!-- <section
    class="card col-span-2 grid gap-4 md:grid-cols-4 grid-cols-2 divide-x-2"
  /> -->
  <section class="card h-24">
    <DelegationValueChart />
  </section>
  <section class="card h-24">
    <AverageAprChart />
  </section>
  <section class="card h-24">
    <OnlineWorkerChart />
  </section>
  <section class="card h-24">
    <DelegatorChart />
  </section>
  <section class="card h-80">
    <PhatContractChart />
  </section>
</main>
