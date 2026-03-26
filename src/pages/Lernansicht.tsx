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
