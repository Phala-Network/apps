<script lang="ts">
  import {compactFormat} from '@phala/util'
  import type {ChartData} from 'chart.js'
  import {onDestroy} from 'svelte'
  import {Line} from 'svelte-chartjs'
  import {globalStateStore} from '~/stores'

  let displayValue: string

  let unsubscribe = globalStateStore.subscribe((data) => {
    const value = data.summary?.totalValue
    if (value != null) {
      displayValue = compactFormat(value)
    }
  })

  onDestroy(() => {
    unsubscribe()
  })

  let data: ChartData<'line', number[]>
</script>

<div class="flex flex-col h-full">
  <div>
    <h1 class="data-label">Delegation value</h1>
    <div class="data-value mt-1">{displayValue ?? ''}</div>
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
