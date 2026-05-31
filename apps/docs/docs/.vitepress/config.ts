import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'WSL-AD',
  description: 'Architecture documentation for the WSL-AD frontend monorepo',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Architecture', link: '/architecture/domains' },
      { text: 'Platform', link: '/platform/readiness-matrix' },
      { text: 'Delivery', link: '/delivery/release-gates' },
      { text: 'Design System', link: '/design-system/' },
      { text: 'Getting Started', link: '/getting-started/bootstrap' },
    ],
    sidebar: {
      '/architecture/': [
        {
          text: 'Architecture',
          items: [
            { text: 'Domains', link: '/architecture/domains' },
            { text: 'Dependency Map', link: '/architecture/dependency-map' },
          ],
        },
      ],
      '/platform/': [
        {
          text: 'Platform',
          items: [
            { text: 'Readiness Matrix', link: '/platform/readiness-matrix' },
            { text: 'Dependency Impact', link: '/platform/dependency-impact' },
            { text: 'Owners', link: '/platform/owners' },
            { text: 'Onboarding Checklist', link: '/platform/onboarding-checklist' },
          ],
        },
      ],
      '/delivery/': [
        {
          text: 'Delivery',
          items: [
            { text: 'Release Gates', link: '/delivery/release-gates' },
            { text: 'Agent Workflow', link: '/delivery/agent-workflow' },
          ],
        },
      ],
      '/testing/': [
        {
          text: 'Testing',
          items: [{ text: 'Page Objects', link: '/testing/page-objects' }],
        },
      ],
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Bootstrap', link: '/getting-started/bootstrap' },
            { text: 'Verification', link: '/getting-started/verification' },
          ],
        },
      ],
    },
    socialLinks: [],
  },
});
