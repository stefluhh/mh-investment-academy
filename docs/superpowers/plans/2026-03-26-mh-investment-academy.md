# MH Investment Academy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Mobile-First E-Learning SPA for the MH Investment Academy with 4 investment courses, chapter-based learning content, and multiple-choice quizzes — all styled in the totalreturn-capital.com corporate design.

**Architecture:** React 19 SPA with TypeScript, React Router v7 for 5 routes, MUI 6 for UI components with a custom theme. Course data is static TypeScript. User progress persists in localStorage via React Context.

**Tech Stack:** React 19, TypeScript, Vite 6, MUI 6, React Router v7, localStorage

---

## File Structure

```
index.html                          # Update: title, script src to .tsx
vite.config.ts                      # Rename from .js, add TypeScript support
tsconfig.json                       # Create: TypeScript config
tsconfig.node.json                  # Create: Node TypeScript config for Vite
src/
├── main.tsx                        # Rename from .jsx, update imports
├── App.tsx                         # Rewrite: Router + ThemeProvider + FortschrittProvider
├── theme.ts                        # Create: MUI custom theme
├── types.ts                        # Create: All TypeScript interfaces
├── data/
│   ├── kurse.ts                    # Create: All 4 courses with chapters + quizzes
│   └── badges.ts                   # Create: Badge definitions
├── context/
│   └── FortschrittContext.tsx       # Create: Progress state + localStorage sync
├── components/
│   ├── Layout.tsx                  # Create: Header + content wrapper
│   ├── StatBar.tsx                 # Create: Stats tiles (courses, chapters, badges)
│   ├── KursKarte.tsx               # Create: Course card with progress circle
│   ├── KapitelListe.tsx            # Create: Chapter list with status icons
│   ├── LernContent.tsx             # Create: Video + text + info boxes scroll flow
│   ├── QuizWizard.tsx              # Create: Quiz container with progress bar
│   ├── QuizFrage.tsx               # Create: Question + media + answer cards
│   ├── QuizFeedback.tsx            # Create: Correct/wrong feedback + explanation
│   ├── QuizErgebnis.tsx            # Create: Final score + badge unlock
│   ├── BadgeCard.tsx               # Create: Badge display + Discord share
│   └── LockedOverlay.tsx           # Create: "Jetzt freischalten" overlay
├── pages/
│   ├── Dashboard.tsx               # Create: StatBar + course list
│   ├── KursAnsicht.tsx             # Create: Course header + chapter list
│   ├── Lernansicht.tsx             # Create: LernContent + quiz CTA
│   ├── QuizSeite.tsx               # Create: QuizWizard page wrapper
│   └── Profil.tsx                  # Create: Badges + progress + Discord
```

---

### Task 1: TypeScript Migration & Project Setup

**Files:**
- Delete: `src/main.jsx`, `src/App.jsx`, `vite.config.js`
- Create: `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `src/vite-env.d.ts`
- Create: `src/main.tsx`, `src/App.tsx`
- Modify: `index.html`
- Modify: `package.json`

- [ ] **Step 1: Install dependencies**

```bash
cd /home/stef/hessel
npm install react-router-dom@7
npm install -D typescript @types/node
```

- [ ] **Step 2: Create tsconfig.json**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create tsconfig.node.json**

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Create vite.config.ts**

Delete `vite.config.js`. Create `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

- [ ] **Step 5: Create src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />
```

- [ ] **Step 6: Create src/main.tsx**

Delete `src/main.jsx`. Create `src/main.tsx`:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 7: Create minimal src/App.tsx**

Delete `src/App.jsx`. Create `src/App.tsx`:

```tsx
import { Typography, Box } from '@mui/material'

function App() {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4">MH Investment Academy</Typography>
      <Typography color="text.secondary">TypeScript setup complete</Typography>
    </Box>
  )
}

export default App
```

- [ ] **Step 8: Update index.html**

Change the script src and title:

```html
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MH Investment Academy</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 9: Add build:ts script to package.json**

Add `"typecheck": "tsc --noEmit"` to scripts in `package.json`.

- [ ] **Step 10: Verify build**

```bash
cd /home/stef/hessel
npx tsc --noEmit
npm run build
```

Expected: Both commands succeed with no errors.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: migrate project to TypeScript, add react-router-dom"
```

---

### Task 2: Theme + Types + Data Layer

**Files:**
- Create: `src/theme.ts`
- Create: `src/types.ts`
- Create: `src/data/badges.ts`
- Create: `src/data/kurse.ts` (Basiskurs only — first course with all 6 chapters + quizzes)

- [ ] **Step 1: Create src/types.ts**

```typescript
export type KursId = "basiskurs" | "growth" | "value" | "optionen";

export interface Antwort {
  id: "a" | "b" | "c" | "d";
  text: string;
  korrekt: boolean;
}

export interface QuizFrage {
  id: string;
  frage: string;
  medien: { typ: "bild" | "chart" | "video"; src: string } | null;
  antworten: Antwort[];
  erklaerung: string;
}

export type ContentAbschnitt =
  | { typ: "text"; inhalt: string }
  | { typ: "merke"; inhalt: string }
  | { typ: "bild"; src: string; caption: string }
  | { typ: "diagramm"; src: string; caption: string };

export interface Kapitel {
  id: string;
  titel: string;
  goldTitel: boolean;
  content: {
    videoUrl: string | null;
    abschnitte: ContentAbschnitt[];
  };
  quiz: QuizFrage[];
}

export interface Kurs {
  id: KursId;
  titel: string;
  beschreibung: string;
  icon: string;
  freigeschaltet: boolean;
  kapitel: Kapitel[];
}

export interface Badge {
  id: string;
  kursId: KursId;
  titel: string;
  beschreibung: string;
  icon: string;
}

export interface QuizErgebnis {
  richtig: number;
  gesamt: number;
}

export interface Fortschritt {
  kapitelAbgeschlossen: string[];
  quizErgebnisse: Record<string, QuizErgebnis>;
  badges: string[];
}
```

- [ ] **Step 2: Create src/theme.ts**

```typescript
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c3f3a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1c3f39',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#ffb959',
      contrastText: '#1c3f3a',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    success: {
      main: '#22c55e',
    },
    error: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      color: '#1c3f3a',
    },
    h5: {
      fontWeight: 700,
      color: '#1c3f3a',
    },
    h6: {
      fontWeight: 600,
      color: '#1c3f3a',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '12px 24px',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#163330',
          },
        },
      },
    },
  },
});

export default theme;
```

- [ ] **Step 3: Create src/data/badges.ts**

```typescript
import { Badge } from '../types';

export const badges: Badge[] = [
  {
    id: 'basiskurs-complete',
    kursId: 'basiskurs',
    titel: 'Basiskurs Absolvent',
    beschreibung: 'Alle Kapitel des Basiskurses bestanden',
    icon: 'B',
  },
  {
    id: 'growth-complete',
    kursId: 'growth',
    titel: 'Growth Investor',
    beschreibung: 'Alle Kapitel des Growth-Investing-Kurses bestanden',
    icon: 'G',
  },
  {
    id: 'value-complete',
    kursId: 'value',
    titel: 'Value Investor',
    beschreibung: 'Alle Kapitel des Value-Investing-Kurses bestanden',
    icon: 'V',
  },
  {
    id: 'optionen-complete',
    kursId: 'optionen',
    titel: 'Optionen Experte',
    beschreibung: 'Alle Kapitel des Aktienoptionen-Kurses bestanden',
    icon: 'O',
  },
];
```

- [ ] **Step 4: Create src/data/kurse.ts — Basiskurs (6 chapters with quizzes)**

```typescript
import { Kurs } from '../types';

