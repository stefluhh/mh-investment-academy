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
        kapitel={kurs.kapitel}
        istAbgeschlossen={(kapitelId) => istKapitelAbgeschlossen(kurs.id, kapitelId)}
        aktuellesKapitelId={aktuellesKapitelId}
        onKapitelClick={(kapitelId) => navigate(`/kurs/${kurs.id}/kapitel/${kapitelId}`)}
      />
    </Box>
  );
}
