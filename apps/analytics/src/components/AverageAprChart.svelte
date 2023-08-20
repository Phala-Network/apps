<script lang="ts">
  import {toPercentage} from '@phala/util'
  import type {ChartData} from 'chart.js'
  import {Line} from 'svelte-chartjs'
  import {derived} from 'svelte/store'
  import {getGlobalState, getGlobalStateSnapshot} from '~/stores'

  const displayValue = derived(getGlobalState(), ({data}) => {
    const percentage = toPercentage(data?.summary?.averageApr)
    if (percentage != null) {
      return percentage
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
              label: 'Average APR',
              data: summary.map((e) => e.averageApr.times(100).toNumber()),
            },
          ],
        }
      }
    }
  )
</script>

<div class="flex flex-col h-full">
  <div>
    <h1 class="data-label">Average APR</h1>
    <div class="data-value mt-1">{$displayValue ?? ''}</div>
  </div>

  <div class="mt-4 flex-1">
    {#if $data != null}
      <Line
        data={$data}
        options={{
          scales: {
            x: {type: 'time'},
            y: {ticks: {display: false}, min: 0},
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (chart) => {
                  const value = chart.dataset.data[chart.dataIndex]
                  if (typeof value === 'number') {
                    return `${chart.dataset.label}: ${value.toFixed(2)}%`
                  }
                },
              },
            },
          },
        }}
      />
    {/if}
  </div>
</div>
