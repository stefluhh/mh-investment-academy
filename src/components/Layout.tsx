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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
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
      <Container maxWidth="sm" sx={{ py: 3, px: { xs: 2, sm: 3 } }} disableGutters>
        {children}
      </Container>
    </Box>
  );
}
