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
