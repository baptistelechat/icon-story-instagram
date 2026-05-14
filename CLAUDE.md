# CLAUDE.md — icon-story-instagram

## Objectif du projet

Outil de création d'icônes carrées pour stories/posts Instagram.
L'utilisateur compose une icône (fond uni + lucide-icon ou emoji centré), ajuste les paramètres visuels, puis exporte le résultat en PNG 1080×1080 px prêt à l'emploi.

Projet perso de Baptiste — SPA légère sans backend, sans authentification, sans routing.

---

## Stack technique

| Couche                  | Choix                                   | Version           |
| ----------------------- | --------------------------------------- | ----------------- |
| Framework               | Vite + React                            | Vite 8 / React 19 |
| Langage                 | TypeScript strict                       | 6.0               |
| Style                   | Tailwind CSS v4 via `@tailwindcss/vite` | 4.3               |
| Icônes                  | lucide-react (5 870 icônes disponibles) | 1.16              |
| Export                  | html-to-image (`toPng`)                 | 1.11              |
| Gestionnaire de paquets | pnpm                                    | —                 |

> Tailwind v4 : pas de `tailwind.config.js` ni `postcss.config.js`. Le plugin est déclaré dans `vite.config.ts` et activé par `@import "tailwindcss"` dans `index.css`.

---

## Commandes

```bash
pnpm dev        # serveur de développement (port 5173, ou 5174 si occupé)
pnpm build      # build TypeScript + Vite
pnpm lint       # ESLint
pnpm preview    # prévisualisation du build
```

---

## Architecture

```
src/
├── types.ts                              # IconState, IconMode
├── App.tsx                               # état central + layout (sidebar / main)
├── index.css                             # @import "tailwindcss" + scrollbar custom
└── components/
    ├── IconCanvas/
    │   └── index.tsx                     # aperçu carré (forwardRef → html-to-image)
    ├── ExportButton/
    │   └── index.tsx                     # export PNG 1080×1080 via toPng()
    └── Controls/
        ├── index.tsx                     # sidebar sombre avec tous les contrôles
        └── components/
            └── IconPicker.tsx            # grille scrollable + recherche lucide-react
```

### État central (`IconState`)

Géré dans `App.tsx`, passé en props aux composants :

```ts
interface IconState {
  mode: "lucide" | "emoji"; // type d'icône
  backgroundColor: string; // couleur de fond (hex)
  iconName: string; // nom de l'icône lucide (ex. "Heart")
  iconColor: string; // couleur de l'icône (hex)
  iconSize: number; // taille en px (40–340)
  emoji: string; // emoji affiché en mode emoji
  borderRadius: number; // arrondi des coins (0–200 px)
}
```

---

## Comportement de l'export

- Taille cible : **1080 × 1080 px**
- Méthode : `pixelRatio = 1080 / element.offsetWidth` (aperçu UI = 400 px → ratio ≈ 2.7)
- Fichier téléchargé : `icon-1080x1080.png`
- Rendu : fidèle à l'aperçu ; léger risque de différentiel sur Windows (voir BLK-002)

---

## Design UI

- Thème sombre : `bg-gray-950` (fond app), `bg-gray-900` (sidebar + cadre preview)
- Accent : indigo (`#6366f1`)
- Aperçu : `400 × 400 px` centré dans la zone principale
- Pas de shadcn/ui — Tailwind pur

---

## Blocages ouverts

| ID      | Problème                                                  |
| ------- | --------------------------------------------------------- |
| BLK-001 | Pas de dépôt git initialisé (`git init` à faire)          |
| BLK-002 | Rendu html-to-image potentiellement différent sur Windows |

---

## Ce qui pourrait être ajouté

- Dégradé de fond (pas seulement couleur unie)
- Épaisseur de trait (`strokeWidth`) pour les icônes Lucide
- Préréglages de couleurs (palettes Instagram, Material…)
- Taille d'export configurable (1080 / 512 / 256 px)
- Historique des créations (localStorage)
