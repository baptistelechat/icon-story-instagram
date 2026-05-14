---
register: journal
last_updated: 2026-05-14
---

## 2026-05-14

Initialisation de l'infrastructure mémoire agent pour le projet `icon-story-instagram`. Le projet est une SPA React 19 + Vite + TypeScript + Tailwind CSS 4 permettant de créer et d'exporter des icônes ou emojis en PNG 1080×1080 pour les stories Instagram.

Les décisions techniques clés ont été documentées : choix de Lucide React pour les icônes, html-to-image pour l'export côté client, et le format carré fixe 1080×1080. L'architecture à 3 composants (Controls / IconCanvas / ExportButton) pilotés par un état central `IconState` a été évaluée comme cohérente pour la portée du projet.

Deux blocages ouverts identifiés : absence de dépôt git et risque de rendu différentiel sur Windows avec html-to-image.

**Entrées clés :**

- [BDR-001](decisions/BDR-001.md) — Lucide React comme bibliothèque d'icônes
- [BDR-002](decisions/BDR-002.md) — html-to-image pour l'export PNG
- [BLK-001](blockers/BLK-001.md) — Projet sans dépôt git
- [EVAL-001](evals/EVAL-001.md) — Architecture Controls / IconCanvas / ExportButton

---

Session de construction complète de l'app Icon Maker. À partir d'un dossier vide, l'app a été scaffoldée (Vite + React + TypeScript), configurée (Tailwind v4 via `@tailwindcss/vite` sans config JS), et entièrement développée : composants `IconCanvas` (forwardRef, aperçu 400×400 px), `ExportButton` (html-to-image, pixelRatio dynamique → 1080×1080 px), `Controls` (dark sidebar), `IconPicker` (grille scrollable avec recherche parmi 5 870 icônes Lucide). Baptiste a choisi Vite + React sur Next.js (outil 100 % client-side).

Le lint est propre. L'app a été validée visuellement via dev-browser — dark theme cohérent, aperçu live fonctionnel, bouton export visible.

Friction notable : `dev-browser navigate` et `dev-browser screenshot` n'existent pas comme subcommands — j'ai dû lire le `--help` complet et basculer sur la syntaxe here-string PowerShell avec l'API script.

**Entrées clés :**

- [BDR-004](decisions/BDR-004.md) — Vite + React choisi sur Next.js
- [BLK-003](blockers/BLK-003.md) — dev-browser syntax CLI incorrecte → résolu
- [EVAL-002](evals/EVAL-002.md) — App Icon Maker v1 validée visuellement

---

Session de refactoring responsive de l'app Icon Maker. L'app était desktop-only (layout `flex-row` fixe, canvas hardcodé à 400×400px, sidebar `w-72` non adaptative). Tout a été revu pour supporter mobile (375px) et tablet.

Changements principaux : layout `flex-col-reverse md:flex-row` (Controls first dans le DOM → sidebar gauche desktop, bas de page mobile sans modifier l'ordre JSX), canvas `w-full aspect-square overflow-hidden` (export html-to-image inchangé car il utilise `offsetWidth` réel), sidebar `w-full md:w-72` avec `border-t md:border-r`, bouton export `w-full md:w-auto`.

Deux bugs en cours de route : bouton export non centré sur desktop (wrapper `md:w-auto` corrigé) et color picker laggy (résolu en 2 tentatives — d'abord suppression du prop `iconColor` d'IconPicker, insuffisant ; puis `requestAnimationFrame` debounce dans ColorInput avec état local `localValue`).

UI validée visuellement via dev-browser sur les deux viewports.

**Entrées clés :**

- [BDR-005](decisions/BDR-005.md) — Layout responsive flex-col-reverse
- [BLK-004](blockers/BLK-004.md) — Color picker laggy, résolu RAF debounce
- [EVAL-003](evals/EVAL-003.md) — Validation responsive mobile + desktop

---

Session courte de correction d'une erreur de build Vercel. `ColorInput.tsx:16` utilisait `useRef<number>()` sans argument — syntaxe valide en React 18 mais supprimée en React 19 (erreur TS2554). Fix en une ligne : `useRef<number | undefined>(undefined)`. Build local repassé immédiatement.

React Doctor lancé post-fix : score 99/100, aucune régression. Un warning `no-derived-useState` sur `localValue` est un faux positif documenté — état local intentionnel pour le debounce RAF du color picker.

**Entrées clés :**

- [BLK-005](blockers/BLK-005.md) — Build Vercel cassé useRef React 19, résolu
