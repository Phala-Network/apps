<script lang="ts">
  import {compactFormat} from '@phala/util'
  import type {ChartData} from 'chart.js'
  import {addDays} from 'date-fns'
  import {gql} from 'graphql-request'
  import {onMount} from 'svelte'
  import {Bar} from 'svelte-chartjs'
  import {phatClient} from '~/lib/graphql'

  interface ExecutionData {
    dt: string
    executionCount: number
    userCount: number
  }

  let data: ChartData<'bar', number[]>
  let latestExecutionCount: string

  onMount(() => {
    const days = 14
    const startTime = addDays(new Date(), -days).toISOString()
    const document = gql`
      {
        phatOfflineExecution(
          orderBy: {dt: ASC}
          where: {dt: {_gte: "${startTime}"}}
        ) {
          dt
          executionCount
          userCount
        }
      }
    `

    phatClient
      .request<{phatOfflineExecution: ExecutionData[]}>(document)
      .then((res) => {
        let executions = res.phatOfflineExecution.map((e) => ({
          ...e,
          dt: new Date(e.dt),
        }))
        if (executions.length > 0) {
          latestExecutionCount = compactFormat(executions[0].executionCount)
        }
        data = {
          labels: executions.map((e) => e.dt),
          datasets: [
            {
              label: 'Execution count',
              data: executions.map((e) => e.executionCount),
            },
          ],
        }
      })
  })
</script>

<div class="flex flex-col h-full">
  <div>
    <h1 class="data-label">Phat Contract daily execution</h1>
    <div class="data-value mt-1">{latestExecutionCount ?? ''}</div>
  </div>

  <div class="mt-4 flex-1">
    {#if data != null}
      <Bar
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
