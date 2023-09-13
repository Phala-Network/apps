<script lang="ts">
  import {compactFormat} from '@phala/util'
  import type {ChartData} from 'chart.js'
  import {Bar} from 'svelte-chartjs'
  import {derived} from 'svelte/store'
  import {getPhatContractData} from '~/stores/phat'
  import {getPhatOffchainData} from '~/stores/phatOffchain'

  const display = derived(
    [getPhatContractData(), getPhatOffchainData()],
    ([{data}, {data: offchainData}]) => {
      let dailyExecution = 'ㅤ'
      let staking = 'ㅤ'
      let clusterWorkers = 'ㅤ'
      let contracts = 'ㅤ'
      let users = 'ㅤ'

      let chartData: ChartData<'bar', number[]> | null = null

      const format = new Intl.NumberFormat('en-US').format

      if (data != null) {
        staking = `${format(data.stake.toDP(0).toNumber())} PHA`
        clusterWorkers = format(data.idleWorker)
        contracts = format(data.contract)
        users = format(data.staker)
      }

      if (offchainData != null && offchainData.length > 0) {
        chartData = {
          labels: offchainData.map((e) => e.dt),
          datasets: [
            {
              label: 'Execution count',
              data: offchainData.map((e) => e.executionCount),
            },
          ],
        }

        const latest = offchainData?.at(-1)?.executionCount
        if (latest != null) {
          dailyExecution = compactFormat(latest)
        }
      }

      return {
        chartData,
        entries: [
          ['Daily execution', dailyExecution],
          ['Staking', staking],
          ['Cluster workers', clusterWorkers],
          ['Contracts', contracts],
          ['Users', users],
        ],
      }
    }
  )
</script>

<h1 class="font-montserrat text-4xl font-bold my-8">Phat Contract</h1>

<div class="flex flex-wrap gap-4">
  <section class="card h-80 min-w-[340px] max-md:w-full">
    {#each $display.entries as item, i}
      {#if i === 0}
        <h2 class="data-label">{item[0]}</h2>
        <div class="data-value mt-1 mb-5">{@html item[1]}</div>
      {:else}
        <div class="flex items-baseline justify-between mt-1">
          <h2 class="data-label">{item[0]}</h2>
          <span class="numeric">{item[1]}</span>
        </div>
      {/if}
    {/each}
  </section>
  <section class="card h-80 flex-1 max-md:w-full overflow-hidden">
    {#if $display.chartData != null}
      <Bar data={$display.chartData} options={{scales: {x: {type: 'time'}}}} />
    {/if}
  </section>
</div>
