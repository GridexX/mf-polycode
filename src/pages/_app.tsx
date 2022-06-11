import '../styles/globals.css';
import '../styles/components/toast.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import GetTheme from '../theme/theme';
import { TranslationProvider } from '../lib/translations';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider>
      <ThemeProvider theme={GetTheme('light')}>
        <Component {...pageProps} />
      </ThemeProvider>
    </TranslationProvider>
  );
}

export default MyApp;
