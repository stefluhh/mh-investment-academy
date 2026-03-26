import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { QuizFrage, Antwort } from '../types';

interface QuizFeedbackProps {
  frage: QuizFrage;
  gewaehlteAntwortId: string;
}

export default function QuizFeedback({ frage, gewaehlteAntwortId }: QuizFeedbackProps) {
  const gewaehlteAntwort = frage.antworten.find((a) => a.id === gewaehlteAntwortId);
  void gewaehlteAntwort; // used for type narrowing context

  return (
    <Box>
      <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'primary.main', mb: 2, lineHeight: 1.4 }}>
        {frage.frage}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
        {frage.antworten.map((antwort: Antwort) => {
          const isGewaehlt = antwort.id === gewaehlteAntwortId;
          const isKorrekt = antwort.korrekt;
          const showGreen = isKorrekt;
          const showRed = isGewaehlt && !isKorrekt;

          return (
            <Box
              key={antwort.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                border: '2px solid',
                borderColor: showGreen ? 'success.main' : showRed ? 'error.main' : 'divider',
                borderRadius: 2.5,
                bgcolor: showGreen
                  ? 'rgba(34,197,94,0.05)'
                  : showRed
                    ? 'rgba(239,68,68,0.05)'
                    : 'transparent',
                opacity: !showGreen && !showRed ? 0.4 : 1,
              }}
            >
              {showGreen ? (
                <CheckCircleIcon sx={{ color: 'success.main', fontSize: 28, flexShrink: 0 }} />
              ) : showRed ? (
                <CancelIcon sx={{ color: 'error.main', fontSize: 28, flexShrink: 0 }} />
              ) : (
                <Box sx={{ width: 28, height: 28, flexShrink: 0 }} />
              )}
              <Typography
                sx={{
                  fontSize: 14,
                  color: showRed ? 'text.secondary' : 'text.primary',
                  textDecoration: showRed ? 'line-through' : 'none',
                  fontWeight: showGreen ? 500 : 400,
                }}
              >
                {antwort.text}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          bgcolor: 'grey.50',
          borderRadius: 2.5,
          p: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
          <LightbulbIcon sx={{ color: 'warning.main', fontSize: 16 }} />
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'warning.main' }}>
            Erklärung
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.6 }}>
          {frage.erklaerung}
        </Typography>
      </Box>
    </Box>
  );
}
