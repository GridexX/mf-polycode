import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import Head from 'next/head';

// components
import HeroTale from '../../components/modules/HeroTale';
import ModuleList from '../../components/modules/ModuleList';
import ContentList from '../../components/contents/ContentList';
import CenteredLoader from '../../components/base/CenteredLoader';
import { toastError } from '../../components/base/toast/Toast';

// contexts
import { useRequireValidUser } from '../../lib/loginContext';
import { useTranslation } from '../../lib/translations';

// api
import { Content } from '../../lib/api/content';
import {
  Module,
  getModule,
  DEFAULT_IMAGE,
  defaultPracticeModule,
  PracticeModule,
} from '../../lib/api/module';

// style
import styles from '../../styles/pages/module/ModuleDetails.module.css';

export default function ModuleDetails() {
  const router = useRouter();
  const { validUser, credentialsManager } = useRequireValidUser();
  const { i18n } = useTranslation();

  const [moduleDetails, setModuleDetails] = useState<PracticeModule>(
    defaultPracticeModule
  );
  const [loading, setLoading] = useState(false);

  // built states
  const [modules, setModules] = useState<Module[]>([]);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    setLoading(true);
    if (validUser) {
      const { id } = router.query;

      getModule(id as string, credentialsManager)
        .then((data) => {
          if (data.type === 'practice') {
            const details = data;

            // set default values not handled by the back
            details.image = DEFAULT_IMAGE;
            details.progress = details.progress || 0;

            setModuleDetails(details);
            setModules(details.modules);
            setContents(details.contents);
          } else {
            toastError(
              <Typography>
                {i18n.t('components.modules.moduleDetails.fetchError')}
              </Typography>
            );
            router.push('/modules');
          }
        })
        .catch((e) =>
          toastError(
            <Typography>
              {i18n.t('components.modules.moduleDetails.fetchError')} :{' '}
              {e.message}
            </Typography>
          )
        )
        .finally(() => setLoading(false));
    }
  }, [validUser, credentialsManager, router, i18n]);

  return (
    <>
      <Head>
        <title>{moduleDetails.name}</title>
      </Head>
      <Box className={styles.container}>
        {!loading ? (
          <>
            {/* header */}
            <HeroTale module={moduleDetails} />

            {/* modules */}
            {modules && modules.length > 0 && (
              <Box className={styles.modulesContainer}>
                <ModuleList modules={modules} />
              </Box>
            )}

            {/* contents */}
            {contents && contents.length > 0 && (
              <Box className={styles.contentsContainer}>
                <ContentList contents={contents} />
              </Box>
            )}
          </>
        ) : (
          <CenteredLoader />
        )}
      </Box>
    </>
  );
}
