# MH Investment Academy — Design Spec

## Überblick

Self-Service E-Learning Portal für die MH Investment Academy. Zahlende Kunden lernen das Thema Investieren über Kurse mit Video/Text-Content und Multiple-Choice-Quizzes. Mobile-First SPA im Corporate Design von totalreturn-capital.com. Zielgruppe: Deutsche Anfänger, die Investoren werden wollen.

**Auftraggeber:** Stef (Pitch an Moritz Hessel)
**Hosting:** Netlify (Analytics für Visit-Tracking)

---

## Tech-Stack

| Komponente | Technologie |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| UI Library | MUI 6 (Material UI) |
| Routing | React Router v7 |
| State | React Context + localStorage |
| Daten | Statische TypeScript-Dateien |
| Hosting | Netlify |

Kein Backend. Alle Daten sind statisch. Fortschritt wird im localStorage persistiert.

---

## Corporate Design

| Token | Wert | Verwendung |
|---|---|---|
| Primary | `#1c3f3a` | Buttons, Header, Text-Akzente |
| Secondary BG | `#1c3f39` | Dunkle Sektionen, Hero-Bereiche (weißer Text) |
| Accent/Gold | `#ffb959` | Kapitelüberschriften, Fortschrittsbalken, Badges |
| Background | `#ffffff` | Seitenhintergrund |
| Schrift | System Sans-Serif | Wie totalreturn-capital.com |

**Assets:**
- Logo: `https://framerusercontent.com/images/pjfDzLsbBdOPWoOq6AS7gA6bhuE.svg?width=180&height=32`
- Hero-Bild: `https://framerusercontent.com/images/GF3TyFl047BP15W1ef4wLPVKzSg.jpg?width=1920&height=1080`

---

## Routen

| Route | Seite | Beschreibung |
|---|---|---|
| `/` | Dashboard | Statistik-Leiste + Kursliste |
| `/kurs/:kursId` | Kursansicht | Kurs-Header + Kapitel-Übersicht |
| `/kurs/:kursId/kapitel/:kapitelId` | Lernansicht | Video/Text Scroll-Flow |
| `/kurs/:kursId/kapitel/:kapitelId/quiz` | Quiz | Multiple-Choice Wizard |
| `/profil` | Profil | Badges + Fortschritt + Discord |

---

## Datenmodell (TypeScript)

```typescript
interface Kurs {
  id: "basiskurs" | "growth" | "value" | "optionen";
  titel: string;
  beschreibung: string;
  icon: string; // Buchstabe: B, G, V, O
  freigeschaltet: boolean;
  kapitel: Kapitel[];
}

interface Kapitel {
  id: string;
  titel: string;
  goldTitel: boolean;
  content: {
    videoUrl: string | null;
    abschnitte: ContentAbschnitt[];
  };
  quiz: QuizFrage[];
}

type ContentAbschnitt =
  | { typ: "text"; inhalt: string }
  | { typ: "merke"; inhalt: string }
  | { typ: "bild"; src: string; caption: string }
  | { typ: "diagramm"; src: string; caption: string };

interface QuizFrage {
  id: string;
  frage: string;
  medien: { typ: "bild" | "chart" | "video"; src: string } | null;
  antworten: Antwort[];
  erklaerung: string;
}

interface Antwort {
  id: "a" | "b" | "c" | "d";
  text: string;
  korrekt: boolean;
}

interface Fortschritt {
  kapitelAbgeschlossen: string[]; // z.B. ["basiskurs/kap1", "basiskurs/kap2"]
  quizErgebnisse: Record<string, { richtig: number; gesamt: number }>;
  badges: string[]; // z.B. ["basiskurs-complete"]
}
```

---

## Komponenten-Architektur

