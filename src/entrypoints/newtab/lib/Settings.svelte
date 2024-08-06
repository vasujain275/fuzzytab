<script>
  import { navigate } from "svelte-routing";
  import BackIcon from "../../../assets/backIcon.svg";

  const getBack = () => {
    navigate("/search-card"); // Navigate to the SearchCard route
  };

  const themes = [
    "rosePineDawn",
    "rosePineMoon",
    "catppuccinLatte",
    "catppuccinMocha",
    "solarizedDark",
    "solarizedLight",
    "dracula",
    "gruvboxDark",
    "gruvboxLight",
    "nord",
    "oneDark",
    "tomorrowNight",
    "monokai",
    "material",
    "ocean",
    "setiUI",
  ];

  function changeTheme(theme) {
    // Implement theme change logic here
    console.log(`Theme changed to: ${theme}`);
  }
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
      <!-- Settings Title -->
      <div class="flex-grow">
        <h1 class="text-xl font-bold">Settings</h1>
      </div>
      <!-- Count Display -->
      <div class="flex items-center justify-center w-12 h-12">
        <h1 class="text-base sm:text-lg font-semibold">0</h1>
      </div>
    </div>
  </div>
  <!-- Settings Here -->
  <div class="flex-grow overflow-y-auto scrollbar-hide">
    <!-- Settings to add here -->
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
