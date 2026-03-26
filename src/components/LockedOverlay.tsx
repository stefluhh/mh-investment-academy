import { Dialog, DialogContent, DialogActions, Typography, Button, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Kurs } from '../types';

interface LockedOverlayProps {
  kurs: Kurs;
  open: boolean;
  onClose: () => void;
}

export default function LockedOverlay({ kurs, open, onClose }: LockedOverlayProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ textAlign: 'center', pt: 4 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            bgcolor: 'grey.100',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <LockIcon sx={{ color: 'grey.500', fontSize: 28 }} />
        </Box>
        <Typography variant="h6" gutterBottom>
          {kurs.titel}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {kurs.beschreibung}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
        <Button variant="contained" fullWidth onClick={onClose}>
          Jetzt freischalten
        </Button>
      </DialogActions>
    </Dialog>
  );
}
