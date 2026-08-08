<template>
  <div class="page-pad" style="padding-top:24px;padding-bottom:24px;">

    <div class="mb-4">
      <h1 class="page-title">Mes Azkars</h1>
      <p class="page-subtitle">Sélectionne un Azkar ou crée le tien</p>
    </div>

    <!-- Wirds par défaut -->
    <div class="section-label" style="font-size: 0.9rem;" >AZKARS PAR DÉFAUT</div>
    <div class="d-flex flex-column gap-2 mb-4">
      <div v-for="w in DEFAULT_WIRDS" :key="w.id" class="wird-card"
        :style="{
          borderColor: isActive(w) ? w.color : 'var(--border)',
          background:  isActive(w) ? w.color + '18' : 'var(--surface)'
        }">
        <div style="flex:1;min-width:0;">
          <div class="wird-arabic" :style="{ color: w.color }">{{ w.arabic }}</div>
          <div class="wird-name">{{ w.label }}</div>
          <div v-if="w.translation" class="wird-transl">{{ w.translation }}</div>
          <div class="wird-reps" :style="{ color: w.color }">{{ w.target }}× répétitions</div>
        </div>
        <button class="btn-use"
          :style="{
            borderColor: w.color,
            background:  isActive(w) ? w.color : 'transparent',
            color:       isActive(w) ? '#080d14' : w.color
          }"
          @click="choisir(w.id)">
          {{ isActive(w) ? '✓ Actif' : 'Utiliser' }}
        </button>
      </div>
    </div>

    <!-- Wirds personnalisés -->
    <template v-if="store.customWirds.length > 0">
      <div class="section-label">MES WIRDS PERSONNALISÉS</div>
      <div class="d-flex flex-column gap-2 mb-4">
        <div v-for="w in store.customWirds" :key="w.id" class="wird-card"
          :style="{
            borderColor: isActive(w) ? w.color : 'var(--border)',
            background:  isActive(w) ? w.color + '18' : 'var(--surface)'
          }">
          <div style="flex:1;min-width:0;">
            <div class="wird-arabic" :style="{ color: w.color }">{{ w.arabic }}</div>
            <div class="wird-name">{{ w.label }}</div>
            <div v-if="w.translation" class="wird-transl">{{ w.translation }}</div>
            <div class="wird-reps" :style="{ color: w.color }">{{ w.target }}× répétitions</div>
          </div>
          <div class="d-flex flex-column gap-2 align-items-end">
            <button class="btn-use"
              :style="{
                borderColor: w.color,
                background:  isActive(w) ? w.color : 'transparent',
                color:       isActive(w) ? '#080d14' : w.color
              }"
              @click="choisir(w.id)">
              {{ isActive(w) ? '✓ Actif' : 'Utiliser' }}
            </button>
            <button class="btn-del" @click="store.deleteWird(w.id)">🗑 Supprimer</button>
          </div>
        </div>
      </div>
    </template>

    <!-- Bouton ajouter -->
    <button v-if="!showForm" class="btn-add-wird" @click="showForm = true">
      <span style="font-size:1.3rem;">+</span>
      Ajouter un Wird personnalisé
    </button>

    <!-- Formulaire ajout -->
    <div v-else class="add-form">
      <div class="section-label mb-3">NOUVEAU WIRD</div>

      <input class="form-input arabic-input"
        placeholder="Texte arabe  (ex: بسم الله)"
        v-model="form.arabic" />

      <input class="form-input"
        placeholder="Nom du wird  *  (ex: Bismillah)"
        v-model="form.label" />

      <input class="form-input"
        placeholder="Traduction  (optionnel)"
        v-model="form.translation" />

      <div class="d-flex align-items-center gap-3 mb-3">
        <span style="font-size:.82rem;color:var(--muted);flex:1;">Répétitions :</span>
        <input type="number" min="1" v-model.number="form.target"
          class="form-input"
          style="width:80px;text-align:center;margin-bottom:0;" />
      </div>

      <!-- Palette couleurs -->
      <div class="mb-3">
        <div style="font-size:.72rem;color:var(--muted);margin-bottom:8px;">Couleur :</div>
        <div class="d-flex flex-wrap gap-2">
          <button v-for="c in PALETTE" :key="c"
            class="color-dot"
            :class="{ sel: form.color === c }"
            :style="{ background: c, borderColor: form.color === c ? 'var(--text)' : 'transparent' }"
            @click="form.color = c" />
        </div>
      </div>

      <!-- Aperçu -->
      <div v-if="form.label" class="preview-card mb-3"
        :style="{ background: form.color + '18', borderColor: form.color + '55' }">
        <div class="preview-arabic" :style="{ color: form.color }">
          {{ form.arabic || '—' }}
        </div>
        <div style="font-size:.82rem;color:var(--text);margin-top:2px;">{{ form.label }}</div>
        <div style="font-size:.7rem;opacity:.8;margin-top:2px;" :style="{ color: form.color }">
          {{ form.target }}× répétitions
        </div>
      </div>

      <div class="d-flex gap-2">
        <button class="btn-cancel" style="flex:1;" @click="annuler">Annuler</button>
        <button class="btn-save" style="flex:2;"
          :disabled="!form.label"
          :style="{ background: form.label ? form.color : 'var(--border)', opacity: form.label ? 1 : 0.5 }"
          @click="enregistrer">
          Enregistrer
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTasbihStore, DEFAULT_WIRDS } from '../stores/tasbih'

const store  = useTasbihStore()
const router = useRouter()

const showForm = ref(false)
const PALETTE  = ['#4ade80','#60a5fa','#fbbf24','#c084fc','#fb7185','#34d399','#f97316','#a78bfa','#d4a544','#38bdf8']

const emptyForm = () => ({ arabic: '', label: '', translation: '', target: 33, color: '#d4a544' })
const form = ref(emptyForm())

const isActive = (w) => store.activeWird.id === w.id

function choisir(id) {
  store.selectWird(id)
  router.push('/')
}

function enregistrer() {
  if (!form.value.label) return
  store.addWird({ ...form.value })
  annuler()
}

function annuler() {
  form.value = emptyForm()
  showForm.value = false
}
</script>