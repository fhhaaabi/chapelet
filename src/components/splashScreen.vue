<template>
  <div class="splash" :class="{ hide: hiding }">
    <div class="splash-logo">

      <img src="../../public/chap2.jpg" alt="Wird" class="splash-img" />
      <div class="splash-wird"></div>
      <div class="splash-arabic"></div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit   = defineEmits(['done'])
const hiding = ref(false)

onMounted(() => {
  setTimeout(() => {
    hiding.value = true
    setTimeout(() => emit('done'), 600)
  }, 3500)
})
</script>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  background: #0d1421;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.6s ease;
}

.hide {
  opacity: 0;
  pointer-events: none;
}

.splash-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.splash-img {
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  /* border: 3px solid #d4a544; */
  /* box-shadow: 0 0 60px rgba(212, 165, 68, 0.4);
  animation: fadeIn 1s ease; */
}

.splash-wird {
  font-size: 1.8rem;
  font-weight: 700;
  color: #e8dcc8;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  animation: fadeIn 1.2s ease;
}

.splash-arabic {
  font-family: Georgia, serif;
  font-size: 2rem;
  color: #d4a544;
  animation: fadeIn 1.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>