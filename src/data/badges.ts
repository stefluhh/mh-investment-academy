import { Badge } from '../types';

export const badges: Badge[] = [
  {
    id: 'basiskurs-complete',
    kursId: 'basiskurs',
    titel: 'Basiskurs Absolvent',
    beschreibung: 'Alle Kapitel des Basiskurses bestanden',
    icon: 'B',
  },
  {
    id: 'growth-complete',
    kursId: 'growth',
    titel: 'Growth Investor',
    beschreibung: 'Alle Kapitel des Growth-Investing-Kurses bestanden',
    icon: 'G',
  },
  {
    id: 'value-complete',
    kursId: 'value',
    titel: 'Value Investor',
    beschreibung: 'Alle Kapitel des Value-Investing-Kurses bestanden',
    icon: 'V',
  },
  {
    id: 'optionen-complete',
    kursId: 'optionen',
    titel: 'Optionen Experte',
    beschreibung: 'Alle Kapitel des Aktienoptionen-Kurses bestanden',
    icon: 'O',
  },
];