const basiskurs: Kurs = {
  id: 'basiskurs',
  titel: 'Basiskurs',
  beschreibung: 'Lerne die Grundlagen des Investierens — von Aktien über Börsenhandel bis hin zu deinem ersten Portfolio.',
  icon: 'B',
  freigeschaltet: true,
  kapitel: [
    {
      id: 'kap1',
      titel: 'Was ist eine Aktie?',
      goldTitel: true,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Eine Aktie ist ein Wertpapier, das einen Anteil am Grundkapital einer Aktiengesellschaft (AG) verbrieft. Als Aktionär bist du Miteigentümer des Unternehmens und hast Anspruch auf einen Teil des Gewinns (Dividende) sowie ein Stimmrecht auf der Hauptversammlung.',
          },
          {
            typ: 'merke',
            inhalt: 'Eine Aktie = ein Anteil am Unternehmen. Mehr Aktien = größerer Anteil. Der Kurs einer Aktie wird durch Angebot und Nachfrage an der Börse bestimmt.',
          },
          {
            typ: 'text',
            inhalt: 'Es gibt verschiedene Arten von Aktien: Stammaktien gewähren Stimmrechte, Vorzugsaktien bieten oft höhere Dividenden bei eingeschränktem Stimmrecht. Namensaktien sind auf den Eigentümer registriert, Inhaberaktien gehören dem jeweiligen Besitzer.',
          },
        ],
      },
      quiz: [
        {
          id: 'b1q1',
          frage: 'Was verbrieft eine Aktie?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Einen Kredit an das Unternehmen', korrekt: false },
            { id: 'b', text: 'Einen Anteil am Grundkapital einer AG', korrekt: true },
            { id: 'c', text: 'Eine Versicherung gegen Kursverluste', korrekt: false },
            { id: 'd', text: 'Ein Recht auf Unternehmensführung', korrekt: false },
          ],
          erklaerung: 'Eine Aktie verbrieft einen Anteil am Grundkapital einer Aktiengesellschaft. Du wirst damit zum Miteigentümer des Unternehmens.',
        },
        {
          id: 'b1q2',
          frage: 'Welche Aktienart gewährt typischerweise ein Stimmrecht auf der Hauptversammlung?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Vorzugsaktien', korrekt: false },
            { id: 'b', text: 'Inhaberaktien', korrekt: false },
            { id: 'c', text: 'Stammaktien', korrekt: true },
            { id: 'd', text: 'Namensaktien', korrekt: false },
          ],
          erklaerung: 'Stammaktien gewähren dem Aktionär ein Stimmrecht auf der Hauptversammlung. Vorzugsaktien bieten dafür oft eine höhere Dividende.',
        },
        {
          id: 'b1q3',
          frage: 'Wodurch wird der Kurs einer Aktie bestimmt?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Durch die Unternehmensleitung', korrekt: false },
            { id: 'b', text: 'Durch staatliche Regulierung', korrekt: false },
            { id: 'c', text: 'Durch Angebot und Nachfrage an der Börse', korrekt: true },
            { id: 'd', text: 'Durch den Buchwert des Unternehmens', korrekt: false },
          ],
          erklaerung: 'Der Aktienkurs wird an der Börse durch Angebot und Nachfrage bestimmt. Wollen viele Anleger kaufen, steigt der Kurs — wollen viele verkaufen, sinkt er.',
        },
        {
          id: 'b1q4',
          frage: 'Was ist eine Dividende?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Eine Gebühr für den Aktienhandel', korrekt: false },
            { id: 'b', text: 'Ein Anteil am Unternehmensgewinn für Aktionäre', korrekt: true },
            { id: 'c', text: 'Der Unterschied zwischen Kauf- und Verkaufskurs', korrekt: false },
            { id: 'd', text: 'Eine Steuer auf Kursgewinne', korrekt: false },
          ],
          erklaerung: 'Die Dividende ist eine Gewinnausschüttung des Unternehmens an seine Aktionäre. Nicht alle Unternehmen zahlen Dividenden — manche reinvestieren ihre Gewinne.',
        },
        {
          id: 'b1q5',
          frage: 'Was unterscheidet Vorzugsaktien von Stammaktien?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Vorzugsaktien sind immer teurer', korrekt: false },
            { id: 'b', text: 'Vorzugsaktien bieten oft höhere Dividenden bei eingeschränktem Stimmrecht', korrekt: true },
            { id: 'c', text: 'Vorzugsaktien können nicht an der Börse gehandelt werden', korrekt: false },
            { id: 'd', text: 'Es gibt keinen Unterschied', korrekt: false },
          ],
          erklaerung: 'Vorzugsaktien bieten typischerweise eine höhere Dividende als Stammaktien, dafür ist das Stimmrecht eingeschränkt oder entfällt ganz.',
        },
      ],
    },
    {
      id: 'kap2',
      titel: 'Wie funktioniert die Börse?',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Die Börse ist ein organisierter Marktplatz, auf dem Wertpapiere wie Aktien, Anleihen und Fonds gehandelt werden. Die bekannteste deutsche Börse ist die Frankfurter Wertpapierbörse (FWB), international sind die New York Stock Exchange (NYSE) und die NASDAQ führend.',
          },
          {
            typ: 'merke',
            inhalt: 'Börsenkurse entstehen durch das Zusammenspiel von Kauf- und Verkaufsaufträgen. Der Preis, zu dem die meisten Orders ausgeführt werden können, ist der aktuelle Kurs.',
          },
          {
            typ: 'text',
            inhalt: 'Als Privatanleger handelst du über einen Broker, der deine Aufträge an die Börse weiterleitet. Du platzierst eine Order (Kauf oder Verkauf) und der Broker führt sie zum bestmöglichen Preis aus. Es gibt verschiedene Ordertypen: Market Orders werden sofort zum aktuellen Kurs ausgeführt, Limit Orders nur zu einem von dir festgelegten Preis.',
          },
        ],
      },
      quiz: [
        {
          id: 'b2q1',
          frage: 'Was ist die Hauptfunktion einer Börse?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Unternehmen zu gründen', korrekt: false },
            { id: 'b', text: 'Ein organisierter Marktplatz für den Wertpapierhandel', korrekt: true },
            { id: 'c', text: 'Kredite an Unternehmen zu vergeben', korrekt: false },
            { id: 'd', text: 'Steuern einzutreiben', korrekt: false },
          ],
          erklaerung: 'Die Börse ist ein organisierter Marktplatz, auf dem Käufer und Verkäufer von Wertpapieren zusammengeführt werden.',
        },
        {
          id: 'b2q2',
          frage: 'Was ist der Unterschied zwischen einer Market Order und einer Limit Order?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Market Orders gelten nur an deutschen Börsen', korrekt: false },
            { id: 'b', text: 'Limit Orders werden sofort ausgeführt, Market Orders nicht', korrekt: false },
            { id: 'c', text: 'Market Orders werden sofort zum aktuellen Kurs ausgeführt, Limit Orders nur zu einem festgelegten Preis', korrekt: true },
            { id: 'd', text: 'Es gibt keinen Unterschied', korrekt: false },
          ],
          erklaerung: 'Eine Market Order wird sofort zum besten verfügbaren Preis ausgeführt. Eine Limit Order wird nur ausgeführt, wenn der gewünschte Preis erreicht wird.',
        },
        {
          id: 'b2q3',
          frage: 'Welche Rolle spielt ein Broker?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Er bestimmt die Aktienkurse', korrekt: false },
            { id: 'b', text: 'Er leitet deine Aufträge an die Börse weiter', korrekt: true },
            { id: 'c', text: 'Er versichert dein Portfolio gegen Verluste', korrekt: false },
            { id: 'd', text: 'Er berät dich bei der Steuererklärung', korrekt: false },
          ],
          erklaerung: 'Der Broker ist dein Vermittler zur Börse. Er nimmt deine Kauf- und Verkaufsaufträge entgegen und führt sie an der Börse aus.',
        },
        {
          id: 'b2q4',
          frage: 'Welche ist die bekannteste deutsche Börse?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Berliner Börse', korrekt: false },
            { id: 'b', text: 'Münchner Börse', korrekt: false },
            { id: 'c', text: 'Frankfurter Wertpapierbörse', korrekt: true },
            { id: 'd', text: 'Hamburger Börse', korrekt: false },
          ],
          erklaerung: 'Die Frankfurter Wertpapierbörse (FWB) ist die größte und bekannteste Börse Deutschlands.',
        },
        {
          id: 'b2q5',
          frage: 'Was passiert, wenn mehr Anleger eine Aktie kaufen als verkaufen wollen?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Der Kurs sinkt', korrekt: false },
            { id: 'b', text: 'Der Kurs bleibt gleich', korrekt: false },
            { id: 'c', text: 'Der Kurs steigt', korrekt: true },
            { id: 'd', text: 'Der Handel wird ausgesetzt', korrekt: false },
          ],
          erklaerung: 'Wenn die Nachfrage das Angebot übersteigt, steigt der Kurs. Das Grundprinzip von Angebot und Nachfrage bestimmt den Preis.',
        },
      ],
    },
    {
      id: 'kap3',
      titel: 'Grundlagen der Aktienanalyse',
      goldTitel: true,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Die Aktienanalyse dient dazu, den Wert einer Aktie einzuschätzen und fundierte Investmententscheidungen zu treffen. Es gibt zwei Hauptansätze: die Fundamentalanalyse und die technische Analyse.',
          },
          {
            typ: 'merke',
            inhalt: 'Fundamentalanalyse betrachtet die wirtschaftlichen Kennzahlen eines Unternehmens (Umsatz, Gewinn, Schulden). Technische Analyse betrachtet Kursverläufe und Handelsvolumen.',
          },
          {
            typ: 'text',
            inhalt: 'Bei der Fundamentalanalyse untersuchst du Bilanzen, Gewinn- und Verlustrechnungen sowie Cashflow-Statements. Du vergleichst Kennzahlen wie KGV, KBV und Eigenkapitalrendite mit Branchendurchschnitten, um unter- oder überbewertete Aktien zu identifizieren.',
          },
        ],
      },
      quiz: [
        {
          id: 'b3q1',
          frage: 'Welche Kennzahl zeigt das Verhältnis von Aktienkurs zum Gewinn pro Aktie?',
          medien: null,
          antworten: [
            { id: 'a', text: 'KBV (Kurs-Buchwert-Verhältnis)', korrekt: false },
            { id: 'b', text: 'KGV (Kurs-Gewinn-Verhältnis)', korrekt: true },
            { id: 'c', text: 'ROE (Return on Equity)', korrekt: false },
            { id: 'd', text: 'EBITDA-Marge', korrekt: false },
          ],
          erklaerung: 'Das KGV (Kurs-Gewinn-Verhältnis) setzt den aktuellen Aktienkurs ins Verhältnis zum Gewinn pro Aktie. Ein niedriges KGV kann auf eine Unterbewertung hindeuten.',
        },
        {
          id: 'b3q2',
          frage: 'Was untersucht die technische Analyse primär?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Unternehmensbilanzen', korrekt: false },
            { id: 'b', text: 'Kursverläufe und Handelsvolumen', korrekt: true },
            { id: 'c', text: 'Managementqualität', korrekt: false },
            { id: 'd', text: 'Dividendenhistorie', korrekt: false },
          ],
          erklaerung: 'Die technische Analyse fokussiert sich auf historische Kursdaten und Handelsvolumen, um zukünftige Kursbewegungen vorherzusagen.',
        },
        {
          id: 'b3q3',
          frage: 'Was ist das Ziel der Fundamentalanalyse?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Den kurzfristigen Kursverlauf vorherzusagen', korrekt: false },
            { id: 'b', text: 'Den inneren Wert eines Unternehmens zu bestimmen', korrekt: true },
            { id: 'c', text: 'Die beste Orderart auszuwählen', korrekt: false },
            { id: 'd', text: 'Steuern zu optimieren', korrekt: false },
          ],
          erklaerung: 'Die Fundamentalanalyse versucht, den inneren (fairen) Wert eines Unternehmens zu bestimmen und diesen mit dem aktuellen Marktpreis zu vergleichen.',
        },
        {
          id: 'b3q4',
          frage: 'Welches Dokument zeigt die Einnahmen und Ausgaben eines Unternehmens?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Die Bilanz', korrekt: false },
            { id: 'b', text: 'Das Cashflow-Statement', korrekt: false },
            { id: 'c', text: 'Die Gewinn- und Verlustrechnung', korrekt: true },
            { id: 'd', text: 'Der Geschäftsbericht', korrekt: false },
          ],
          erklaerung: 'Die Gewinn- und Verlustrechnung (GuV) zeigt die Einnahmen und Ausgaben eines Unternehmens über einen bestimmten Zeitraum.',
        },
        {
          id: 'b3q5',
          frage: 'Was deutet ein niedriges KGV im Branchenvergleich an?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Das Unternehmen ist hochverschuldet', korrekt: false },
            { id: 'b', text: 'Die Aktie könnte unterbewertet sein', korrekt: true },
            { id: 'c', text: 'Das Unternehmen zahlt hohe Dividenden', korrekt: false },
            { id: 'd', text: 'Die Aktie ist sehr volatil', korrekt: false },
          ],
          erklaerung: 'Ein niedriges KGV im Vergleich zur Branche kann darauf hindeuten, dass die Aktie unterbewertet ist — der Markt bewertet den Gewinn des Unternehmens geringer als bei Wettbewerbern.',
        },
      ],
    },
    {
      id: 'kap4',
      titel: 'Dein erstes Portfolio',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Ein Portfolio ist die Gesamtheit deiner Investitionen. Der Schlüssel zu einem erfolgreichen Portfolio liegt in der Diversifikation — also der Verteilung deines Kapitals auf verschiedene Anlageklassen, Branchen und Regionen.',
          },
          {
            typ: 'merke',
            inhalt: 'Diversifikation reduziert das Risiko: Verluste in einem Bereich können durch Gewinne in anderen Bereichen ausgeglichen werden. Setze nie alles auf eine Karte!',
          },
          {
            typ: 'text',
            inhalt: 'Für Einsteiger empfiehlt sich ein Kern-Satelliten-Ansatz: 70-80% deines Portfolios bilden den stabilen Kern (z.B. breit gestreute ETFs), während 20-30% als Satelliten in einzelne Aktien oder Sektoren investiert werden.',
          },
        ],
      },
      quiz: [
        {
          id: 'b4q1',
          frage: 'Was ist ein Vorteil von Diversifikation?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Garantierte Rendite', korrekt: false },
            { id: 'b', text: 'Risikoreduktion im Portfolio', korrekt: true },
            { id: 'c', text: 'Steuerliche Vorteile', korrekt: false },
            { id: 'd', text: 'Höhere Liquidität', korrekt: false },
          ],
          erklaerung: 'Diversifikation reduziert das unsystematische Risiko, indem Verluste einzelner Positionen durch Gewinne anderer ausgeglichen werden können.',
        },
        {
          id: 'b4q2',
          frage: 'Wie viel Prozent sollte laut Kern-Satelliten-Ansatz der stabile Kern ausmachen?',
          medien: null,
          antworten: [
            { id: 'a', text: '20-30%', korrekt: false },
            { id: 'b', text: '50%', korrekt: false },
            { id: 'c', text: '70-80%', korrekt: true },
            { id: 'd', text: '100%', korrekt: false },
          ],
          erklaerung: 'Beim Kern-Satelliten-Ansatz bilden 70-80% des Portfolios den stabilen Kern (z.B. ETFs). Die restlichen 20-30% werden in einzelne Aktien oder Sektoren investiert.',
        },
        {
          id: 'b4q3',
          frage: 'Was eignet sich am besten als Kern-Investment für Einsteiger?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Einzelne Growth-Aktien', korrekt: false },
            { id: 'b', text: 'Breit gestreute ETFs', korrekt: true },
            { id: 'c', text: 'Kryptowährungen', korrekt: false },
            { id: 'd', text: 'Aktienoptionen', korrekt: false },
          ],
          erklaerung: 'Breit gestreute ETFs bilden ganze Märkte ab und bieten damit automatische Diversifikation bei niedrigen Kosten — ideal als Kern-Investment.',
        },
        {
          id: 'b4q4',
          frage: 'Was bedeutet "Setze nie alles auf eine Karte"?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Man sollte nie in Aktien investieren', korrekt: false },
            { id: 'b', text: 'Man sollte sein Kapital auf verschiedene Investments verteilen', korrekt: true },
            { id: 'c', text: 'Man sollte nur einen Broker nutzen', korrekt: false },
            { id: 'd', text: 'Man sollte nur in eine Branche investieren', korrekt: false },
          ],
          erklaerung: 'Das Sprichwort beschreibt das Prinzip der Diversifikation: Verteile dein Kapital auf verschiedene Anlagen, um das Risiko zu streuen.',
        },
        {
          id: 'b4q5',
          frage: 'Welches Risiko kann durch Diversifikation NICHT reduziert werden?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Branchenrisiko', korrekt: false },
            { id: 'b', text: 'Unternehmensrisiko', korrekt: false },
            { id: 'c', text: 'Systematisches Marktrisiko', korrekt: true },
            { id: 'd', text: 'Länderrisiko', korrekt: false },
          ],
          erklaerung: 'Systematisches Risiko (z.B. globale Wirtschaftskrisen) betrifft den gesamten Markt und kann nicht durch Diversifikation eliminiert werden — nur unsystematische Risiken lassen sich streuen.',
        },
      ],
    },
    {
      id: 'kap5',
      titel: 'Kennzahlen verstehen',
      goldTitel: true,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Finanzkennzahlen sind das Werkzeug des Investors. Sie helfen dir, Unternehmen objektiv zu bewerten und miteinander zu vergleichen. Die wichtigsten Kennzahlen sind KGV, KBV, Dividendenrendite und Eigenkapitalrendite.',
          },
          {
            typ: 'merke',
            inhalt: 'KGV = Aktienkurs / Gewinn pro Aktie. KBV = Aktienkurs / Buchwert pro Aktie. Dividendenrendite = Dividende / Aktienkurs × 100.',
          },
          {
            typ: 'text',
            inhalt: 'Kennzahlen sind nie isoliert zu betrachten. Ein KGV von 15 kann in der Tech-Branche günstig sein, während es im Versorgungssektor teuer wäre. Vergleiche Kennzahlen immer mit dem Branchendurchschnitt und der historischen Bewertung des Unternehmens.',
          },
        ],
      },
      quiz: [
        {
          id: 'b5q1',
          frage: 'Wie berechnet man das KGV?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Gewinn / Aktienkurs', korrekt: false },
            { id: 'b', text: 'Aktienkurs / Gewinn pro Aktie', korrekt: true },
            { id: 'c', text: 'Dividende / Aktienkurs', korrekt: false },
            { id: 'd', text: 'Aktienkurs / Buchwert', korrekt: false },
          ],
          erklaerung: 'Das KGV (Kurs-Gewinn-Verhältnis) berechnet sich als Aktienkurs geteilt durch den Gewinn pro Aktie. Es zeigt, das Wievielfache des Gewinns du für die Aktie bezahlst.',
        },
        {
          id: 'b5q2',
          frage: 'Warum sollte man Kennzahlen nie isoliert betrachten?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil Kennzahlen immer falsch sind', korrekt: false },
            { id: 'b', text: 'Weil verschiedene Branchen unterschiedliche Bewertungsniveaus haben', korrekt: true },
            { id: 'c', text: 'Weil nur der Aktienkurs zählt', korrekt: false },
            { id: 'd', text: 'Weil Kennzahlen gesetzlich reguliert sind', korrekt: false },
          ],
          erklaerung: 'Verschiedene Branchen haben typischerweise unterschiedliche Bewertungsniveaus. Ein KGV von 25 ist in der Tech-Branche normal, im Bankensektor wäre es hoch.',
        },
        {
          id: 'b5q3',
          frage: 'Was misst die Dividendenrendite?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Den Gewinn pro Aktie', korrekt: false },
            { id: 'b', text: 'Das Verhältnis von Dividende zum Aktienkurs', korrekt: true },
            { id: 'c', text: 'Die Schulden des Unternehmens', korrekt: false },
            { id: 'd', text: 'Die Kursveränderung pro Jahr', korrekt: false },
          ],
          erklaerung: 'Die Dividendenrendite zeigt, wie viel Prozent des Aktienkurses als Dividende ausgeschüttet werden: Dividende / Aktienkurs × 100.',
        },
        {
          id: 'b5q4',
          frage: 'Was zeigt das KBV (Kurs-Buchwert-Verhältnis)?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Das Verhältnis von Aktienkurs zum Buchwert pro Aktie', korrekt: true },
            { id: 'b', text: 'Die jährliche Kursrendite', korrekt: false },
            { id: 'c', text: 'Den Verschuldungsgrad', korrekt: false },
            { id: 'd', text: 'Die Marktkapitalisierung', korrekt: false },
          ],
          erklaerung: 'Das KBV setzt den Aktienkurs ins Verhältnis zum Buchwert pro Aktie. Ein KBV unter 1 bedeutet, dass die Aktie unter ihrem Buchwert notiert.',
        },
        {
          id: 'b5q5',
          frage: 'Ein Unternehmen hat einen Kurs von 50€ und einen Gewinn pro Aktie von 5€. Wie hoch ist das KGV?',
          medien: null,
          antworten: [
            { id: 'a', text: '5', korrekt: false },
            { id: 'b', text: '10', korrekt: true },
            { id: 'c', text: '25', korrekt: false },
            { id: 'd', text: '250', korrekt: false },
          ],
          erklaerung: 'KGV = Aktienkurs / Gewinn pro Aktie = 50€ / 5€ = 10. Du bezahlst also das 10-Fache des jährlichen Gewinns für diese Aktie.',
        },
      ],
    },
    {
      id: 'kap6',
      titel: 'Typische Anfängerfehler',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Die größten Fehler beim Investieren sind emotionale Entscheidungen. Viele Anfänger kaufen aus Gier, wenn Kurse steigen (FOMO), und verkaufen aus Angst, wenn Kurse fallen. Dieses Verhalten führt dazu, dass man teuer kauft und billig verkauft — das Gegenteil einer erfolgreichen Strategie.',
          },
          {
            typ: 'merke',
            inhalt: 'Die drei häufigsten Anfängerfehler: 1. Emotionales Handeln (Panikverkäufe, FOMO-Käufe), 2. Market Timing (den perfekten Ein-/Ausstieg finden wollen), 3. Overtrading (zu häufiges Kaufen/Verkaufen).',
          },
          {
            typ: 'text',
            inhalt: 'Erfolgreiche Investoren haben einen Plan und halten sich daran. Sie investieren regelmäßig (z.B. monatlich per Sparplan), diversifizieren breit und denken langfristig. Zeit im Markt schlägt fast immer das Timing des Marktes.',
          },
        ],
      },
      quiz: [
        {
          id: 'b6q1',
          frage: 'Was bedeutet FOMO im Investmentkontext?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Eine technische Analysemethode', korrekt: false },
            { id: 'b', text: 'Fear of Missing Out — die Angst, eine Chance zu verpassen', korrekt: true },
            { id: 'c', text: 'Ein Ordertyp an der Börse', korrekt: false },
            { id: 'd', text: 'Ein Maß für Marktvolatilität', korrekt: false },
          ],
          erklaerung: 'FOMO (Fear of Missing Out) beschreibt die Angst, eine Chance zu verpassen, und führt oft dazu, dass Anleger in steigende Kurse hinein kaufen — oft zu Höchstpreisen.',
        },
        {
          id: 'b6q2',
          frage: 'Warum ist Market Timing problematisch?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil es illegal ist', korrekt: false },
            { id: 'b', text: 'Weil es hohe Gebühren verursacht', korrekt: false },
            { id: 'c', text: 'Weil es nahezu unmöglich ist, den perfekten Ein- und Ausstiegspunkt zu finden', korrekt: true },
            { id: 'd', text: 'Weil es nur für institutionelle Investoren erlaubt ist', korrekt: false },
          ],
          erklaerung: 'Studien zeigen, dass selbst professionelle Fondsmanager den Markt selten dauerhaft timen können. Zeit im Markt ist fast immer besser als Timing des Marktes.',
        },
        {
          id: 'b6q3',
          frage: 'Was ist Overtrading?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Zu wenig handeln', korrekt: false },
            { id: 'b', text: 'Zu häufiges Kaufen und Verkaufen', korrekt: true },
            { id: 'c', text: 'Nur an einem Handelsplatz handeln', korrekt: false },
            { id: 'd', text: 'Zu große Positionen eingehen', korrekt: false },
          ],
          erklaerung: 'Overtrading bedeutet zu häufiges Handeln. Jede Transaktion verursacht Kosten (Gebühren, Spread) und emotionale Entscheidungen, die die Rendite schmälern.',
        },
        {
          id: 'b6q4',
          frage: 'Welche Strategie empfiehlt sich für Einsteiger?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Tägliches aktives Trading', korrekt: false },
            { id: 'b', text: 'Alles auf eine vielversprechende Aktie setzen', korrekt: false },
            { id: 'c', text: 'Regelmäßig per Sparplan investieren und langfristig denken', korrekt: true },
            { id: 'd', text: 'Nur in Krisenzeiten kaufen', korrekt: false },
          ],
          erklaerung: 'Regelmäßiges Investieren per Sparplan (Cost-Average-Effekt) und langfristiges Denken sind bewährte Strategien für Einsteiger.',
        },
        {
          id: 'b6q5',
          frage: 'Was schlägt historisch fast immer das Timing des Marktes?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Leerverkäufe', korrekt: false },
            { id: 'b', text: 'Optionsstrategien', korrekt: false },
            { id: 'c', text: 'Zeit im Markt', korrekt: true },
            { id: 'd', text: 'Daytrading', korrekt: false },
          ],
          erklaerung: '"Time in the market beats timing the market" — langfristig investiert zu bleiben bringt historisch bessere Ergebnisse als der Versuch, die besten Ein- und Ausstiegszeitpunkte zu finden.',
        },
      ],
    },
  ],
};

