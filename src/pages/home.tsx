import React from 'react';
import { Box, Divider } from '@mui/material';

import HeroTale from '../components/home/HeroTale';
import HomeContent from '../components/home/HomeContent';

import styles from '../styles/pages/Home.module.css';

export default function Home() {
  const fakeData = {
    id: 'uuid1',
    title: '100 Days with Javascript',
    tags: ['Javascript'],
    description: 'In this module, you will learn some Javascript bases !',
    progress: 33,
    reward: 3000,
    image:
      'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.innerContainer}>
        {/* hero tail */}
        <HeroTale module={fakeData} />

        {/* Divider */}
        <Divider orientation="vertical" flexItem className={styles.divider} />

        {/* contents */}
        <HomeContent />
      </Box>
    </Box>
  );
}
