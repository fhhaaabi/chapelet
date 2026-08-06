 <template>
    <div class="page-pad" style="padding-top:24px;padding-bottom:24px;">
      
        <div class="mb-4">
            <h1 class="page-title">Paramètres</h1>
            <p class="page-subtitle">Personalise ton experience</p>
        </div>

        <!-- theme*********** -->
       <div class="section-label" style="font-size: 1.3rem;">THÈME</div>
    <div class="section-box mb-4">
      <div class="theme-grid">
        <button v-for="(t, key) in THEMES" :key="key" class="theme-card"
          :style="{
            background:  t.bg,
            color:       t.text,
            borderColor: store.theme === key ? t.accent : t.border,
            boxShadow:   store.theme === key ? `0 0 18px ${t.accent}44` : 'none',
          }"
          @click="store.setTheme(key)">
          <div style="font-size:1.3rem;">{{ t.emoji }}</div>
          <div class="theme-name">{{ t.name }}</div>
          <div class="theme-check" :style="{ color: t.accent }">
            {{ store.theme === key ? '✓ Actif' : '' }}
          </div>
          <div class="theme-swatches">
            <div v-for="c in [t.bg, t.surface, t.accent, t.text]" :key="c"
              class="theme-swatch"
              :style="{ background: c, borderColor: t.border }" />
          </div>
        </button>
      </div>
    </div>
   <!-- sonnnn************* -->
    <div class="section-label" style="font-size: 1.3rem;">SON & VIBRATION</div>
    <div class="section-box mb-4">

        <div class="toggle-row">
            <div>
                <div class="toggle-label">Son au clic</div>
                <div class="toggle-desc">Tique leger a chaque dhirk</div>
            </div>
            <button class="toggle-switch"
               :style="{ background: store.soundTick ? 'var(--accent)' : 'var(--border)' }"
               @click="store.setSoundTick(!store.soundTick)" >
               <div class="toggle-knob" :style="{left:store.soundTick ? '22px' :'3px'}"/>
            </button>
        </div>
        
        <div class="toggle-row">
            <div>
                <div class="toggle-label">Alarme de fin</div>
                <div class="toggle-desc">Melodie a la completion</div>
            </div>
            <button class="toggle-switch"
               :style="{ background: store.soundAlarm ? 'var(--accent)' : 'var(--border)' }"
               @click="store.setSoundAlarm(!store.soundAlarm)">
               <div class="toggle-knob" :style="{left:store.soundAlarm ? '22px':'3px'}"/>
            </button>
        </div>

        <div class="toggle-row">
            <div>
                <div class="toggle-label">Vibration</div>
                <div class="toggle-desc"> Retour haptique mobile</div>
            </div>
            <button class="toggle-switch"
               :style="{ background: store.vibration ? 'var(--accent)' : 'var(--border)' }"
                @click="store.setVibration(!store.vibration)" >
                <div class="toggle-knob" :style="{left:store.vibration ?'22px':'3px'}"/>
            </button>
        </div>
    </div>

        <!-- a propos************** -->
         <div class="section-label" style="font-size: 1.3rem;">A Propos</div>
         <div class="section-box text-center">
            <div class="about-arabic mb-2">وِرْد</div>
            <p style="font-size: 1.1rem; color: var(--muted); line-height:1.9 ; margin: 0;">
                Chapelet Virtuel <br/>
                Pour la communautè musulmane <br/>
                Garde tes wirds toujours avec toi
            </p>
            <div style="font-family: Georgia,serif; font-size: 1.2rem; color: var(--accent) ; margin-top: 14px;">
               بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
         </div>


    </div>
 </template>



<script setup>
import{useTasbihStore} from '../stores/tasbih'
const store=useTasbihStore()

 const THEMES={
    nuit:   { name:'Nuit',   emoji:'🌙', bg:'#080d14', surface:'#0d1421', border:'#1f2937', text:'#e8dcc8', accent:'#d4a544' },
    aurore: { name:'Aurore', emoji:'🌅', bg:'#120900', surface:'#1e1200', border:'#3a2200', text:'#f5e6c8', accent:'#f59e0b' },
    foret:  { name:'Forêt',  emoji:'🌿', bg:'#020c06', surface:'#061009', border:'#0e2416', text:'#d4ead9', accent:'#4ade80' },
    ocean:  { name:'Océan',  emoji:'🌊', bg:'#02070f', surface:'#060f1c', border:'#0c1e38', text:'#d4e4f5', accent:'#60a5fa' },
    clair:  { name:'Clair',  emoji:'☀️', bg:'#f5f0e8', surface:'#ffffff', border:'#e0d8cc', text:'#1a1006', accent:'#b8860b' },
 }
</script>