const growthInvesting: Kurs = {
  id: 'growth',
  titel: 'Investmentstrategie: Growth Investing',
  beschreibung: 'Lerne, wie du Wachstumsaktien erkennst, bewertest und ein Growth-Portfolio aufbaust.',
  icon: 'G',
  freigeschaltet: true,
  kapitel: [
    {
      id: 'kap1',
      titel: 'Was ist Growth Investing?',
      goldTitel: true,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Growth Investing ist eine Investmentstrategie, die auf Unternehmen mit überdurchschnittlichem Wachstumspotenzial setzt. Growth-Investoren suchen Unternehmen, die ihre Umsätze und Gewinne schneller steigern als der Gesamtmarkt.',
          },
          {
            typ: 'merke',
            inhalt: 'Growth-Aktien zeichnen sich aus durch: hohes Umsatzwachstum (>20% p.a.), expandierende Märkte, innovative Produkte und oft hohe Bewertungen (hohes KGV).',
          },
          {
            typ: 'text',
            inhalt: 'Im Gegensatz zu Value Investing, das nach unterbewerteten Aktien sucht, akzeptiert Growth Investing höhere Bewertungen — in der Erwartung, dass das Unternehmenswachstum die Bewertung rechtfertigt.',
          },
        ],
      },
      quiz: [
        {
          id: 'g1q1',
          frage: 'Was zeichnet Growth-Aktien typischerweise aus?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Niedrige Bewertung und hohe Dividende', korrekt: false },
            { id: 'b', text: 'Hohes Umsatzwachstum und oft hohe Bewertungen', korrekt: true },
            { id: 'c', text: 'Stabiler Kurs ohne große Schwankungen', korrekt: false },
            { id: 'd', text: 'Hohe Verschuldung', korrekt: false },
          ],
          erklaerung: 'Growth-Aktien wachsen überdurchschnittlich schnell und werden deshalb oft mit einem Premium (hohes KGV) bewertet.',
        },
        {
          id: 'g1q2',
          frage: 'Wie unterscheidet sich Growth Investing von Value Investing?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Growth Investing ist weniger riskant', korrekt: false },
            { id: 'b', text: 'Growth akzeptiert höhere Bewertungen für höheres Wachstum', korrekt: true },
            { id: 'c', text: 'Value Investing fokussiert auf Technologie-Aktien', korrekt: false },
            { id: 'd', text: 'Es gibt keinen Unterschied', korrekt: false },
          ],
          erklaerung: 'Growth Investing zahlt höhere Preise für Aktien mit starkem Wachstumspotenzial, während Value Investing nach unterbewerteten Schnäppchen sucht.',
        },
        {
          id: 'g1q3',
          frage: 'Ab welcher Wachstumsrate spricht man typischerweise von einer Growth-Aktie?',
          medien: null,
          antworten: [
            { id: 'a', text: '5% pro Jahr', korrekt: false },
            { id: 'b', text: '10% pro Jahr', korrekt: false },
            { id: 'c', text: 'Über 20% pro Jahr', korrekt: true },
            { id: 'd', text: 'Über 50% pro Jahr', korrekt: false },
          ],
          erklaerung: 'Growth-Aktien weisen typischerweise ein Umsatzwachstum von über 20% pro Jahr auf — deutlich über dem Marktdurchschnitt.',
        },
        {
          id: 'g1q4',
          frage: 'Warum haben Growth-Aktien oft ein hohes KGV?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil sie überschuldet sind', korrekt: false },
            { id: 'b', text: 'Weil der Markt zukünftiges Wachstum einpreist', korrekt: true },
            { id: 'c', text: 'Weil sie hohe Dividenden zahlen', korrekt: false },
            { id: 'd', text: 'Weil es ein Berechnungsfehler ist', korrekt: false },
          ],
          erklaerung: 'Der Markt bewertet Growth-Aktien höher, weil Investoren erwarten, dass die zukünftigen Gewinne das aktuelle Bewertungsniveau rechtfertigen werden.',
        },
        {
          id: 'g1q5',
          frage: 'Was ist KEIN typisches Merkmal einer Growth-Aktie?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Hohe Dividendenausschüttung', korrekt: true },
            { id: 'b', text: 'Innovative Produkte', korrekt: false },
            { id: 'c', text: 'Expandierender Markt', korrekt: false },
            { id: 'd', text: 'Steigende Umsätze', korrekt: false },
          ],
          erklaerung: 'Growth-Unternehmen reinvestieren ihre Gewinne typischerweise in weiteres Wachstum statt Dividenden auszuschütten.',
        },
      ],
    },
    {
      id: 'kap2',
      titel: 'Wachstumsaktien erkennen',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Um Wachstumsaktien zu identifizieren, analysierst du drei Schlüsselbereiche: Umsatzwachstum, Margen und den Total Addressable Market (TAM). Ein Unternehmen braucht alle drei Faktoren, um langfristig erfolgreich zu wachsen.',
          },
          {
            typ: 'merke',
            inhalt: 'TAM (Total Addressable Market) = die gesamte Marktgröße, die ein Unternehmen adressieren kann. Je größer der TAM, desto mehr Wachstumspotenzial.',
          },
          {
            typ: 'text',
            inhalt: 'Achte auf steigende Bruttomargen — sie zeigen, dass das Unternehmen Skaleneffekte nutzt. Eine steigende Marge bei gleichzeitig steigendem Umsatz ist das stärkste Signal für eine gute Growth-Aktie.',
          },
        ],
      },
      quiz: [
        {
          id: 'g2q1',
          frage: 'Was bedeutet TAM?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Total Annual Margin', korrekt: false },
            { id: 'b', text: 'Total Addressable Market', korrekt: true },
            { id: 'c', text: 'Technical Analysis Method', korrekt: false },
            { id: 'd', text: 'Trading Activity Metric', korrekt: false },
          ],
          erklaerung: 'TAM (Total Addressable Market) beschreibt die gesamte Marktgröße, die ein Unternehmen theoretisch adressieren kann.',
        },
        {
          id: 'g2q2',
          frage: 'Was ist das stärkste Wachstumssignal?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Steigende Schulden bei sinkendem Umsatz', korrekt: false },
            { id: 'b', text: 'Steigende Margen bei gleichzeitig steigendem Umsatz', korrekt: true },
            { id: 'c', text: 'Sinkende Preise bei steigendem Volumen', korrekt: false },
            { id: 'd', text: 'Steigende Dividenden', korrekt: false },
          ],
          erklaerung: 'Wenn ein Unternehmen gleichzeitig Umsatz und Margen steigern kann, zeigt es, dass es Skaleneffekte nutzt und profitabel wächst.',
        },
        {
          id: 'g2q3',
          frage: 'Welche drei Schlüsselbereiche analysiert man bei Growth-Aktien?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Dividende, Schulden, Mitarbeiterzahl', korrekt: false },
            { id: 'b', text: 'Umsatzwachstum, Margen, TAM', korrekt: true },
            { id: 'c', text: 'KGV, KBV, Dividendenrendite', korrekt: false },
            { id: 'd', text: 'Aktienkurs, Volumen, Volatilität', korrekt: false },
          ],
          erklaerung: 'Die drei Kernbereiche der Growth-Analyse sind Umsatzwachstum (wie schnell wächst das Unternehmen?), Margen (wie profitabel?) und TAM (wie groß ist die Chance?).',
        },
        {
          id: 'g2q4',
          frage: 'Was zeigen steigende Bruttomargen?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Das Unternehmen spart bei den Mitarbeitern', korrekt: false },
            { id: 'b', text: 'Das Unternehmen nutzt Skaleneffekte', korrekt: true },
            { id: 'c', text: 'Das Unternehmen erhöht die Preise willkürlich', korrekt: false },
            { id: 'd', text: 'Das Unternehmen senkt die Qualität', korrekt: false },
          ],
          erklaerung: 'Steigende Bruttomargen deuten auf Skaleneffekte hin — das Unternehmen kann pro verkaufter Einheit mehr Gewinn erzielen, je größer es wird.',
        },
        {
          id: 'g2q5',
          frage: 'Warum ist ein großer TAM wichtig für Growth-Aktien?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil er die Dividende bestimmt', korrekt: false },
            { id: 'b', text: 'Weil er das maximale Wachstumspotenzial definiert', korrekt: true },
            { id: 'c', text: 'Weil er den Aktienkurs festlegt', korrekt: false },
            { id: 'd', text: 'Weil er steuerliche Vorteile bringt', korrekt: false },
          ],
          erklaerung: 'Ein großer TAM bedeutet, dass das Unternehmen noch viel Raum zum Wachsen hat. Ein Unternehmen mit 1% Marktanteil in einem riesigen Markt hat mehr Potenzial als eines mit 80% in einem kleinen.',
        },
      ],
    },
    {
      id: 'kap3',
      titel: 'Bewertung von Growth-Aktien',
      goldTitel: true,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Growth-Aktien sind mit klassischen Kennzahlen wie dem KGV schwer zu bewerten. Stattdessen nutzen Growth-Investoren spezielle Metriken: die PEG-Ratio und die Rule of 40.',
          },
          {
            typ: 'merke',
            inhalt: 'PEG-Ratio = KGV / erwartetes Gewinnwachstum. Eine PEG unter 1 deutet auf Unterbewertung hin. Rule of 40: Umsatzwachstum + Gewinnmarge sollte > 40% sein.',
          },
          {
            typ: 'text',
            inhalt: 'Die Rule of 40 ist besonders bei SaaS-Unternehmen beliebt. Ein Unternehmen mit 30% Wachstum und 15% Marge erreicht 45% — das gilt als gesund. Umgekehrt signalisiert ein Wert unter 40%, dass das Unternehmen entweder zu langsam wächst oder nicht profitabel genug ist.',
          },
        ],
      },
      quiz: [
        {
          id: 'g3q1',
          frage: 'Wie berechnet man die PEG-Ratio?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Aktienkurs / Gewinn pro Aktie', korrekt: false },
            { id: 'b', text: 'KGV / erwartetes Gewinnwachstum', korrekt: true },
            { id: 'c', text: 'Umsatzwachstum + Gewinnmarge', korrekt: false },
            { id: 'd', text: 'Dividende / Aktienkurs', korrekt: false },
          ],
          erklaerung: 'Die PEG-Ratio (Price/Earnings to Growth) teilt das KGV durch das erwartete Gewinnwachstum. Sie berücksichtigt damit das Wachstum bei der Bewertung.',
        },
        {
          id: 'g3q2',
          frage: 'Was besagt die Rule of 40?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Ein Portfolio sollte maximal 40 Aktien enthalten', korrekt: false },
            { id: 'b', text: 'Umsatzwachstum + Gewinnmarge sollte über 40% liegen', korrekt: true },
            { id: 'c', text: 'Man sollte maximal 40% in eine Aktie investieren', korrekt: false },
            { id: 'd', text: 'Das KGV sollte unter 40 liegen', korrekt: false },
          ],
          erklaerung: 'Die Rule of 40 besagt, dass die Summe aus Umsatzwachstumsrate und Gewinnmarge über 40% liegen sollte. Sie balanciert Wachstum gegen Profitabilität.',
        },
        {
          id: 'g3q3',
          frage: 'Eine PEG-Ratio unter 1 deutet auf was hin?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Überbewertung', korrekt: false },
            { id: 'b', text: 'Unterbewertung relativ zum Wachstum', korrekt: true },
            { id: 'c', text: 'Hohe Dividende', korrekt: false },
            { id: 'd', text: 'Sinkende Umsätze', korrekt: false },
          ],
          erklaerung: 'Eine PEG unter 1 bedeutet, dass das KGV niedriger ist als die Wachstumsrate — die Aktie ist relativ zu ihrem Wachstum günstig bewertet.',
        },
        {
          id: 'g3q4',
          frage: 'Ein SaaS-Unternehmen hat 30% Umsatzwachstum und 15% Marge. Erfüllt es die Rule of 40?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Nein, der Wert ist nur 15%', korrekt: false },
            { id: 'b', text: 'Ja, 30% + 15% = 45% > 40%', korrekt: true },
            { id: 'c', text: 'Nein, man muss multiplizieren: 30% × 15% = 4.5%', korrekt: false },
            { id: 'd', text: 'Man kann es nicht berechnen', korrekt: false },
          ],
          erklaerung: 'Die Rule of 40 addiert Umsatzwachstum und Gewinnmarge: 30% + 15% = 45%. Da 45% > 40%, erfüllt das Unternehmen die Rule of 40.',
        },
        {
          id: 'g3q5',
          frage: 'Warum sind klassische Kennzahlen wie das KGV bei Growth-Aktien oft wenig aussagekräftig?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil Growth-Unternehmen keine Bilanzen haben', korrekt: false },
            { id: 'b', text: 'Weil Growth-Unternehmen oft noch wenig oder keine Gewinne machen', korrekt: true },
            { id: 'c', text: 'Weil das KGV nur für deutsche Aktien gilt', korrekt: false },
            { id: 'd', text: 'Weil Growth-Aktien nicht an der Börse gehandelt werden', korrekt: false },
          ],
          erklaerung: 'Viele Growth-Unternehmen reinvestieren ihre Einnahmen in Wachstum und machen daher geringe oder gar keine Gewinne. Das KGV wird dadurch extrem hoch oder nicht berechenbar.',
        },
      ],
    },
    {
      id: 'kap4',
      titel: 'Risikomanagement',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Growth-Aktien sind volatiler als der Gesamtmarkt. Kursrückgänge von 30-50% sind keine Seltenheit — selbst bei erfolgreichen Unternehmen. Gutes Risikomanagement ist daher essentiell.',
          },
          {
            typ: 'merke',
            inhalt: 'Position Sizing: Investiere nie mehr als 5-10% deines Portfolios in eine einzelne Growth-Aktie. Je spekulativer die Aktie, desto kleiner die Position.',
          },
          {
            typ: 'text',
            inhalt: 'Nutze Trailing Stop-Losses, um Gewinne abzusichern. Ein Trailing Stop von 20-25% lässt der Aktie genug Raum für normale Schwankungen, schützt aber vor größeren Verlusten.',
          },
        ],
      },
      quiz: [
        {
          id: 'g4q1',
          frage: 'Wie viel Prozent des Portfolios sollte maximal in eine einzelne Growth-Aktie fließen?',
          medien: null,
          antworten: [
            { id: 'a', text: '1-2%', korrekt: false },
            { id: 'b', text: '5-10%', korrekt: true },
            { id: 'c', text: '20-30%', korrekt: false },
            { id: 'd', text: '50%', korrekt: false },
          ],
          erklaerung: 'Bei Growth-Aktien empfiehlt sich eine Position von 5-10% des Gesamtportfolios. Bei besonders spekulativen Titeln eher am unteren Ende.',
        },
        {
          id: 'g4q2',
          frage: 'Was ist ein Trailing Stop-Loss?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Ein automatischer Verkauf bei einem festen Kurs', korrekt: false },
            { id: 'b', text: 'Ein Verkaufsauftrag, der sich mit steigendem Kurs nach oben anpasst', korrekt: true },
            { id: 'c', text: 'Ein Kaufauftrag bei fallendem Kurs', korrekt: false },
            { id: 'd', text: 'Eine Versicherung gegen Kursverluste', korrekt: false },
          ],
          erklaerung: 'Ein Trailing Stop-Loss bewegt sich automatisch mit dem Kurs nach oben. Fällt der Kurs um den definierten Prozentsatz vom Höchststand, wird verkauft.',
        },
        {
          id: 'g4q3',
          frage: 'Welcher Trailing Stop-Wert ist für Growth-Aktien sinnvoll?',
          medien: null,
          antworten: [
            { id: 'a', text: '2-5%', korrekt: false },
            { id: 'b', text: '5-10%', korrekt: false },
            { id: 'c', text: '20-25%', korrekt: true },
            { id: 'd', text: '50%', korrekt: false },
          ],
          erklaerung: 'Growth-Aktien sind volatil — ein zu enger Stop wird ständig ausgelöst. 20-25% gibt genug Raum für normale Schwankungen.',
        },
        {
          id: 'g4q4',
          frage: 'Was ist bei Growth-Aktien normal?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Kursrückgänge von maximal 5%', korrekt: false },
            { id: 'b', text: 'Kursrückgänge von 30-50% auch bei guten Unternehmen', korrekt: true },
            { id: 'c', text: 'Stabile Kurse ohne große Schwankungen', korrekt: false },
            { id: 'd', text: 'Ständig steigende Kurse', korrekt: false },
          ],
          erklaerung: 'Selbst erfolgreiche Growth-Aktien erleben regelmäßig Kursrückgänge von 30-50%. Das gehört zur Natur von Wachstumsinvestments.',
        },
        {
          id: 'g4q5',
          frage: 'Was bedeutet Position Sizing?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Die Anzahl der Aktien im Portfolio', korrekt: false },
            { id: 'b', text: 'Die Festlegung, wie viel Kapital in eine einzelne Position investiert wird', korrekt: true },
            { id: 'c', text: 'Die Größe des Gesamtportfolios', korrekt: false },
            { id: 'd', text: 'Die Marktkapitalisierung der Aktie', korrekt: false },
          ],
          erklaerung: 'Position Sizing bestimmt, welchen Anteil deines Portfolios du in eine einzelne Position investierst. Es ist ein zentrales Werkzeug des Risikomanagements.',
        },
      ],
    },
    {
      id: 'kap5',
      titel: 'Portfolio-Aufbau',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Ein gut diversifiziertes Growth-Portfolio sollte 10-15 Aktien aus verschiedenen Sektoren enthalten. Konzentriere dich auf 3-4 Kernpositionen (je 8-10%) und ergänze mit kleineren Satelliten-Positionen (je 3-5%).',
          },
          {
            typ: 'merke',
            inhalt: 'Rebalancing: Überprüfe dein Portfolio vierteljährlich. Wenn eine Position durch Kursgewinne zu groß wird (>15%), verkaufe einen Teil und verteile das Kapital neu.',
          },
          {
            typ: 'text',
            inhalt: 'Verteile dein Portfolio auf verschiedene Wachstumssektoren: Technologie, Healthcare, erneuerbare Energien, E-Commerce. So bist du nicht von einem einzigen Sektor abhängig und profitierst von verschiedenen Megatrends.',
          },
        ],
      },
      quiz: [
        {
          id: 'g5q1',
          frage: 'Wie viele Aktien sollte ein Growth-Portfolio typischerweise enthalten?',
          medien: null,
          antworten: [
            { id: 'a', text: '2-3', korrekt: false },
            { id: 'b', text: '10-15', korrekt: true },
            { id: 'c', text: '50-100', korrekt: false },
            { id: 'd', text: 'Nur 1 Aktie', korrekt: false },
          ],
          erklaerung: 'Ein Growth-Portfolio mit 10-15 Aktien bietet genug Diversifikation bei gleichzeitiger Konzentration auf die besten Ideen.',
        },
        {
          id: 'g5q2',
          frage: 'Wann sollte man Rebalancing durchführen?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Täglich', korrekt: false },
            { id: 'b', text: 'Vierteljährlich', korrekt: true },
            { id: 'c', text: 'Nur bei Kursverlusten', korrekt: false },
            { id: 'd', text: 'Nie — einmal kaufen und halten', korrekt: false },
          ],
          erklaerung: 'Vierteljährliches Rebalancing hält die Portfolio-Gewichtung im Gleichgewicht, ohne zu häufig zu handeln.',
        },
        {
          id: 'g5q3',
          frage: 'Was sollte man tun, wenn eine Position über 15% des Portfolios wächst?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Nachkaufen, der Trend ist positiv', korrekt: false },
            { id: 'b', text: 'Einen Teil verkaufen und das Kapital neu verteilen', korrekt: true },
            { id: 'c', text: 'Nichts, Gewinner laufen lassen', korrekt: false },
            { id: 'd', text: 'Alles verkaufen', korrekt: false },
          ],
          erklaerung: 'Eine zu große Einzelposition erhöht das Klumpenrisiko. Durch teilweises Verkaufen und Umverteilen hältst du dein Risiko im Griff.',
        },
        {
          id: 'g5q4',
          frage: 'Wie groß sollten Kernpositionen im Growth-Portfolio sein?',
          medien: null,
          antworten: [
            { id: 'a', text: '1-2%', korrekt: false },
            { id: 'b', text: '3-5%', korrekt: false },
            { id: 'c', text: '8-10%', korrekt: true },
            { id: 'd', text: '20-25%', korrekt: false },
          ],
          erklaerung: 'Kernpositionen (3-4 Stück) sollten je 8-10% des Portfolios ausmachen. Sie bilden das Fundament deines Growth-Portfolios.',
        },
        {
          id: 'g5q5',
          frage: 'Warum sollte man in verschiedene Wachstumssektoren investieren?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil es steuerliche Vorteile bringt', korrekt: false },
            { id: 'b', text: 'Um nicht von einem einzigen Sektor abhängig zu sein', korrekt: true },
            { id: 'c', text: 'Weil alle Sektoren gleich stark wachsen', korrekt: false },
            { id: 'd', text: 'Weil es gesetzlich vorgeschrieben ist', korrekt: false },
          ],
          erklaerung: 'Sektordiversifikation schützt dein Portfolio, wenn ein einzelner Sektor schwächelt. Verschiedene Megatrends entwickeln sich unterschiedlich.',
        },
      ],
    },
  ],
};

