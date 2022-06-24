import React from 'react';
import { useRouter } from 'next/router';
import { Box, Divider } from '@mui/material';

import Menu from '../../components/account/Menu';
import TeamsPanel from '../../components/account/Teams';

import styles from '../../styles/pages/account/common.module.css';
import { useLoginContext } from '../../lib/loginContext';

export default function Teams() {
  const { user } = useLoginContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user === null) {
      router.push('/sign-in');
    }
  }, [user, router]);

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
