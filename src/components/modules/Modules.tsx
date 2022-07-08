import React, { useState, useEffect } from 'react';
import { useTheme, Box, Typography, CircularProgress } from '@mui/material';

import ModuleList from './ModuleList';
import { useTranslation } from '../../lib/translations';

import styles from '../../styles/components/modules/Modules.module.css';

import { toastError } from '../base/toast/Toast';
import { getModules, ModuleFilters, ModuleWithProgress } from '../../lib/api/module';
import { useLoginContext } from '../../lib/loginContext';

type Props = {
  filters: ModuleFilters;
};

export default function Modules({ filters }: Props) {
  // import mui theme & i18n
  const theme = useTheme();
  const { i18n } = useTranslation();
  const { user, credentialsManager } = useLoginContext();

  const [modules, setModules] = useState<ModuleWithProgress[]>([]);
  const [loading, setLoading] = useState(false);

  // --- handler events ---
  useEffect(() => {
    setLoading(true);
    if (user) {
      getModules(credentialsManager, filters)
        .then((c) => setModules(c.data))
        .catch((e) =>
          toastError(
            <Typography>
              {i18n.t('error.fetch')} : {e.message}
            </Typography>
          )
        )
        .finally(() => setLoading(false));
    }
  }, [filters, user, credentialsManager, i18n]);

  return (
    <Box className={styles.container}>
      {/* title */}
      <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
        {i18n.t('components.modules.modules.title')}
      </Typography>

      {/* list of modules */}
      {!loading ? (
        <ModuleList modules={modules} />
      ) : (
        <Box className={styles.loadingContainer}>
          <CircularProgress size="4rem" />
        </Box>
      )}
    </Box>
  );
}
