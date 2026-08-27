<<<<<<< HEAD
# Mobile Challenge Engine

Automated skill assessment for **React Native**, **Node/Express backends**, **advanced mobile features**, **mission projects**, and **deployment** — following the same architecture as the [web Challenge Engine](https://github.com/sparkplustech/challenge-engine-react).

## Pathway: Mobile & Full-Stack Engineer

| Course | Challenges | Focus |
|--------|------------|--------|
| React Native Fundamentals | 7 | Expo, UI, navigation, lists, forms, API, AsyncStorage |
| Backend Basics | 5 | Node, Express, MongoDB, JWT |
| Advanced React Native | 6 | Redux, NativeWind, Firebase, maps, payments |
| Challenge Missions | 14 | Beginner → advanced app projects |
| Deployment | 3 | APK, EAS, Play Store |

**35 challenges** total. Pass each challenge at **≥ 80%** via the automated review engine.

## Quick start

```bash
git clone <your-repo-url>
cd mobile-challenge-engine
npm run setup
```

**Dashboard** (browse challenges, run reviews):

```bash
npm run dashboard:build
npm run dashboard
# http://localhost:7700
```

**Run an Expo course:**

```bash
cd courses/01-react-native-fundamentals/project
npm install
npx expo start
```

Each course `project/README.md` lists extra packages to install (e.g. AsyncStorage, Redux, EAS CLI). Challenge READMEs such as `06-async-storage` also include install steps where needed.

**Run a challenge review:**

```bash
cd courses/01-react-native-fundamentals/project
npm run review -- --challenge=01-expo-setup-basics
```

Or from repo root:

```bash
npm run review:challenge -- --course=01-react-native-fundamentals --challenge=01-expo-setup-basics
```

## Challenge locations

Instructions live in each challenge folder:

```
courses/01-react-native-fundamentals/project/challenges/01-expo-setup-basics/README.md
```

Use the in-app **Challenges** tab (Expo) or open READMEs in your editor.

## Review & scoring

Six layers: functional tests, ESLint, architecture patterns, best practices, E2E (when configured), AI review (Groq).

```bash
npm run review:all          # All courses
npm run review:changed      # Git-changed challenges only
npm run progress:update     # Refresh learner-results/progress.json
```

Optional AI review: create `.env` at repo root:

```
GROQ_API_KEY=your_key_here
```

## Documentation

- **[LEARNER-SETUP.md](./LEARNER-SETUP.md)** — Tools and packages to install for course challenges
- **[SYSTEM.md](./SYSTEM.md)** — Architecture, curriculum map, extending the engine
- Reference: `challenge-engine/SYSTEM.md` (web pathway)

## Regenerate curriculum files

After editing `scripts/generate-mobile-courses.js`:

```bash
npm run generate:courses
```

## Progress evidence

Results are written to:

- `courses/{course}/results/challenge-results.json`
- `learner-results/progress.json`
- Course `project/README.md` evidence table (after review)

---

**License:** MIT


































































































































































## 📈 Progress Summary

**Last updated:** 20/8/2026, 4:11:02 pm

### Pathway

| Metric | Value |
|--------|-------|
| Challenges completed | 1 / 35 (2.9%) |
| Overall score | 44.3% |

### By course

| Course | Completed | Score | Status |
|--------|-----------|-------|--------|
| React Native Fundamentals | 1/7 (14.3%) | 77.2% | Fail |
| Backend Basics | 0/5 (0%) | 62.5% | Fail |
| Advanced React Native | 0/6 (0%) | 62.5% | Fail |
| Challenge Missions | 0/14 (0%) | 0% | Pass |
| Deployment | 0/3 (0%) | 0% | Pass |

