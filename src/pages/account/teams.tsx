import React from 'react';
import { Box, Divider } from '@mui/material';

import Menu from '../../components/account/Menu';
import TeamsPanel from '../../components/account/Teams';

import styles from '../../styles/pages/account/common.module.css';

export default function Teams() {
  return (
    <Box className={styles.container}>
      <Box className={styles.contentContainer}>
        <Menu buttonSelected="teams" />
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <TeamsPanel />
      </Box>
    </Box>
  );
}
