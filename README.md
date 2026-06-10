# 🌟 Aromatic Aura 🌟

> *Gastronomy for the senses.* A beautiful, highly-interactive mobile recipe companion developed with React Native and Expo. Experience a curated universe of culinary arts, dynamic search systems, interactive grocery lists, and personalized local persistence wrapped in a high-contrast obsidian dark aesthetic with refined gold accents.

---

## 🎨 Visual Identity & Theme

Aromatic Aura is constructed around a custom-curated, **Obsidian Twilight & Gold** design scheme designed to reduce eye-strain in dimly-lit kitchens, using professional typography and subtle visual rhythm:

*   **Background (Deep Obsidian)**: `#0A0A0A` and `#1E1E1E` provide an eye-safe, cinematic backing.
*   **Accents (Aromatic Amber)**: `#F5C542` used purposefully for highlighting active tabs, completed items, difficulty rings, and interactive feedback.
*   **Typography**: Refined, lightweight Serif titles (`fontWeight: '300'`) for metadata paired with dense, uppercase tracking for labels (`letterSpacing: 1.5`), reproducing the look of editorial gourmet guides.

---

## 🚀 Key Features

### 🔍 1. Gastronomy Discovery Engine
*   **Dual Mode Feed**: Seamlessly transitions between curated global trending meals and precise categorized filter views.
*   **Persistent Search Bar layout**: Fixed focus-drop issues by decoupling the category filtering header from the dynamic keyboard scroll lists.
*   **Global Category Matrix**: Horizontal rolling category selector allowing one-touch item filtering.

### 📜 2. Multi-sensory Recipe Detail Screens
*   **Atmospheric Header**: Implements high-density recipe backdrops with gradient dark dimming overlays for full text readability.
*   **Comprehensive Metadata Panels**: Quick-view cards display prep country/region, recipe category, and step counts.
*   **Ingredient Checkbox Ledger**: Interactive toggleable checklist representing accurate culinary portions.
*   **Step-by-step Gastronomy Guide**: Clear, beautifully-formatted numbered cards that walk you through complex culinary stages.

### 🛒 3. Provision List Registry (Grocery List)
*   **Smart Metric Aggregation**: Deduplicates ingredients across multiple recipes so you buy exactly what you need.
*   **Fluid Step Counters**: Real-time ticker counting completed grocery items (`X/Y Completed`) styled in deep Amber gold.
*   **One-touch Management**: Single-tap check-off and global swipe clearances to reset your shopping register.

### 🔒 4. Local Persistence / Zero-Crash Multiplatform Storage
*   **Zustand Persist Layer**: Connected directly to an automated state distribution system.
*   **Safe Native Bridge**: Implements a dedicated dynamic bridge module (`safeStorage.ts`). Seamlessly falls back to `global.localStorage` on standard Web engines, and redirects to Android/iOS **AsyncStorage** compiled native layers on real mobile devices to prevent the infamous `AsyncStorage Native Module is Null` compile crashes.

---

## 🛠️ Technology Stack

*   **Framework**: [React Native](https://reactnative.dev/) & [Expo SDK](https://expo.dev/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) with automated JSON local persistence integration.
*   **Navigation**: Structured state-driven bottom navigation (Discover, Favorites, Grocery List) with hidden bottom-bar zones during active cooking guides for maximum sensory immersion.
*   **Icons**: [Lucide React Native](https://lucide.dev/)
*   **Networking**: Native Fetch API hooking into the *TheMealDB* REST service layer.

---

## 📦 Detailed Installation & Execution

### Prerequisites
Make sure you have Node.js (v18+) and npm/yarn installed.

### Step 1: Clone & Navigate
```bash
git clone https://github.com/YOUR_USERNAME/aromatic-aura.git
cd aromatic-aura