```
src/
├── main.tsx
├── App.tsx                     # Router + ThemeProvider
├── theme.ts                    # MUI Custom Theme
├── types.ts                    # Alle Interfaces
├── data/
│   ├── kurse.ts                # Kurs-Definitionen + Kapitel + Quizfragen
│   └── badges.ts               # Badge-Definitionen
├── context/
│   └── FortschrittContext.tsx   # Globaler State + localStorage Sync
├── components/
│   ├── Layout.tsx              # Header (Logo + Avatar) + Content Area
│   ├── StatBar.tsx             # Statistik-Leiste (Aktive Kurse, Kapitel, Badges)
│   ├── KursKarte.tsx           # Kurs-Karte (Fortschrittskreis oder Locked)
│   ├── KapitelListe.tsx        # Kapitel-Übersicht
│   ├── LernContent.tsx         # Scroll-Flow: Video + Text + Merke-Boxen
│   ├── QuizWizard.tsx          # Wizard-Container (Fortschritt, Navigation)
│   ├── QuizFrage.tsx           # Frage mit Medien + Antwort-Karten
│   ├── QuizFeedback.tsx        # Sofort-Feedback (Richtig/Falsch + Erklärung)
│   ├── QuizErgebnis.tsx        # Endergebnis (Score + Badge bei Bestehen)
│   ├── BadgeCard.tsx           # Badge-Anzeige + Discord-Share
│   └── LockedOverlay.tsx       # "Jetzt freischalten"-Overlay
├── pages/
│   ├── Dashboard.tsx           # StatBar + Kursliste
│   ├── KursAnsicht.tsx         # Kurs-Header + KapitelListe
│   ├── Lernansicht.tsx         # LernContent + "Zum Quiz" CTA
│   ├── QuizSeite.tsx           # QuizWizard
│   └── Profil.tsx              # Badges + Fortschritt + Discord
```

---

## Seiten-Design

### Dashboard (Layout C: Statistik + Kompaktliste)

- **Header:** Logo links, Avatar "MM" (Max Mustermann) rechts mit Dropdown
- **Begrüßung:** "Willkommen zurück, Max Mustermann"
- **StatBar:** 3 Kacheln auf dunklem Hintergrund (`#1c3f39`):
  - Aktive Kurse (Zahl in Gold)
  - Kapitel abgeschlossen (Zahl in Gold)
  - Badges verdient (Zahl in Gold)
- **Kursliste:** Kompakte Listeneinträge mit:
  - Icon-Badge (Buchstabe auf dunklem Hintergrund)
  - Kurstitel + "X/Y Kapitel"
  - Kreisförmige Fortschrittsanzeige (Prozent)
  - Gesperrte Kurse: ausgegraut mit Schloss-Icon

### Kursansicht

- **Kurs-Header:** Titel, Beschreibung, Gesamtfortschritt
- **Kapitel-Liste:** Vertikale Liste mit:
  - Abgeschlossene Kapitel: grüner Haken
  - Aktuelles Kapitel: hervorgehoben (Primary-Farbe)
  - Zukünftige Kapitel: ausgegraut
  - Jedes Kapitel zeigt: Nummer, Titel (gold wenn `goldTitel`), Quiz-Status

### Lernansicht (Scroll-Flow)

- **Header:** Zurück-Pfeil, Kursname + Kapitel-Nr. (Gold), Kapitel-Titel
- **Video:** 16:9 Platzhalter mit Play-Button (oben)
- **Content:** Scrollbarer Bereich darunter:
  - Textabschnitte mit großzügigem Zeilenabstand
  - Merke-Boxen: Gold-Akzent links, heller Hintergrund
  - Bilder/Diagramme mit Captions
- **CTA:** "Zum Quiz →" Button am Ende (Primary-Farbe, volle Breite)

### Quiz-Wizard (Medien + Sofort-Feedback)

- **Header:** Zurück-Pfeil, "Frage X von Y", Fortschrittsbalken
- **Fortschrittsbalken:** Segmente pro Frage -- grün (richtig), rot (falsch), Primary (aktiv), grau (ausstehend)
- **Frage:** Großer Text, genug Platz für Problemstellung
- **Medien-Bereich:** Bilder, Charts oder Diagramme zwischen Frage und Antworten (wenn vorhanden)
- **Antworten:** 4 Karten (A/B/C/D) mit Buchstaben-Badge, Auswahl wird farblich hervorgehoben
- **"Bestätigen →" Button** nach Auswahl
- **Sofort-Feedback:** Nach Bestätigung:
  - Richtige Antwort grün mit Haken
  - Falsche Auswahl rot mit Kreuz + durchgestrichen
  - Erklärungsbox darunter (Gold-Akzent, heller Hintergrund)
  - "Nächste Frage →" Button
