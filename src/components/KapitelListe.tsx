import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Kapitel } from '../types';

interface KapitelListeProps {
  kapitel: Kapitel[];
  istAbgeschlossen: (kapitelId: string) => boolean;
  aktuellesKapitelId: string | null;
  onKapitelClick: (kapitelId: string) => void;
}

export default function KapitelListe({
  kapitel,
  istAbgeschlossen,
  aktuellesKapitelId,
  onKapitelClick,
}: KapitelListeProps) {
  return (
    <Box>
      {kapitel.map((kap, index) => {
        const abgeschlossen = istAbgeschlossen(kap.id);
        const istAktuell = kap.id === aktuellesKapitelId;
        const istZukuenftig = !abgeschlossen && !istAktuell;

        return (
          <Box
            key={kap.id}
            onClick={() => {
              if (!istZukuenftig || abgeschlossen || istAktuell) {
                onKapitelClick(kap.id);
              }
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1.5,
              px: 1,
              borderBottom: index < kapitel.length - 1 ? '1px solid' : 'none',
              borderColor: 'divider',
              cursor: istZukuenftig ? 'default' : 'pointer',
              opacity: istZukuenftig ? 0.4 : 1,
              '&:hover': {
                bgcolor: istZukuenftig ? 'transparent' : 'action.hover',
              },
              borderRadius: 1,
              transition: 'background-color 0.2s',
            }}
          >
            {abgeschlossen ? (
              <CheckCircleIcon sx={{ color: 'success.main', fontSize: 24 }} />
            ) : istAktuell ? (
              <PlayCircleFilledIcon sx={{ color: 'primary.main', fontSize: 24 }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ color: 'grey.400', fontSize: 24 }} />
            )}
            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 11,
                  color: kap.goldTitel ? 'warning.main' : 'text.secondary',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                Kapitel {index + 1}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: abgeschlossen
                    ? 'text.secondary'
                    : istAktuell
                      ? 'primary.main'
                      : 'text.primary',
                }}
              >
                {kap.titel}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
