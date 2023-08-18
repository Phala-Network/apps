<script lang="ts">
  import {compactFormat} from '@phala/util'
  import type {ChartData} from 'chart.js'
  import {Line} from 'svelte-chartjs'
  import {derived} from 'svelte/store'
  import {getGlobalState} from '~/stores'

  const displayValue = derived(getGlobalState(), ({data}) => {
    const value = data?.summary?.workerCount
    if (value != null) {
      return compactFormat(value)
    }
  })

  let data: ChartData<'line', number[]>
</script>

<div class="flex flex-col h-full">
  <div>
    <h1 class="data-label">Online workers</h1>
    <div class="data-value mt-1">{$displayValue ?? ''}</div>
  </div>

  <div class="mt-4 flex-1">
    {#if data != null}
      <Line
        {data}
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
