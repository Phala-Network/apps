<script lang="ts">
  import {compactFormat} from '@phala/util'
  import type {ChartData} from 'chart.js'
  import {Bar} from 'svelte-chartjs'
  import {derived} from 'svelte/store'
  import {getGlobalStateSnapshot} from '~/stores'

  const store = getGlobalStateSnapshot()

  const displayValue = derived(store, ({data}) => {
    if (data != null) {
      const {summary} = data
      const length = summary.length
      return compactFormat(
        summary[length - 1].cumulativeRewards.minus(
          summary[length - 25].cumulativeRewards
        )
      )
    }
  })

  const data = derived(
    store,
    ({data}): ChartData<'bar', number[]> | undefined => {
      if (data != null) {
        const {summary} = data
        const chartData: number[] = []
        const labels: Date[] = []
        for (let i = 24; i < summary.length; i++) {
          const state = summary[i]
          if (state.updatedTime.getUTCHours() === 0) {
            labels.push(state.updatedTime)
            chartData.push(
              state.cumulativeRewards
                .minus(summary[i - 24].cumulativeRewards)
                .toDP(2)
                .toNumber()
            )
          }
        }
        return {labels, datasets: [{label: 'Daily rewards', data: chartData}]}
      }
    }
  )
</script>

<div class="flex flex-col h-full">
  <div>
    <h1 class="data-label">Daily rewards</h1>
    <div class="data-value mt-1">{$displayValue ?? ''}</div>
  </div>

  <div class="mt-4 flex-1">
    {#if $data != null}
      <Bar
        data={$data}
        options={{
          scales: {
            x: {type: 'time'},
            y: {ticks: {display: false}},
          },
        }}
      />
    {/if}
  </div>
</div>
