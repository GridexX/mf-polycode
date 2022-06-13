import React from 'react';
import { Box, Divider } from '@mui/material';

import Menu from '../../components/account/Menu';
import ProfilePanel from '../../components/account/Profile';

import styles from '../../styles/pages/account/common.module.css';

export default function Password() {
  return (
    <Box className={styles.container}>
      <Box className={styles.contentContainer}>
        <Menu buttonSelected="profile" />
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <ProfilePanel />
      </Box>
    </Box>
  );
}
