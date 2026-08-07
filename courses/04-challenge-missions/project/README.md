# 04-challenge-missions

## 📊 Progress Evidence

*Auto-updated when you run review. Last run: 22/5/2026, 5:56:54 pm*

| Metric | Value |
|--------|-------|
| Challenges completed | 0 / 14 (0%) |
| Average score | 0% |

| Challenge | Skills covered | Status |
|-----------|----------------|--------|
| Habit Tracker | useState, FlatList, AsyncStorage | — |
| Pokemon Explorer | fetch, FlatList, Navigation | — |
| Notes App | AsyncStorage, CRUD, TextInput | — |
| Calculator | useState, UI layout | — |
| Meme Viewer | fetch, Image, ScrollView | — |
| Realtime Chat | Firebase, FlatList, Auth | — |
| Expense Tracker | Redux, Charts, Forms | — |
| Movie App | API, Search, Navigation | — |
| AI Recipe App | API, Forms, Loading states | — |
| Food Delivery | Maps, Cart, Navigation | — |
| Social Media Platform | Auth, Feed, Firebase, Upload | — |
| Full Marketplace | Redux, Payments, Search | — |
| Fitness Tracker | Charts, AsyncStorage, Notifications | — |
| Anime Streaming UI | UI design, FlatList, Navigation | — |

## Getting started

```bash
npm install
npx expo start
```

## Extra packages (by mission tier)

| Missions | Install |
|----------|---------|
| Notes, Habit, Fitness (AsyncStorage) | `npm install @react-native-async-storage/async-storage` |
| Expense, Marketplace, Food delivery (Redux) | `@reduxjs/toolkit`, `react-redux` (in package.json) |
| Food delivery (maps) | `react-native-maps` |
| Chat, Social (Firebase) | Mock `lib/firebase.ts` included — real Firebase optional |

Use `npm install --legacy-peer-deps` if peer dependency warnings appear.

Mission screens live under `app/` (e.g. `app/index.tsx`, `app/notes.tsx`). Open them from the home hub or Expo Router.

Run a challenge review:

```bash
npm run review -- --challenge=01-expo-setup-basics
```
