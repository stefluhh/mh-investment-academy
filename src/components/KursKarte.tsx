import { Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Kurs } from '../types';

interface KursKarteProps {
  kurs: Kurs;
  abgeschlossen: number;
  gesamt: number;
  onClick: () => void;
}

export default function KursKarte({ kurs, abgeschlossen, gesamt, onClick }: KursKarteProps) {
  const prozent = gesamt > 0 ? Math.round((abgeschlossen / gesamt) * 100) : 0;
  const isLocked = !kurs.freigeschaltet;

  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 1.5,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2.5,
        mb: 1,
        cursor: 'pointer',
        opacity: isLocked ? 0.5 : 1,
        '&:hover': { borderColor: isLocked ? 'divider' : 'primary.main' },
        transition: 'border-color 0.2s',
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          bgcolor: isLocked ? 'grey.200' : 'secondary.main',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mr: 1.5,
          flexShrink: 0,
        }}
      >
        {isLocked ? (
          <LockIcon sx={{ color: 'grey.500', fontSize: 20 }} />
        ) : (
          <Typography sx={{ color: 'warning.main', fontWeight: 700, fontSize: 16 }}>
            {kurs.icon}
          </Typography>
        )}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: isLocked ? 'grey.500' : 'primary.main' }}>
          {kurs.titel}
        </Typography>
        <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>
          {isLocked ? 'Noch nicht freigeschaltet' : `${abgeschlossen}/${gesamt} Kapitel`}
        </Typography>
      </Box>
      {!isLocked && (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '3px solid',
            borderColor: prozent > 0 ? 'warning.main' : 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'primary.main' }}>
            {prozent}%
          </Typography>
        </Box>
      )}
    </Box>
  );
}
