import React from 'react';
import { useTheme, Button, Box, Divider, Typography } from '@mui/material';

import ContentsPanel from '../components/contents/Contents';
import StateFilter from '../components/filters/StateFilter';
import SortFilter from '../components/filters/SortFilter';

import styles from '../styles/pages/Contents.module.css';

export default function Contents() {
  // import mui theme
  const theme = useTheme();

  // --- handler events ---
  const handleReset = () => {};

  return (
    <Box
      className={styles.container}
      sx={{ color: theme.palette.text.primary }}
    >
      <Box className={styles.innerContainer}>
        {/* filters */}
        <Box className={styles.filters}>
          <Typography variant="h5">Filters</Typography>
          <StateFilter />
          <SortFilter />
          <Box className={styles.resetButtonContainer}>
            <Button
              variant="outlined"
              className={styles.resetButton}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
        </Box>

        {/* Divider */}
        <Divider orientation="vertical" flexItem className={styles.divider} />

        {/* contents */}
        <ContentsPanel />
      </Box>
    </Box>
  );
}
