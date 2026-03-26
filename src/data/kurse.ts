import { Kurs, Kapitel } from '../types';

const basiskurs: Kurs = {
  id: 'basiskurs',
  titel: 'Basiskurs',
  beschreibung: 'Lerne die Grundlagen des Investierens — von Aktien über Börsenhandel bis hin zu deinem ersten Portfolio.',
  icon: 'B',
  freigeschaltet: true,
  kapitel: [
    {
      id: 'kap1',
      titel: 'Was ist eine Aktie?',
      goldTitel: true,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Eine Aktie ist ein Wertpapier, das einen Anteil am Grundkapital einer Aktiengesellschaft (AG) verbrieft. Als Aktionär bist du Miteigentümer des Unternehmens und hast Anspruch auf einen Teil des Gewinns (Dividende) sowie ein Stimmrecht auf der Hauptversammlung.',
          },
          {
            typ: 'merke',
            inhalt: 'Eine Aktie = ein Anteil am Unternehmen. Mehr Aktien = größerer Anteil. Der Kurs einer Aktie wird durch Angebot und Nachfrage an der Börse bestimmt.',
          },
          {
            typ: 'text',
            inhalt: 'Es gibt verschiedene Arten von Aktien: Stammaktien gewähren Stimmrechte, Vorzugsaktien bieten oft höhere Dividenden bei eingeschränktem Stimmrecht. Namensaktien sind auf den Eigentümer registriert, Inhaberaktien gehören dem jeweiligen Besitzer.',
          },
        ],
      },
      quiz: [
        {
          id: 'b1q1',
          frage: 'Was verbrieft eine Aktie?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Einen Kredit an das Unternehmen', korrekt: false },
            { id: 'b', text: 'Einen Anteil am Grundkapital einer AG', korrekt: true },
            { id: 'c', text: 'Eine Versicherung gegen Kursverluste', korrekt: false },
            { id: 'd', text: 'Ein Recht auf Unternehmensführung', korrekt: false },
          ],
          erklaerung: 'Eine Aktie verbrieft einen Anteil am Grundkapital einer Aktiengesellschaft. Du wirst damit zum Miteigentümer des Unternehmens.',
        },
        {
          id: 'b1q2',
          frage: 'Welche Aktienart gewährt typischerweise ein Stimmrecht auf der Hauptversammlung?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Vorzugsaktien', korrekt: false },
            { id: 'b', text: 'Inhaberaktien', korrekt: false },
            { id: 'c', text: 'Stammaktien', korrekt: true },
            { id: 'd', text: 'Namensaktien', korrekt: false },
          ],
          erklaerung: 'Stammaktien gewähren dem Aktionär ein Stimmrecht auf der Hauptversammlung. Vorzugsaktien bieten dafür oft eine höhere Dividende.',
        },
        {
          id: 'b1q3',
          frage: 'Wodurch wird der Kurs einer Aktie bestimmt?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Durch die Unternehmensleitung', korrekt: false },
            { id: 'b', text: 'Durch staatliche Regulierung', korrekt: false },
            { id: 'c', text: 'Durch Angebot und Nachfrage an der Börse', korrekt: true },
            { id: 'd', text: 'Durch den Buchwert des Unternehmens', korrekt: false },
          ],
          erklaerung: 'Der Aktienkurs wird an der Börse durch Angebot und Nachfrage bestimmt. Wollen viele Anleger kaufen, steigt der Kurs — wollen viele verkaufen, sinkt er.',
        },
        {
          id: 'b1q4',
          frage: 'Was ist eine Dividende?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Eine Gebühr für den Aktienhandel', korrekt: false },
            { id: 'b', text: 'Ein Anteil am Unternehmensgewinn für Aktionäre', korrekt: true },
            { id: 'c', text: 'Der Unterschied zwischen Kauf- und Verkaufskurs', korrekt: false },
            { id: 'd', text: 'Eine Steuer auf Kursgewinne', korrekt: false },
          ],
          erklaerung: 'Die Dividende ist eine Gewinnausschüttung des Unternehmens an seine Aktionäre. Nicht alle Unternehmen zahlen Dividenden — manche reinvestieren ihre Gewinne.',
        },
        {
          id: 'b1q5',
          frage: 'Was unterscheidet Vorzugsaktien von Stammaktien?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Vorzugsaktien sind immer teurer', korrekt: false },
            { id: 'b', text: 'Vorzugsaktien bieten oft höhere Dividenden bei eingeschränktem Stimmrecht', korrekt: true },
            { id: 'c', text: 'Vorzugsaktien können nicht an der Börse gehandelt werden', korrekt: false },
            { id: 'd', text: 'Es gibt keinen Unterschied', korrekt: false },
          ],
          erklaerung: 'Vorzugsaktien bieten typischerweise eine höhere Dividende als Stammaktien, dafür ist das Stimmrecht eingeschränkt oder entfällt ganz.',
        },
      ],
    },
    {
      id: 'kap2',
      titel: 'Wie funktioniert die Börse?',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Die Börse ist ein organisierter Marktplatz, auf dem Wertpapiere wie Aktien, Anleihen und Fonds gehandelt werden. Die bekannteste deutsche Börse ist die Frankfurter Wertpapierbörse (FWB), international sind die New York Stock Exchange (NYSE) und die NASDAQ führend.',
          },
          {
            typ: 'merke',
            inhalt: 'Börsenkurse entstehen durch das Zusammenspiel von Kauf- und Verkaufsaufträgen. Der Preis, zu dem die meisten Orders ausgeführt werden können, ist der aktuelle Kurs.',
          },
          {
            typ: 'text',
            inhalt: 'Als Privatanleger handelst du über einen Broker, der deine Aufträge an die Börse weiterleitet. Du platzierst eine Order (Kauf oder Verkauf) und der Broker führt sie zum bestmöglichen Preis aus. Es gibt verschiedene Ordertypen: Market Orders werden sofort zum aktuellen Kurs ausgeführt, Limit Orders nur zu einem von dir festgelegten Preis.',
          },
        ],
      },
      quiz: [
        {
          id: 'b2q1',
          frage: 'Was ist die Hauptfunktion einer Börse?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Unternehmen zu gründen', korrekt: false },
            { id: 'b', text: 'Ein organisierter Marktplatz für den Wertpapierhandel', korrekt: true },
            { id: 'c', text: 'Kredite an Unternehmen zu vergeben', korrekt: false },
            { id: 'd', text: 'Steuern einzutreiben', korrekt: false },
          ],
          erklaerung: 'Die Börse ist ein organisierter Marktplatz, auf dem Käufer und Verkäufer von Wertpapieren zusammengeführt werden.',
        },
        {
          id: 'b2q2',
          frage: 'Was ist der Unterschied zwischen einer Market Order und einer Limit Order?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Market Orders gelten nur an deutschen Börsen', korrekt: false },
            { id: 'b', text: 'Limit Orders werden sofort ausgeführt, Market Orders nicht', korrekt: false },
            { id: 'c', text: 'Market Orders werden sofort zum aktuellen Kurs ausgeführt, Limit Orders nur zu einem festgelegten Preis', korrekt: true },
            { id: 'd', text: 'Es gibt keinen Unterschied', korrekt: false },
          ],
          erklaerung: 'Eine Market Order wird sofort zum besten verfügbaren Preis ausgeführt. Eine Limit Order wird nur ausgeführt, wenn der gewünschte Preis erreicht wird.',
        },
        {
          id: 'b2q3',
          frage: 'Welche Rolle spielt ein Broker?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Er bestimmt die Aktienkurse', korrekt: false },
            { id: 'b', text: 'Er leitet deine Aufträge an die Börse weiter', korrekt: true },
            { id: 'c', text: 'Er versichert dein Portfolio gegen Verluste', korrekt: false },
            { id: 'd', text: 'Er berät dich bei der Steuererklärung', korrekt: false },
          ],
          erklaerung: 'Der Broker ist dein Vermittler zur Börse. Er nimmt deine Kauf- und Verkaufsaufträge entgegen und führt sie an der Börse aus.',
        },
        {
          id: 'b2q4',
          frage: 'Welche ist die bekannteste deutsche Börse?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Berliner Börse', korrekt: false },
            { id: 'b', text: 'Münchner Börse', korrekt: false },
            { id: 'c', text: 'Frankfurter Wertpapierbörse', korrekt: true },
            { id: 'd', text: 'Hamburger Börse', korrekt: false },
          ],
          erklaerung: 'Die Frankfurter Wertpapierbörse (FWB) ist die größte und bekannteste Börse Deutschlands.',
        },
        {
          id: 'b2q5',
          frage: 'Was passiert, wenn mehr Anleger eine Aktie kaufen als verkaufen wollen?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Der Kurs sinkt', korrekt: false },
            { id: 'b', text: 'Der Kurs bleibt gleich', korrekt: false },
            { id: 'c', text: 'Der Kurs steigt', korrekt: true },
            { id: 'd', text: 'Der Handel wird ausgesetzt', korrekt: false },
          ],
          erklaerung: 'Wenn die Nachfrage das Angebot übersteigt, steigt der Kurs. Das Grundprinzip von Angebot und Nachfrage bestimmt den Preis.',
        },
      ],
    },
    {
      id: 'kap3',
      titel: 'Grundlagen der Aktienanalyse',
      goldTitel: true,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Die Aktienanalyse dient dazu, den Wert einer Aktie einzuschätzen und fundierte Investmententscheidungen zu treffen. Es gibt zwei Hauptansätze: die Fundamentalanalyse und die technische Analyse.',
          },
          {
            typ: 'merke',
            inhalt: 'Fundamentalanalyse betrachtet die wirtschaftlichen Kennzahlen eines Unternehmens (Umsatz, Gewinn, Schulden). Technische Analyse betrachtet Kursverläufe und Handelsvolumen.',
          },
          {
            typ: 'text',
            inhalt: 'Bei der Fundamentalanalyse untersuchst du Bilanzen, Gewinn- und Verlustrechnungen sowie Cashflow-Statements. Du vergleichst Kennzahlen wie KGV, KBV und Eigenkapitalrendite mit Branchendurchschnitten, um unter- oder überbewertete Aktien zu identifizieren.',
          },
        ],
      },
      quiz: [
        {
          id: 'b3q1',
          frage: 'Welche Kennzahl zeigt das Verhältnis von Aktienkurs zum Gewinn pro Aktie?',
          medien: null,
          antworten: [
            { id: 'a', text: 'KBV (Kurs-Buchwert-Verhältnis)', korrekt: false },
            { id: 'b', text: 'KGV (Kurs-Gewinn-Verhältnis)', korrekt: true },
            { id: 'c', text: 'ROE (Return on Equity)', korrekt: false },
            { id: 'd', text: 'EBITDA-Marge', korrekt: false },
          ],
          erklaerung: 'Das KGV (Kurs-Gewinn-Verhältnis) setzt den aktuellen Aktienkurs ins Verhältnis zum Gewinn pro Aktie. Ein niedriges KGV kann auf eine Unterbewertung hindeuten.',
        },
        {
          id: 'b3q2',
          frage: 'Was untersucht die technische Analyse primär?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Unternehmensbilanzen', korrekt: false },
            { id: 'b', text: 'Kursverläufe und Handelsvolumen', korrekt: true },
            { id: 'c', text: 'Managementqualität', korrekt: false },
            { id: 'd', text: 'Dividendenhistorie', korrekt: false },
          ],
          erklaerung: 'Die technische Analyse fokussiert sich auf historische Kursdaten und Handelsvolumen, um zukünftige Kursbewegungen vorherzusagen.',
        },
        {
          id: 'b3q3',
          frage: 'Was ist das Ziel der Fundamentalanalyse?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Den kurzfristigen Kursverlauf vorherzusagen', korrekt: false },
            { id: 'b', text: 'Den inneren Wert eines Unternehmens zu bestimmen', korrekt: true },
            { id: 'c', text: 'Die beste Orderart auszuwählen', korrekt: false },
            { id: 'd', text: 'Steuern zu optimieren', korrekt: false },
          ],
          erklaerung: 'Die Fundamentalanalyse versucht, den inneren (fairen) Wert eines Unternehmens zu bestimmen und diesen mit dem aktuellen Marktpreis zu vergleichen.',
        },
        {
          id: 'b3q4',
          frage: 'Welches Dokument zeigt die Einnahmen und Ausgaben eines Unternehmens?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Die Bilanz', korrekt: false },
            { id: 'b', text: 'Das Cashflow-Statement', korrekt: false },
            { id: 'c', text: 'Die Gewinn- und Verlustrechnung', korrekt: true },
            { id: 'd', text: 'Der Geschäftsbericht', korrekt: false },
          ],
          erklaerung: 'Die Gewinn- und Verlustrechnung (GuV) zeigt die Einnahmen und Ausgaben eines Unternehmens über einen bestimmten Zeitraum.',
        },
        {
          id: 'b3q5',
          frage: 'Was deutet ein niedriges KGV im Branchenvergleich an?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Das Unternehmen ist hochverschuldet', korrekt: false },
            { id: 'b', text: 'Die Aktie könnte unterbewertet sein', korrekt: true },
            { id: 'c', text: 'Das Unternehmen zahlt hohe Dividenden', korrekt: false },
            { id: 'd', text: 'Die Aktie ist sehr volatil', korrekt: false },
          ],
          erklaerung: 'Ein niedriges KGV im Vergleich zur Branche kann darauf hindeuten, dass die Aktie unterbewertet ist — der Markt bewertet den Gewinn des Unternehmens geringer als bei Wettbewerbern.',
        },
      ],
    },
    {
      id: 'kap4',
      titel: 'Dein erstes Portfolio',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Ein Portfolio ist die Gesamtheit deiner Investitionen. Der Schlüssel zu einem erfolgreichen Portfolio liegt in der Diversifikation — also der Verteilung deines Kapitals auf verschiedene Anlageklassen, Branchen und Regionen.',
          },
          {
            typ: 'merke',
            inhalt: 'Diversifikation reduziert das Risiko: Verluste in einem Bereich können durch Gewinne in anderen Bereichen ausgeglichen werden. Setze nie alles auf eine Karte!',
          },
          {
            typ: 'text',
            inhalt: 'Für Einsteiger empfiehlt sich ein Kern-Satelliten-Ansatz: 70-80% deines Portfolios bilden den stabilen Kern (z.B. breit gestreute ETFs), während 20-30% als Satelliten in einzelne Aktien oder Sektoren investiert werden.',
          },
        ],
      },
      quiz: [
        {
          id: 'b4q1',
          frage: 'Was ist ein Vorteil von Diversifikation?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Garantierte Rendite', korrekt: false },
            { id: 'b', text: 'Risikoreduktion im Portfolio', korrekt: true },
            { id: 'c', text: 'Steuerliche Vorteile', korrekt: false },
            { id: 'd', text: 'Höhere Liquidität', korrekt: false },
          ],
          erklaerung: 'Diversifikation reduziert das unsystematische Risiko, indem Verluste einzelner Positionen durch Gewinne anderer ausgeglichen werden können.',
        },
        {
          id: 'b4q2',
          frage: 'Wie viel Prozent sollte laut Kern-Satelliten-Ansatz der stabile Kern ausmachen?',
          medien: null,
          antworten: [
            { id: 'a', text: '20-30%', korrekt: false },
            { id: 'b', text: '50%', korrekt: false },
            { id: 'c', text: '70-80%', korrekt: true },
            { id: 'd', text: '100%', korrekt: false },
          ],
          erklaerung: 'Beim Kern-Satelliten-Ansatz bilden 70-80% des Portfolios den stabilen Kern (z.B. ETFs). Die restlichen 20-30% werden in einzelne Aktien oder Sektoren investiert.',
        },
        {
          id: 'b4q3',
          frage: 'Was eignet sich am besten als Kern-Investment für Einsteiger?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Einzelne Growth-Aktien', korrekt: false },
            { id: 'b', text: 'Breit gestreute ETFs', korrekt: true },
            { id: 'c', text: 'Kryptowährungen', korrekt: false },
            { id: 'd', text: 'Aktienoptionen', korrekt: false },
          ],
          erklaerung: 'Breit gestreute ETFs bilden ganze Märkte ab und bieten damit automatische Diversifikation bei niedrigen Kosten — ideal als Kern-Investment.',
        },
        {
          id: 'b4q4',
          frage: 'Was bedeutet "Setze nie alles auf eine Karte"?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Man sollte nie in Aktien investieren', korrekt: false },
            { id: 'b', text: 'Man sollte sein Kapital auf verschiedene Investments verteilen', korrekt: true },
            { id: 'c', text: 'Man sollte nur einen Broker nutzen', korrekt: false },
            { id: 'd', text: 'Man sollte nur in eine Branche investieren', korrekt: false },
          ],
          erklaerung: 'Das Sprichwort beschreibt das Prinzip der Diversifikation: Verteile dein Kapital auf verschiedene Anlagen, um das Risiko zu streuen.',
        },
        {
          id: 'b4q5',
          frage: 'Welches Risiko kann durch Diversifikation NICHT reduziert werden?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Branchenrisiko', korrekt: false },
            { id: 'b', text: 'Unternehmensrisiko', korrekt: false },
            { id: 'c', text: 'Systematisches Marktrisiko', korrekt: true },
            { id: 'd', text: 'Länderrisiko', korrekt: false },
          ],
          erklaerung: 'Systematisches Risiko (z.B. globale Wirtschaftskrisen) betrifft den gesamten Markt und kann nicht durch Diversifikation eliminiert werden — nur unsystematische Risiken lassen sich streuen.',
        },
      ],
    },
    {
      id: 'kap5',
      titel: 'Kennzahlen verstehen',
      goldTitel: true,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Finanzkennzahlen sind das Werkzeug des Investors. Sie helfen dir, Unternehmen objektiv zu bewerten und miteinander zu vergleichen. Die wichtigsten Kennzahlen sind KGV, KBV, Dividendenrendite und Eigenkapitalrendite.',
          },
          {
            typ: 'merke',
            inhalt: 'KGV = Aktienkurs / Gewinn pro Aktie. KBV = Aktienkurs / Buchwert pro Aktie. Dividendenrendite = Dividende / Aktienkurs × 100.',
          },
          {
            typ: 'text',
            inhalt: 'Kennzahlen sind nie isoliert zu betrachten. Ein KGV von 15 kann in der Tech-Branche günstig sein, während es im Versorgungssektor teuer wäre. Vergleiche Kennzahlen immer mit dem Branchendurchschnitt und der historischen Bewertung des Unternehmens.',
          },
        ],
      },
      quiz: [
        {
          id: 'b5q1',
          frage: 'Wie berechnet man das KGV?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Gewinn / Aktienkurs', korrekt: false },
            { id: 'b', text: 'Aktienkurs / Gewinn pro Aktie', korrekt: true },
            { id: 'c', text: 'Dividende / Aktienkurs', korrekt: false },
            { id: 'd', text: 'Aktienkurs / Buchwert', korrekt: false },
          ],
          erklaerung: 'Das KGV (Kurs-Gewinn-Verhältnis) berechnet sich als Aktienkurs geteilt durch den Gewinn pro Aktie. Es zeigt, das Wievielfache des Gewinns du für die Aktie bezahlst.',
        },
        {
          id: 'b5q2',
          frage: 'Warum sollte man Kennzahlen nie isoliert betrachten?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil Kennzahlen immer falsch sind', korrekt: false },
            { id: 'b', text: 'Weil verschiedene Branchen unterschiedliche Bewertungsniveaus haben', korrekt: true },
            { id: 'c', text: 'Weil nur der Aktienkurs zählt', korrekt: false },
            { id: 'd', text: 'Weil Kennzahlen gesetzlich reguliert sind', korrekt: false },
          ],
          erklaerung: 'Verschiedene Branchen haben typischerweise unterschiedliche Bewertungsniveaus. Ein KGV von 25 ist in der Tech-Branche normal, im Bankensektor wäre es hoch.',
        },
        {
          id: 'b5q3',
          frage: 'Was misst die Dividendenrendite?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Den Gewinn pro Aktie', korrekt: false },
            { id: 'b', text: 'Das Verhältnis von Dividende zum Aktienkurs', korrekt: true },
            { id: 'c', text: 'Die Schulden des Unternehmens', korrekt: false },
            { id: 'd', text: 'Die Kursveränderung pro Jahr', korrekt: false },
          ],
          erklaerung: 'Die Dividendenrendite zeigt, wie viel Prozent des Aktienkurses als Dividende ausgeschüttet werden: Dividende / Aktienkurs × 100.',
        },
        {
          id: 'b5q4',
          frage: 'Was zeigt das KBV (Kurs-Buchwert-Verhältnis)?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Das Verhältnis von Aktienkurs zum Buchwert pro Aktie', korrekt: true },
            { id: 'b', text: 'Die jährliche Kursrendite', korrekt: false },
            { id: 'c', text: 'Den Verschuldungsgrad', korrekt: false },
            { id: 'd', text: 'Die Marktkapitalisierung', korrekt: false },
          ],
          erklaerung: 'Das KBV setzt den Aktienkurs ins Verhältnis zum Buchwert pro Aktie. Ein KBV unter 1 bedeutet, dass die Aktie unter ihrem Buchwert notiert.',
        },
        {
          id: 'b5q5',
          frage: 'Ein Unternehmen hat einen Kurs von 50€ und einen Gewinn pro Aktie von 5€. Wie hoch ist das KGV?',
          medien: null,
          antworten: [
            { id: 'a', text: '5', korrekt: false },
            { id: 'b', text: '10', korrekt: true },
            { id: 'c', text: '25', korrekt: false },
            { id: 'd', text: '250', korrekt: false },
          ],
          erklaerung: 'KGV = Aktienkurs / Gewinn pro Aktie = 50€ / 5€ = 10. Du bezahlst also das 10-Fache des jährlichen Gewinns für diese Aktie.',
        },
      ],
    },
    {
      id: 'kap6',
      titel: 'Typische Anfängerfehler',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Die größten Fehler beim Investieren sind emotionale Entscheidungen. Viele Anfänger kaufen aus Gier, wenn Kurse steigen (FOMO), und verkaufen aus Angst, wenn Kurse fallen. Dieses Verhalten führt dazu, dass man teuer kauft und billig verkauft — das Gegenteil einer erfolgreichen Strategie.',
          },
          {
            typ: 'merke',
            inhalt: 'Die drei häufigsten Anfängerfehler: 1. Emotionales Handeln (Panikverkäufe, FOMO-Käufe), 2. Market Timing (den perfekten Ein-/Ausstieg finden wollen), 3. Overtrading (zu häufiges Kaufen/Verkaufen).',
          },
          {
            typ: 'text',
            inhalt: 'Erfolgreiche Investoren haben einen Plan und halten sich daran. Sie investieren regelmäßig (z.B. monatlich per Sparplan), diversifizieren breit und denken langfristig. Zeit im Markt schlägt fast immer das Timing des Marktes.',
          },
        ],
      },
      quiz: [
        {
          id: 'b6q1',
          frage: 'Was bedeutet FOMO im Investmentkontext?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Eine technische Analysemethode', korrekt: false },
            { id: 'b', text: 'Fear of Missing Out — die Angst, eine Chance zu verpassen', korrekt: true },
            { id: 'c', text: 'Ein Ordertyp an der Börse', korrekt: false },
            { id: 'd', text: 'Ein Maß für Marktvolatilität', korrekt: false },
          ],
          erklaerung: 'FOMO (Fear of Missing Out) beschreibt die Angst, eine Chance zu verpassen, und führt oft dazu, dass Anleger in steigende Kurse hinein kaufen — oft zu Höchstpreisen.',
        },
        {
          id: 'b6q2',
          frage: 'Warum ist Market Timing problematisch?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil es illegal ist', korrekt: false },
            { id: 'b', text: 'Weil es hohe Gebühren verursacht', korrekt: false },
            { id: 'c', text: 'Weil es nahezu unmöglich ist, den perfekten Ein- und Ausstiegspunkt zu finden', korrekt: true },
            { id: 'd', text: 'Weil es nur für institutionelle Investoren erlaubt ist', korrekt: false },
          ],
          erklaerung: 'Studien zeigen, dass selbst professionelle Fondsmanager den Markt selten dauerhaft timen können. Zeit im Markt ist fast immer besser als Timing des Marktes.',
        },
        {
          id: 'b6q3',
          frage: 'Was ist Overtrading?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Zu wenig handeln', korrekt: false },
            { id: 'b', text: 'Zu häufiges Kaufen und Verkaufen', korrekt: true },
            { id: 'c', text: 'Nur an einem Handelsplatz handeln', korrekt: false },
            { id: 'd', text: 'Zu große Positionen eingehen', korrekt: false },
          ],
          erklaerung: 'Overtrading bedeutet zu häufiges Handeln. Jede Transaktion verursacht Kosten (Gebühren, Spread) und emotionale Entscheidungen, die die Rendite schmälern.',
        },
        {
          id: 'b6q4',
          frage: 'Welche Strategie empfiehlt sich für Einsteiger?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Tägliches aktives Trading', korrekt: false },
            { id: 'b', text: 'Alles auf eine vielversprechende Aktie setzen', korrekt: false },
            { id: 'c', text: 'Regelmäßig per Sparplan investieren und langfristig denken', korrekt: true },
            { id: 'd', text: 'Nur in Krisenzeiten kaufen', korrekt: false },
          ],
          erklaerung: 'Regelmäßiges Investieren per Sparplan (Cost-Average-Effekt) und langfristiges Denken sind bewährte Strategien für Einsteiger.',
        },
        {
          id: 'b6q5',
          frage: 'Was schlägt historisch fast immer das Timing des Marktes?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Leerverkäufe', korrekt: false },
            { id: 'b', text: 'Optionsstrategien', korrekt: false },
            { id: 'c', text: 'Zeit im Markt', korrekt: true },
            { id: 'd', text: 'Daytrading', korrekt: false },
          ],
          erklaerung: '"Time in the market beats timing the market" — langfristig investiert zu bleiben bringt historisch bessere Ergebnisse als der Versuch, die besten Ein- und Ausstiegszeitpunkte zu finden.',
        },
      ],
    },
  ],
};

