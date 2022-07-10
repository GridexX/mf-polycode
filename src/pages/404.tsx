import { Button, Stack, Typography, useTheme } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import { useTranslation } from '../lib/translations';

export default function ErrorPage() {
  const theme = useTheme();
  const { i18n } = useTranslation();
  // TODO Add the picture with the bunny
  return (
    <>
      <Head>
        <title>{i18n.t('pages.404.title')}</title>
      </Head>
      <Stack
        spacing={3}
        alignItems="center"
        height="100vh"
        width="100vw"
        color={theme.palette.text.primary}
      >
        <Typography variant="h1">{i18n.t('pages.404.title')}</Typography>
        <Typography variant="body1">{i18n.t('pages.404.message')}</Typography>
        <Button
          variant="contained"
          sx={{
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
          }}
        >
          {i18n.t('pages.404.button')}
        </Button>
      </Stack>
    </>
  );
}
