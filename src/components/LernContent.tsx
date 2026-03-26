import { Box, Typography } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { ContentAbschnitt } from '../types';

interface LernContentProps {
  videoUrl: string | null;
  abschnitte: ContentAbschnitt[];
}

export default function LernContent({ videoUrl, abschnitte }: LernContentProps) {
  return (
    <Box>
      {videoUrl && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            bgcolor: '#000',
            borderRadius: 2,
            overflow: 'hidden',
            mb: 3,
          }}
        >
          <Box
            component="iframe"
            src={videoUrl}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      )}

      {abschnitte.map((abschnitt, index) => {
        switch (abschnitt.typ) {
          case 'text':
            return (
              <Typography
                key={index}
                sx={{ fontSize: 15, lineHeight: 1.7, color: 'text.primary', mb: 2 }}
              >
                {abschnitt.inhalt}
              </Typography>
            );
          case 'merke':
            return (
              <Box
                key={index}
                sx={{
                  borderLeft: '3px solid',
                  borderColor: 'warning.main',
                  bgcolor: 'rgba(255,185,89,0.08)',
                  p: 1.5,
                  borderRadius: '0 8px 8px 0',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                  <LightbulbIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: 'warning.main' }}>
                    Merke
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 13, color: 'text.secondary', lineHeight: 1.6 }}>
                  {abschnitt.inhalt}
                </Typography>
              </Box>
            );
          case 'bild':
          case 'diagramm':
            return (
              <Box key={index} sx={{ mb: 2, textAlign: 'center' }}>
                <Box
                  component="img"
                  src={abschnitt.src}
                  alt={abschnitt.caption}
                  sx={{ maxWidth: '100%', borderRadius: 2 }}
                />
                <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.5 }}>
                  {abschnitt.caption}
                </Typography>
              </Box>
            );
        }
      })}
    </Box>
  );
}
