import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Content, GetContent } from '../../lib/api/playground';
import { useTranslation } from '../../lib/translations';

import styles from '../../styles/components/playground/Playground.module.css';
import { toastError } from '../base/toast/Toast';
import Container from './Container';

/* 
  Fetches the compenents and renders the entier playground
*/
export default function Playground({ id }: { id: string }) {
  const { i18n } = useTranslation();

  const [content, setContent] = React.useState<Content | null | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchContent() {
      try {
        const result = await GetContent(id);
        if (result.status !== 200) throw new Error('Unexpected return code');

        setContent(result.data);
      } catch (e) {
        toastError(
          <Typography>{i18n.t('playground.error.notFound')}</Typography>
        );
        setContent(null);
      }
    }
    if (id) fetchContent();
  }, [i18n, id]);

  if (typeof content === 'undefined') return <Box>loading ...</Box>;

  if (!content) return <Box>{i18n.t('playground.error.notFound')}</Box>;

  return (
    <>
      <Head>
        <title>{content.name}</title>
      </Head>
      <Box className={styles.container}>
        <Container component={content.rootComponent} />
      </Box>
    </>
  );
}