const valueInvesting: Kurs = {
  id: 'value',
  titel: 'Investmentstrategie: Value Investing',
  beschreibung: 'Lerne die Philosophie von Warren Buffett — wie du unterbewertete Aktien findest und langfristig Vermögen aufbaust.',
  icon: 'V',
  freigeschaltet: false,
  kapitel: [
    {
      id: 'kap1',
      titel: 'Die Philosophie von Value Investing',
      goldTitel: true,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap2',
      titel: 'Innerer Wert berechnen',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap3',
      titel: 'Margin of Safety',
      goldTitel: true,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap4',
      titel: 'Bilanzanalyse für Value-Investoren',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap5',
      titel: 'Contrarian Investing',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap6',
      titel: 'Langfristiger Vermögensaufbau',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
  ],
};

const aktienoptionen: Kurs = {
  id: 'optionen',
  titel: 'Aktienoptionen',
  beschreibung: 'Verstehe Calls, Puts und Optionsstrategien — und wie du Optionen zur Portfolio-Absicherung einsetzen kannst.',
  icon: 'O',
  freigeschaltet: false,
  kapitel: [
    {
      id: 'kap1',
      titel: 'Was sind Optionen?',
      goldTitel: true,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap2',
      titel: 'Calls und Puts verstehen',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap3',
      titel: 'Grundlegende Optionsstrategien',
      goldTitel: true,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap4',
      titel: 'Covered Calls & Protective Puts',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap5',
      titel: 'Risikomanagement mit Optionen',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
  ],
};

export const kurse: Kurs[] = [basiskurs, growthInvesting, valueInvesting, aktienoptionen];

export function getKursById(id: string): Kurs | undefined {
  return kurse.find((k) => k.id === id);
}

export function getKapitel(kursId: string, kapitelId: string): Kapitel | undefined {
  const kurs = getKursById(kursId);
  return kurs?.kapitel.find((k) => k.id === kapitelId);
}
```

- [ ] **Step 5: Verify build**

```bash
cd /home/stef/hessel
npx tsc --noEmit
npm run build
```

Expected: Both commands succeed with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/types.ts src/theme.ts src/data/
git commit -m "feat: add types, theme, course data with quizzes"
```

---

### Task 3: FortschrittContext + localStorage Persistence

**Files:**
- Create: `src/context/FortschrittContext.tsx`

- [ ] **Step 1: Create src/context/FortschrittContext.tsx**

```tsx
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Fortschritt, QuizErgebnis } from '../types';
import { kurse } from '../data/kurse';
import { badges } from '../data/badges';

const STORAGE_KEY = 'mh-academy-progress';

const defaultFortschritt: Fortschritt = {
  kapitelAbgeschlossen: [],
  quizErgebnisse: {},
  badges: [],
};

function loadFortschritt(): Fortschritt {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultFortschritt;
  try {
    return JSON.parse(stored) as Fortschritt;
  } catch {
    return defaultFortschritt;
  }
}

interface FortschrittContextValue {
  fortschritt: Fortschritt;
  kapitelAbschliessen: (kursId: string, kapitelId: string, ergebnis: QuizErgebnis) => void;
  istKapitelAbgeschlossen: (kursId: string, kapitelId: string) => boolean;
  getQuizErgebnis: (kursId: string, kapitelId: string) => QuizErgebnis | null;
  getKursFortschritt: (kursId: string) => { abgeschlossen: number; gesamt: number };
  hatBadge: (badgeId: string) => boolean;
  resetFortschritt: () => void;
}

const FortschrittContext = createContext<FortschrittContextValue | null>(null);

export function FortschrittProvider({ children }: { children: ReactNode }) {
  const [fortschritt, setFortschritt] = useState<Fortschritt>(loadFortschritt);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fortschritt));
  }, [fortschritt]);

  const istKapitelAbgeschlossen = useCallback(
    (kursId: string, kapitelId: string) => {
      return fortschritt.kapitelAbgeschlossen.includes(`${kursId}/${kapitelId}`);
    },
    [fortschritt.kapitelAbgeschlossen],
  );

  const getQuizErgebnis = useCallback(
    (kursId: string, kapitelId: string): QuizErgebnis | null => {
      return fortschritt.quizErgebnisse[`${kursId}/${kapitelId}`] ?? null;
    },
    [fortschritt.quizErgebnisse],
  );

  const getKursFortschritt = useCallback(
    (kursId: string) => {
      const kurs = kurse.find((k) => k.id === kursId);
      if (!kurs) return { abgeschlossen: 0, gesamt: 0 };
      const gesamt = kurs.kapitel.length;
      const abgeschlossen = kurs.kapitel.filter((kap) =>
        fortschritt.kapitelAbgeschlossen.includes(`${kursId}/${kap.id}`),
      ).length;
      return { abgeschlossen, gesamt };
    },
    [fortschritt.kapitelAbgeschlossen],
  );

  const hatBadge = useCallback(
    (badgeId: string) => {
      return fortschritt.badges.includes(badgeId);
    },
    [fortschritt.badges],
  );

  const kapitelAbschliessen = useCallback(
    (kursId: string, kapitelId: string, ergebnis: QuizErgebnis) => {
      setFortschritt((prev) => {
        const key = `${kursId}/${kapitelId}`;
        const kapitelAbgeschlossen = prev.kapitelAbgeschlossen.includes(key)
          ? prev.kapitelAbgeschlossen
          : [...prev.kapitelAbgeschlossen, key];
        const quizErgebnisse = { ...prev.quizErgebnisse, [key]: ergebnis };

        const kurs = kurse.find((k) => k.id === kursId);
        let newBadges = [...prev.badges];
        if (kurs) {
          const alleAbgeschlossen = kurs.kapitel.every((kap) =>
            kapitelAbgeschlossen.includes(`${kursId}/${kap.id}`),
          );
          if (alleAbgeschlossen) {
            const badge = badges.find((b) => b.kursId === kursId);
            if (badge && !newBadges.includes(badge.id)) {
              newBadges = [...newBadges, badge.id];
            }
          }
        }

        return { kapitelAbgeschlossen, quizErgebnisse, badges: newBadges };
      });
    },
    [],
  );

  const resetFortschritt = useCallback(() => {
    setFortschritt(defaultFortschritt);
  }, []);

  return (
    <FortschrittContext.Provider
      value={{
        fortschritt,
        kapitelAbschliessen,
        istKapitelAbgeschlossen,
        getQuizErgebnis,
        getKursFortschritt,
        hatBadge,
        resetFortschritt,
      }}
    >
      {children}
    </FortschrittContext.Provider>
  );
}

export function useFortschritt(): FortschrittContextValue {
  const context = useContext(FortschrittContext);
  if (!context) {
    throw new Error('useFortschritt must be used within a FortschrittProvider');
  }
  return context;
}
```

- [ ] **Step 2: Verify build**

```bash
cd /home/stef/hessel
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/context/
git commit -m "feat: add FortschrittContext with localStorage persistence"
```

---

### Task 4: Layout Component (Header with Logo + Avatar)

**Files:**
- Create: `src/components/Layout.tsx`
- Modify: `src/App.tsx` — add Router, ThemeProvider, FortschrittProvider, Layout

- [ ] **Step 1: Create src/components/Layout.tsx**

```tsx
import { useState, ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" sx={{ bgcolor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Box
            component="img"
            src="https://framerusercontent.com/images/pjfDzLsbBdOPWoOq6AS7gA6bhuE.svg?width=180&height=32"
            alt="MH Investment Academy"
            sx={{ height: 24, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 36,
              height: 36,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            MM
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                navigate('/profil');
              }}
            >
              <Typography variant="body2">Profil</Typography>
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Typography variant="body2" color="text.secondary">
                Abmelden
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ py: 3, px: { xs: 2, sm: 3 } }} disableGutters>
        {children}
      </Container>
    </Box>
  );
}
```

- [ ] **Step 2: Rewrite src/App.tsx with routing**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { FortschrittProvider } from './context/FortschrittContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import KursAnsicht from './pages/KursAnsicht';
import Lernansicht from './pages/Lernansicht';
import QuizSeite from './pages/QuizSeite';
import Profil from './pages/Profil';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FortschrittProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/kurs/:kursId" element={<KursAnsicht />} />
              <Route path="/kurs/:kursId/kapitel/:kapitelId" element={<Lernansicht />} />
              <Route path="/kurs/:kursId/kapitel/:kapitelId/quiz" element={<QuizSeite />} />
              <Route path="/profil" element={<Profil />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </FortschrittProvider>
    </ThemeProvider>
  );
}
```

- [ ] **Step 3: Create placeholder pages so the build succeeds**

Create `src/pages/Dashboard.tsx`:

```tsx
import { Typography } from '@mui/material';

export default function Dashboard() {
  return <Typography>Dashboard</Typography>;
}
```

Create `src/pages/KursAnsicht.tsx`:

```tsx
import { Typography } from '@mui/material';

export default function KursAnsicht() {
  return <Typography>Kursansicht</Typography>;
}
```

Create `src/pages/Lernansicht.tsx`:

```tsx
import { Typography } from '@mui/material';

export default function Lernansicht() {
  return <Typography>Lernansicht</Typography>;
}
```

Create `src/pages/QuizSeite.tsx`:

```tsx
import { Typography } from '@mui/material';

export default function QuizSeite() {
  return <Typography>Quiz</Typography>;
}
```

Create `src/pages/Profil.tsx`:

```tsx
import { Typography } from '@mui/material';

export default function Profil() {
  return <Typography>Profil</Typography>;
}
```

- [ ] **Step 4: Verify build**

```bash
cd /home/stef/hessel
npx tsc --noEmit && npm run build
```

Expected: Both pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/Layout.tsx src/App.tsx src/pages/
git commit -m "feat: add Layout with header, routing, placeholder pages"
```

---

### Task 5: Dashboard Page (StatBar + KursKarte)

**Files:**
- Create: `src/components/StatBar.tsx`
- Create: `src/components/KursKarte.tsx`
- Create: `src/components/LockedOverlay.tsx`
- Modify: `src/pages/Dashboard.tsx`

- [ ] **Step 1: Create src/components/StatBar.tsx**

```tsx
import { Box, Typography } from '@mui/material';

interface StatItem {
  label: string;
  value: number;
}

interface StatBarProps {
  items: StatItem[];
}

export default function StatBar({ items }: StatBarProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
      {items.map((item) => (
        <Box
          key={item.label}
          sx={{
            flex: 1,
            bgcolor: 'secondary.main',
            borderRadius: 2,
            py: 1.5,
            px: 1,
            textAlign: 'center',
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'warning.main' }}>
            {item.value}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
```

- [ ] **Step 2: Create src/components/KursKarte.tsx**

```tsx
import { Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Kurs } from '../types';

interface KursKarteProps {
  kurs: Kurs;
  abgeschlossen: number;
  gesamt: number;
  onClick: () => void;
}

export default function KursKarte({ kurs, abgeschlossen, gesamt, onClick }: KursKarteProps) {
  const prozent = gesamt > 0 ? Math.round((abgeschlossen / gesamt) * 100) : 0;
  const isLocked = !kurs.freigeschaltet;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2.5,
        mb: 1,
        cursor: 'pointer',
        opacity: isLocked ? 0.5 : 1,
        '&:hover': { borderColor: isLocked ? 'divider' : 'primary.main' },
        transition: 'border-color 0.2s',
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          bgcolor: isLocked ? 'grey.200' : 'secondary.main',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 1.5,
          flexShrink: 0,
        }}
      >
        {isLocked ? (
          <LockIcon sx={{ color: 'grey.500', fontSize: 20 }} />
        ) : (
          <Typography sx={{ color: 'warning.main', fontWeight: 700, fontSize: 16 }}>
            {kurs.icon}
          </Typography>
        )}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: isLocked ? 'grey.500' : 'primary.main' }}>
          {kurs.titel}
        </Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
          {isLocked ? 'Noch nicht freigeschaltet' : `${abgeschlossen}/${gesamt} Kapitel`}
        </Typography>
      </Box>
      {!isLocked && (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '3px solid',
            borderColor: prozent > 0 ? 'warning.main' : 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main' }}>
            {prozent}%
          </Typography>
        </Box>
      )}
    </Box>
  );
}
```

- [ ] **Step 3: Create src/components/LockedOverlay.tsx**

```tsx
import { Dialog, DialogContent, DialogActions, Typography, Button, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Kurs } from '../types';

interface LockedOverlayProps {
  kurs: Kurs;
  open: boolean;
  onClose: () => void;
}

export default function LockedOverlay({ kurs, open, onClose }: LockedOverlayProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ textAlign: 'center', pt: 4 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            bgcolor: 'grey.100',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <LockIcon sx={{ color: 'grey.500', fontSize: 28 }} />
        </Box>
        <Typography variant="h6" gutterBottom>
          {kurs.titel}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {kurs.beschreibung}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
        <Button variant="contained" fullWidth onClick={onClose}>
          Jetzt freischalten
        </Button>
      </DialogActions>
    </Dialog>
  );
}
```

- [ ] **Step 4: Implement src/pages/Dashboard.tsx**

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { kurse } from '../data/kurse';
import { useFortschritt } from '../context/FortschrittContext';
import StatBar from '../components/StatBar';
import KursKarte from '../components/KursKarte';
import LockedOverlay from '../components/LockedOverlay';
import { Kurs } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const { getKursFortschritt, fortschritt } = useFortschritt();
  const [lockedKurs, setLockedKurs] = useState<Kurs | null>(null);

  const aktiveKurse = kurse.filter((k) => k.freigeschaltet).length;
  const kapitelFertig = fortschritt.kapitelAbgeschlossen.length;
  const badgeCount = fortschritt.badges.length;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          Willkommen zurück,
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: 'primary.main' }}>
          Max Mustermann
        </Typography>
      </Box>

      <StatBar
        items={[
          { label: 'Aktive Kurse', value: aktiveKurse },
          { label: 'Kapitel fertig', value: kapitelFertig },
          { label: 'Badges', value: badgeCount },
        ]}
      />

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: 'primary.main',
          textTransform: 'uppercase',
          letterSpacing: 1,
          mb: 1,
        }}
      >
        Meine Kurse
      </Typography>

      {kurse.map((kurs) => {
        const { abgeschlossen, gesamt } = getKursFortschritt(kurs.id);
        return (
          <KursKarte
            key={kurs.id}
            kurs={kurs}
            abgeschlossen={abgeschlossen}
            gesamt={gesamt}
            onClick={() => {
              if (kurs.freigeschaltet) {
                navigate(`/kurs/${kurs.id}`);
              } else {
                setLockedKurs(kurs);
              }
            }}
          />
        );
      })}

      {lockedKurs && (
        <LockedOverlay
          kurs={lockedKurs}
          open={Boolean(lockedKurs)}
          onClose={() => setLockedKurs(null)}
        />
      )}
    </Box>
  );
}
```

- [ ] **Step 5: Verify build**

```bash
cd /home/stef/hessel
npx tsc --noEmit && npm run build
```

Expected: Both pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/StatBar.tsx src/components/KursKarte.tsx src/components/LockedOverlay.tsx src/pages/Dashboard.tsx
git commit -m "feat: implement Dashboard with StatBar, KursKarte, LockedOverlay"
```

