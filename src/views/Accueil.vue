<template>
  <div>

    
    <nav class="top-navbar">
      <div class="navbar-logo">
        <span>Chapelet</span>
      </div>

      <!-- Menu hamburger  -->
      <div style="position:relative;">
        <button class="hamburger" @click="menuOpen = !menuOpen">
          <div></div>
          <div></div>
          <div></div>
        </button>

        <!-- Dropdown menu -->
        <div v-if="menuOpen" class="top-menu">
          <a @click="menuOpen = false; $router.push('/params')">
            ⚙️ Paramètres
          </a>
          <a @click="menuOpen = false; afficherAide()">
            ❓ Aide
          </a>
          <a @click="menuOpen = false; partager()">
            📤 Partager
          </a>
        </div>
      </div>
    </nav>

    <!-- ── Contenu de la page ── -->
    <div class="page-pad d-flex flex-column align-items-center" style="padding-top:20px;">

      <!-- Titre -->
      <div class="text-center mb-3">
        <div class="arabic-title"></div>
        <div class="app-subtitle"> CHAPELET VIRTUEL</div>
      </div>

      <!-- Wird actif — clique pour changer -->
      <router-link to="/wirds" class="wird-chip mb-3"
        :style="{
          border: `1.5px solid ${activeWird.color}55`,
          background: activeWird.color + '15',
          color: activeWird.color
        }">
        {{ activeWird.label }} · {{ activeWird.target }}× ›
      </router-link>

      <!-- Texte arabe du dhikr -->
      <div class="text-center mb-2">
        <div class="arabic-dhikr"
          :style="{ color: done ? 'var(--accent)' : activeWird.color }">
          {{ activeWird.arabic }}
        </div>
        <div v-if="activeWird.translation" class="dhikr-transl">
          {{ activeWird.translation }}
        </div>
      </div>

      <!-- ── SVG Chapelet ── -->
      <svg width="300" height="300" style="display:block;margin-bottom:14px;">

        <!-- Cercle piste -->
        <circle :cx="CX" :cy="CY" :r="R"
          fill="none" stroke="var(--border)" stroke-width="1.5"/>

        <!-- Arc de progression -->
        <circle v-if="pct > 0 && !done"
          :cx="CX" :cy="CY" :r="R"
          fill="none"
          :stroke="activeWird.color"
          stroke-width="2.5"
          stroke-opacity="0.25"
          :stroke-dasharray="arcLen"
          :stroke-dashoffset="arcLen * (1 - pct)"
          stroke-linecap="round"
          :transform="`rotate(-90 ${CX} ${CY})`"
          class="arc-path"
        />

        <!-- 33 Perles -->
        <g v-for="(bead, i) in beads" :key="i">
          <!-- Halo lumineux si perle allumée -->
          <circle v-if="bead.lit"
            :cx="bead.x" :cy="bead.y"
            :r="i === 0 ? 13 : 10"
            :fill="activeWird.color"
            fill-opacity="0.13"
          />
          <!-- Perle principale (i=0 = perle imam, plus grande) -->
          <circle class="bead-fill"
            :cx="bead.x" :cy="bead.y"
            :r="i === 0 ? 7.5 : 5"
            :fill="bead.lit ? activeWird.color : 'var(--surface)'"
            :stroke="bead.lit ? activeWird.color : 'var(--border)'"
            stroke-width="1"
          />
        </g>

        <!-- Compteur au centre -->
        <template v-if="done">
          <text :x="CX" :y="CY - 8"
            text-anchor="middle"
            fill="var(--accent)"
            font-size="28"
            font-family="Georgia,serif">آمين</text>
          <text :x="CX" :y="CY + 18"
            text-anchor="middle"
            fill="var(--muted)"
            font-size="11">{{ activeWird.target }}× accompli</text>
        </template>
        <template v-else>
          <text :x="CX" :y="CY + 4"
            text-anchor="middle"
            fill="var(--text)"
            font-size="36"
            font-weight="200">{{ count }}</text>
          <text :x="CX" :y="CY + 22"
            text-anchor="middle"
            fill="var(--muted)"
            font-size="11">/ {{ activeWird.target }}</text>
          <text v-if="cycle > 0"
            :x="CX" :y="CY + 40"
            text-anchor="middle"
            :fill="activeWird.color"
            font-size="10"
            opacity="0.85">Tour {{ cycle + 1 }}</text>
        </template>

      </svg>

      <!-- ── Bouton Tap ── -->
      <template v-if="!done">
        <button class="tap-btn" :class="{ pressed }" @click="handleTap"
          :style="{
            borderColor: activeWird.color,
            color: activeWird.color,
            boxShadow: pressed
              ? `0 0 52px ${activeWird.color}55`
              : `0 0 22px ${activeWird.color}28`,
            background: pressed
              ? `radial-gradient(circle, ${activeWird.color}55, ${activeWird.color}18)`
              : `radial-gradient(circle, ${activeWird.color}18, transparent 68%)`
          }">
          <span class="tap-arabic">ذِكْر</span>
          <span class="tap-label">APPUYER</span>
        </button>
      </template>

      <!-- ── Wird terminé ── -->
      <template v-else>
        <div class="d-flex flex-column align-items-center gap-3 mt-2">
          <div class="done-badge"
            style="background:linear-gradient(135deg,var(--accent),#b8860b);
                   box-shadow:0 0 28px rgba(212,165,68,.4);">
            ✓ {{ activeWird.label }} complété
          </div>
          <button class="btn-secondary" @click="store.reset()">
            ↺ Recommencer
          </button>
        </div>
      </template>

      <!-- Réinitialiser -->
      <button v-if="!done && count > 0" class="btn-reinit mt-3" @click="store.reset()">
        Réinitialiser
      </button>

      <!-- Bismillah -->
      <div class="bismillah mt-4 pb-2">
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTasbihStore } from '../stores/tasbih'

