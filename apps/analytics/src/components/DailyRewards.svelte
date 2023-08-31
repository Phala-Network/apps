<script lang="ts">
  import {compactFormat} from '@phala/util'
  import {derived} from 'svelte/store'
  import {getGlobalStateSnapshot} from '~/stores'

  const store = getGlobalStateSnapshot()

  const displayValue = derived(store, ({data}) => {
    if (data != null) {
      const {summary} = data
      const length = summary.length
      return compactFormat(
        summary[length - 1].cumulativeRewards.minus(
          summary[length - 5].cumulativeRewards
        )
      )
    }
  })
</script>

<div>
  <h1 class="data-label">Daily rewards</h1>
  <div class="data-value mt-1">{$displayValue ?? ''}</div>
</div>
