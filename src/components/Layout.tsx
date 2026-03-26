import { useState, ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Container,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" sx={{ bgcolor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Box
            component="img"
            src="https://framerusercontent.com/images/pjfDzLsbBdOPWoOq6AS7gA6bhuE.svg?width=180&height=32"
            alt="MH Investment Academy"
            sx={{ height: 24, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              width: 36,
              height: 36,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            MM
          </Avatar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                navigate('/profil');
              }}
            >
              <Typography variant="body2">Profil</Typography>
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              <Typography variant="body2" color="text.secondary">
                Abmelden
              </Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ py: 3, px: { xs: 2, sm: 3 }, flex: 1 }} disableGutters>
        {children}
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: 'secondary.main',
          py: 3,
          px: { xs: 2, sm: 3 },
          mt: 6,
          textAlign: 'center',
        }}
      >
        <Box
          component="img"
          src="https://framerusercontent.com/images/pjfDzLsbBdOPWoOq6AS7gA6bhuE.svg?width=180&height=32"
          alt="MH Total Return"
          sx={{ height: 18, mb: 1.5, filter: 'brightness(0) invert(1)', opacity: 0.7 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 1.5 }}>
          <Link href="https://www.totalreturn-capital.com/impressum" target="_blank" rel="noopener" underline="hover" sx={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            Impressum
          </Link>
          <Link href="https://www.totalreturn-capital.com/datenschuz" target="_blank" rel="noopener" underline="hover" sx={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
            Datenschutz
          </Link>
        </Box>
        <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          Moritz Hessel 2026 ©
        </Typography>
      </Box>
    </Box>
  );
}