const growthInvesting: Kurs = {
  id: 'growth',
  titel: 'Investmentstrategie: Growth Investing',
  beschreibung: 'Lerne, wie du Wachstumsaktien erkennst, bewertest und ein Growth-Portfolio aufbaust.',
  icon: 'G',
  freigeschaltet: true,
  kapitel: [
    {
      id: 'kap1',
      titel: 'Was ist Growth Investing?',
      goldTitel: true,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Growth Investing ist eine Investmentstrategie, die auf Unternehmen mit überdurchschnittlichem Wachstumspotenzial setzt. Growth-Investoren suchen Unternehmen, die ihre Umsätze und Gewinne schneller steigern als der Gesamtmarkt.',
          },
          {
            typ: 'merke',
            inhalt: 'Growth-Aktien zeichnen sich aus durch: hohes Umsatzwachstum (>20% p.a.), expandierende Märkte, innovative Produkte und oft hohe Bewertungen (hohes KGV).',
          },
          {
            typ: 'text',
            inhalt: 'Im Gegensatz zu Value Investing, das nach unterbewerteten Aktien sucht, akzeptiert Growth Investing höhere Bewertungen — in der Erwartung, dass das Unternehmenswachstum die Bewertung rechtfertigt.',
          },
        ],
      },
      quiz: [
        {
          id: 'g1q1',
          frage: 'Was zeichnet Growth-Aktien typischerweise aus?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Niedrige Bewertung und hohe Dividende', korrekt: false },
            { id: 'b', text: 'Hohes Umsatzwachstum und oft hohe Bewertungen', korrekt: true },
            { id: 'c', text: 'Stabiler Kurs ohne große Schwankungen', korrekt: false },
            { id: 'd', text: 'Hohe Verschuldung', korrekt: false },
          ],
          erklaerung: 'Growth-Aktien wachsen überdurchschnittlich schnell und werden deshalb oft mit einem Premium (hohes KGV) bewertet.',
        },
        {
          id: 'g1q2',
          frage: 'Wie unterscheidet sich Growth Investing von Value Investing?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Growth Investing ist weniger riskant', korrekt: false },
            { id: 'b', text: 'Growth akzeptiert höhere Bewertungen für höheres Wachstum', korrekt: true },
            { id: 'c', text: 'Value Investing fokussiert auf Technologie-Aktien', korrekt: false },
            { id: 'd', text: 'Es gibt keinen Unterschied', korrekt: false },
          ],
          erklaerung: 'Growth Investing zahlt höhere Preise für Aktien mit starkem Wachstumspotenzial, während Value Investing nach unterbewerteten Schnäppchen sucht.',
        },
        {
          id: 'g1q3',
          frage: 'Ab welcher Wachstumsrate spricht man typischerweise von einer Growth-Aktie?',
          medien: null,
          antworten: [
            { id: 'a', text: '5% pro Jahr', korrekt: false },
            { id: 'b', text: '10% pro Jahr', korrekt: false },
            { id: 'c', text: 'Über 20% pro Jahr', korrekt: true },
            { id: 'd', text: 'Über 50% pro Jahr', korrekt: false },
          ],
          erklaerung: 'Growth-Aktien weisen typischerweise ein Umsatzwachstum von über 20% pro Jahr auf — deutlich über dem Marktdurchschnitt.',
        },
        {
          id: 'g1q4',
          frage: 'Warum haben Growth-Aktien oft ein hohes KGV?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil sie überschuldet sind', korrekt: false },
            { id: 'b', text: 'Weil der Markt zukünftiges Wachstum einpreist', korrekt: true },
            { id: 'c', text: 'Weil sie hohe Dividenden zahlen', korrekt: false },
            { id: 'd', text: 'Weil es ein Berechnungsfehler ist', korrekt: false },
          ],
          erklaerung: 'Der Markt bewertet Growth-Aktien höher, weil Investoren erwarten, dass die zukünftigen Gewinne das aktuelle Bewertungsniveau rechtfertigen werden.',
        },
        {
          id: 'g1q5',
          frage: 'Was ist KEIN typisches Merkmal einer Growth-Aktie?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Hohe Dividendenausschüttung', korrekt: true },
            { id: 'b', text: 'Innovative Produkte', korrekt: false },
            { id: 'c', text: 'Expandierender Markt', korrekt: false },
            { id: 'd', text: 'Steigende Umsätze', korrekt: false },
          ],
          erklaerung: 'Growth-Unternehmen reinvestieren ihre Gewinne typischerweise in weiteres Wachstum statt Dividenden auszuschütten.',
        },
      ],
    },
    {
      id: 'kap2',
      titel: 'Wachstumsaktien erkennen',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Um Wachstumsaktien zu identifizieren, analysierst du drei Schlüsselbereiche: Umsatzwachstum, Margen und den Total Addressable Market (TAM). Ein Unternehmen braucht alle drei Faktoren, um langfristig erfolgreich zu wachsen.',
          },
          {
            typ: 'merke',
            inhalt: 'TAM (Total Addressable Market) = die gesamte Marktgröße, die ein Unternehmen adressieren kann. Je größer der TAM, desto mehr Wachstumspotenzial.',
          },
          {
            typ: 'text',
            inhalt: 'Achte auf steigende Bruttomargen — sie zeigen, dass das Unternehmen Skaleneffekte nutzt. Eine steigende Marge bei gleichzeitig steigendem Umsatz ist das stärkste Signal für eine gute Growth-Aktie.',
          },
        ],
      },
      quiz: [
        {
          id: 'g2q1',
          frage: 'Was bedeutet TAM?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Total Annual Margin', korrekt: false },
            { id: 'b', text: 'Total Addressable Market', korrekt: true },
            { id: 'c', text: 'Technical Analysis Method', korrekt: false },
            { id: 'd', text: 'Trading Activity Metric', korrekt: false },
          ],
          erklaerung: 'TAM (Total Addressable Market) beschreibt die gesamte Marktgröße, die ein Unternehmen theoretisch adressieren kann.',
        },
        {
          id: 'g2q2',
          frage: 'Was ist das stärkste Wachstumssignal?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Steigende Schulden bei sinkendem Umsatz', korrekt: false },
            { id: 'b', text: 'Steigende Margen bei gleichzeitig steigendem Umsatz', korrekt: true },
            { id: 'c', text: 'Sinkende Preise bei steigendem Volumen', korrekt: false },
            { id: 'd', text: 'Steigende Dividenden', korrekt: false },
          ],
          erklaerung: 'Wenn ein Unternehmen gleichzeitig Umsatz und Margen steigern kann, zeigt es, dass es Skaleneffekte nutzt und profitabel wächst.',
        },
        {
          id: 'g2q3',
          frage: 'Welche drei Schlüsselbereiche analysiert man bei Growth-Aktien?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Dividende, Schulden, Mitarbeiterzahl', korrekt: false },
            { id: 'b', text: 'Umsatzwachstum, Margen, TAM', korrekt: true },
            { id: 'c', text: 'KGV, KBV, Dividendenrendite', korrekt: false },
            { id: 'd', text: 'Aktienkurs, Volumen, Volatilität', korrekt: false },
          ],
          erklaerung: 'Die drei Kernbereiche der Growth-Analyse sind Umsatzwachstum (wie schnell wächst das Unternehmen?), Margen (wie profitabel?) und TAM (wie groß ist die Chance?).',
        },
        {
          id: 'g2q4',
          frage: 'Was zeigen steigende Bruttomargen?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Das Unternehmen spart bei den Mitarbeitern', korrekt: false },
            { id: 'b', text: 'Das Unternehmen nutzt Skaleneffekte', korrekt: true },
            { id: 'c', text: 'Das Unternehmen erhöht die Preise willkürlich', korrekt: false },
            { id: 'd', text: 'Das Unternehmen senkt die Qualität', korrekt: false },
          ],
          erklaerung: 'Steigende Bruttomargen deuten auf Skaleneffekte hin — das Unternehmen kann pro verkaufter Einheit mehr Gewinn erzielen, je größer es wird.',
        },
        {
          id: 'g2q5',
          frage: 'Warum ist ein großer TAM wichtig für Growth-Aktien?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil er die Dividende bestimmt', korrekt: false },
            { id: 'b', text: 'Weil er das maximale Wachstumspotenzial definiert', korrekt: true },
            { id: 'c', text: 'Weil er den Aktienkurs festlegt', korrekt: false },
            { id: 'd', text: 'Weil er steuerliche Vorteile bringt', korrekt: false },
          ],
          erklaerung: 'Ein großer TAM bedeutet, dass das Unternehmen noch viel Raum zum Wachsen hat. Ein Unternehmen mit 1% Marktanteil in einem riesigen Markt hat mehr Potenzial als eines mit 80% in einem kleinen.',
        },
      ],
    },
    {
      id: 'kap3',
      titel: 'Bewertung von Growth-Aktien',
      goldTitel: true,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Growth-Aktien sind mit klassischen Kennzahlen wie dem KGV schwer zu bewerten. Stattdessen nutzen Growth-Investoren spezielle Metriken: die PEG-Ratio und die Rule of 40.',
          },
          {
            typ: 'merke',
            inhalt: 'PEG-Ratio = KGV / erwartetes Gewinnwachstum. Eine PEG unter 1 deutet auf Unterbewertung hin. Rule of 40: Umsatzwachstum + Gewinnmarge sollte > 40% sein.',
          },
          {
            typ: 'text',
            inhalt: 'Die Rule of 40 ist besonders bei SaaS-Unternehmen beliebt. Ein Unternehmen mit 30% Wachstum und 15% Marge erreicht 45% — das gilt als gesund. Umgekehrt signalisiert ein Wert unter 40%, dass das Unternehmen entweder zu langsam wächst oder nicht profitabel genug ist.',
          },
        ],
      },
      quiz: [
        {
          id: 'g3q1',
          frage: 'Wie berechnet man die PEG-Ratio?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Aktienkurs / Gewinn pro Aktie', korrekt: false },
            { id: 'b', text: 'KGV / erwartetes Gewinnwachstum', korrekt: true },
            { id: 'c', text: 'Umsatzwachstum + Gewinnmarge', korrekt: false },
            { id: 'd', text: 'Dividende / Aktienkurs', korrekt: false },
          ],
          erklaerung: 'Die PEG-Ratio (Price/Earnings to Growth) teilt das KGV durch das erwartete Gewinnwachstum. Sie berücksichtigt damit das Wachstum bei der Bewertung.',
        },
        {
          id: 'g3q2',
          frage: 'Was besagt die Rule of 40?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Ein Portfolio sollte maximal 40 Aktien enthalten', korrekt: false },
            { id: 'b', text: 'Umsatzwachstum + Gewinnmarge sollte über 40% liegen', korrekt: true },
            { id: 'c', text: 'Man sollte maximal 40% in eine Aktie investieren', korrekt: false },
            { id: 'd', text: 'Das KGV sollte unter 40 liegen', korrekt: false },
          ],
          erklaerung: 'Die Rule of 40 besagt, dass die Summe aus Umsatzwachstumsrate und Gewinnmarge über 40% liegen sollte. Sie balanciert Wachstum gegen Profitabilität.',
        },
        {
          id: 'g3q3',
          frage: 'Eine PEG-Ratio unter 1 deutet auf was hin?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Überbewertung', korrekt: false },
            { id: 'b', text: 'Unterbewertung relativ zum Wachstum', korrekt: true },
            { id: 'c', text: 'Hohe Dividende', korrekt: false },
            { id: 'd', text: 'Sinkende Umsätze', korrekt: false },
          ],
          erklaerung: 'Eine PEG unter 1 bedeutet, dass das KGV niedriger ist als die Wachstumsrate — die Aktie ist relativ zu ihrem Wachstum günstig bewertet.',
        },
        {
          id: 'g3q4',
          frage: 'Ein SaaS-Unternehmen hat 30% Umsatzwachstum und 15% Marge. Erfüllt es die Rule of 40?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Nein, der Wert ist nur 15%', korrekt: false },
            { id: 'b', text: 'Ja, 30% + 15% = 45% > 40%', korrekt: true },
            { id: 'c', text: 'Nein, man muss multiplizieren: 30% × 15% = 4.5%', korrekt: false },
            { id: 'd', text: 'Man kann es nicht berechnen', korrekt: false },
          ],
          erklaerung: 'Die Rule of 40 addiert Umsatzwachstum und Gewinnmarge: 30% + 15% = 45%. Da 45% > 40%, erfüllt das Unternehmen die Rule of 40.',
        },
        {
          id: 'g3q5',
          frage: 'Warum sind klassische Kennzahlen wie das KGV bei Growth-Aktien oft wenig aussagekräftig?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil Growth-Unternehmen keine Bilanzen haben', korrekt: false },
            { id: 'b', text: 'Weil Growth-Unternehmen oft noch wenig oder keine Gewinne machen', korrekt: true },
            { id: 'c', text: 'Weil das KGV nur für deutsche Aktien gilt', korrekt: false },
            { id: 'd', text: 'Weil Growth-Aktien nicht an der Börse gehandelt werden', korrekt: false },
          ],
          erklaerung: 'Viele Growth-Unternehmen reinvestieren ihre Einnahmen in Wachstum und machen daher geringe oder gar keine Gewinne. Das KGV wird dadurch extrem hoch oder nicht berechenbar.',
        },
      ],
    },
    {
      id: 'kap4',
      titel: 'Risikomanagement',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Growth-Aktien sind volatiler als der Gesamtmarkt. Kursrückgänge von 30-50% sind keine Seltenheit — selbst bei erfolgreichen Unternehmen. Gutes Risikomanagement ist daher essentiell.',
          },
          {
            typ: 'merke',
            inhalt: 'Position Sizing: Investiere nie mehr als 5-10% deines Portfolios in eine einzelne Growth-Aktie. Je spekulativer die Aktie, desto kleiner die Position.',
          },
          {
            typ: 'text',
            inhalt: 'Nutze Trailing Stop-Losses, um Gewinne abzusichern. Ein Trailing Stop von 20-25% lässt der Aktie genug Raum für normale Schwankungen, schützt aber vor größeren Verlusten.',
          },
        ],
      },
      quiz: [
        {
          id: 'g4q1',
          frage: 'Wie viel Prozent des Portfolios sollte maximal in eine einzelne Growth-Aktie fließen?',
          medien: null,
          antworten: [
            { id: 'a', text: '1-2%', korrekt: false },
            { id: 'b', text: '5-10%', korrekt: true },
            { id: 'c', text: '20-30%', korrekt: false },
            { id: 'd', text: '50%', korrekt: false },
          ],
          erklaerung: 'Bei Growth-Aktien empfiehlt sich eine Position von 5-10% des Gesamtportfolios. Bei besonders spekulativen Titeln eher am unteren Ende.',
        },
        {
          id: 'g4q2',
          frage: 'Was ist ein Trailing Stop-Loss?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Ein automatischer Verkauf bei einem festen Kurs', korrekt: false },
            { id: 'b', text: 'Ein Verkaufsauftrag, der sich mit steigendem Kurs nach oben anpasst', korrekt: true },
            { id: 'c', text: 'Ein Kaufauftrag bei fallendem Kurs', korrekt: false },
            { id: 'd', text: 'Eine Versicherung gegen Kursverluste', korrekt: false },
          ],
          erklaerung: 'Ein Trailing Stop-Loss bewegt sich automatisch mit dem Kurs nach oben. Fällt der Kurs um den definierten Prozentsatz vom Höchststand, wird verkauft.',
        },
        {
          id: 'g4q3',
          frage: 'Welcher Trailing Stop-Wert ist für Growth-Aktien sinnvoll?',
          medien: null,
          antworten: [
            { id: 'a', text: '2-5%', korrekt: false },
            { id: 'b', text: '5-10%', korrekt: false },
            { id: 'c', text: '20-25%', korrekt: true },
            { id: 'd', text: '50%', korrekt: false },
          ],
          erklaerung: 'Growth-Aktien sind volatil — ein zu enger Stop wird ständig ausgelöst. 20-25% gibt genug Raum für normale Schwankungen.',
        },
        {
          id: 'g4q4',
          frage: 'Was ist bei Growth-Aktien normal?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Kursrückgänge von maximal 5%', korrekt: false },
            { id: 'b', text: 'Kursrückgänge von 30-50% auch bei guten Unternehmen', korrekt: true },
            { id: 'c', text: 'Stabile Kurse ohne große Schwankungen', korrekt: false },
            { id: 'd', text: 'Ständig steigende Kurse', korrekt: false },
          ],
          erklaerung: 'Selbst erfolgreiche Growth-Aktien erleben regelmäßig Kursrückgänge von 30-50%. Das gehört zur Natur von Wachstumsinvestments.',
        },
        {
          id: 'g4q5',
          frage: 'Was bedeutet Position Sizing?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Die Anzahl der Aktien im Portfolio', korrekt: false },
            { id: 'b', text: 'Die Festlegung, wie viel Kapital in eine einzelne Position investiert wird', korrekt: true },
            { id: 'c', text: 'Die Größe des Gesamtportfolios', korrekt: false },
            { id: 'd', text: 'Die Marktkapitalisierung der Aktie', korrekt: false },
          ],
          erklaerung: 'Position Sizing bestimmt, welchen Anteil deines Portfolios du in eine einzelne Position investierst. Es ist ein zentrales Werkzeug des Risikomanagements.',
        },
      ],
    },
    {
      id: 'kap5',
      titel: 'Portfolio-Aufbau',
      goldTitel: false,
      content: {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        abschnitte: [
          {
            typ: 'text',
            inhalt: 'Ein gut diversifiziertes Growth-Portfolio sollte 10-15 Aktien aus verschiedenen Sektoren enthalten. Konzentriere dich auf 3-4 Kernpositionen (je 8-10%) und ergänze mit kleineren Satelliten-Positionen (je 3-5%).',
          },
          {
            typ: 'merke',
            inhalt: 'Rebalancing: Überprüfe dein Portfolio vierteljährlich. Wenn eine Position durch Kursgewinne zu groß wird (>15%), verkaufe einen Teil und verteile das Kapital neu.',
          },
          {
            typ: 'text',
            inhalt: 'Verteile dein Portfolio auf verschiedene Wachstumssektoren: Technologie, Healthcare, erneuerbare Energien, E-Commerce. So bist du nicht von einem einzigen Sektor abhängig und profitierst von verschiedenen Megatrends.',
          },
        ],
      },
      quiz: [
        {
          id: 'g5q1',
          frage: 'Wie viele Aktien sollte ein Growth-Portfolio typischerweise enthalten?',
          medien: null,
          antworten: [
            { id: 'a', text: '2-3', korrekt: false },
            { id: 'b', text: '10-15', korrekt: true },
            { id: 'c', text: '50-100', korrekt: false },
            { id: 'd', text: 'Nur 1 Aktie', korrekt: false },
          ],
          erklaerung: 'Ein Growth-Portfolio mit 10-15 Aktien bietet genug Diversifikation bei gleichzeitiger Konzentration auf die besten Ideen.',
        },
        {
          id: 'g5q2',
          frage: 'Wann sollte man Rebalancing durchführen?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Täglich', korrekt: false },
            { id: 'b', text: 'Vierteljährlich', korrekt: true },
            { id: 'c', text: 'Nur bei Kursverlusten', korrekt: false },
            { id: 'd', text: 'Nie — einmal kaufen und halten', korrekt: false },
          ],
          erklaerung: 'Vierteljährliches Rebalancing hält die Portfolio-Gewichtung im Gleichgewicht, ohne zu häufig zu handeln.',
        },
        {
          id: 'g5q3',
          frage: 'Was sollte man tun, wenn eine Position über 15% des Portfolios wächst?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Nachkaufen, der Trend ist positiv', korrekt: false },
            { id: 'b', text: 'Einen Teil verkaufen und das Kapital neu verteilen', korrekt: true },
            { id: 'c', text: 'Nichts, Gewinner laufen lassen', korrekt: false },
            { id: 'd', text: 'Alles verkaufen', korrekt: false },
          ],
          erklaerung: 'Eine zu große Einzelposition erhöht das Klumpenrisiko. Durch teilweises Verkaufen und Umverteilen hältst du dein Risiko im Griff.',
        },
        {
          id: 'g5q4',
          frage: 'Wie groß sollten Kernpositionen im Growth-Portfolio sein?',
          medien: null,
          antworten: [
            { id: 'a', text: '1-2%', korrekt: false },
            { id: 'b', text: '3-5%', korrekt: false },
            { id: 'c', text: '8-10%', korrekt: true },
            { id: 'd', text: '20-25%', korrekt: false },
          ],
          erklaerung: 'Kernpositionen (3-4 Stück) sollten je 8-10% des Portfolios ausmachen. Sie bilden das Fundament deines Growth-Portfolios.',
        },
        {
          id: 'g5q5',
          frage: 'Warum sollte man in verschiedene Wachstumssektoren investieren?',
          medien: null,
          antworten: [
            { id: 'a', text: 'Weil es steuerliche Vorteile bringt', korrekt: false },
            { id: 'b', text: 'Um nicht von einem einzigen Sektor abhängig zu sein', korrekt: true },
            { id: 'c', text: 'Weil alle Sektoren gleich stark wachsen', korrekt: false },
            { id: 'd', text: 'Weil es gesetzlich vorgeschrieben ist', korrekt: false },
          ],
          erklaerung: 'Sektordiversifikation schützt dein Portfolio, wenn ein einzelner Sektor schwächelt. Verschiedene Megatrends entwickeln sich unterschiedlich.',
        },
      ],
    },
  ],
};

