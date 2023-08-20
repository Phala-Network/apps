<script lang="ts">
  import AverageAprChart from '~/components/AverageAprChart.svelte'
  import BudgetPerShareChart from '~/components/BudgetPerShareChart.svelte'
  import DailyRewardsChart from '~/components/DailyRewardsChart.svelte'
  import DelegationValueChart from '~/components/DelegationValueChart.svelte'
  import DelegatorChart from '~/components/DelegatorChart.svelte'
  import Nav from '~/components/Nav.svelte'
  import OnlineWorkerChart from '~/components/OnlineWorkerChart.svelte'
  import PhatContractChart from '~/components/PhatContractChart.svelte'
  import StakeRatio from '~/components/StakeRatio.svelte'
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
  <section class="card h-80">
    <DelegationValueChart />
  </section>
  <section class="card h-80">
    <AverageAprChart />
  </section>
  <section class="card h-80">
    <OnlineWorkerChart />
  </section>
  <section class="card h-80">
    <DelegatorChart />
  </section>
  <section class="card h-80">
    <DailyRewardsChart />
  </section>
  <section class="card h-80">
    <BudgetPerShareChart />
  </section>
  <section class="card h-80">
    <PhatContractChart />
  </section>
  <section class="card h-24">
    <StakeRatio />
  </section>
</main>
