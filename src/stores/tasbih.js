import { defineStore } from "pinia";

// ── Wirds par défaut ──────────────────────────────────
export const DEFAULT_WIRDS = [
  {
    id: 1,
    arabic: "سُبْحَانَ اللَّهِ",
    label: "Subhanallah",
    translation: "Gloire à Allah",
    target: 33,
    color: "#4ade80",
  },
  {
    id: 2,
    arabic: "الْحَمْدُ لِلَّهِ",
    label: "Alhamdulillah",
    translation: "Louange à Allah",
    target: 33,
    color: "#60a5fa",
  },
  {
    id: 3,
    arabic: "اللَّهُ أَكْبَرُ",
    label: "Allahu Akbar",
    translation: "Allah est le Plus Grand",
    target: 34,
    color: "#fbbf24",
  },
  {
    id: 4,
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    label: "Astaghfirullah",
    translation: "Je demande pardon à Allah",
    target: 33,
    color: "#c084fc",
  },
  {
    id: 5,
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    label: "La ilaha illallah",
    translation: "Pas de divinité sauf Allah",
    target: 100,
    color: "#fb7185",
  },
];

// ── Fonction load ─────────────────────────────────────
function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

// ── Store principal ───────────────────────────────────
export const useTasbihStore = defineStore("tasbih", {
  state: () => ({
    customWirds: load("customWirds", []),
    activeWirdId: load("activeWirdId", 1),
    count: 0,
    done: false,
    theme: localStorage.getItem("theme") || "nuit",
    soundTick: load("soundTick", true),
    soundAlarm: load("soundAlarm", true),
    vibration: load("vibration", true),
  }),

  getters: {
    allWirds: (state) => [...DEFAULT_WIRDS, ...state.customWirds],
    activeWird: (state) => {
      const all = [...DEFAULT_WIRDS, ...state.customWirds];
      return all.find((w) => w.id === state.activeWirdId) || DEFAULT_WIRDS[0];
    },
  },

  actions: {
    tap() {
      if (this.done) return;
      this.count++;
      if (this.count >= this.activeWird.target) this.done = true;
    },

    reset() {
      this.count = 0;
      this.done = false;
    },

    selectWird(id) {
      this.activeWirdId = id;
      this.count = 0;
      this.done = false;
      localStorage.setItem("activeWirdId", JSON.stringify(id));
    },

    addWird(wird) {
      this.customWirds.push({ ...wird, id: Date.now() });
      localStorage.setItem("customWirds", JSON.stringify(this.customWirds));
    },

    deleteWird(id) {
      this.customWirds = this.customWirds.filter((w) => w.id !== id);
      localStorage.setItem("customWirds", JSON.stringify(this.customWirds));
      if (this.activeWirdId === id) this.selectWird(1);
    },

    setTheme(t) {
      this.theme = t;
      localStorage.setItem("theme", t);
    },

    setSoundTick(v) {
      this.soundTick = v;
      localStorage.setItem("soundTick", JSON.stringify(v));
    },

    setSoundAlarm(v) {
      this.soundAlarm = v;
      localStorage.setItem("soundAlarm", JSON.stringify(v));
    },

    setVibration(v) {
      this.vibration = v;
      localStorage.setItem("vibration", JSON.stringify(v));
    },
  },
});
