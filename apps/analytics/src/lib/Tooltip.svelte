<script lang="ts">
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from '@rgossiaux/svelte-headlessui'
  import {fade} from 'svelte/transition'

  let timeout: ReturnType<typeof setTimeout>
  const onmouseenter = (open: boolean) => (e: any) => {
    clearTimeout(timeout)
    if (!open) {
      e.currentTarget.click()
    }
  }
  const onmouseleave =
    (open: boolean, close: (el: null) => void) => (e: any) => {
      if (open) {
        timeout = setTimeout(() => {
          close(null)
        }, 100)
      }
    }
  export let title: string | undefined = undefined
</script>

<Popover let:open let:close as="span">
  <PopoverButton
    as="span"
    class="help"
    on:mouseenter={onmouseenter(open)}
    on:mouseleave={onmouseleave(open, close)}
  >
    <slot />
  </PopoverButton>
  {#if open}
    <div transition:fade={{duration: 100}} class="relative md:inline">
      <PopoverPanel
        static
        class="tooltip"
        on:click={(e) => e.stopPropagation()}
        on:mouseenter={onmouseenter(open)}
        on:mouseleave={onmouseleave(open, close)}
      >
        {title ?? ''}
      </PopoverPanel>
    </div>
  {/if}
</Popover>
