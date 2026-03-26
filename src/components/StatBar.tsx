import { Box, Typography } from '@mui/material';

interface StatItem {
  label: string;
  value: number;
  onClick?: () => void;
}

interface StatBarProps {
  items: StatItem[];
}

export default function StatBar({ items }: StatBarProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
      {items.map((item) => (
        <Box
          key={item.label}
          onClick={item.onClick}
          sx={{
            flex: 1,
            bgcolor: 'secondary.main',
            borderRadius: 2,
            py: 1.5,
            px: 1,
            textAlign: 'center',
            cursor: item.onClick ? 'pointer' : 'default',
            transition: 'opacity 0.2s',
            '&:hover': item.onClick ? { opacity: 0.85 } : {},
          }}
        >
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: 'warning.main' }}>
            {item.value}
          </Typography>
          <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