- **Ergebnis-Screen:** Score (z.B. "5/6 richtig"), bei ≥70% bestanden → Badge-Animation
- **Nicht bestanden:** "Nochmal versuchen" Button, Fragen werden neu gemischt

### Profil

- **Header:** Avatar, Name "Max Mustermann"
- **Badges-Sektion:** Grid mit verdienten Badges (Kurs-Icon + "Bestanden")
  - "In Discord teilen" Button pro Badge (Clickdummy → Toast "Link kopiert!")
- **Fortschritts-Übersicht:** Alle Kurse mit Kapitel-Status
- **Discord-Verknüpfung:** Clickdummy-Button "Mit Discord verbinden"

---

## User Flows

### Haupt-Flow: Dashboard → Quiz

1. Dashboard zeigt StatBar + 4 Kurse (2 frei, 2 gesperrt)
2. Klick auf freigeschalteten Kurs → KursAnsicht
3. Klick auf Kapitel → Lernansicht (Scroll-Flow)
4. User scrollt durch Video + Content
5. Klick "Zum Quiz →" → Quiz-Wizard
6. Frage-für-Frage mit Sofort-Feedback
7. Ergebnis: ≥70% → Kapitel abgeschlossen, Fortschritt aktualisiert
8. Alle Kapitel bestanden → Kurs-Badge freigeschaltet

### Gesperrte Kurse

- Klick zeigt LockedOverlay mit Kursbeschreibung
- "Jetzt freischalten" Button (Clickdummy, kein Kauf-Flow)

### Login (Clickdummy)

- Header zeigt immer Avatar "MM" (Max Mustermann)
- Klick auf Avatar: Dropdown mit "Profil" und "Abmelden"
- "Abmelden" ist rein visuell (kein State-Change)

### Badge & Discord

- Profil zeigt verdiente Badges
- "In Discord teilen" zeigt Toast "Link kopiert!"

---

## Quiz-Regeln

- ≥70% richtig = Kapitel bestanden
- Nicht bestanden → "Nochmal versuchen", Fragen neu gemischt
- Fortschrittsbalken zeigt grün/rot/aktiv/ausstehend pro Frage
- Sofort-Feedback nach jeder Antwort mit Erklärung

---

## Content-Plan (Platzhalter)

### Kurs 1: Basiskurs (6 Kapitel, freigeschaltet)

1. Was ist eine Aktie? — Grundbegriffe, Unternehmensanteile
2. Wie funktioniert die Börse? — Handel, Angebot & Nachfrage
3. Grundlagen der Aktienanalyse — Fundamental vs. Technisch
4. Dein erstes Portfolio — Diversifikation, Risiko
5. Kennzahlen verstehen — KGV, KBV, Dividendenrendite
6. Typische Anfängerfehler — Emotionen, Timing, Overtrading

### Kurs 2: Growth Investing (5 Kapitel, freigeschaltet)

1. Was ist Growth Investing? — Philosophie, Wachstumsmärkte
2. Wachstumsaktien erkennen — Umsatzwachstum, Margen, TAM
3. Bewertung von Growth-Aktien — PEG-Ratio, Rule of 40
4. Risikomanagement — Volatilität, Position Sizing
5. Portfolio-Aufbau — Sektorverteilung, Rebalancing

### Kurs 3: Value Investing (6 Kapitel, gesperrt)

1. Die Philosophie von Value Investing
2. Innerer Wert berechnen
3. Margin of Safety
4. Bilanzanalyse für Value-Investoren
5. Contrarian Investing
6. Langfristiger Vermögensaufbau

### Kurs 4: Aktienoptionen (5 Kapitel, gesperrt)

1. Was sind Optionen?
2. Calls und Puts verstehen
3. Grundlegende Optionsstrategien
4. Covered Calls & Protective Puts
5. Risikomanagement mit Optionen

Jedes Kapitel: 2-3 Textabschnitte, 1 Merke-Box, 1 Platzhalter-Video, Quiz mit 5-8 Fragen.
Gesperrte Kurse: nur Titel sichtbar.

---

## Deployment

- **Hosting:** Netlify (Static Site)
- **Build:** `npm run build` → `dist/`
- **Analytics:** Netlify Analytics für Visit-Tracking (keine eigene Tracking-Lösung)
