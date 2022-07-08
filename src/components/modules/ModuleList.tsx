import React from 'react';
import { Box, Typography } from '@mui/material';

import Module from './Module';
import { ModuleWithProgress } from '../../lib/api/module';

import styles from '../../styles/components/modules/ModuleList.module.css';
import { useTranslation } from '../../lib/translations';

type Props = {
  modules: ModuleWithProgress[];
};

export default function ModuleList({ modules }: Props) {
  const { i18n } = useTranslation();

  return (
    <Box className={styles.container}>
      {modules && modules.length > 0 ? (
        modules.map((module: ModuleWithProgress) => (
          <Module key={module.name} module={module} />
        ))
      ) : (
        <Typography className={styles.message}>
          {i18n.t('components.modules.moduleList.notFound')}
        </Typography>
      )}
    </Box>
  );
}
