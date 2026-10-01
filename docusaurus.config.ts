import fs from 'fs';
import path from 'path';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config, Plugin} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Tiny local plugin: lists the files present in static/video at build time and
 * exposes them as global data. <DepositVideo> reads it, so a missing video
 * renders a text fallback instead of a broken player, and the build never
 * depends on the video files existing.
 */
function staticVideosPlugin(): Plugin {
  return {
    name: 'damm-static-videos',
    async contentLoaded({actions}) {
      const dir = path.join(__dirname, 'static', 'video');
      let files: string[] = [];
      try {
        files = fs.readdirSync(dir).filter((f) => !f.startsWith('.'));
      } catch {
        files = [];
      }
      actions.setGlobalData({files});
    },
  };
}

/** Obsidian code theme: near-black panel, off-white ink, lime accents. */
const obsidianPrism = {
  plain: {color: '#E4E6DF', backgroundColor: '#0A0B0A'},
  styles: [
    {types: ['comment', 'prolog', 'doctype', 'cdata'], style: {color: '#6B6F68', fontStyle: 'italic' as const}},
    {types: ['punctuation', 'operator'], style: {color: '#8B8B93'}},
    {types: ['string', 'char', 'attr-value', 'template-string'], style: {color: '#BEF264'}},
    {types: ['number', 'boolean', 'constant'], style: {color: '#D9F99D'}},
    {types: ['keyword', 'selector', 'important', 'atrule'], style: {color: '#84CC16'}},
    {types: ['function', 'class-name'], style: {color: '#F2F3EE'}},
    {types: ['property', 'tag', 'attr-name', 'variable', 'parameter'], style: {color: '#C8CBC2'}},
    {types: ['builtin', 'symbol'], style: {color: '#A3E635'}},
  ],
};

const config: Config = {
  title: 'DAMM Capital Docs',
  tagline: 'The financial and technical arm for institutions adopting DeFi.',
  favicon: 'img/favicon.ico',

  url: 'https://docs.dammcap.finance',
  baseUrl: '/',

  organizationName: 'DAMM-Cap',
  projectName: 'DAMM-Documentation',
  deploymentBranch: 'main',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [staticVideosPlugin],

  // Newsreader italic is used only for math and formula annotations.
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,300;1,6..72,400&display=swap',
      type: 'text/css',
    },
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themeConfig: {
    image: 'img/damm-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    mermaid: {
      theme: {light: 'base', dark: 'base'},
      options: {
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        fontSize: 13,
        flowchart: {curve: 'basis', padding: 14, nodeSpacing: 40, rankSpacing: 56},
      },
    },
    navbar: {
      title: '',
      logo: {
        alt: 'DAMM Capital',
        src: 'img/damm-lockup-light.svg',
        srcDark: 'img/damm-lockup-dark.svg',
        height: 30,
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {to: '/funds', label: 'Funds', position: 'left'},
        {to: '/deposit', label: 'How to deposit', position: 'left'},
        {to: '/integrations', label: 'API', position: 'left'},
        {
          href: 'https://dammcap.finance/research',
          label: 'Research',
          position: 'right',
        },
        {
          href: 'https://github.com/DAMM-Cap',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Funds',
          items: [
            {label: 'DAMMstable', to: '/funds/dammstable-arbitrum'},
            {label: 'DAMMeth', to: '/funds/dammeth'},
            {label: 'DAMMbtc', to: '/funds/dammbtc'},
            {label: 'How to deposit', to: '/deposit'},
          ],
        },
        {
          title: 'DAMM',
          items: [
            {label: 'Website', href: 'https://dammcap.finance'},
            {label: 'Research', href: 'https://dammcap.finance/research'},
            {label: 'Security', to: '/security'},
            {label: 'Contact', href: 'mailto:team@dammcap.finance'},
          ],
        },
        {
          title: 'Social',
          items: [
            {label: 'X', href: 'https://x.com/DAMM_Capital'},
            {label: 'LinkedIn', href: 'https://www.linkedin.com/company/damm-capital/'},
            {label: 'GitHub', href: 'https://github.com/DAMM-Cap'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} DAMM Labs. Quantitative digital asset management.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: obsidianPrism,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
};

export default config;
