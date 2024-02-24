<script lang="ts">
import {toCurrency, toPercentage} from '@phala/lib'
import Decimal from 'decimal.js'
import {derived} from 'svelte/store'
import {getCirculation} from '~/stores/circulation'
import Tooltip from './Tooltip.svelte'

export let className = ''
export let chain: 'Phala' | 'Khala' | 'Ethereum'

const ETHEREUM_SYGMA_BRIDGE_ADDRESS =
  '0xC832588193cd5ED2185daDA4A531e0B26eC5B830'
const PHALA_CROWDLOAN_ADDRESS =
  '42fy3tTMPbgxbRqkQCyvLoSoPHwUPM3Dy5iqHYhF9RvD5XAP'
const PHALA_REWARD_ADDRESS = '436H4jat7TobTbNYLdSJ3cmNy9K4frmE4Yuc4R2nNnaf56DL'
const PHALA_SYGMA_BRIDGE_ADDRESS =
  '436H4jatj6ntHTVm3wh9zs1Mqa8p1ykfcdkNH7txmjmohTu3'

const getEtherscanLink = (address: string) =>
  `<a href="https://etherscan.io/address/${address}" target="_blank">${address}</a>`
const getSubscanLink = (chain: 'Phala' | 'Khala', address: string) =>
  `<a href="https://${chain.toLowerCase()}.subscan.io/account/${address}" target="_blank">${address}</a>`

const display = derived(getCirculation(), ({data: circulation}) => {
  if (chain === 'Ethereum') {
    let circulatingSupply = ''
    let sygmaBridgeLocked = ''
    let totalSupply = ''
    if (circulation != null) {
      const {
        ethereumTotalSupply,
        ethereumSygmaBridge,
        ethereumCirculation,
        totalCirculation,
      } = circulation
      let percentage =
        toPercentage(new Decimal(ethereumCirculation).div(totalCirculation)) ??
        ''
      circulatingSupply = `${percentage} / ${toCurrency(
        new Decimal(ethereumCirculation),
        0,
      )} PHA`
      sygmaBridgeLocked = `${toCurrency(
        new Decimal(ethereumSygmaBridge),
        0,
      )} PHA`
      totalSupply = `${toCurrency(new Decimal(ethereumTotalSupply), 0)} PHA`
    }
    return [
      ['Circulating Supply', circulatingSupply],
      [
        'Sygma bridge locked',
        sygmaBridgeLocked,
        getEtherscanLink(ETHEREUM_SYGMA_BRIDGE_ADDRESS),
      ],
      ['Total Supply', totalSupply],
    ]
  } else if (chain === 'Phala') {
    let circulatingSupply = ''
    let crowdloanLocked = ''
    let sygmaBridgeLocked = ''
    let computationLocked = ''
    let totalIssuance = ''
    if (circulation != null) {
      const {
        phalaCrowdloan,
        phalaMiningRewards,
        phalaCirculation,
        phalaSygmaBridge,
        phalaTotalIssuance,
        totalCirculation,
      } = circulation
      let percentage =
        toPercentage(new Decimal(phalaCirculation).div(totalCirculation)) ?? ''
      circulatingSupply = `${percentage} / ${toCurrency(
        new Decimal(phalaCirculation),
        0,
      )} PHA`
      sygmaBridgeLocked = `${toCurrency(new Decimal(phalaSygmaBridge), 0)} PHA`
      crowdloanLocked = `${toCurrency(new Decimal(phalaCrowdloan), 0)} PHA`
      computationLocked = `${toCurrency(
        new Decimal(phalaMiningRewards),
        0,
      )} PHA`
      totalIssuance = `${toCurrency(new Decimal(phalaTotalIssuance), 0)} PHA`
    }
    return [
      ['Circulating Supply', circulatingSupply],
      [
        'Sygma bridge locked',
        sygmaBridgeLocked,
        getSubscanLink(chain, PHALA_SYGMA_BRIDGE_ADDRESS),
      ],
      [
        'Crowdloan locked',
        crowdloanLocked,
        getSubscanLink(chain, PHALA_CROWDLOAN_ADDRESS),
      ],
      [
        'Computation locked',
        computationLocked,
        getSubscanLink(chain, PHALA_REWARD_ADDRESS),
      ],
      ['Total Issuance', totalIssuance],
    ]
  } else {
    let circulatingSupply = ''
    let sygmaBridgeLocked = ''
    let computationLocked = ''
    let totalIssuance = ''
    if (circulation != null) {
      const {
        khalaMiningRewards,
        khalaSygmaBridge,
        khalaCirculation,
        khalaTotalIssuance,
        totalCirculation,
      } = circulation
      let percentage =
        toPercentage(new Decimal(khalaCirculation).div(totalCirculation)) ?? ''
      circulatingSupply = `${percentage} / ${toCurrency(
        new Decimal(khalaCirculation),
        0,
      )} PHA`
      sygmaBridgeLocked = `${toCurrency(new Decimal(khalaSygmaBridge), 0)} PHA`
      computationLocked = `${toCurrency(
        new Decimal(khalaMiningRewards),
        0,
      )} PHA`
      totalIssuance = `${toCurrency(new Decimal(khalaTotalIssuance), 0)} PHA`
    }
    return [
      ['Circulating Supply', circulatingSupply],
      [
        'Sygma bridge locked',
        sygmaBridgeLocked,
        getSubscanLink(chain, PHALA_SYGMA_BRIDGE_ADDRESS),
      ],
      [
        'Computation locked',
        computationLocked,
        getSubscanLink(chain, PHALA_REWARD_ADDRESS),
      ],
      ['Total Issuance', totalIssuance],
    ]
  }
})
</script>

<section class="card {className}">
  <h2 class="font-montserrat text-xl font-bold mb-3">{chain}</h2>
  {#each $display as item, i}
    {#if i === $display.length - 1}
      <hr class="my-2 text-gray-600" />
    {/if}
    <div class="flex items-baseline justify-between mt-1">
      {#if item[2] != null}
        <Tooltip title={item[2]}>
          <span class="data-label">{item[0]}</span>
        </Tooltip>
      {:else}
        <span class="data-label">{item[0]}</span>
      {/if}
      <span class="numeric">{item[1]}</span>
    </div>
  {/each}
</section>
