<script lang="ts">
import {toCurrency, toPercentage} from '@phala/lib'
import Decimal from 'decimal.js'
import {Bar} from 'svelte-chartjs'
import {derived} from 'svelte/store'
import ChainCirculation from '~/lib/ChainCirculation.svelte'
import {getCirculation} from '~/stores/circulation'

const totalSupply = new Decimal(1e9)

const display = derived(getCirculation(), ({data: circulation}) => {
  let circulatingSupply = 'ㅤ'
  let percentage = 'ㅤ'
  let crowdloanRewards = ''
  let computationRewards = ''

  if (circulation != null) {
    const {totalCirculation, phala, khala, ethereum} = circulation
    circulatingSupply = `${toCurrency(
      new Decimal(totalCirculation),
      0,
    )} <sub>PHA</sub>`
    percentage =
      toPercentage(new Decimal(totalCirculation).div(totalSupply)) ?? ''

    crowdloanRewards = `${toCurrency(
      Decimal.sum(phala.crowdloan, khala.crowdloan),
      0,
    )} PHA`
    computationRewards = `${toCurrency(
      Decimal.sum(phala.reward, khala.reward, ethereum.reward),
      0,
    )} PHA`
  }

  return [
    ['Circulating Supply', circulatingSupply],
    ['Percentage', percentage],
    ['Crowdloan locked', crowdloanRewards],
    ['Computation locked', computationRewards],
  ]
})

const chartData = derived(getCirculation(), ({data: circulation}) => {
  if (circulation == null) return null

  return {
    labels: ['Ethereum', 'Khala', 'Phala'],
    datasets: [
      {
        label: 'Circulating Supply',
        data: [
          parseInt(circulation.ethereum.circulation),
          parseInt(circulation.khala.circulation),
          parseInt(circulation.phala.circulation),
        ],
        backgroundColor: ['#99a2cf', '#03ffff', '#c5ff46'],
      },
    ],
  }
})
</script>

<svelte:head>
  <title>Token | Phala Analytics</title>
</svelte:head>

<h1 class="font-montserrat text-4xl font-bold my-8">Circulation</h1>
<div class="flex flex-wrap gap-4">
  <section class="card md:flex-1 max-md:w-full">
    {#each $display as item, i}
      {#if i === 0}
        <span class="data-label">
          {item[0]}
        </span>
        <div class="data-value mt-1">{@html item[1]}</div>
      {:else if i === 1}
        <div class="flex items-center mt-2 mb-4">
          <div class="flex-1 h-1 bg-gray-300 rounded">
            <div
              class="h-1 bg-gray-500 rounded"
              style={`width: ${item[1]}`}
            ></div>
          </div>
          <div class="ml-3 w-12 numeric font-normal text-sm">
            {item[1]}
          </div>
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
    class="card md:flex-1 max-md:w-full overflow-hidden h-48 flex flex-col"
  >
    <!-- <RadioGroup
      value="chain"
      class="flex font-montserrat flex-wrap gap-2 font-medium"
    >
      <RadioGroupOption
        value="chain"
        class={({checked}) =>
          `${
            checked ? 'bg-black/20' : 'bg-black/10 text-gray-500'
          } p-2 rounded-2xl cursor-pointer text-xs`}
      >
        <RadioGroupLabel as="p">By chain</RadioGroupLabel>
      </RadioGroupOption>
    </RadioGroup> -->

    <div class="flex-1">
      {#if $chartData != null}
        <Bar
          data={$chartData}
          options={{
            height: 100,
            indexAxis: 'y',
            barThickness: 4,
          }}
        />
      {/if}
    </div>
  </section>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  <ChainCirculation chain="Ethereum" />
  <ChainCirculation chain="Khala" />
  <ChainCirculation chain="Phala" />
</div>
