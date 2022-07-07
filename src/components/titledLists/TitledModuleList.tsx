import React from 'react';
import { Box, Typography } from '@mui/material';

import Module from '../modules/Module';
import { ModuleShort } from '../../lib/api/module';

import styles from '../../styles/components/home/HomeModuleList.module.css';

type Props = {
  title: string;
  modules: ModuleShort[];
};

const MAX_MODULES = 3;

export default function HomeModuleList({ title, modules }: Props) {
  return (
    <Box className={styles.container}>
      <Box>
        <Typography className={styles.title}>{title}</Typography>
      </Box>
      <Box className={styles.moduleList}>
        {modules && modules.length > 0
          ? modules.slice(0, MAX_MODULES).map((module) => (
              <Box key={module.id}>
                <Module module={module} />
              </Box>
            ))
          : 'loading...'}
      </Box>
    </Box>
  );
}
