<script>
  import { navigate } from "svelte-routing";
  import BackIcon from "../../../assets/backIcon.svg";
  import { bangQuery, bangUrl } from "../utils/store";
  import { onMount } from "svelte";

  let bangInputElement;

  const getBack = () => {
    navigate("/search-card"); // Navigate to the SearchCard route
  };

  const openBang = (event) => {
    if (event.key === "Enter") {
      window.location.href = `${$bangUrl}${encodeURIComponent($bangQuery)}`;
    }
  };

  onMount(() => {
    bangInputElement.focus();
  });
</script>

<main
  class="p-6 w-full h-full flex flex-col bg-[var(--color-base00)] text-[var(--color-base05)]"
>
  <div class="mb-6">
    <div class="w-full flex items-center space-x-4">
      <!-- Back Icon -->
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
      <!-- Search Input -->
      <div class="flex-grow">
        <input
          type="text"
          placeholder="Search here"
          class="w-full bg-[var(--color-base01)] text-[var(--color-base05)] px-6 py-3 rounded-full text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-base0B)]"
          on:keydown={openBang}
          bind:value={$bangQuery}
          bind:this={bangInputElement}
        />
      </div>
      <!-- Count Display -->
      <div class="flex items-center justify-center w-12 h-12">
        <h1 class="text-base sm:text-lg font-semibold">0</h1>
      </div>
    </div>
  </div>
  <!-- Bookmarks List -->
  <div class="flex-grow overflow-y-auto scrollbar-hide">
    <!-- Add your bookmarks list here -->
  </div>
</main>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
