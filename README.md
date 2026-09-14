# Zenix

Zenix is a polished Astro SaaS theme by [Farros FR](https://farrosfr.com) with responsive landing sections, pricing, blog, changelog, dark mode, search, and MDX content support.

[Live demo](https://zenix.farros.co/) · [Repository](https://github.com/farrosfr/zenix)

![alt text](readme-hero.png)
![alt text](readme-speed.png)
![alt text](readme-speed-mobile.png)

## Features

- Astro 6 with static output
- Tailwind CSS 4 styling
- Responsive SaaS landing page sections
- Pricing, FAQ, testimonials, blog, and changelog pages
- MDX content with reusable callout components
- Dark and light mode with persisted user preference
- Command palette search
- Astro view transitions
- Playwright UI regression tests

## Configuration

Die globalen Seiteneinstellungen liegen in `src/config.ts`:

```ts
export const SITE_TITLE = 'Nexus Bot';
export const SITE_DESCRIPTION = 'Bringe deinen Discord-Server aufs nächste Level. Nexus bietet dir ein modernes Ticket-System, blitzschnelle Live-Alerts und fortschrittlichen AutoMod- & Raid-Schutz.';
export const SITE_URL = 'https://trynexus.de';

export const SOCIAL_LINKS = {
  discord: 'https://discord.gg/YFCrvBb6t3'
};
```

## Credits & Attribution

This project is built upon [Zenix](https://github.com/farrosfr/zenix) by [Farros FR](https://farrosfr.com).

## License

This project is licensed under the [MIT License](LICENSE).