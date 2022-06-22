import React from 'react';
import { useTheme, Button, Box, Divider, Typography } from '@mui/material';

import ModulesPanel from '../components/modules/Modules';
import TagFilter from '../components/filters/TagFilter';
import SortFilter from '../components/filters/SortFilter';
import { useTranslation } from '../lib/translations';

import styles from '../styles/pages/Modules.module.css';

export default function Modules() {
  // import mui theme & i18n
  const theme = useTheme();
  const { i18n } = useTranslation();

  // --- handler events ---
  const handleReset = () => {};

  return (
    <Box
      className={styles.container}
      sx={{ color: theme.palette.text.primary }}
    >
      <Box className={styles.innerContainer}>
        {/* filters */}
        <Box className={styles.filters}>
          <Typography variant="h5">{i18n.t('modules.filters')}</Typography>
          <TagFilter />
          <SortFilter />
          <Box className={styles.resetButtonContainer}>
            <Button
              variant="outlined"
              className={styles.resetButton}
              onClick={handleReset}
            >
              {i18n.t('modules.resetButton')}
            </Button>
          </Box>
        </Box>

        {/* Divider */}
        <Divider orientation="vertical" flexItem className={styles.divider} />

        {/* modules */}
        <ModulesPanel />
      </Box>
    </Box>
  );
}
