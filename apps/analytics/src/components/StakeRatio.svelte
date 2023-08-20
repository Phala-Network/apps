<script lang="ts">
  import {toPercentage} from '@phala/util'
  import {derived} from 'svelte/store'
  import {getGlobalState} from '~/stores'
  import {getCirculation} from '~/stores/circulation'

  const stakeRatio = derived(
    [getGlobalState(), getCirculation()],
    ([{data: globalStateData}, {data: circulation}]) => {
      if (globalStateData != null && circulation != null) {
        return toPercentage(globalStateData.summary.totalValue.div(circulation))
      }
    }
  )
</script>

<div>
  <h1 class="data-label">Stake Ratio</h1>
  <div class="data-value mt-1">{$stakeRatio ?? ''}</div>
</div>
