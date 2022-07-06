import { Box, CircularProgress, Typography } from '@mui/material';
import Head from 'next/head';
import React, { useEffect } from 'react';
import {
  ContainerComponent,
  Content,
  useGetContent,
} from '../../lib/api/content';
import { useLoginContext } from '../../lib/loginContext';
import { useTranslation } from '../../lib/translations';

import styles from '../../styles/components/playground/Playground.module.css';
import { toastError } from '../base/toast/Toast';
import Container from './Container';

/* 
  Fetches the compenents and renders the entier playground
*/
export default function Playground({ id }: { id: string }) {
  const { credentialsManager } = useLoginContext();
  const { i18n } = useTranslation();

  const [content, setContent] = React.useState<Content | null | undefined>(
    undefined
  );
  const fetchContentResponse = useGetContent(credentialsManager, id);

  useEffect(() => {
    if (fetchContentResponse.data) {
      setContent(fetchContentResponse.data);
    }
    if (fetchContentResponse.error) {
      toastError(
        <Typography>{i18n.t('playground.error.notFound')}</Typography>
      );
      setContent(null);
    }
  }, [fetchContentResponse, i18n]);

  if (typeof content === 'undefined')
    return (
      <Box>
        <CircularProgress />
      </Box>
    );

  if (!content) return <Box>{i18n.t('playground.error.notFound')}</Box>;

  return (
    <>
      <Head>
        <title>{content.name}</title>
      </Head>
      <Box className={styles.container}>
        <Container component={content.rootComponent as ContainerComponent} />
      </Box>
    </>
  );
}
