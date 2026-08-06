<!-- <template>
    <div class="app-root" :data-theme="store.theme">
        <main class="main-content">
            <router-view/>
        </main>
        <BottomNav />
    </div>
</template>
<script setup>
import {useTasbihStore} from './stores/tasbih'
import BottomNav from './components/BottomNav.vue'
const store=useTasbihStore()
</script> -->

<template>
  <div class="app-root" :data-theme="store.theme">

    <SplashScreen v-if="showSplash" @done="finirSplash" />

    <template v-else>
      <main class="main-content">
        <router-view />
      </main>
      <BottomNav />
    </template>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTasbihStore } from './stores/tasbih'
import BottomNav from './components/BottomNav.vue'
import SplashScreen from './components/SplashScreen.vue'

const store = useTasbihStore()

// Affiche splash seulement si pas encore vu dans cette session
const showSplash = ref(!sessionStorage.getItem('splashVu'))

function finirSplash() {
  sessionStorage.setItem('splashVu', 'true')
  showSplash.value = false
}
</script>