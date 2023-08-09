<script lang="ts">
  import {compactFormat} from '@phala/lib'
  import type {ChartData} from 'chart.js'
  import {gql, request} from 'graphql-request'
  import {onMount} from 'svelte'
  import {Line} from 'svelte-chartjs'

  interface Execution {
    dt: Date
    executionCount: number
    userCount: number
  }

  interface ExecutionData {
    dt: string
    executionCount: number
    userCount: number
  }

  const document = gql`
    {
      phatOfflineExecution(orderBy: {dt: DESC}, limit: 10) {
        dt
        executionCount
        userCount
      }
    }
  `
  let executions: Execution[]
  let data: ChartData<'line', number[]>
  $: current = executions?.[0]
    ? compactFormat(executions[0].executionCount)
    : null
  $: if (executions) {
    data = {
      labels: executions.map((e) => e.dt),
      datasets: [
        {label: 'Execution', data: executions.map((e) => e.executionCount)},
      ],
    }
  }
  onMount(() => {
    request<{phatOfflineExecution: ExecutionData[]}>(
      'https://offchain-metrics.phala.network/v1/graphql',
      document
    ).then((res) => {
      executions = res.phatOfflineExecution.reverse().map((e) => {
        return {...e, dt: new Date(e.dt)}
      })
    })
  })
</script>

{#if executions != null}
  <div class="flex flex-col h-full">
    <div>
      <h2 class="card-title">Phat Contract daily execution</h2>
      <h1 class="card-head mt-1">{current}</h1>
    </div>

    <div class="mt-4 flex-1">
      <Line
        {data}
        options={{
          scales: {
            x: {type: 'time'},
            y: {ticks: {display: false}},
          },
        }}
      />
    </div>
  </div>
{/if}
