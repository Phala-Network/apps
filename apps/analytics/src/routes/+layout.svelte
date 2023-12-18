<script>
  import {browser} from '$app/environment'
  import {QueryClient, QueryClientProvider} from '@tanstack/svelte-query'
  import Decimal from 'decimal.js'
  import {initChartJS} from '~/lib/chart'
  import '../app.css'

  initChartJS()
  Decimal.set({toExpNeg: -9e15, toExpPos: 9e15, precision: 50})

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
      },
    },
  })
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