---

### Task 6: KursAnsicht Page (KapitelListe)

**Files:**
- Create: `src/components/KapitelListe.tsx`
- Modify: `src/pages/KursAnsicht.tsx`

- [ ] **Step 1: Create src/components/KapitelListe.tsx**

```tsx
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Kapitel } from '../types';

interface KapitelListeProps {
  kursId: string;
  kapitel: Kapitel[];
  istAbgeschlossen: (kapitelId: string) => boolean;
  aktuellesKapitelId: string | null;
  onKapitelClick: (kapitelId: string) => void;
}

export default function KapitelListe({
  kursId,
  kapitel,
  istAbgeschlossen,
  aktuellesKapitelId,
  onKapitelClick,
}: KapitelListeProps) {
  return (
    <Box>
      {kapitel.map((kap, index) => {
        const abgeschlossen = istAbgeschlossen(kap.id);
        const istAktuell = kap.id === aktuellesKapitelId;
        const istZukuenftig = !abgeschlossen && !istAktuell;

        return (
          <Box
            key={kap.id}
            onClick={() => {
              if (!istZukuenftig || abgeschlossen || istAktuell) {
                onKapitelClick(kap.id);
              }
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1.5,
              px: 1,
              borderBottom: index < kapitel.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              cursor: istZukuenftig ? 'default' : 'pointer',
              opacity: istZukuenftig ? 0.4 : 1,
              '&:hover': {
                bgcolor: istZukuenftig ? 'transparent' : 'action.hover',
              },
              borderRadius: 1,
              transition: 'background-color 0.2s',
            }}
          >
            {abgeschlossen ? (
              <CheckCircleIcon sx={{ color: 'success.main', fontSize: 24 }} />
            ) : istAktuell ? (
              <PlayCircleFilledIcon sx={{ color: 'primary.main', fontSize: 24 }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ color: 'grey.400', fontSize: 24 }} />
            )}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 11,
                  color: kap.goldTitel ? 'warning.main' : 'text.secondary',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                Kapitel {index + 1}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: abgeschlossen
                    ? 'text.secondary'
                    : istAktuell
                      ? 'primary.main'
                      : 'text.primary',
                }}
              >
                {kap.titel}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
```

