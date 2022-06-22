import React from 'react';
import { Box } from '@mui/material';

import Module from './Module';
import ModuleType from '../../lib/api/module';

import styles from '../../styles/components/modules/ModuleList.module.css';

type Props = {
  modules: ModuleType[];
};

export default function ModuleList({ modules }: Props) {
  return (
    <Box className={styles.container}>
      {modules && modules.length > 0
        ? modules.map((module: ModuleType) => (
            <Module key={module.title} module={module} />
          ))
        : 'loading...'}
    </Box>
  );
}
