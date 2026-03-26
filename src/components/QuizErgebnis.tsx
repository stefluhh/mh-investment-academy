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