- [ ] **Step 2: Implement src/pages/KursAnsicht.tsx**

```tsx
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, LinearProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getKursById } from '../data/kurse';
import { useFortschritt } from '../context/FortschrittContext';
import KapitelListe from '../components/KapitelListe';

export default function KursAnsicht() {
  const { kursId } = useParams<{ kursId: string }>();
  const navigate = useNavigate();
  const { istKapitelAbgeschlossen, getKursFortschritt } = useFortschritt();

  const kurs = kursId ? getKursById(kursId) : undefined;
  if (!kurs) {
    return <Typography>Kurs nicht gefunden.</Typography>;
  }

  const { abgeschlossen, gesamt } = getKursFortschritt(kurs.id);
  const prozent = gesamt > 0 ? (abgeschlossen / gesamt) * 100 : 0;

  const erstesOffeneKapitel = kurs.kapitel.find(
    (kap) => !istKapitelAbgeschlossen(kurs.id, kap.id),
  );
  const aktuellesKapitelId = erstesOffeneKapitel?.id ?? null;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <IconButton onClick={() => navigate('/')} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 11, color: 'warning.main', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
            {kurs.titel}
          </Typography>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: 'primary.main' }}>
            Kursübersicht
          </Typography>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {kurs.beschreibung}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Fortschritt</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'primary.main' }}>
            {abgeschlossen}/{gesamt} Kapitel
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={prozent}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': { bgcolor: 'warning.main', borderRadius: 3 },
          }}
        />
      </Box>

      <KapitelListe
        kursId={kurs.id}
        kapitel={kurs.kapitel}
        istAbgeschlossen={(kapitelId) => istKapitelAbgeschlossen(kurs.id, kapitelId)}
        aktuellesKapitelId={aktuellesKapitelId}
        onKapitelClick={(kapitelId) => navigate(`/kurs/${kurs.id}/kapitel/${kapitelId}`)}
      />
    </Box>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd /home/stef/hessel
npx tsc --noEmit && npm run build
```

