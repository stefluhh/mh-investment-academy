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
  kursTitle: _kursTitle,
  kapitelTitle: _kapitelTitle,
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
