<script>
  import {browser} from '$app/environment'
  import {QueryClient, QueryClientProvider} from '@tanstack/svelte-query'
  import Decimal from 'decimal.js'
  import Nav from '~/lib/Nav.svelte'
  import {initChartJS} from '~/lib/chart'
  import '../app.css'

  initChartJS()
  Decimal.set({toExpNeg: -9e15, toExpPos: 9e15, precision: 50})

  const queryClient = new QueryClient({
    defaultOptions: {queries: {enabled: browser}},
  })
</script>

<QueryClientProvider client={queryClient}>
  <header class="mx-auto px-4 md:px-6 mt-4 md:mt-6 max-w-7xl">
    <Nav />
  </header>
  <main class="max-w-5xl mx-auto mt-6 md:mt-14 px-4 md:px-6 mb-6">
    <slot />
  </main>
</QueryClientProvider>