Expected: Both pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/KapitelListe.tsx src/pages/KursAnsicht.tsx
git commit -m "feat: implement KursAnsicht with KapitelListe"
```

---

### Task 7: Lernansicht Page (Scroll-Flow Content)

**Files:**
- Create: `src/components/LernContent.tsx`
- Modify: `src/pages/Lernansicht.tsx`

- [ ] **Step 1: Create src/components/LernContent.tsx**

```tsx
import { Box, Typography } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { ContentAbschnitt } from '../types';

interface LernContentProps {
  videoUrl: string | null;
  abschnitte: ContentAbschnitt[];
}

export default function LernContent({ videoUrl, abschnitte }: LernContentProps) {
  return (
    <Box>
      {videoUrl && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            bgcolor: '#000',
            borderRadius: 2,
            overflow: 'hidden',
            mb: 3,
          }}
        >
          <Box
            component="iframe"
            src={videoUrl}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      )}

      {abschnitte.map((abschnitt, index) => {
        switch (abschnitt.typ) {
          case 'text':
            return (
              <Typography
                key={index}
                sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.primary', mb: 2 }}
              >
                {abschnitt.inhalt}
              </Typography>
            );
          case 'merke':
            return (
              <Box
                key={index}
                sx={{
                  borderLeft: '3px solid',
                  borderColor: 'warning.main',
                  bgcolor: 'rgba(255,185,89,0.08)',
                  p: 1.5,
                  borderRadius: '0 8px 8px 0',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <LightbulbIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'warning.main' }}>
                    Merke
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.6 }}>
                  {abschnitt.inhalt}
                </Typography>
              </Box>
            );
          case 'bild':
          case 'diagramm':
            return (
              <Box key={index} sx={{ mb: 2, textAlign: 'center' }}>
                <Box
                  component="img"
                  src={abschnitt.src}
                  alt={abschnitt.caption}
                  sx={{ maxWidth: '100%', borderRadius: 2 }}
                />
                <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.5 }}>
                  {abschnitt.caption}
                </Typography>
              </Box>
            );
        }
      })}
    </Box>
  );
}
```

- [ ] **Step 2: Implement src/pages/Lernansicht.tsx**

```tsx
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getKursById, getKapitel } from '../data/kurse';
import { useFortschritt } from '../context/FortschrittContext';
import LernContent from '../components/LernContent';

export default function Lernansicht() {
  const { kursId, kapitelId } = useParams<{ kursId: string; kapitelId: string }>();
  const navigate = useNavigate();
  const { istKapitelAbgeschlossen } = useFortschritt();

  const kurs = kursId ? getKursById(kursId) : undefined;
  const kapitel = kursId && kapitelId ? getKapitel(kursId, kapitelId) : undefined;

  if (!kurs || !kapitel) {
    return <Typography>Kapitel nicht gefunden.</Typography>;
  }

  const kapitelIndex = kurs.kapitel.findIndex((k) => k.id === kapitel.id);
  const abgeschlossen = istKapitelAbgeschlossen(kurs.id, kapitel.id);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <IconButton onClick={() => navigate(`/kurs/${kurs.id}`)} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontSize: 11,
              color: 'warning.main',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {kurs.titel} · Kapitel {kapitelIndex + 1}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: 'primary.main' }}>
            {kapitel.titel}
          </Typography>
        </Box>
      </Box>

      <LernContent videoUrl={kapitel.content.videoUrl} abschnitte={kapitel.content.abschnitte} />

      {kapitel.quiz.length > 0 && (
        <Button
          variant="contained"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          onClick={() => navigate(`/kurs/${kurs.id}/kapitel/${kapitel.id}/quiz`)}
        >
          {abgeschlossen ? 'Quiz wiederholen' : 'Zum Quiz →'}
        </Button>
      )}
    </Box>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd /home/stef/hessel
npx tsc --noEmit && npm run build
```

Expected: Both pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/LernContent.tsx src/pages/Lernansicht.tsx
git commit -m "feat: implement Lernansicht with scroll-flow content"
```

---

### Task 8: Quiz-Wizard (QuizFrage + QuizFeedback + QuizErgebnis)

**Files:**
- Create: `src/components/QuizWizard.tsx`
- Create: `src/components/QuizFrage.tsx`
- Create: `src/components/QuizFeedback.tsx`
- Create: `src/components/QuizErgebnis.tsx`
- Modify: `src/pages/QuizSeite.tsx`

- [ ] **Step 1: Create src/components/QuizFrage.tsx**

```tsx
import { Box, Typography } from '@mui/material';
import { QuizFrage as QuizFrageType, Antwort } from '../types';

interface QuizFrageProps {
  frage: QuizFrageType;
  ausgewaehlteAntwort: string | null;
  onAntwortWaehlen: (antwortId: string) => void;
  disabled: boolean;
}

export default function QuizFrage({
  frage,
  ausgewaehlteAntwort,
  onAntwortWaehlen,
  disabled,
}: QuizFrageProps) {
  return (
    <Box>
      <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'primary.main', mb: 2, lineHeight: 1.4 }}>
        {frage.frage}
      </Typography>

      {frage.medien && (
        <Box sx={{ mb: 2.5, bgcolor: 'grey.50', borderRadius: 2, p: 2, textAlign: 'center' }}>
          {frage.medien.typ === 'bild' || frage.medien.typ === 'chart' ? (
            <Box component="img" src={frage.medien.src} alt="Quiz-Medien" sx={{ maxWidth: '100%', borderRadius: 1 }} />
          ) : (
            <Box
              component="iframe"
              src={frage.medien.src}
              sx={{ width: '100%', aspectRatio: '16/9', border: 'none', borderRadius: 1 }}
            />
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {frage.antworten.map((antwort: Antwort) => {
          const isSelected = ausgewaehlteAntwort === antwort.id;
          return (
            <Box
              key={antwort.id}
              onClick={() => !disabled && onAntwortWaehlen(antwort.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                border: '2px solid',
                borderColor: isSelected ? 'primary.main' : 'divider',
                borderRadius: 2.5,
                bgcolor: isSelected ? 'rgba(28,63,58,0.05)' : 'transparent',
                cursor: disabled ? 'default' : 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: disabled ? undefined : 'primary.main',
                },
              }}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: isSelected ? 'none' : '2px solid',
                  borderColor: 'divider',
                  bgcolor: isSelected ? 'primary.main' : 'transparent',
                  color: isSelected ? '#fff' : 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {antwort.id.toUpperCase()}
              </Box>
              <Typography
                sx={{
                  fontSize: 14,
                  color: isSelected ? 'primary.main' : 'text.primary',
                  fontWeight: isSelected ? 500 : 400,
                }}
              >
                {antwort.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Create src/components/QuizFeedback.tsx**

```tsx
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { QuizFrage, Antwort } from '../types';

interface QuizFeedbackProps {
  frage: QuizFrage;
  gewaehlteAntwortId: string;
}

export default function QuizFeedback({ frage, gewaehlteAntwortId }: QuizFeedbackProps) {
  const gewaehlteAntwort = frage.antworten.find((a) => a.id === gewaehlteAntwortId);
  const korrekteAntwort = frage.antworten.find((a) => a.korrekt);
  const istKorrekt = gewaehlteAntwort?.korrekt ?? false;

  return (
    <Box>
      <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'primary.main', mb: 2, lineHeight: 1.4 }}>
        {frage.frage}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        {frage.antworten.map((antwort: Antwort) => {
          const isGewaehlt = antwort.id === gewaehlteAntwortId;
          const isKorrekt = antwort.korrekt;
          const showGreen = isKorrekt;
          const showRed = isGewaehlt && !isKorrekt;

          return (
            <Box
              key={antwort.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                border: '2px solid',
                borderColor: showGreen ? 'success.main' : showRed ? 'error.main' : 'divider',
                borderRadius: 2.5,
                bgcolor: showGreen
                  ? 'rgba(34,197,94,0.05)'
                  : showRed
                    ? 'rgba(239,68,68,0.05)'
                    : 'transparent',
                opacity: !showGreen && !showRed ? 0.4 : 1,
              }}
            >
              {showGreen ? (
                <CheckCircleIcon sx={{ color: 'success.main', fontSize: 28, flexShrink: 0 }} />
              ) : showRed ? (
                <CancelIcon sx={{ color: 'error.main', fontSize: 28, flexShrink: 0 }} />
              ) : (
                <Box sx={{ width: 28, height: 28, flexShrink: 0 }} />
              )}
              <Typography
                sx={{
                  fontSize: 14,
                  color: showRed ? 'text.secondary' : 'text.primary',
                  textDecoration: showRed ? 'line-through' : 'none',
                  fontWeight: showGreen ? 500 : 400,
                }}
              >
                {antwort.text}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          bgcolor: 'grey.50',
          borderRadius: 2.5,
          p: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <LightbulbIcon sx={{ color: 'warning.main', fontSize: 16 }} />
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'warning.main' }}>
            Erklärung
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.6 }}>
          {frage.erklaerung}
        </Typography>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 3: Create src/components/QuizErgebnis.tsx**

```tsx
import { Box, Typography, Button } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ReplayIcon from '@mui/icons-material/Replay';

interface QuizErgebnisProps {
  richtig: number;
  gesamt: number;
  bestanden: boolean;
  badgeFreigeschaltet: boolean;
  badgeTitel: string | null;
  onNochmal: () => void;
  onZurueck: () => void;
}

export default function QuizErgebnis({
  richtig,
  gesamt,
  bestanden,
  badgeFreigeschaltet,
  badgeTitel,
  onNochmal,
  onZurueck,
}: QuizErgebnisProps) {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: bestanden ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: 32, fontWeight: 700, color: bestanden ? 'success.main' : 'error.main' }}>
          {richtig}/{gesamt}
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        {bestanden ? 'Bestanden!' : 'Nicht bestanden'}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {bestanden
          ? 'Großartig! Du hast das Kapitel erfolgreich abgeschlossen.'
          : 'Du brauchst mindestens 70% richtige Antworten. Versuch es nochmal!'}
      </Typography>

      {badgeFreigeschaltet && badgeTitel && (
        <Box
          sx={{
            bgcolor: 'rgba(255,185,89,0.1)',
            border: '2px solid',
            borderColor: 'warning.main',
            borderRadius: 3,
            p: 2,
            mb: 3,
          }}
        >
          <EmojiEventsIcon sx={{ color: 'warning.main', fontSize: 40, mb: 1 }} />
          <Typography sx={{ fontWeight: 600, color: 'primary.main' }}>
            Neues Badge freigeschaltet!
          </Typography>
          <Typography sx={{ fontSize: 14, color: 'warning.main', fontWeight: 600 }}>
            {badgeTitel}
          </Typography>
        </Box>
      )}

      {bestanden ? (
        <Button variant="contained" fullWidth size="large" onClick={onZurueck}>
          Zurück zum Kurs
        </Button>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button variant="contained" fullWidth size="large" startIcon={<ReplayIcon />} onClick={onNochmal}>
            Nochmal versuchen
          </Button>
          <Button variant="text" fullWidth onClick={onZurueck}>
            Zurück zum Kurs
          </Button>
        </Box>
      )}
    </Box>
  );
}
```

- [ ] **Step 4: Create src/components/QuizWizard.tsx**

