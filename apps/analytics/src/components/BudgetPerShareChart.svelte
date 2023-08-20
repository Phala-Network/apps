<script lang="ts">
  import type {ChartData} from 'chart.js'
  import {Line} from 'svelte-chartjs'
  import {derived} from 'svelte/store'
  import {getGlobalState, getGlobalStateSnapshot} from '~/stores'

  const displayValue = derived(getGlobalState(), ({data}) => {
    const value = data?.summary?.budgetPerShare
    if (value != null) {
      return value.toDP(2).toString()
    }
  })

  const data = derived(
    getGlobalStateSnapshot(),
    ({data}): ChartData<'line', number[]> | undefined => {
      if (data != null) {
        const {summary} = data
        return {
          labels: summary.map((e) => e.updatedTime),
          datasets: [
            {
              label: 'Budget per share',
              data: summary.map((e) => e.budgetPerShare.toDP(2).toNumber()),
            },
          ],
        }
      }
    }
  )
</script>

<div class="flex flex-col h-full">
  <div>
    <h1 class="data-label">Budget per share</h1>
    <div class="data-value mt-1">{$displayValue ?? ''}</div>
  </div>

  <div class="mt-4 flex-1">
    {#if $data != null}
      <Line
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
