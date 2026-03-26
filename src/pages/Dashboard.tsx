import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { kurse } from '../data/kurse';
import { badges } from '../data/badges';
import { useFortschritt } from '../context/FortschrittContext';
import StatBar from '../components/StatBar';
import KursKarte from '../components/KursKarte';
import LockedOverlay from '../components/LockedOverlay';
import { Kurs } from '../types';

export default function Dashboard() {
  const navigate = useNavigate();
  const { getKursFortschritt, fortschritt } = useFortschritt();
  const [lockedKurs, setLockedKurs] = useState<Kurs | null>(null);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);

  const aktiveKurse = kurse.filter((k) => k.freigeschaltet).length;
  const kapitelFertig = fortschritt.kapitelAbgeschlossen.length;
  const badgeCount = fortschritt.badges.length;

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          mx: { xs: -2, sm: -3 },
          mt: { xs: -3 },
          mb: 3,
          position: 'relative',
          borderRadius: { xs: 0, sm: '0 0 16px 16px' },
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src="https://framerusercontent.com/images/GF3TyFl047BP15W1ef4wLPVKzSg.jpg?scale-down-to=1024&width=1920&height=1080"
          alt="MH Investment Academy"
          sx={{
            width: '100%',
            height: { xs: 200, sm: 240 },
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(28,63,58,0.95) 0%, rgba(28,63,58,0.4) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            p: { xs: 2, sm: 3 },
          }}
        >
          <Typography sx={{ color: '#ffb959', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, mb: 0.5 }}>
            MH Investment Academy
          </Typography>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: { xs: 18, sm: 22 }, lineHeight: 1.3, mb: 1 }}>
            Lerne Investieren wie ein Profi
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.5 }}>
            Praxisnahe Kurse von Hedgefonds-Manager Moritz Hessel — von den Grundlagen bis zu fortgeschrittenen Strategien.
          </Typography>
        </Box>
      </Box>

      {/* Greeting */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
          Willkommen zurück,
        </Typography>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: 'primary.main' }}>
          Max Mustermann
        </Typography>
      </Box>

      <StatBar
        items={[
          { label: 'Aktive Kurse', value: aktiveKurse },
          { label: 'Kapitel fertig', value: kapitelFertig },
          { label: 'Badges', value: badgeCount, onClick: () => setBadgeModalOpen(true) },
        ]}
      />

      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 600,
          color: 'primary.main',
          textTransform: 'uppercase',
          letterSpacing: 1,
          mb: 1,
        }}
      >
        Meine Kurse
      </Typography>

      {kurse.map((kurs) => {
        const { abgeschlossen, gesamt } = getKursFortschritt(kurs.id);
        return (
          <KursKarte
            key={kurs.id}
            kurs={kurs}
            abgeschlossen={abgeschlossen}
            gesamt={gesamt}
            onClick={() => {
              if (kurs.freigeschaltet) {
                navigate(`/kurs/${kurs.id}`);
              } else {
                setLockedKurs(kurs);
              }
            }}
          />
        );
      })}

      {lockedKurs && (
        <LockedOverlay
          kurs={lockedKurs}
          open={Boolean(lockedKurs)}
          onClose={() => setLockedKurs(null)}
        />
      )}

      {/* Badge Info Modal */}
      <Dialog open={badgeModalOpen} onClose={() => setBadgeModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogContent sx={{ pt: 4, textAlign: 'center' }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: badgeCount > 0 ? 'rgba(255,185,89,0.15)' : 'grey.100',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: 32, color: badgeCount > 0 ? 'warning.main' : 'grey.400' }} />
          </Box>

          <Typography variant="h6" gutterBottom>
            {badgeCount > 0 ? `${badgeCount} Badge${badgeCount > 1 ? 's' : ''} verdient!` : 'Was sind Badges?'}
          </Typography>

          {badgeCount > 0 ? (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Du hast bereits {badgeCount} Badge{badgeCount > 1 ? 's' : ''} freigeschaltet. Schließe alle Kapitel eines Kurses ab, um den jeweiligen Kurs-Badge zu erhalten.
              </Typography>
              {fortschritt.badges.map((badgeId) => {
                const badge = badges.find((b) => b.id === badgeId);
                if (!badge) return null;
                return (
                  <Box
                    key={badge.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 1.5,
                      border: '1px solid',
                      borderColor: 'warning.main',
                      borderRadius: 2,
                      bgcolor: 'rgba(255,185,89,0.05)',
                      mb: 1,
                      textAlign: 'left',
                    }}
                  >
                    <EmojiEventsIcon sx={{ color: 'warning.main', fontSize: 24 }} />
                    <Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'primary.main' }}>{badge.titel}</Typography>
                      <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{badge.beschreibung}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                Für jeden Kurs, den du vollständig abschließt, erhältst du einen exklusiven Badge. Badges zeigen deinen Fortschritt und dein Wissen.
              </Typography>

              {/* Discord Badge Mockup */}
              <Box sx={{ bgcolor: '#36393f', borderRadius: 2, p: 2, mb: 2 }}>
                <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', mb: 1.5, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>
                  So sieht's in Discord aus
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: '#1c3f3a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 600, flexShrink: 0 }}>
                    MM
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>Max Mustermann</Typography>
                      <Box sx={{ display: 'flex', gap: 0.3 }}>
                        <Box sx={{ width: 18, height: 18, borderRadius: '4px', bgcolor: '#ffb959', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#1c3f3a' }}>B</Box>
                        <Box sx={{ width: 18, height: 18, borderRadius: '4px', bgcolor: '#ffb959', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#1c3f3a' }}>G</Box>
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>MH Academy Mitglied</Typography>
                  </Box>
                </Box>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
                Teile deine Badges in der Discord-Community und zeige anderen Mitgliedern, was du gelernt hast.
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
          {badgeCount > 0 ? (
            <Button variant="contained" fullWidth onClick={() => { setBadgeModalOpen(false); navigate('/profil'); }}>
              Alle Badges ansehen
            </Button>
          ) : (
            <Button variant="contained" fullWidth onClick={() => setBadgeModalOpen(false)}>
              Verstanden
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
