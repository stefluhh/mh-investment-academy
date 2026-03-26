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
