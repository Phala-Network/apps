<script lang="ts">
  import {compactFormat} from '@phala/utils'
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
  } from '@rgossiaux/svelte-headlessui'
  import type {ChartData} from 'chart.js'
  import {Line} from 'svelte-chartjs'
  import {derived, writable} from 'svelte/store'
  import {getComputationData, getComputationSnapshot} from '~/stores'
  import {getCirculation} from '~/stores/circulation'
  import Tooltip from './Tooltip.svelte'

  const display = derived(
    [getComputationData(), getComputationSnapshot(), getCirculation()],
    ([{data}, {data: snapshot}, {data: circulation}]) => {
      let circulatingSupply = 'ㅤ'
      let delegationValue = 'ㅤ'
      let dailyRewards = 'ㅤ'
      let averageApr = 'ㅤ'
      let stakeRatio = 'ㅤ'
      let onlineWorkers = 'ㅤ'
      let delegator = 'ㅤ'
      let budgetPerShare = 'ㅤ'

      const format = new Intl.NumberFormat('en-US').format
      const formatPercentage = new Intl.NumberFormat('en-US', {
        style: 'percent',
        maximumFractionDigits: 2,
      }).format

      if (circulation != null) {
        circulatingSupply = `${compactFormat(circulation)} PHA`
      }

      if (snapshot != null) {
        const {summary} = snapshot
        const length = summary.length
        dailyRewards = `${format(
          summary[length - 1].cumulativeRewards
            .minus(summary[length - 3].cumulativeRewards)
            .toDP(0)
            .toNumber()
        )} PHA`
      }

      if (data != null) {
        delegationValue = `${compactFormat(
          data.summary.totalValue
        )} <sub>PHA</sub>`
        averageApr = formatPercentage(data.summary.averageApr.toNumber())
        if (circulation != null) {
          stakeRatio = formatPercentage(
            data.summary.totalValue.div(circulation).toNumber()
          )
        }
        onlineWorkers = format(data.summary.idleWorkerCount)
        delegator = format(data.summary.delegatorCount)
        budgetPerShare = data.summary.budgetPerShare.toDP(2).toString()
      }

      return [
        [
          'Delegation value',
          delegationValue,
          'All delegated PHA across the Phala & Khala network',
        ],
        [
          'Daily rewards',
          dailyRewards,
          'The total amount of computation rewards distributed across the Phala & Khala network in the last day.',
        ],
        [
          'Average APR',
          averageApr,
          'The average annual percentage rate of return for all delegations across the Phala & Khala network. (no consideration of compound interest)',
        ],
        ['Circulating Supply', circulatingSupply],
        [
          'Stake ratio',
          stakeRatio,
          'Stake Ratio = All delegated PHA across the Phala & Khala network / All circulating PHA.',
        ],
        [
          'Online workers',
          onlineWorkers,
          'The total number of online workers across the Phala & Khala network.',
        ],
        [
          'Delegator',
          delegator,
          'All delegator count across the Phala & Khala network',
        ],
        [
          'Daily budget/share',
          budgetPerShare,
          `It's roughly equal to the daily income of a 10,000V worker before the 20% take away to the Treasury.`,
        ],
      ]
    }
  )

  const charts = [
    'Delegation value',
    'Average APR',
    'Online workers',
    'Delegator',
    'Daily budge/share',
  ] as const

  const currentChart = writable<(typeof charts)[number]>(charts[0])

  $: isPercentage = $currentChart === 'Average APR'

  const data = derived(
    [getComputationSnapshot(), currentChart],
    ([{data}, $currentChart]): ChartData<'line', number[]> | undefined => {
      if (data != null) {
        const {summary} = data
        return {
          labels: summary.map((e) => e.updatedTime),
          datasets: [
            {
              label: $currentChart,
              data: summary.map((e) => {
                switch ($currentChart) {
                  case 'Delegation value':
                    return e.totalValue.toNumber()
                  case 'Average APR':
                    return e.averageApr.toDP(4).toNumber()
                  case 'Online workers':
                    return e.idleWorkerCount
                  case 'Delegator':
                    return e.delegatorCount
                  case 'Daily budge/share':
                    return e.budgetPerShare.toDP(2).toNumber()
                }
              }),
            },
          ],
        }
      }
    }
  )
</script>

<h1 class="font-montserrat text-4xl font-bold my-8">Computation</h1>
<div class="flex flex-wrap gap-4">
  <section class="card h-[22rem] min-w-[340px] max-md:w-full">
    {#each $display as item, i}
      {#if i === 0}
        <Tooltip title={item[2]}>
          <span class="data-label">
            {item[0]}
          </span>
        </Tooltip>
        <div class="data-value mt-1 mb-5">{@html item[1]}</div>
      {:else if item[2] != null}
        <div class="flex items-baseline justify-between mt-1">
          <Tooltip title={item[2]}>
            <span class="data-label">{item[0]}</span>
          </Tooltip>
          <span class="numeric">{item[1]}</span>
        </div>
      {:else}
        <div class="flex items-baseline justify-between mt-1">
          <span class="data-label">{item[0]}</span>
          <span class="numeric">{item[1]}</span>
        </div>
      {/if}
    {/each}
  </section>
  <section
    class="card h-[22rem] flex-1 max-md:w-full overflow-hidden flex flex-col gap-3"
  >
    <RadioGroup
      bind:value={$currentChart}
      class="flex font-montserrat flex-wrap gap-2"
    >
      {#each charts as chart}
        <RadioGroupOption
          value={chart}
          class={({checked}) =>
            `${
              checked ? 'bg-black/20' : 'bg-black/10 text-gray-500'
            } p-2 rounded-2xl cursor-pointer text-xs`}
        >
          <RadioGroupLabel as="p">
            {chart}
          </RadioGroupLabel>
        </RadioGroupOption>
      {/each}
    </RadioGroup>

    <div class="flex-1 overflow-hidden">
      {#if $data != null}
        <Line
          data={$data}
          options={{
            scales: {
              x: {type: 'time'},
              y: {
                ticks: {
                  format: {
                    style: isPercentage ? 'percent' : undefined,
                    minimumFractionDigits: isPercentage ? 0 : undefined,
                  },
                },
              },
            },
          }}
        />
      {/if}
    </div>
  </section>
</div>
