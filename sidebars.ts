import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const sidebars: SidebarsConfig = {
  docs: [
    {type: 'doc', id: 'overview', label: 'Overview'},
    {type: 'doc', id: 'introduction', label: 'Introduction'},
    {
      type: 'category',
      label: 'Funds',
      link: {type: 'doc', id: 'funds/funds'},
      items: ['funds/dammstable-arbitrum', 'funds/dammeth', 'funds/dammbtc'],
    },
    {
      type: 'category',
      label: 'How to deposit',
      link: {type: 'doc', id: 'deposit/deposit'},
      items: ['deposit/dammstable', 'deposit/dammeth', 'deposit/dammbtc'],
    },
    {
      type: 'category',
      label: 'Integrations (API)',
      link: {type: 'doc', id: 'integrations/integrations'},
      items: [
        'integrations/dammstable',
        'integrations/dammeth',
        'integrations/dammbtc',
        'integrations/dammethalgo',
        'integrations/dammbtcalgo',
      ],
    },
    {
      type: 'category',
      label: 'Funds Architecture (technical)',
      link: {type: 'doc', id: 'funds-architecture/funds-architecture'},
      items: [
        'funds-architecture/lagoon-deposit-module',
        'funds-architecture/zodiac-roles-module',
        'funds-architecture/modular-capabilities',
        'funds-architecture/cross-chain-deployment',
        'funds-architecture/permission-helpers',
      ],
    },
    {type: 'doc', id: 'security', label: 'Security'},
    {type: 'doc', id: 'about-the-team', label: 'About the Team'},
    {type: 'doc', id: 'media-kit', label: 'Media Kit'},
    {type: 'doc', id: 'socials-contact', label: 'Socials & Contact'},
  ],
};

export default sidebars;
