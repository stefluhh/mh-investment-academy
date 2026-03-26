import { Container, Typography, Button, Box } from '@mui/material'

function App() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Hessel App
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          React + Vite + MUI
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }}>
          Los geht's
        </Button>
      </Box>
    </Container>
  )
}

export default App
