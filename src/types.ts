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
