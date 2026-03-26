import { Box, Typography } from '@mui/material';
import { QuizFrage as QuizFrageType, Antwort } from '../types';

interface QuizFrageProps {
  frage: QuizFrageType;
  ausgewaehlteAntwort: string | null;
  onAntwortWaehlen: (antwortId: string) => void;
  disabled: boolean;
}

export default function QuizFrage({
  frage,
  ausgewaehlteAntwort,
  onAntwortWaehlen,
  disabled,
}: QuizFrageProps) {
  return (
    <Box>
      <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'primary.main', mb: 2, lineHeight: 1.4 }}>
        {frage.frage}
      </Typography>

      {frage.medien && (
        <Box sx={{ mb: 2.5, bgcolor: 'grey.50', borderRadius: 2, p: 2, textAlign: 'center' }}>
          {frage.medien.typ === 'bild' || frage.medien.typ === 'chart' ? (
            <Box component="img" src={frage.medien.src} alt="Quiz-Medien" sx={{ maxWidth: '100%', borderRadius: 1 }} />
          ) : (
            <Box
              component="iframe"
              src={frage.medien.src}
              sx={{ width: '100%', aspectRatio: '16/9', border: 'none', borderRadius: 1 }}
            />
          )}
        </Box>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {frage.antworten.map((antwort: Antwort) => {
          const isSelected = ausgewaehlteAntwort === antwort.id;
          return (
            <Box
              key={antwort.id}
              onClick={() => !disabled && onAntwortWaehlen(antwort.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                border: '2px solid',
                borderColor: isSelected ? 'primary.main' : 'divider',
                borderRadius: 2.5,
                bgcolor: isSelected ? 'rgba(28,63,58,0.05)' : 'transparent',
                cursor: disabled ? 'default' : 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: disabled ? undefined : 'primary.main',
                },
              }}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: isSelected ? 'none' : '2px solid',
                  borderColor: 'divider',
                  bgcolor: isSelected ? 'primary.main' : 'transparent',
                  color: isSelected ? '#fff' : 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {antwort.id.toUpperCase()}
              </Box>
              <Typography
                sx={{
                  fontSize: 14,
                  color: isSelected ? 'primary.main' : 'text.primary',
                  fontWeight: isSelected ? 500 : 400,
                }}
              >
                {antwort.text}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
