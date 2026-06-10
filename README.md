# 🌿 Aromatic Aura 🌿

> An elegant, sensory-focused native culinary companion designed to elevate your kitchen experience through aroma-driven curation, local persistence, and high-performance tactile interfaces.

---

## 🎨 Visual Identity & Theme
**Aromatic Aura** runs on a highly custom **Cosmic Obsidian Theme** centered on deep blacks (`#0A0A0A`), golden saffron accents (`#F5C542`), and ambient translucent surfaces. Designed for hands-on kitchen use, the interface provides high-contrast typography, generous tap targets, and full-sensory layout hierarchy that fades unnecessary controls during active cooking to keep you focused.

---

## ✨ Features Breakdown

### 🔍 1. Sensory Discovery (`DiscoverScreen`)
*   **Intuitive Category Controls**: Seamless filter chips to navigate diverse cuisines (e.g., Seafood, Dessert, Vegetarian).
*   **Tactile Search Engine**: High-performance, real-time query interface with stateful input validation designed to keep soft keyboards locked in view until you’re ready to cook.
*   **Curated Gastronomy**: Dynamic listing of popular, aromatic recipes parsed beautifully with gorgeous imagery and tactile cards.

### 🍽️ 2. Deep Gastronomy View (`RecipeDetailScreen`)
*   **Olfactory Profiles & Aromatics**: Vivid descriptions highlighting the primary scents and fragrance profiles of each meal.
*   **Portion Scaling & Math**: High-contrast, easy-to-read list of ingredients.
*   **Culinary Directions**: Structured, step-by-step cooking commands with visual tracking.

### 🛒 3. Interactive Grocery Manager (`GroceryListScreen`)
*   **Automatic Ingredient Export**: Instantly source recipes into a consolidated shopping checklist.
*   **Custom Item Addition**: Add private kitchen inventory items or clean up list items.
*   **Local Inventory Syncing**: Interactive strike-throughs with persistent state so checklists persist even when offline.

### 💖 4. Persistent Vault (`FavoritesScreen`)
*   **Unification of Gastronomy**: Bookmark treasured meals into your private cookbook.
*   **Optimized Safe Storage**: Custom-built fallback database layer managing asynchronous local storage seamlessly between platform environments (Web vs. Native/Mobile).

---

## 🛠️ Technology Stack
*   **Framework**: [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/) (SDK 56+)
*   **Language**: Strict [TypeScript](https://www.typescriptlang.org/) for bulletproof type-safety
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) with seamless persistence middleware
*   **Styling**: High-performance Tailwind-powered atomic style architecture
*   **Icons**: [Lucide React Native](https://lucide.dev/) for crisp, scalable vector icons

---

## 📦 How to Download, Install and Run

Follow these precise, step-by-step instructions to clone, download, and activate **Aromatic Aura** on your host computer and run it seamlessly on your smartphone!

### Phase 1: Prerequisites
Before starting, ensure you have the following installed on your developer computer:
1.  **Node.js LTS** (v18 or higher recommended) - [Download Here](https://nodejs.org/)
2.  **Git** (if importing from GitHub) - [Download Here](https://git-scm.com/)
3.  **Expo Go App** (installed on your physical Android or iPhone device via the Google Play Store or Apple App Store).

---

### Phase 2: Setup and Package Deployment
Open your system command prompt/terminal (Terminal on macOS, PowerShell/Command Prompt on Windows) and run these exact commands:

#### 1. Navigate to the projects root folder:
```bash
cd /path/to/your/extracted-project
```

#### 2. Install all development & application dependencies:
```bash
npm install
```

---

### Phase 3: Launching the App on the Tunnel Network 🚇
Using the Expo Tunnel command is highly recommended as it bypasses local Wi-Fi router isolation, corporate firewalls, and carrier network blocks by serving a secure public tunneling proxy.

#### 1. Fire up the Tunnel server directly using this exact command:
```bash
npx expo start --tunnel
```
*(Alternatively, you can run: `npm run tunnel`)*

#### 2. Connect Your Mobile Device:
*   Once launched, you will see a large **QR Code** generated directly inside your computer terminal.
*   **For Android**: Open the **Expo Go app** on your phone, tap **"Scan QR Code"**, and point your camera at the screen.
*   **For iOS**: Open the stock **Apple Camera app**, scan the QR Code, and tap the prompt to open in **Expo Go**.
*   *Voila!* The application bundle will download automatically to your device over the secure tunnel and run natively.

---

## 🤖 How to Build the Standalone Android APK

If you want to package the app as a complete, installable `.apk` file to run as a standalone application on Android, follow these baby steps:

### Step 1: Install Expo Application Services (EAS CLI)
This tool compiles your absolute source code inside Expo's cloud compiler cleanly.
```bash
npm install -g eas-cli
```

### Step 2: Register/Log In to your Expo Account
Create a free account on [expo.dev](https://expo.dev) if you don't already have one, then log in directly using your terminal:
```bash
eas login
```

### Step 3: Configure Project Credentials
Run this utility script to connect your local environment with Expo cloud dashboard:
```bash
eas project:init
```

### Step 4: Initiate APK Compilation Command 🚀
Execute the premium internal distribution build designed to compile into an installable `.apk`:
```bash
eas build --platform android --profile preview
```

### Step 5: Install & Enjoy!
*   The EAS suite will handle Android tooling, build caches, and signing keys smoothly inside the cloud.
*   Once completed (usually takes ~5-10 minutes), EAS will display a **sharable URL with a QR code** in your terminal.
*   Scan that QR code with your smartphone or visit the web link to download your production-ready, custom-branded **Aromatic Aura APK**!

---

## 🔒 Optimized Storage Architecture
To resolve runtime native environment errors such as `AsyncStorageError: Native module is null`, the app incorporates a custom **Safe Storage Wrapper** (`src/lib/safeStorage.ts`). This is a hybrid local storage engine that:
1.  Intercepts operations and verifies platform bindings dynamically.
2.  Gracefully falls back to browser-compatible `localStorage` on Web previews.
3.  Implements high-performance, asynchronous `@react-native-async-storage/async-storage` when deploying to physical Android/iOS hardware.
