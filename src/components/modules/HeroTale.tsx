import React from 'react';
import {
  useTheme,
  Button,
  Box,
  Typography,
  LinearProgress,
} from '@mui/material';
import Link from 'next/link';

import { useTranslation } from '../../lib/translations';
import { ModuleShort } from '../../lib/api/module';
import Polypoints from '../Polypoints';

import styles from '../../styles/components/modules/HeroTale.module.css';

type Props = {
  module: ModuleShort;
};

export default function HeroTale({ module }: Props) {
  // import MUI theme and i18n
  const theme = useTheme();
  const { i18n } = useTranslation();

  return (
    <Box
      className={styles.container}
      sx={{
        backgroundImage: `url(${module.image})`,
        backgroundSize: 'cover',
        borderRadius: '5px',
      }}
    >
      {/* content container */}
      <Box className={styles.innerContainer}>
        {/* polypoints */}
        <Box className={styles.polypointsContainer}>
          <Polypoints points={module.reward} color="white" size="medium" />
        </Box>

        {/* title */}
        <Box className={styles.titleContainer}>
          <Typography className={styles.title}>{module.name}</Typography>
        </Box>

        {/* description */}
        <Box className={styles.descriptionContainer}>
          <Typography
            className={styles.description}
            sx={{ color: theme.palette.text.secondary }}
          >
            {module.description}
          </Typography>
        </Box>

        {/* button */}
        <Box className={styles.buttonContainer}>
          <Link href={`/module/${module.id}`}>
            <Button variant="contained" className={styles.button}>
              {i18n.t('modules.heroTale.resumeButton')}
            </Button>
          </Link>
        </Box>

        {/* progress */}
        <Box className={styles.progressContainer}>
          {/* progress bar */}
          <Box className={styles.linearProgressContainer}>
            <LinearProgress
              variant="determinate"
              value={module.progress}
              className={styles.progress}
            />
          </Box>
          {/* percentage */}
          <Box className={styles.percentageProgressContainer}>
            <Typography className={styles.percentageProgress}>
              {module.progress}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
