<template>
    <nav class="bottom-nav">
        <!-- acuielle***** -->
    <router-link to="/" class="nav-item">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <span class="nav-label">Accueil</span>
      <span v-if="route.path === '/'" class="nav-dot" />
    </router-link> 
     <!-- wird****** -->
      <router-link to="/wirds" class="nav-item">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.4"/>
        <circle cx="20.5" cy="12"   r="2" fill="currentColor"/>
        <circle cx="18.0" cy="18.0" r="2" fill="currentColor"/>
        <circle cx="12"   cy="20.5" r="2" fill="currentColor"/>
        <circle cx="6.0"  cy="18.0" r="2" fill="currentColor"/>
        <circle cx="3.5"  cy="12"   r="2" fill="currentColor"/>
        <circle cx="6.0"  cy="6.0"  r="2" fill="currentColor"/>
        <circle cx="12"   cy="3.5"  r="2.5" fill="currentColor"/>
        <circle cx="18.0" cy="6.0"  r="2" fill="currentColor"/>
      </svg>
      <span class="nav-label">Wirds</span>
      <span v-if="route.path === '/wirds'" class="nav-dot" />
    </router-link>
    <!-- parametre**  -->
      <router-link to="/params" class="nav-item">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0
          010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0
          00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0
          01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0
          00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65
          1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0
          010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0
          00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65
          1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0
          014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0
          001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65
          1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0
          010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
      <span class="nav-label">Paramètres</span>
      <span v-if="route.path === '/params'" class="nav-dot" />
    </router-link>
    </nav>
</template>
<script setup>
import{useRoute} from'vue-router'
const route=useRoute()
</script>