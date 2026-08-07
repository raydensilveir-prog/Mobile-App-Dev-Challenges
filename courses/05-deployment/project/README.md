# 05-deployment

## 📊 Progress Evidence

*Auto-updated when you run review. Last run: 22/5/2026, 5:56:54 pm*

| Metric | Value |
|--------|-------|
| Challenges completed | 0 / 3 (0%) |
| Average score | 0% |

| Challenge | Skills covered | Status |
|-----------|----------------|--------|
| APK Build | APK, Android build, Device testing | — |
| Expo EAS | EAS Build, eas.json, Cloud build | — |
| Play Store Prep | Screenshots, App icon, Privacy policy, Signed release | — |

## Getting started

```bash
npm install
npx expo start
```

## Tools for deployment challenges

| Tool | Purpose | Install |
|------|---------|---------|
| EAS CLI | Cloud builds | `npm install -g eas-cli` then `eas login` |
| Android SDK | Local APK testing | [Android Studio](https://developer.android.com/studio) |
| Play assets | Store listing | Add screenshots under `store-assets/` (see `store-assets/README.md`) |

Build APK preview:

```bash
eas build --platform android --profile preview
```

Run a challenge review:

```bash
npm run review -- --challenge=01-expo-setup-basics
```
