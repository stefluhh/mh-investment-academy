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
