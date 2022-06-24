import React from 'react';
import { useRouter } from 'next/router';
import { Box, Divider } from '@mui/material';

import Menu from '../../components/account/Menu';
import PasswordPanel from '../../components/account/Password';

import styles from '../../styles/pages/account/common.module.css';
import { useLoginContext } from '../../lib/loginContext';

export default function Password() {
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
        <Menu buttonSelected="password" />
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <PasswordPanel />
      </Box>
    </Box>
  );
}