```tsx
import { useState, useCallback } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { QuizFrage as QuizFrageType } from '../types';
import QuizFrage from './QuizFrage';
import QuizFeedback from './QuizFeedback';
import QuizErgebnis from './QuizErgebnis';

type QuizPhase = 'frage' | 'feedback' | 'ergebnis';

interface FragenState {
  antwort: string | null;
  korrekt: boolean | null;
}

interface QuizWizardProps {
  kursTitle: string;
  kapitelTitle: string;
  fragen: QuizFrageType[];
  onAbschluss: (richtig: number, gesamt: number) => { bestanden: boolean; badgeFreigeschaltet: boolean; badgeTitel: string | null };
  onZurueck: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizWizard({
  kursTitle,
  kapitelTitle,
  fragen: originalFragen,
  onAbschluss,
  onZurueck,
}: QuizWizardProps) {
  const [fragen, setFragen] = useState(() => shuffleArray(originalFragen));
  const [aktuelleFrageIndex, setAktuelleFrageIndex] = useState(0);
  const [phase, setPhase] = useState<QuizPhase>('frage');
  const [fragenState, setFragenState] = useState<FragenState[]>(() =>
    fragen.map(() => ({ antwort: null, korrekt: null })),
  );
  const [ergebnis, setErgebnis] = useState<{
    bestanden: boolean;
    badgeFreigeschaltet: boolean;
    badgeTitel: string | null;
  } | null>(null);

  const aktuelleFrage = fragen[aktuelleFrageIndex];
  const aktuellerState = fragenState[aktuelleFrageIndex];

  const handleAntwortWaehlen = useCallback((antwortId: string) => {
    setFragenState((prev) => {
      const next = [...prev];
      next[aktuelleFrageIndex] = { ...next[aktuelleFrageIndex], antwort: antwortId };
      return next;
    });
  }, [aktuelleFrageIndex]);

  const handleBestaetigen = useCallback(() => {
    if (!aktuellerState.antwort) return;
    const antwort = aktuelleFrage.antworten.find((a) => a.id === aktuellerState.antwort);
    const korrekt = antwort?.korrekt ?? false;
    setFragenState((prev) => {
      const next = [...prev];
      next[aktuelleFrageIndex] = { ...next[aktuelleFrageIndex], korrekt };
      return next;
    });
    setPhase('feedback');
  }, [aktuellerState.antwort, aktuelleFrage, aktuelleFrageIndex]);

  const handleWeiter = useCallback(() => {
    if (aktuelleFrageIndex < fragen.length - 1) {
      setAktuelleFrageIndex((prev) => prev + 1);
      setPhase('frage');
    } else {
      const richtig = fragenState.filter((f) => f.korrekt).length;
      const result = onAbschluss(richtig, fragen.length);
      setErgebnis(result);
      setPhase('ergebnis');
    }
  }, [aktuelleFrageIndex, fragen.length, fragenState, onAbschluss]);

  const handleNochmal = useCallback(() => {
    const neueFragen = shuffleArray(originalFragen);
    setFragen(neueFragen);
    setAktuelleFrageIndex(0);
    setPhase('frage');
    setFragenState(neueFragen.map(() => ({ antwort: null, korrekt: null })));
    setErgebnis(null);
  }, [originalFragen]);

  if (phase === 'ergebnis' && ergebnis) {
    const richtig = fragenState.filter((f) => f.korrekt).length;
    return (
      <QuizErgebnis
        richtig={richtig}
        gesamt={fragen.length}
        bestanden={ergebnis.bestanden}
        badgeFreigeschaltet={ergebnis.badgeFreigeschaltet}
        badgeTitel={ergebnis.badgeTitel}
        onNochmal={handleNochmal}
        onZurueck={onZurueck}
      />
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <IconButton onClick={onZurueck} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', fontWeight: 600 }}>
          Frage {aktuelleFrageIndex + 1} von {fragen.length}
        </Typography>
        <Box sx={{ width: 32 }} />
      </Box>

      {/* Progress bar */}
      <Box sx={{ display: 'flex', gap: 0.5, mb: 3 }}>
        {fragen.map((_, i) => {
          const state = fragenState[i];
          let color = 'grey.300';
          if (state.korrekt === true) color = 'success.main';
          else if (state.korrekt === false) color = 'error.main';
          else if (i === aktuelleFrageIndex) color = 'primary.main';
          return (
            <Box
              key={i}
              sx={{ flex: 1, height: 3, borderRadius: 1, bgcolor: color, transition: 'background-color 0.3s' }}
            />
          );
        })}
      </Box>

      {phase === 'frage' && (
        <>
          <QuizFrage
            frage={aktuelleFrage}
            ausgewaehlteAntwort={aktuellerState.antwort}
            onAntwortWaehlen={handleAntwortWaehlen}
            disabled={false}
          />
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            disabled={!aktuellerState.antwort}
            onClick={handleBestaetigen}
          >
            Bestätigen →
          </Button>
        </>
      )}

      {phase === 'feedback' && aktuellerState.antwort && (
        <>
          <QuizFeedback frage={aktuelleFrage} gewaehlteAntwortId={aktuellerState.antwort} />
          <Button variant="contained" fullWidth size="large" sx={{ mt: 3 }} onClick={handleWeiter}>
            {aktuelleFrageIndex < fragen.length - 1 ? 'Nächste Frage →' : 'Ergebnis anzeigen'}
          </Button>
        </>
      )}
    </Box>
  );
}
```

- [ ] **Step 5: Implement src/pages/QuizSeite.tsx**

```tsx
import { useParams, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { getKursById, getKapitel } from '../data/kurse';
import { useFortschritt } from '../context/FortschrittContext';
import { badges } from '../data/badges';
import QuizWizard from '../components/QuizWizard';

const BESTANDEN_SCHWELLE = 0.7;

export default function QuizSeite() {
  const { kursId, kapitelId } = useParams<{ kursId: string; kapitelId: string }>();
  const navigate = useNavigate();
  const { kapitelAbschliessen, hatBadge, istKapitelAbgeschlossen } = useFortschritt();

  const kurs = kursId ? getKursById(kursId) : undefined;
  const kapitel = kursId && kapitelId ? getKapitel(kursId, kapitelId) : undefined;

  if (!kurs || !kapitel || kapitel.quiz.length === 0) {
    return <Typography>Quiz nicht gefunden.</Typography>;
  }

  const handleAbschluss = (richtig: number, gesamt: number) => {
    const bestanden = richtig / gesamt >= BESTANDEN_SCHWELLE;
    let badgeFreigeschaltet = false;
    let badgeTitel: string | null = null;

    if (bestanden) {
      kapitelAbschliessen(kurs.id, kapitel.id, { richtig, gesamt });

      // Check if completing this chapter completes the entire course
      // We check manually since state update is async
      const badge = badges.find((b) => b.kursId === kurs.id);
      if (badge && !hatBadge(badge.id)) {
        const key = `${kurs.id}/${kapitel.id}`;
        const alleAbgeschlossen = kurs.kapitel.every(
          (kap) => kap.id === kapitel.id || istKapitelAbgeschlossen(kurs.id, kap.id),
        );
        if (alleAbgeschlossen) {
          badgeFreigeschaltet = true;
          badgeTitel = badge.titel;
        }
      }
    }

    return { bestanden, badgeFreigeschaltet, badgeTitel };
  };

  return (
    <QuizWizard
      kursTitle={kurs.titel}
      kapitelTitle={kapitel.titel}
      fragen={kapitel.quiz}
      onAbschluss={handleAbschluss}
      onZurueck={() => navigate(`/kurs/${kurs.id}`)}
    />
  );
}
```

- [ ] **Step 6: Verify build**

```bash
cd /home/stef/hessel
npx tsc --noEmit && npm run build
```

Expected: Both pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/QuizWizard.tsx src/components/QuizFrage.tsx src/components/QuizFeedback.tsx src/components/QuizErgebnis.tsx src/pages/QuizSeite.tsx
git commit -m "feat: implement Quiz wizard with instant feedback and results"
```

---

### Task 9: Profil Page (Badges + Discord)

**Files:**
- Create: `src/components/BadgeCard.tsx`
- Modify: `src/pages/Profil.tsx`

- [ ] **Step 1: Create src/components/BadgeCard.tsx**

```tsx
import { Box, Typography, Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShareIcon from '@mui/icons-material/Share';
import { Badge } from '../types';

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
}

export default function BadgeCard({ badge, earned }: BadgeCardProps) {
  const [snackOpen, setSnackOpen] = useState(false);

  return (
    <Box
      sx={{
        border: '2px solid',
        borderColor: earned ? 'warning.main' : 'divider',
        borderRadius: 3,
        p: 2,
        textAlign: 'center',
        opacity: earned ? 1 : 0.4,
        bgcolor: earned ? 'rgba(255,185,89,0.05)' : 'transparent',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: earned ? 'secondary.main' : 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 1,
        }}
      >
        {earned ? (
          <EmojiEventsIcon sx={{ color: 'warning.main', fontSize: 24 }} />
        ) : (
          <Typography sx={{ color: 'grey.500', fontSize: 18, fontWeight: 700 }}>
            {badge.icon}
          </Typography>
        )}
      </Box>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: earned ? 'primary.main' : 'grey.500' }}>
        {badge.titel}
      </Typography>
      <Typography sx={{ fontSize: 11, color: 'text.secondary', mb: 1 }}>
        {badge.beschreibung}
      </Typography>
      {earned && (
        <>
          <Button
            size="small"
            startIcon={<ShareIcon />}
            sx={{ fontSize: 11 }}
            onClick={() => setSnackOpen(true)}
          >
            In Discord teilen
          </Button>
          <Snackbar
            open={snackOpen}
            autoHideDuration={2000}
            onClose={() => setSnackOpen(false)}
            message="Link kopiert!"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </>
      )}
    </Box>
  );
}
```

- [ ] **Step 2: Implement src/pages/Profil.tsx**

```tsx
import { Box, Typography, Avatar, Button, Snackbar, LinearProgress } from '@mui/material';
import { useState } from 'react';
import { badges } from '../data/badges';
import { kurse } from '../data/kurse';
import { useFortschritt } from '../context/FortschrittContext';
import BadgeCard from '../components/BadgeCard';

export default function Profil() {
  const { hatBadge, getKursFortschritt } = useFortschritt();
  const [discordSnack, setDiscordSnack] = useState(false);

  return (
    <Box>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 64,
            height: 64,
            fontSize: 24,
            fontWeight: 600,
            mx: 'auto',
            mb: 1,
          }}
        >
          MM
        </Avatar>
        <Typography variant="h5">Max Mustermann</Typography>
        <Typography variant="body2" color="text.secondary">
          Mitglied der MH Investment Academy
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: 'primary.main',
          textTransform: 'uppercase',
          letterSpacing: 1,
          mb: 1.5,
        }}
      >
        Badges
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mb: 4 }}>
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} earned={hatBadge(badge.id)} />
        ))}
      </Box>

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: 'primary.main',
          textTransform: 'uppercase',
          letterSpacing: 1,
          mb: 1.5,
        }}
      >
        Kursfortschritt
      </Typography>
      {kurse.map((kurs) => {
        const { abgeschlossen, gesamt } = getKursFortschritt(kurs.id);
        const prozent = gesamt > 0 ? (abgeschlossen / gesamt) * 100 : 0;
        return (
          <Box key={kurs.id} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{kurs.titel}</Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
                {kurs.freigeschaltet ? `${abgeschlossen}/${gesamt}` : 'Gesperrt'}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={kurs.freigeschaltet ? prozent : 0}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'grey.200',
                '& .MuiLinearProgress-bar': { bgcolor: 'warning.main', borderRadius: 3 },
              }}
            />
          </Box>
        );
      })}

      <Box sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => setDiscordSnack(true)}
        >
          Mit Discord verbinden
        </Button>
        <Snackbar
          open={discordSnack}
          autoHideDuration={2000}
          onClose={() => setDiscordSnack(false)}
          message="Discord-Verknüpfung wird eingerichtet..."
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Box>
    </Box>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
cd /home/stef/hessel
npx tsc --noEmit && npm run build
```

Expected: Both pass.

- [ ] **Step 4: Commit**

```bash
git add src/components/BadgeCard.tsx src/pages/Profil.tsx
git commit -m "feat: implement Profil page with badges and Discord integration"
```

---

### Task 10: Final Cleanup & Netlify Config

**Files:**
- Create: `public/_redirects` (Netlify SPA routing)
- Modify: `index.html` — ensure favicon/meta tags

- [ ] **Step 1: Create public/_redirects for Netlify SPA routing**

```bash
mkdir -p /home/stef/hessel/public
```

Create `public/_redirects`:

```
/*    /index.html   200
```

- [ ] **Step 2: Update index.html meta tags**

```html
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="MH Investment Academy — Lerne Investieren mit Moritz Hessel" />
    <title>MH Investment Academy</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Full build verification**

```bash
cd /home/stef/hessel
npx tsc --noEmit && npm run build
```

Expected: Both pass, `dist/` directory created.

- [ ] **Step 4: Manual smoke test**

```bash
cd /home/stef/hessel
npm run preview
```

Open http://localhost:4173 and verify:
- Dashboard loads with StatBar and 4 courses
- Click Basiskurs → chapter list shows
- Click chapter → scroll-flow content renders
- "Zum Quiz →" opens quiz wizard
- Quiz works: select answer, confirm, see feedback, complete all questions
- Profile page shows badges and progress
- Locked courses show overlay dialog
- Avatar dropdown menu works

- [ ] **Step 5: Commit**

```bash
git add public/_redirects index.html
git commit -m "feat: add Netlify config, update meta tags"
```
