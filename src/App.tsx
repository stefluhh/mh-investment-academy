import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import { FortschrittProvider } from './context/FortschrittContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import KursAnsicht from './pages/KursAnsicht';
import Lernansicht from './pages/Lernansicht';
import QuizSeite from './pages/QuizSeite';
import Profil from './pages/Profil';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FortschrittProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/kurs/:kursId" element={<KursAnsicht />} />
              <Route path="/kurs/:kursId/kapitel/:kapitelId" element={<Lernansicht />} />
              <Route path="/kurs/:kursId/kapitel/:kapitelId/quiz" element={<QuizSeite />} />
              <Route path="/profil" element={<Profil />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </FortschrittProvider>
    </ThemeProvider>
  );
}
