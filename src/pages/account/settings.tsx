import React from 'react';
import { Box, Divider } from '@mui/material';

import Menu from '../../components/account/Menu';
import SettingsPanel from '../../components/account/Settings';

import styles from '../../styles/pages/account/common.module.css';

export default function Settings() {
  return (
    <Box className={styles.container}>
      <Box className={styles.contentContainer}>
        <Menu buttonSelected="settings" />
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <SettingsPanel />
      </Box>
    </Box>
  );
}
