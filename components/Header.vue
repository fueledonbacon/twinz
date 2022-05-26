<template>
  <header
    :class="`bg-dark ${scrollY < 1 ? 'sm:bg-transparent' : ''} flex justify-center items-center fixed px-8 py-5 w-full z-50`"
  >
    <ConnectModal/>

    <div class="flex justify-between items-center w-full">
      <Logo />
      <!-- Desktop nav -->
      <nav class="hidden lg:flex">
        <ul class="flex text-white text-sm font-bold uppercase items-center">
          <li class="mr-8">
            <a href="/#story">Story</a>
          </li>
          <li class="mr-8">
            <a href="/#project">About Project</a>
          </li>
          <li class="mr-8">
            <a href="/#utilities">Utilities</a>
          </li>
          <li class="mr-8">
            <a href="/#parties">Parties</a>
          </li>
          <li class="mr-8">
            <a href="/#roadmap">Roadmap</a>
          </li>
          <li class="mr-8">
            <a href="/#team">Team</a>
          </li>
          <li class="mr-8">
            <a href="/#faq">FAQ</a>
          </li>
          <li>
            <a href="/#community">Community</a>
          </li>
        </ul>
      </nav>
      <div class="flex">
        <a class="flex items-center justify-center w-11 h-11 bg-primary mr-5">
          <i class="fab fa-twitter text-2xl" />
        </a>
        <a class="flex items-center justify-center w-11 h-11 bg-primary">
          <i class="fab fa-discord text-2xl" />
        </a>
      </div>
      <!-- <ConnectButton/> -->
      <!-- Mobile menu -->
      <div class="flex lg:hidden justify-end">
        <button
          class="text-white z-20 mr-4"
          @click="toggleNavigator"
        >
          <i class="text-2xl fas fa-bars" />
        </button>
        <transition name="scale">
          <nav
            v-if="isNavigatorOpen"
            class="mobile-navigator flex absolute top-0 left-0 w-screen h-screen p-5 rounded-lg z-10 items-center justify-center text-3xl"
            :class="{
              'scale-in': isNavigatorOpen,
              'scale-out': !isNavigatorOpen,
            }"
          >
            <ul class="flex flex-col text-white text-center">
              <li class="mb-3" @click="toggleNavigator">
                <a href="/#story">Story</a>
              </li>
              <li class="mb-3" @click="toggleNavigator">
                <a href="/#project">About Project</a>
              </li>
              <li class="mb-3" @click="toggleNavigator">
                <a href="/#utilities">Utilities</a>
              </li>
              <li class="mb-3" @click="toggleNavigator">
                <a href="/#parties">Parties</a>
              </li>
              <li class="mb-3" @click="toggleNavigator">
                <a href="/#roadmap">Roadmap</a>
              </li>
              <li class="mb-3" @click="toggleNavigator">
                <a href="/#team">Team</a>
              </li>
              <li class="mb-3" @click="toggleNavigator">
                <a href="/#faq">FAQ</a>
              </li>
              <li class="mb-3" @click="toggleNavigator">
                <a href="/#community">Community</a>
              </li>
              <li class="mt-8">
                <a href="https://discord.com/invite/" class="discord">
                  <img class="w-36 mx-auto" src="@/assets/images/discordBanner.png" alt="Discord" />
                </a>
              </li>
            </ul>
          </nav>
        </transition>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'HeaderComponent',
  data() {
    return {
      isNavigatorOpen: false,
      scrollY: 0
    }
  },
  computed: {},
  mounted(){
    window.addEventListener('scroll', (e) => {
      this.scrollY = window.scrollY
    })
  },
  methods: {
    toggleNavigator() {
      this.isNavigatorOpen = !this.isNavigatorOpen
    },
  },
}
</script>

<style scoped>
  @keyframes scaleIn {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes scaleOut {
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(0);
      opacity: 0;
    }
  }

  .mobile-navigator {
    transform-origin: top right;
    background-color: #111827ee;
  }

  .scale-enter-active {
    animation: scaleIn 0.3s ease-in;
  }
  .scale-leave-active {
    animation: scaleOut 0.3s ease-in;
  }
</style>
