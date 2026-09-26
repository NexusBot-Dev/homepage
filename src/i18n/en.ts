import type { Dictionary } from './types';

export const en: Dictionary = {
  nav: {
    features: 'Features',
    roadmap: 'Roadmap',
    premium: 'Premium',
    wiki: 'Wiki',
    dashboard: 'Go to Dashboard',
    search: 'Search',
  },
  footer: {
    featuresGroup: 'Features',
    overview: 'Overview',
    roadmap: 'Roadmap',
    premiumPromo: 'Premium',
    supportGroup: 'Support & Help',
    supportServer: 'Support Server',
    docs: 'Documentation',
    changelog: 'Changelog',
    legalGroup: 'Legal',
    imprint: 'Imprint',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    rights: 'All rights reserved.',
  },
  hero: {
    titleLine1: 'The modern bot for',
    titleHighlight: 'your community.',
    subtitle:
      'Nexus brings leveling, moderation and reaction roles to your server - up and running in seconds, with no annoying paywalls and hosted 100% privacy-friendly in Germany.',
    inviteCta: 'Invite Nexus',
    discoverCta: 'Explore Features',
  },
  cta: {
    title: 'Ready to take your server to the next level?',
    subtitle: 'Give your Discord server the upgrade it deserves. Get Nexus today and jump right in.',
    inviteButton: 'Invite Nexus',
    supportButton: 'Community & Support',
  },
  premium: {
    heading: 'Simple. Transparent.',
    headingHighlight: 'Fair.',
    subtitlePrefix: 'No hidden features. No subscription tricks. Just a',
    subtitleBotWord: 'bot',
    subtitleSuffix: ' that works.',
    earlyBirdBadge: 'Early bird: get 3 months of Premium for free. Limited to the first 75 servers!',
    free: {
      name: 'Free',
      tagline: 'Everything you need to get started.',
      priceSuffix: '/ forever',
      cta: 'Invite Nexus',
      features: [
        'Moderation, leveling & roles – fully included',
        'Stream alerts (1x each for Twitch, Kick & YouTube)',
        'Up to 5 saved embeds',
        'Reaction roles (all roles selectable at once)',
        'Nexus mint-green branding',
      ],
    },
    premiumPlan: {
      popularBadge: 'Popular',
      name: 'Premium',
      tagline: 'More control. More possibilities.',
      priceSuffix: '/ month',
      cta: '✨ Get Premium',
      features: [
        'Everything in Free, plus:',
        'Up to 5 stream alerts per platform',
        'Smart Roles (separate pings for Twitch, Kick & YT)',
        'Unlimited embeds & custom colors',
        'Exclusive reaction role groups (either/or)',
        'Scheduled embeds',
      ],
    },
    comparisonTitle: 'All features side by side',
    comparisonSubtitle: 'A transparent overview of every feature in the Free and Premium tiers.',
    tableFeature: 'Feature',
    tableFree: 'Free',
    tablePremium: 'Premium',
    tableRows: [
      { name: 'Moderation, leveling & roles', free: 'Full', premium: 'Full' },
      { name: 'Stream alerts (Twitch, Kick & YouTube)', free: '1x per platform', premium: 'Up to 5x per platform' },
      { name: 'Smart Roles (separate pings for Twitch, Kick & YT)', free: false, premium: true },
      { name: 'Saved embeds', free: 'Up to 5', premium: 'Unlimited' },
      { name: 'Embed colors & styling', free: 'Standard mint green', premium: 'Free color choice (hex) & custom' },
      { name: 'Scheduled embeds', free: false, premium: true },
      { name: 'Reaction roles: basic mode', free: 'All roles selectable', premium: 'All roles selectable' },
      { name: 'Reaction roles: exclusive groups (either/or)', free: false, premium: true },
      { name: 'Ticket system: categories / panels', free: 'Up to 2', premium: 'Up to 10' },
      { name: 'Ticket workflow (72h close, DM transcript & auto-delete)', free: 'Full', premium: 'Full' },
    ],
    finalCtaText: 'Ready to secure and upgrade your server?',
    finalCtaButton: 'Add Nexus to Discord',
  },
  featureList: {
    pageTitle: 'All features,',
    pageTitleHighlight: 'at a glance.',
    pageSubtitle: 'Every module can be switched on or off individually, no hidden costs. See exactly what Nexus can do.',
    wikiLinkLabel: 'Read more in the Wiki',
    inviteButton: 'Invite Nexus',
    tagFree: 'Free',
    tagPremium: 'Premium',
    tagSoon: 'Coming soon',
    groups: [
      {
        category: 'Moderation & Security',
        features: [
          {
            title: 'Moderation',
            description: 'Warnings, kicks, bans and mutes with a full, traceable log history for your mod team.',
            tag: 'free',
          },
          {
            title: 'AutoMod',
            description: 'Blocked keywords and honeypot channels, integrated via Discord\u2019s native AutoMod interface.',
            tag: 'free',
          },
          {
            title: 'Anti-Nuke Auto-Restore',
            description: 'Detects attacks automatically and restores deleted channels, roles and permissions without any data loss.',
            tag: 'soon',
          },
        ],
      },
      {
        category: 'Community & Activity',
        features: [
          {
            title: 'Leveling System',
            description: 'Automatic XP for chat activity, including role rewards on level-up.',
            tag: 'free',
          },
          {
            title: 'Reaction Roles',
            description: 'Role assignment via dropdown menu. Exclusive either/or groups for clearly separated factions.',
            tag: 'free',
          },
          {
            title: 'Welcome & Goodbye',
            description: 'Custom welcome and farewell messages, posted automatically when someone joins or leaves the server.',
            tag: 'free',
          },
          {
            title: 'Boost Messages',
            description: 'Custom thank-you messages for server boosters, fully configurable from the dashboard.',
            tag: 'free',
          },
        ],
      },
      {
        category: 'Content & Automation',
        features: [
          {
            title: 'Saved Embeds',
            description: 'Reusable, formatted messages for rules, announcements and more \u2013 available any time.',
            tag: 'free',
          },
          {
            title: 'Scheduled Embeds',
            description: 'Have embeds post automatically at a set time, with no manual work involved.',
            tag: 'premium',
          },
          {
            title: 'Stream Alerts',
            description: 'Live notifications for Twitch, Kick and YouTube as soon as your streamer goes live.',
            tag: 'free',
          },
        ],
      },
      {
        category: 'Support & Management',
        features: [
          {
            title: 'Ticket System',
            description: 'Categories with their own panels, automatic 72h timeout closing, and a DM transcript once resolved.',
            tag: 'free',
          },
          {
            title: 'Web Dashboard',
            description: 'Manage every module conveniently at dashboard.trynexus.de \u2013 secure login via Discord OAuth2.',
            tag: 'free',
          },
          {
            title: 'Privacy Commands',
            description: 'With /delete_my_data, users can delete their own leveling data at any time.',
            tag: 'free',
          },
        ],
      },
    ],
  },
  roadmap: {
    heading: 'The',
    headingBrand: 'Nexus',
    subtitle: 'Ready for the next level. Nexus already delivers maximum performance today. And the best part: we keep building.',
    ideaPrompt: 'Missing the feature you were hoping for?',
    ideaButton: '💡 Suggest an idea & help shape Nexus',
    items: [
      {
        title: 'Anti-Nuke Auto-Restore',
        description: 'Fully automatic recovery after attacks: deleted channels, roles and server permissions are restored immediately once a nuke is detected, with no data loss.',
        status: 'In progress',
      },
      {
        title: 'Quality of Life & Optimization',
        description: 'Refining existing modules for an even smoother experience: faster response times, a more intuitive dashboard, and everyday detail improvements.',
        status: 'In progress',
      },
      {
        title: 'Social Media & Live Alerts',
        description: 'Never miss a stream or upload again. Fully automatic, delay-free notifications in your channels the moment you go live.',
        status: 'Recently released',
      },
    ],
  },
  wiki: {
    pageSubtitle: 'Everything you need to know about permissions, commands, and setting up each module.',
    emptyState: 'No wiki articles have been published yet.',
  },
  highlights: {
    heading: 'Everything you need.',
    headingHighlight: 'Without the usual bot clutter.',
    subtitle: 'No more bloated features or hidden costs. Nexus gives you the tools that matter for your server \u2013 logically organized, lightning fast and fully transparent.',
    card1: {
      title: 'Ready to go in 5 steps.',
      subtitle: 'No manual configuration',
      description: 'The moment Nexus joins your server, it reaches out automatically and walks you through an interactive setup \u2013 right inside Discord. Role check, log channel, welcome messages: all in five short steps, without typing a single line.',
      mockupGreeting: '\ud83d\udc4b Hi, I\u2019m Nexus!',
      mockupLine1: 'I\u2019m here to help you manage your server.',
      mockupLine2: 'Click Start setup to get me configured.',
      mockupModuleLabel: 'Module',
      mockupModuleValue: 'Setup',
      mockupStatusLabel: 'Status',
      mockupStatusValue: 'Ready • Active',
      mockupTimestamp: 'today at 3:36 PM',
      mockupButton: '\ud83d\ude80 Start setup',
    },
    card2: {
      title: 'Full focus on fairness.',
      description: 'Leveling, moderation, reaction roles \u2013 every core feature is free, forever. Our Premium model never locks features away, it only adds to what\u2019s already there.',
    },
    card3: {
      title: 'Activity that gets rewarded.',
      description: 'Nexus automatically awards XP for chat activity and assigns new roles on level-up. Your server stays alive without you lifting a finger.',
    },
    card4: {
      title: 'Full control, one click away.',
      description: 'Turn individual modules on or off instantly with the /module command. Anything you don\u2019t enable stays completely invisible. No command clutter on your server, no annoying bot spam in chat.',
    },
    fullListLink: 'See all features in detail',
  },
  changelog: {
    pageTitle: 'Changelog',
    subtitle: 'All new features, improvements and bug fixes around Nexus, at a glance.',
    emptyState: 'No changelog entries have been published yet.',
  },
  faq: {
    heading: 'Frequently Asked',
    headingHighlight: 'Questions',
    subtitle: 'We play with an open hand and answer your questions.',
    fallback: [
      {
        question: 'Why does the invite request Administrator permissions?',
        answer: "So Nexus works right away across all channels, without you having to adjust channel permissions manually. You can uncheck that box when inviting and grant permissions manually instead. For security, we recommend placing the 'Nexus' role just ABOVE your moderator role in the hierarchy, but BELOW admins. That way the bot can moderate perfectly while your server stays fully protected from potential exploits.",
      },
      {
        question: 'Is the bot really completely free?',
        answer: 'Yes, all core functions like leveling, standard moderation and reaction roles are 100% free with no paywall. Our planned Premium model only adds cosmetic extras or server enhancements \u2013 we never lock features away.',
      },
      {
        question: 'Is my server data or chat log ever sold?',
        answer: 'Never. Privacy is the main reason Nexus exists. We don\u2019t track user profiles across servers, we don\u2019t sell data to brokers, and we only log what\u2019s strictly necessary for features like moderation logs. Safe and transparent.',
      },
      {
        question: 'How do I set up Nexus after inviting it?',
        answer: "It's easy: just run the '/setup' command on your server. Nexus walks you through activating each module step by step, all through intuitive slash commands.",
      },
      {
        question: 'Can I completely disable individual modules (e.g. leveling)?',
        answer: "Yes, and that's the best part: the '/module' command gives you full control. Any module you disable goes fully dormant in the background. No spam, no unused commands, no clutter.",
      },
    ],
  },
  common: {
    invite: 'Invite Nexus',
  },
};