const valueInvesting: Kurs = {
  id: 'value',
  titel: 'Investmentstrategie: Value Investing',
  beschreibung: 'Lerne die Philosophie von Warren Buffett — wie du unterbewertete Aktien findest und langfristig Vermögen aufbaust.',
  icon: 'V',
  freigeschaltet: false,
  kapitel: [
    {
      id: 'kap1',
      titel: 'Die Philosophie von Value Investing',
      goldTitel: true,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap2',
      titel: 'Innerer Wert berechnen',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap3',
      titel: 'Margin of Safety',
      goldTitel: true,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap4',
      titel: 'Bilanzanalyse für Value-Investoren',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap5',
      titel: 'Contrarian Investing',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap6',
      titel: 'Langfristiger Vermögensaufbau',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
  ],
};

const aktienoptionen: Kurs = {
  id: 'optionen',
  titel: 'Aktienoptionen',
  beschreibung: 'Verstehe Calls, Puts und Optionsstrategien — und wie du Optionen zur Portfolio-Absicherung einsetzen kannst.',
  icon: 'O',
  freigeschaltet: false,
  kapitel: [
    {
      id: 'kap1',
      titel: 'Was sind Optionen?',
      goldTitel: true,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap2',
      titel: 'Calls und Puts verstehen',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap3',
      titel: 'Grundlegende Optionsstrategien',
      goldTitel: true,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap4',
      titel: 'Covered Calls & Protective Puts',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
    {
      id: 'kap5',
      titel: 'Risikomanagement mit Optionen',
      goldTitel: false,
      content: { videoUrl: null, abschnitte: [] },
      quiz: [],
    },
  ],
};

export const kurse: Kurs[] = [basiskurs, growthInvesting, valueInvesting, aktienoptionen];

export function getKursById(id: string): Kurs | undefined {
  return kurse.find((k) => k.id === id);
}

export function getKapitel(kursId: string, kapitelId: string): Kapitel | undefined {
  const kurs = getKursById(kursId);
  return kurs?.kapitel.find((k) => k.id === kapitelId);
}
