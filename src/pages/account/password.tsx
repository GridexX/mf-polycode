import React from 'react';
import { Box, Divider } from '@mui/material';

import Menu from '../../components/account/Menu';
import PasswordPanel from '../../components/account/Password';

import styles from '../../styles/pages/account/common.module.css';

export default function Password() {
  return (
    <Box className={styles.container}>
      <Box className={styles.contentContainer}>
        <Menu buttonSelected="password" />
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <PasswordPanel />
      </Box>
    </Box>
  );
}
