import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import TitledContentList from '../titledLists/TitledContentList';
import TitledModuleList from '../titledLists/TitledModuleList';

import styles from '../../styles/components/home/HomeContent.module.css';
import { Content, getContents } from '../../lib/api/content';
import { getModules, ModuleWithProgress } from '../../lib/api/module';
import { useLoginContext } from '../../lib/loginContext';
import { useTranslation } from '../../lib/translations';
import { toastError } from '../base/toast/Toast';

export default function HomeContent() {
  const { credentialsManager } = useLoginContext();

  const { i18n } = useTranslation();

  const [newContents, setNewContents] = React.useState<Content[]>([]);
  const [newModules, setNewModules] = React.useState<ModuleWithProgress[]>([]);

  useEffect(() => {
    if (credentialsManager.credentials) {
      getModules(credentialsManager, {
        limit: 10,
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
        .then((c) => setNewModules(c.data))
        .catch(() => {
          toastError(
            <Typography>
              {i18n.t('components.home.homeContent.errors.module')}
            </Typography>
          );
        });

      getContents(credentialsManager, {
        limit: 10,
        offset: 0,
        sort: 'date',
        state: { done: false, started: false },
      })
        .then((c) => setNewContents(c.data))
        .catch(() => {
          toastError(
            <Typography>
              {i18n.t('components.home.homeContent.errors.content')}
            </Typography>
          );
        });
    }
  }, [credentialsManager, i18n]);

  return (
    <Box className={styles.container}>
      <TitledContentList
        title={i18n.t('components.home.homeContent.newContents')}
        contents={newContents}
      />
      <TitledModuleList
        title={i18n.t('components.home.homeContent.newContents')}
        modules={newModules}
      />
      {/* <TitledContentList
        title="Preferred Contents"
        contents={fakeContents.slice(0, 6) as Content[]}
      /> */}
    </Box>
  );
}
