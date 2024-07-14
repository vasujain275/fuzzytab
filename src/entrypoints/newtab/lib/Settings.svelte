<script>
  import { navigate } from "svelte-routing";
  import BackIcon from "../../../assets/backIcon.svg";

  const getBack = () => {
    navigate("/search-card"); // Navigate to the SearchCard route
  };
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
      <!-- Settings Title -->
      <div class="col-span-10 flex items-center">
        <h1 class="font-bold text-xl">Settings</h1>
      </div>
      <!-- Count Display -->
      <div class="col-span-1 flex justify-center items-center">
        <h1 class="text-xs sm:text-sm md:text-base lg:text-lg">0</h1>
      </div>
    </div>
  </div>
  <!-- Settings Here -->
  <div class="row-span-10 overflow-y-auto">
    <!-- Settings to add here -->
  </div>
</main>