const store   = useTasbihStore()
const pressed = ref(false)
const menuOpen = ref(false)  // menu hamburger ouvert ou fermé
let audioCtx  = null

// Constantes pour le SVG chapelet
const BEAD_TOTAL = 33
const CX = 150  // centre X
const CY = 150  // centre Y
const R  = 112  // rayon

// Données depuis le store
const activeWird = computed(() => store.activeWird)
const count      = computed(() => store.count)
const done       = computed(() => store.done)

// Calculs pour le SVG
const pct      = computed(() => Math.min(count.value / activeWird.value.target, 1))
const arcLen   = computed(() => 2 * Math.PI * R)
const cycle    = computed(() => Math.floor(count.value / BEAD_TOTAL))
const beadsLit = computed(() => done.value ? BEAD_TOTAL : count.value % BEAD_TOTAL)

// Calcule la position de chaque perle en cercle
const beads = computed(() =>
  Array.from({ length: BEAD_TOTAL }, (_, i) => {
    const angle = (i / BEAD_TOTAL) * 2 * Math.PI - Math.PI / 2
    return {
      x:   CX + R * Math.cos(angle),
      y:   CY + R * Math.sin(angle),
      lit: i < beadsLit.value || done.value,
    }
  })
)

// Audio
function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}

function playTick() {
  try {
    const ctx = getCtx()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.connect(g)
    g.connect(ctx.destination)
    o.frequency.value = 880
    o.type = 'sine'
    g.gain.setValueAtTime(0.05, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07)
    o.start()
    o.stop(ctx.currentTime + 0.07)
  } catch (_) {}
}

function playDone() {
  try {
    const ctx = getCtx()
    ;[523, 659, 784, 1047].forEach((freq, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.connect(g)
      g.connect(ctx.destination)
      o.type = 'sine'
      o.frequency.value = freq
      const t = ctx.currentTime + i * 0.17
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(0.3, t + 0.05)
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.4)
      o.start(t)
      o.stop(t + 1.4)
    })
  } catch (_) {}
}

// Quand on appuie sur le chapelet
function handleTap() {
  if (done.value) return
  store.tap()
  pressed.value = true
  setTimeout(() => (pressed.value = false), 140)
  if (store.soundTick)  playTick()
  if (store.vibration && navigator.vibrate) navigator.vibrate(25)
  if (store.done) {
    setTimeout(() => {
      if (store.soundAlarm) playDone()
      if (store.vibration && navigator.vibrate) navigator.vibrate([80,40,80,40,180])
    }, 80)
  }
}

// Menu hamburger
function afficherAide() {
  alert('Wird — Tasbih Virtuel\n\nAppuie sur le cercle pour compter ton dhikr.\nChange de wird dans la page Wirds.')
}

function partager() {
  if (navigator.share) {
    navigator.share({
      title: 'Wird — Tasbih Virtuel',
      text: 'Fais ton dhikr avec Wird, le tasbih virtuel !',
      url: window.location.href,
    })
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Lien copié !')
  }
}
</script>