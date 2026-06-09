import type { Preview } from '@storybook/react';
import '@fontsource/almarai/700.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
