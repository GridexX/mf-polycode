import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import GetTheme from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={GetTheme('light')}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
