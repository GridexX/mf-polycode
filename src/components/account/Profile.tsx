/* eslint-disable no-nested-ternary */
import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from '../../lib/translations';

import styles from '../../styles/components/account/Profile.module.css';
import rankImage from '../../../public/images/rank.png';
import carrotImage from '../../../public/images/carrot.png';

const fakeData = {
  username: 'GridexX',
  emails: ['arsene582@gmail.com', 'theBestPlayer@gmail.com'],
  preferedLanguage: 'javascript',
  polypoints: 24000,
  rank: 1,
  biography: 'This is my biography',
};

export default function Profile() {
  const { i18n } = useTranslation();

  // import mui theme
  const theme = useTheme();

  return (
    <Box
      className={styles.container}
      sx={{ color: '#082946' }} // update with theme.palette.text.main
    >
      {/* window title */}
      <Box>
        <Typography variant="h3" color="inherit">
          {i18n.t('account.profile.title')}
        </Typography>
      </Box>
      {/* content container */}
      <Box className={styles.contentContainer}>
        {/* Information */}
        <Box className={styles.information}>
          <Typography
            className={styles.subContentTitle}
            variant="h4"
            sx={{ color: theme.palette.primary.main }}
          >
            {i18n.t('account.profile.information')}
          </Typography>

          {/* Information content */}
          <Box className={styles.informationContent}>
            {/* Username */}
            <Box className={styles.atomicContentMainContainer}>
              <Typography
                className={styles.atomicContentTitle}
                variant="h6"
                sx={{ color: theme.palette.primary.main }}
              >
                {i18n.t('account.profile.username')}
              </Typography>
              <Box className={styles.atomicContentContainer}>
                <Typography color="inherit">{fakeData.username}</Typography>
              </Box>
            </Box>
            {/* Email */}
            <Box className={styles.atomicContentMainContainer}>
              <Typography
                className={styles.atomicContentTitle}
                variant="h6"
                sx={{ color: theme.palette.primary.main }}
              >
                {i18n.t('account.profile.emails')}
              </Typography>
              <Box className={styles.emailListContainer}>
                {fakeData.emails && fakeData.emails.length > 0
                  ? fakeData.emails.map((email: string) => (
                      <Typography
                        key={email}
                        className={styles.emailItem}
                        color="inherit"
                      >
                        {email}
                      </Typography>
                    ))
                  : null}
              </Box>
            </Box>
            {/* PreferedLanguage */}
            <Box className={styles.atomicContentMainContainer}>
              <Typography
                className={styles.atomicContentTitle}
                variant="h6"
                sx={{ color: theme.palette.primary.main }}
              >
                {i18n.t('account.profile.preferredLanguage')}
              </Typography>
              <Box className={styles.atomicContentContainer}>
                <Typography color="inherit">
                  {fakeData.preferedLanguage}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Score */}
        <Box className={styles.score}>
          <Typography
            className={styles.subContentTitle}
            variant="h4"
            sx={{ color: theme.palette.primary.main }}
          >
            {i18n.t('account.profile.score')}
          </Typography>

          {/* Score content */}
          <Box className={styles.scoreContent}>
            {/* Polypoints */}
            <Box className={styles.atomicContentMainContainer}>
              <Typography
                className={styles.atomicContentTitle}
                variant="h6"
                sx={{ color: theme.palette.primary.main }}
              >
                {i18n.t('account.profile.polypoints')}
              </Typography>
              <Box className={styles.atomicContentContainer}>
                <Typography color="inherit">{fakeData.polypoints}</Typography>
                <Box className={styles.scoreContentImageContainer}>
                  <Image src={carrotImage} />
                </Box>
              </Box>
            </Box>
            {/* Ranks */}
            <Box className={styles.atomicContentMainContainer}>
              <Typography
                className={styles.atomicContentTitle}
                variant="h6"
                sx={{ color: theme.palette.primary.main }}
              >
                {i18n.t('account.profile.rank')}
              </Typography>
              <Box className={styles.atomicContentContainer}>
                <Typography
                  color={
                    fakeData.rank === 1
                      ? '#FFD700' // gold
                      : fakeData.rank === 2
                      ? '#C0C0C0' // silver
                      : fakeData.rank === 3
                      ? '#CD7F32' // bronze
                      : 'inherit'
                  }
                >
                  #{fakeData.rank}
                </Typography>
                <Box className={styles.scoreContentImageContainer}>
                  <Image src={rankImage} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Biography */}
        <Box className={styles.biography}>
          <Typography
            className={styles.subContentTitle}
            variant="h4"
            sx={{ color: theme.palette.primary.main }}
          >
            {i18n.t('account.profile.biography')}
          </Typography>

          {/* Bio content */}
          <Box className={styles.biographyContent}>
            <Typography color="inherit">
              {fakeData.biography ? fakeData.biography : 'No biography'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
