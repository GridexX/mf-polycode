import React, { useEffect, useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';

import HeroTale from './HeroTale';
import HomeContent from './HomeContent';

import styles from '../../styles/pages/Home.module.css';
import { getModules, ModuleWithProgress } from '../../lib/api/module';
import { useLoginContext } from '../../lib/loginContext';
import { toastError } from '../base/toast/Toast';
import { useTranslation } from '../../lib/translations';

export default function Home() {
  const { credentialsManager } = useLoginContext();

  const { i18n } = useTranslation();

  const [modules, setModules] = useState<ModuleWithProgress[]>([]);

  useEffect(() => {
    if (credentialsManager.credentials) {
      getModules(credentialsManager, {
        limit: 1,
        offset: 0,
        sort: 'date',
        tags: {
          home: true,
          javascript: false,
          python: false,
          rust: false,
          java: false,
        },
      })
        .then((c) => setModules(c.data))
        .catch(() => {
          toastError(<Typography>{i18n.t('home.errors.module')}</Typography>);
        });
    }
  }, [credentialsManager, i18n]);

  return (
    <Box className={styles.container}>
      <Box className={styles.innerContainer}>
        {/* hero tale */}
        {modules.length >= 1 && <HeroTale module={modules[0]} />}

        {/* Divider */}
        <Divider orientation="vertical" flexItem className={styles.divider} />

        {/* contents */}
        <HomeContent />
      </Box>
    </Box>
  );
}
