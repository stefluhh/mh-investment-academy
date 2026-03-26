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
