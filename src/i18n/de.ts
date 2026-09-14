import type { Dictionary } from './types';

export const de: Dictionary = {
  nav: {
    features: 'Features',
    roadmap: 'Roadmap',
    premium: 'Premium',
    wiki: 'Wiki',
    dashboard: 'Zum Dashboard',
    search: 'Suche',
  },
  footer: {
    featuresGroup: 'Features',
    overview: 'Übersicht',
    roadmap: 'Roadmap',
    premiumPromo: 'Premium-Aktion',
    supportGroup: 'Support & Hilfe',
    supportServer: 'Support Server',
    docs: 'Dokumentation',
    changelog: 'Changelog',
    legalGroup: 'Rechtliches',
    imprint: 'Impressum',
    privacy: 'Datenschutzerklärung',
    terms: 'Nutzungsbedingungen',
    rights: 'Alle Rechte vorbehalten.',
  },
  hero: {
    titleLine1: 'Der moderne Bot für',
    titleHighlight: 'deine Community.',
    subtitle:
      'Nexus bringt Leveling, Moderation und Reaction Roles auf deinen Server - blitzschnell per Knopfdruck, garantiert ohne nervige Paywalls und zu 100% datenschutzfreundlich in Deutschland gehostet.',
    inviteCta: 'Nexus einladen',
    discoverCta: 'Features entdecken',
  },
  cta: {
    title: 'Bereit, deinen Server auf das nächste Level zu bringen?',
    subtitle: 'Verpasse deinem Discord-Server das Upgrade, das er verdient. Hole dir Nexus noch heute und starte direkt durch.',
    inviteButton: 'Nexus einladen',
    supportButton: 'Community & Support',
  },
  premium: {
    heading: 'Einfach. Transparent.',
    headingHighlight: 'Fair.',
    subtitlePrefix: 'Kein Feature versteckt. Kein Abo-Trick. Nur ein',
    subtitleBotWord: 'Bot',
    subtitleSuffix: ', der funktioniert.',
    earlyBirdBadge: 'Early-Bird: Hol dir 3 Monate Premium gratis. Limitiert auf die ersten 75 Server!',
    free: {
      name: 'Free',
      tagline: 'Alles was du brauchst, um loszulegen.',
      priceSuffix: '/ für immer',
      cta: 'Nexus einladen',
      features: [
        'Moderation, Leveling & Roles – vollständig',
        'Stream Alerts (je 1x Twitch, Kick & YouTube)',
        'Bis zu 5 gespeicherte Embeds',
        'Reaction Roles (alle Rollen gleichzeitig wählbar)',
        'Nexus Mintgrün Branding',
      ],
    },
    premiumPlan: {
      popularBadge: 'Popular',
      name: 'Premium',
      tagline: 'Mehr Kontrolle. Mehr Möglichkeiten.',
      priceSuffix: '/ Monat',
      cta: '✨ Premium holen',
      features: [
        'Alles aus Free, plus:',
        'Bis zu 5 Stream-Alerts je Plattform',
        'Smart Roles (getrennte Pings für Twitch, Kick & YT)',
        'Unbegrenzte Embeds & eigene Farben',
        'Exklusive Reaction Role Gruppen (Entweder-Oder)',
        'Zeitgesteuerte Embeds (Schedules)',
      ],
    },
    comparisonTitle: 'Alle Features im direkten Vergleich',
    comparisonSubtitle: 'Transparente Übersicht aller Funktionen im Free- und Premium-Tarif.',
    tableFeature: 'Feature',
    tableFree: 'Free',
    tablePremium: 'Premium',
    tableRows: [
      { name: 'Moderation, Leveling & Rollen', free: 'Vollständig', premium: 'Vollständig' },
      { name: 'Stream-Alerts (Twitch, Kick & YouTube)', free: '1x je Plattform', premium: 'Bis zu 5x je Plattform' },
      { name: 'Smart Roles (getrennte Pings für Twitch, Kick & YT)', free: false, premium: true },
      { name: 'Gespeicherte Embeds', free: 'Bis zu 5', premium: 'Unbegrenzt' },
      { name: 'Embed-Farben & Styling', free: 'Standard Mintgrün', premium: 'Freie Farbwahl (Hex) & Custom' },
      { name: 'Zeitgesteuerte Embeds (Schedules)', free: false, premium: true },
      { name: 'Reaction Roles: Basis-Modus', free: 'Alle Rollen wählbar', premium: 'Alle Rollen wählbar' },
      { name: 'Reaction Roles: Exklusiv-Gruppen (Entweder-Oder)', free: false, premium: true },
      { name: 'Ticket-System: Kategorien / Panels', free: 'Bis zu 2', premium: 'Bis zu 10' },
      { name: 'Ticket-Workflow (72h-Close, DM-Transkript & Auto-Delete)', free: 'Vollständig', premium: 'Vollständig' },
    ],
    finalCtaText: 'Bereit, deinen Server abzusichern und aufzuwerten?',
    finalCtaButton: 'Nexus zu Discord hinzufügen',
  },
  featureList: {
    pageTitle: 'Alle Features',
    pageTitleHighlight: 'im Überblick.',
    pageSubtitle: 'Jedes Modul einzeln zu- und abschaltbar, ohne versteckte Kosten. Hier siehst du genau, was Nexus kann.',
    wikiLinkLabel: 'Mehr im Wiki',
    inviteButton: 'Nexus einladen',
    tagFree: 'Free',
    tagPremium: 'Premium',
    tagSoon: 'Bald verfügbar',
    groups: [
      {
        category: 'Moderation & Sicherheit',
        features: [
          {
            title: 'Moderation',
            description: 'Warnungen, Kicks, Bans und Mutes mit vollständigem, nachvollziehbarem Log-Verlauf für dein Mod-Team.',
            tag: 'free',
          },
          {
            title: 'AutoMod',
            description: 'Gesperrte Schlagworte und Honeypot-Kanäle, integriert über Discords native AutoMod-Schnittstelle.',
            tag: 'free',
          },
          {
            title: 'Anti-Nuke Auto-Restore',
            description: 'Erkennt Angriffe automatisch und stellt gelöschte Kanäle, Rollen und Berechtigungen ohne Datenverlust wieder her.',
            tag: 'soon',
          },
        ],
      },
      {
        category: 'Community & Aktivität',
        features: [
          {
            title: 'Level-System',
            description: 'Automatische XP-Vergabe für Chat-Aktivität inklusive Rollen-Rewards bei Level-Aufstieg.',
            tag: 'free',
          },
          {
            title: 'Reaction Roles',
            description: 'Rollenvergabe per Dropdown-Menü. Exklusive Entweder-Oder-Gruppen für klar getrennte Fraktionen.',
            tag: 'free',
          },
          {
            title: 'Welcome & Goodbye',
            description: 'Individuelle Begrüßungs- und Abschiedsnachrichten, die automatisch beim Server-Beitritt bzw. -Austritt gepostet werden.',
            tag: 'free',
          },
          {
            title: 'Boost-Nachrichten',
            description: 'Eigene Danke-Nachrichten für Server-Booster, frei konfigurierbar im Dashboard.',
            tag: 'free',
          },
        ],
      },
      {
        category: 'Inhalte & Automatisierung',
        features: [
          {
            title: 'Gespeicherte Embeds',
            description: 'Wiederverwendbare, formatierte Nachrichten für Regeln, Ankündigungen und mehr – jederzeit abrufbar.',
            tag: 'free',
          },
          {
            title: 'Zeitgesteuerte Embeds',
            description: 'Embeds automatisch zu einem festgelegten Zeitpunkt posten lassen, ganz ohne manuelles Eingreifen.',
            tag: 'premium',
          },
          {
            title: 'Stream-Alerts',
            description: 'Live-Benachrichtigungen für Twitch, Kick und YouTube, sobald dein Streamer online geht.',
            tag: 'free',
          },
        ],
      },
      {
        category: 'Support & Verwaltung',
        features: [
          {
            title: 'Ticket-System',
            description: 'Kategorien mit eigenen Panels, automatischer 72h-Timeout-Schließung und DM-Transkript nach Abschluss.',
            tag: 'free',
          },
          {
            title: 'Web-Dashboard',
            description: 'Alle Module bequem über dashboard.trynexus.de verwalten – Login sicher per Discord OAuth2.',
            tag: 'free',
          },
          {
            title: 'Datenschutz-Befehle',
            description: 'Mit /delete_my_data können Nutzer ihre Level-Daten jederzeit selbst löschen.',
            tag: 'free',
          },
        ],
      },
    ],
  },
  common: {
    invite: 'Nexus einladen',
  },
};
