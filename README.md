# Wird — وِرْد

Application web progressive (PWA-ready) pour le dhikr / wird après les prières.

## Stack technique

| Outil        | Rôle                         |
|--------------|------------------------------|
| Vue.js 3     | Framework UI (Composition API)|
| Vue Router 4 | Navigation 3 pages           |
| Pinia        | State management + localStorage|
| Bootstrap 5  | Responsive / layout          |
| Vite 5       | Bundler ultra-rapide         |

## Structure du projet

```
tasbih-app/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.js                 ← Point d'entrée
│   ├── App.vue                 ← Composant racine
│   ├── router/
│   │   └── index.js            ← Routes (hash history)
│   ├── stores/
│   │   └── tasbih.js           ← Store Pinia + localStorage
│   ├── assets/
│   │   └── main.css            ← 5 thèmes CSS + styles
│   ├── components/
│   │   └── BottomNav.vue       ← Navigation fixe en bas
│   └── views/
│       ├── Accueil.vue         ← Page compteur + SVG chapelet
│       ├── Wirds.vue           ← Gestion des wirds
│       └── Params.vue          ← Thèmes + son + vibration
```

## Installation & Lancement

Node.js 18+ requis (tu as Node 24 ✅)

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer en local (http://localhost:5173)
npm run dev

# 3. Compiler pour production
npm run build
# → génère le dossier dist/
```

## Déploiement

### Netlify (gratuit — recommandé)
1. Push le projet sur GitHub
2. netlify.com → "New site from Git"
3. Build command : `npm run build`
4. Publish directory : `dist`
5. Ton site est en ligne 🎉

### Vercel (gratuit)
```bash
npm i -g vercel
vercel --prod
```

### Hébergement FTP (.sn / .com)
```bash
npm run build
# Upload le contenu de dist/ via FTP sur ton hébergeur
```

### Nom de domaine
- **.com** → Namecheap, GoDaddy (~10$/an)
- **.sn**  → NIC Sénégal — nic.sn

## Fonctionnalités

- 📿 Chapelet SVG animé (33 perles + perle imam)
- 🔢 Compteur central + indicateur de tour
- 🔔 Son au clic + alarme musicale de fin (Web Audio API)
- 📳 Vibration mobile (Vibration API)
- 🌙 5 thèmes : Nuit / Aurore / Forêt / Océan / Clair
- ➕ Wirds personnalisés (arabe + nom + répétitions + couleur)
- 💾 Toutes les données sauvegardées (localStorage)
