<script lang="ts">
  import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
  } from '@rgossiaux/svelte-headlessui'
  import {ChevronDownIcon} from '@rgossiaux/svelte-heroicons/solid'
  let links: {label: string; href: string}[] = [
    {label: 'Home', href: 'https://phala.network'},
    {label: 'Phala App', href: 'https://app.phala.network'},
    {label: 'Phat Contract', href: 'https://phat.phala.network'},
    {label: 'Phat Bricks', href: 'https://bricks.phala.network'},
  ]
</script>

<nav
  class="p-1 h-14 rounded-full bg-gray-700 w-full flex items-center justify-center relative shadow-xl"
>
  <div class="flex items-center absolute top-1 left-1 h-12">
    <img class="block w-12 mr-4" src="logo.svg" alt="Phala logo" />
    <h1 class="font-black font-montserrat text-base">Analytics</h1>
  </div>

  <Menu class="absolute top-1 left-1 h-12 font-black font-montserrat text-base">
    <MenuButton class="flex items-center bg-black/20 rounded-full pr-4">
      <img class="block w-12 mr-4" src="logo.svg" alt="Phala logo" />
      <h1>Analytics</h1>
      <ChevronDownIcon class="w-5 h-5 ml-8 text-gray-600" aria-hidden="true" />
    </MenuButton>
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 bg-gray-700 rounded-3xl p-1 shadow-xl"
      >
        {#each links as link}
          <MenuItem
            target="_blank"
            class="flex items-center px-6 hover:bg-black/20 h-10 rounded-full"
            href={link.href}>{link.label}</MenuItem
          >
        {/each}
      </MenuItems>
    </Transition>
  </Menu>

  <ul class="font-montserrat hidden md:block text-sm">
    <li>Overview</li>
  </ul>
</nav>
