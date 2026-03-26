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
      {/* Hero Section */}
      <Box
        sx={{
          mx: { xs: -2, sm: -3 },
          mt: { xs: -3 },
          mb: 3,
          position: 'relative',
          borderRadius: { xs: 0, sm: '0 0 16px 16px' },
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src="https://framerusercontent.com/images/GF3TyFl047BP15W1ef4wLPVKzSg.jpg?scale-down-to=1024&width=1920&height=1080"
          alt="MH Investment Academy"
          sx={{
            width: '100%',
            height: { xs: 200, sm: 240 },
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(28,63,58,0.95) 0%, rgba(28,63,58,0.4) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            p: { xs: 2, sm: 3 },
          }}
        >
          <Typography sx={{ color: '#ffb959', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, mb: 0.5 }}>
            MH Investment Academy
          </Typography>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: 18, sm: 22 }, lineHeight: 1.3, mb: 1 }}>
            Lerne Investieren wie ein Profi
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.5 }}>
            Praxisnahe Kurse von Hedgefonds-Manager Moritz Hessel — von den Grundlagen bis zu fortgeschrittenen Strategien.
          </Typography>
        </Box>
      </Box>

      {/* Greeting */}
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
