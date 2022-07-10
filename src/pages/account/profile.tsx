import React from 'react';
import { useRouter } from 'next/router';
import { Box, Divider } from '@mui/material';

import Menu from '../../components/account/Menu';
import ProfilePanel from '../../components/account/Profile';

import styles from '../../styles/pages/account/common.module.css';
import { useLoginContext } from '../../lib/loginContext';

export default function Profile() {
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
        <Menu buttonSelected="profile" />
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <ProfilePanel />
      </Box>
    </Box>
  );
}
