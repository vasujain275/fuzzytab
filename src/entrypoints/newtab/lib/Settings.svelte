<script lang="ts">
  import { navigate } from "svelte-routing";
  import BackIcon from "../../../assets/backIcon.svg";
  import colors from "../utils/colors.json";
  import { applyTheme } from "../utils/misc";
  import { currentTheme } from "../utils/store";
  import { onMount } from "svelte";

  let selectedTheme;

  onMount(() => {
    const unsubscribe = currentTheme.subscribe((value) => {
      selectedTheme = value;
    });

    return unsubscribe;
  });

  const getBack = () => {
    navigate("/search-card");
  };

  function changeTheme(event) {
    const newTheme = event.target.value;
    applyTheme(newTheme);
  }
</script>

<main
  class="p-6 w-full h-full flex flex-col bg-[var(--color-base00)] text-[var(--color-base05)]"
>
  <div class="mb-6">
    <div class="w-full flex items-center space-x-4">
      <div class="flex items-center justify-center w-12 h-12">
        <button
          class="focus:outline-none relative p-2 hover:bg-[var(--color-base01)] rounded-full transition duration-300"
          on:click={getBack}
        >
          <img
            src={BackIcon}
            alt="Back"
            class="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer"
          />
        </button>
      </div>
      <div class="flex-grow">
        <h1 class="text-xl font-bold">Settings</h1>
      </div>
      <div class="flex items-center justify-center w-12 h-12">
        <h1 class="text-base sm:text-lg font-semibold">0</h1>
      </div>
    </div>
  </div>
  <div class="flex-grow overflow-y-auto scrollbar-hide">
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2">Change Theme</h2>
      <select
        bind:value={selectedTheme}
        on:change={changeTheme}
        class="w-full p-2 bg-[var(--color-base01)] border border-[var(--color-base03)] rounded-md"
      >
        {#each Theme as theme}
          <option value={theme}>{theme}</option>
        {/each}
      </select>
    </div>
  </div>
</main>

<style>
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
