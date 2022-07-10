import React from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProfilePanel from '../../components/account/Profile';
import styles from '../../styles/pages/account/common.module.css';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box className={styles.container}>
      <Box className={styles.contentContainer}>
        <ProfilePanel userId={id as string} />
      </Box>
    </Box>
  );
}
