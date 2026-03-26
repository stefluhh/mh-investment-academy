import { Box, Typography, Button, Snackbar } from '@mui/material';
import { useState } from 'react';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShareIcon from '@mui/icons-material/Share';
import { Badge } from '../types';

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
}

export default function BadgeCard({ badge, earned }: BadgeCardProps) {
  const [snackOpen, setSnackOpen] = useState(false);

  return (
    <Box
      sx={{
        border: '2px solid',
        borderColor: earned ? 'warning.main' : 'divider',
        borderRadius: 3,
        p: 2,
        textAlign: 'center',
        opacity: earned ? 1 : 0.4,
        bgcolor: earned ? 'rgba(255,185,89,0.05)' : 'transparent',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: earned ? 'secondary.main' : 'grey.200',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 1,
        }}
      >
        {earned ? (
          <EmojiEventsIcon sx={{ color: 'warning.main', fontSize: 24 }} />
        ) : (
          <Typography sx={{ color: 'grey.500', fontSize: 18, fontWeight: 700 }}>
            {badge.icon}
          </Typography>
        )}
      </Box>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: earned ? 'primary.main' : 'grey.500' }}>
        {badge.titel}
      </Typography>
      <Typography sx={{ fontSize: 11, color: 'text.secondary', mb: 1 }}>
        {badge.beschreibung}
      </Typography>
      {earned && (
        <>
          <Button
            size="small"
            startIcon={<ShareIcon />}
            sx={{ fontSize: 11 }}
            onClick={() => setSnackOpen(true)}
          >
            In Discord teilen
          </Button>
          <Snackbar
            open={snackOpen}
            autoHideDuration={2000}
            onClose={() => setSnackOpen(false)}
            message="Link kopiert!"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          />
        </>
      )}
    </Box>
  );
}
