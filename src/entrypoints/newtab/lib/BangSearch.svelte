<script>
  import { navigate } from "svelte-routing";
  import BackIcon from "../../../assets/backIcon.svg";
  import { bangQuery, bangUrl } from "../utils/store";
  import { onMount } from "svelte";

  let bangInputElement;

  const getBack = (event) => {
    console.log(`This is the EVENT ${event}`);
    if (event.key === "Enter") {
      navigate("/search-card");
    }
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

<main class="p-6 w-full h-full grid grid-rows-12">
  <div class="row-span-2">
    <div class="w-full h-9 grid grid-cols-12 text-white">
      <!-- Back Icon -->
      <div class="col-span-1 p-4 flex justify-center items-center">
        <button class="focus:outline-none relative" on:click={getBack}>
          <img
            src={BackIcon}
            alt="Back"
            class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-8 lg:h-8 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
          />
        </button>
      </div>
      <!-- Search Input -->
      <div class="col-span-10 flex items-center">
        <input
          type="text"
          placeholder="Search here"
          class="w-full h-full bg-zinc-500 text-white px-4 py-1 rounded-md text-lg focus:outline-none"
          on:keydown={openBang}
          bind:value={$bangQuery}
          bind:this={bangInputElement}
        />
      </div>
      <!-- Count Display -->
      <div class="col-span-1 flex justify-center items-center">
        <h1 class="text-xs sm:text-sm md:text-base lg:text-lg">0</h1>
      </div>
    </div>
  </div>
  <!-- Bookmarks List -->
  <div class="row-span-10 overflow-y-auto">
    <!-- Add your bookmarks list here -->
  </div>
</main>
