import React from 'react';
import { Box, Divider } from '@mui/material';
import styles from '../../styles/pages/account/common.module.css';
import TeamCreationPanel from '../../components/team/TeamCreationPanel';

export default function CreateTeam() {
  return (
    <Box className={styles.container}>
      <Box className={styles.contentContainer}>
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <TeamCreationPanel />
      </Box>
    </Box>
  );
}
