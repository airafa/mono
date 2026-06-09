import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      // Ensure Google Fonts are injected once for design-system stories
      if (typeof document !== 'undefined' && !document.getElementById('wsl-ad-fonts')) {
        const preconnect1 = document.createElement('link');
        preconnect1.rel = 'preconnect';
        preconnect1.href = 'https://fonts.googleapis.com';
        const preconnect2 = document.createElement('link');
        preconnect2.rel = 'preconnect';
        preconnect2.href = 'https://fonts.gstatic.com';
        preconnect2.crossOrigin = 'anonymous';
        const fontLink = document.createElement('link');
        fontLink.id = 'wsl-ad-fonts';
        fontLink.rel = 'stylesheet';
        fontLink.href =
          'https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&family=Rubik:wght@400;500&display=swap';
        document.head.append(preconnect1, preconnect2, fontLink);
      }
      return Story();
    },
  ],
};

export default preview;
