export interface Dictionary {
  nav: {
    features: string;
    roadmap: string;
    premium: string;
    wiki: string;
    dashboard: string;
    search: string;
  };
  footer: {
    featuresGroup: string;
    overview: string;
    roadmap: string;
    premiumPromo: string;
    supportGroup: string;
    supportServer: string;
    docs: string;
    changelog: string;
    legalGroup: string;
    imprint: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  hero: {
    titleLine1: string;
    titleHighlight: string;
    subtitle: string;
    inviteCta: string;
    discoverCta: string;
  };
  cta: {
    title: string;
    subtitle: string;
    inviteButton: string;
    supportButton: string;
  };
  premium: {
    heading: string;
    headingHighlight: string;
    subtitlePrefix: string;
    subtitleBotWord: string;
    subtitleSuffix: string;
    earlyBirdBadge: string;
    free: {
      name: string;
      tagline: string;
      priceSuffix: string;
      cta: string;
      features: string[];
    };
    premiumPlan: {
      popularBadge: string;
      name: string;
      tagline: string;
      priceSuffix: string;
      cta: string;
      features: string[];
    };
    comparisonTitle: string;
    comparisonSubtitle: string;
    tableFeature: string;
    tableFree: string;
    tablePremium: string;
    tableRows: { name: string; free: string | boolean; premium: string | boolean }[];
    finalCtaText: string;
    finalCtaButton: string;
  };
  featureList: {
    pageTitle: string;
    pageTitleHighlight: string;
    pageSubtitle: string;
    wikiLinkLabel: string;
    inviteButton: string;
    tagFree: string;
    tagPremium: string;
    tagSoon: string;
    groups: {
      category: string;
      features: {
        title: string;
        description: string;
        tag?: 'free' | 'premium' | 'soon';
      }[];
    }[];
  };
  roadmap: {
    heading: string;
    headingBrand: string;
    subtitle: string;
    ideaButton: string;
    ideaPrompt: string;
    items: {
      title: string;
      description: string;
      status: string;
    }[];
  };
  highlights: {
    heading: string;
    headingHighlight: string;
    subtitle: string;
    card1: {
      title: string;
      subtitle: string;
      description: string;
      mockupGreeting: string;
      mockupLine1: string;
      mockupLine2: string;
      mockupModuleLabel: string;
      mockupModuleValue: string;
      mockupStatusLabel: string;
      mockupStatusValue: string;
      mockupTimestamp: string;
      mockupButton: string;
    };
    card2: { title: string; description: string };
    card3: { title: string; description: string };
    card4: { title: string; description: string };
    fullListLink: string;
  };
  changelog: {
    pageTitle: string;
    subtitle: string;
    emptyState: string;
  };
  faq: {
    heading: string;
    headingHighlight: string;
    subtitle: string;
    fallback: { question: string; answer: string }[];
  };
  common: {
    invite: string;
  };
}
