import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import Link from 'next/link';

import ModuleType from '../../lib/api/module';

import styles from '../../styles/components/home/HeroTale.module.css';

type Props = {
  module: ModuleType;
};

export default function HeroTale({ module }: Props) {
  return (
    <Box
      className={styles.container}
      sx={{
        backgroundImage: `url(${module.image})`,
        backgroundSize: 'cover',
        borderRadius: '5px',
      }}
    >
      {/* title and button */}
      <Box className={styles.titleAndButtonContainer}>
        {/* title */}
        <Box className={styles.titleContainer}>
          <Typography className={styles.title}>{module.title}</Typography>
        </Box>
        {/* button */}
        <Box className={styles.buttonContainer}>
          <Link href={`/module/${module.id}`}>
            <Button variant="contained" className={styles.button}>
              Try Now
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
