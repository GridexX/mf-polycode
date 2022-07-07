import React from 'react';
import { Box, Divider } from '@mui/material';

// import HeroTale from './HeroTale';
import HomeContent from './HomeContent';

import styles from '../../styles/pages/Home.module.css';

export default function Home() {
  return (
    <Box className={styles.container}>
      <Box className={styles.innerContainer}>
        {/* hero tail, currently disabled because no fake data */}
        {/* <HeroTale module={fakeData} /> */}

        {/* Divider */}
        <Divider orientation="vertical" flexItem className={styles.divider} />

        {/* contents */}
        <HomeContent />
      </Box>
    </Box>
  );
}
